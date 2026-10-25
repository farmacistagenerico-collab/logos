import {
  ArrowRight,
  Blocks,
  Check,
  ChevronRight,
  Lightbulb,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  INITIAL_PROGRESS,
  STORAGE_KEY,
  completeLevel,
  completeWord,
  getWordGuide,
  loadProgress,
  progressPercentage,
  shuffleLetters,
  type SavedProgress,
} from './gameLogic';
import { ALPHABET, LEVELS, TOTAL_WORDS, UNICORNS, type Level } from './data';
import {
  playCorrectSound,
  playLevelCompleteSound,
  playWordCompleteSound,
  playWrongSound,
  speakItalian,
} from './audio';
import WordPicture from './components/WordPicture';
import BlockUnicorn from './components/BlockUnicorn';
import { LogoMark } from './components/PixelArt';

type RoundStatus = 'playing' | 'word-complete' | 'level-complete';
type FeedbackKind = 'neutral' | 'good' | 'try-again' | 'hint' | 'success';

interface Feedback {
  kind: FeedbackKind;
  text: string;
}

const initialFeedback: Feedback = {
  kind: 'neutral',
  text: 'Tocca la prima lettera.',
};

const confettiColors = ['#f49ac1', '#a98ce8', '#79d8c2', '#82c8f2', '#ffc6de'];

function countCompletedWords(level: Level, completedWordIds: string[]): number {
  return level.words.filter((word) => completedWordIds.includes(word.id)).length;
}

function Candy({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 76" aria-hidden="true" focusable="false">
      <path d="M29 25L8 13l5 19-5 19 22-11zM71 25l21-12-5 19 5 19-22-11z" fill="#c8b5f1" />
      <rect x="24" y="15" width="52" height="43" rx="20" fill="#f49ac1" />
      <path d="M42 18l-8 35M60 18l-8 35" fill="none" stroke="#fff4fa" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function WorldDecorations() {
  return (
    <div className="world-decorations fantasy-world" aria-hidden="true">
      <span className="fantasy-glow fantasy-glow--one" />
      <span className="fantasy-glow fantasy-glow--two" />
      <Candy className="fantasy-candy fantasy-candy--one" />
      <Candy className="fantasy-candy fantasy-candy--two" />
      <span className="fantasy-spark fantasy-spark--one" />
      <span className="fantasy-spark fantasy-spark--two" />
      <span className="fantasy-spark fantasy-spark--three" />
    </div>
  );
}

export default function App() {
  const [progress, setProgress] = useState<SavedProgress>(loadProgress);
  const [levelIndex, setLevelIndex] = useState(progress.unlockedLevel);
  const [wordIndex, setWordIndex] = useState(0);
  const [enteredLetters, setEnteredLetters] = useState<string[]>([]);
  const [roundStatus, setRoundStatus] = useState<RoundStatus>('playing');
  const [feedback, setFeedback] = useState<Feedback>(initialFeedback);
  const [wrongLetter, setWrongLetter] = useState<string | null>(null);
  const [correctLetter, setCorrectLetter] = useState<string | null>(null);
  const [hintLetter, setHintLetter] = useState<string | null>(null);
  const [parentsOpen, setParentsOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [earnedBlock, setEarnedBlock] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const flashTimer = useRef<number | null>(null);
  const hintTimer = useRef<number | null>(null);

  const currentLevel = LEVELS[levelIndex];
  const currentWord = currentLevel.words[wordIndex];
  const wordGuide = getWordGuide(currentWord.text, currentLevel.guide);
  const isLastWord = wordIndex === currentLevel.words.length - 1;
  const isLastLevel = levelIndex === LEVELS.length - 1;
  const completedCount = progress.completedWordIds.length;
  const adventurePercentage = progressPercentage(completedCount);
  const currentUnicorn = UNICORNS[levelIndex];
  const currentUnicornBlocks = countCompletedWords(currentLevel, progress.completedWordIds);
  const completedUnicornCount = LEVELS.filter(
    (level) => countCompletedWords(level, progress.completedWordIds) === level.words.length,
  ).length;

  const letters = useMemo(
    () => (currentLevel.shuffled ? shuffleLetters(ALPHABET) : [...ALPHABET]),
    [currentLevel.id, currentLevel.shuffled, currentWord.id],
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // The game remains fully playable when storage is unavailable.
    }
  }, [progress]);

  useEffect(() => {
    return () => {
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
      if (hintTimer.current) window.clearTimeout(hintTimer.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!parentsOpen && !collectionOpen && roundStatus !== 'level-complete') return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [parentsOpen, collectionOpen, roundStatus]);

  const resetRound = useCallback(() => {
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
    setEnteredLetters([]);
    setRoundStatus('playing');
    setFeedback(initialFeedback);
    setWrongLetter(null);
    setCorrectLetter(null);
    setHintLetter(null);
    setEarnedBlock(false);
  }, []);

  const flashLetter = useCallback((letter: string, kind: 'right' | 'wrong') => {
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    setWrongLetter(kind === 'wrong' ? letter : null);
    setCorrectLetter(kind === 'right' ? letter : null);
    flashTimer.current = window.setTimeout(() => {
      setWrongLetter(null);
      setCorrectLetter(null);
    }, 420);
  }, []);

  const handleLetter = useCallback(
    (letter: string) => {
      if (roundStatus !== 'playing' || parentsOpen || collectionOpen) return;
      const expectedLetter = currentWord.text[enteredLetters.length];

      if (letter !== expectedLetter) {
        flashLetter(letter, 'wrong');
        setHintLetter(null);
        setFeedback({
          kind: 'try-again',
          text: `La ${letter} non va qui. Riprova!`,
        });
        if (progress.soundEnabled) playWrongSound();
        return;
      }

      const nextLetters = [...enteredLetters, letter];
      setEnteredLetters(nextLetters);
      setHintLetter(null);
      flashLetter(letter, 'right');

      if (nextLetters.length === currentWord.text.length) {
        setRoundStatus('word-complete');
        setEarnedBlock(!progress.completedWordIds.includes(currentWord.id));
        setFeedback({
          kind: 'success',
          text: `Hai scritto ${currentWord.text}!`,
        });
        setProgress((previous) => {
          const withWord = completeWord(previous, currentWord.id);
          return isLastWord ? completeLevel(withWord, levelIndex) : withWord;
        });
        if (progress.soundEnabled) playWordCompleteSound();
      } else {
        const remaining = currentWord.text.length - nextLetters.length;
        setFeedback({
          kind: 'good',
          text:
            remaining === 1
              ? 'Manca solo una lettera. Sei bravissimo!'
              : nextLetters.length === 1
                ? 'Ottimo inizio! Continua così.'
                : 'Ben fatto! La parola sta comparendo.',
        });
        if (progress.soundEnabled) playCorrectSound();
      }
    },
    [
      collectionOpen,
      currentWord,
      enteredLetters,
      flashLetter,
      isLastWord,
      levelIndex,
      parentsOpen,
      progress.completedWordIds,
      progress.soundEnabled,
      roundStatus,
    ],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && (parentsOpen || collectionOpen)) {
        setParentsOpen(false);
        setCollectionOpen(false);
        setConfirmReset(false);
        return;
      }
      if (event.ctrlKey || event.metaKey || event.altKey || parentsOpen || collectionOpen) return;
      const letter = event.key.toLocaleUpperCase('it-IT');
      if (ALPHABET.includes(letter)) {
        event.preventDefault();
        handleLetter(letter);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleLetter, parentsOpen, collectionOpen]);

  const selectLevel = (index: number) => {
    if (index > progress.unlockedLevel) return;
    setLevelIndex(index);
    setWordIndex(0);
    resetRound();
  };

  const showHint = () => {
    if (roundStatus !== 'playing') return;
    const expectedLetter = currentWord.text[enteredLetters.length];
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
    setHintLetter(expectedLetter);
    setFeedback({
      kind: 'hint',
      text: `Prova la lettera ${expectedLetter}.`,
    });
    if (progress.soundEnabled) speakItalian(expectedLetter);
    hintTimer.current = window.setTimeout(() => setHintLetter(null), 2200);
  };

  const listenToWord = () => {
    if (!progress.soundEnabled) {
      setProgress((previous) => ({ ...previous, soundEnabled: true }));
    }
    speakItalian(currentWord.text);
  };

  const toggleSound = () => {
    if (progress.soundEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setProgress((previous) => ({
      ...previous,
      soundEnabled: !previous.soundEnabled,
    }));
  };

  const goForward = () => {
    if (!isLastWord) {
      setWordIndex((index) => index + 1);
      resetRound();
      return;
    }
    setRoundStatus('level-complete');
    if (progress.soundEnabled) playLevelCompleteSound();
  };

  const goToNextLevel = () => {
    if (isLastLevel) {
      setWordIndex(0);
      resetRound();
      return;
    }
    setLevelIndex((index) => index + 1);
    setWordIndex(0);
    resetRound();
  };

  const resetAdventure = () => {
    setProgress({
      ...INITIAL_PROGRESS,
      soundEnabled: progress.soundEnabled,
    });
    setLevelIndex(0);
    setWordIndex(0);
    resetRound();
    setConfirmReset(false);
    setParentsOpen(false);
    setCollectionOpen(false);
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-game">Vai al gioco</a>
      <WorldDecorations />

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#main-game" aria-label="Logos, vai al gioco">
            <LogoMark />
            <span className="brand-name">logos<span className="brand-dot">.</span></span>
          </a>
          <div className="header-actions">
            <button
              className="collection-button"
              type="button"
              onClick={() => setCollectionOpen(true)}
              aria-label={`Apri la collezione: ${completedUnicornCount} unicorni completati su ${UNICORNS.length}`}
            >
              <Blocks size={20} />
              <span>Unicorni</span>
              <strong>{completedUnicornCount}/{UNICORNS.length}</strong>
            </button>
            <button
              className="sound-button"
              type="button"
              onClick={toggleSound}
              aria-label={progress.soundEnabled ? 'Disattiva i suoni' : 'Attiva i suoni'}
              title={progress.soundEnabled ? 'Disattiva i suoni' : 'Attiva i suoni'}
            >
              {progress.soundEnabled ? <Volume2 size={21} /> : <VolumeX size={21} />}
            </button>
            <div className="star-counter" aria-label={`${completedCount} parole completate su ${TOTAL_WORDS}`}>
              <Star size={23} fill="currentColor" strokeWidth={2.5} />
              <strong>{completedCount}</strong>
              <span>/{TOTAL_WORDS}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content" id="main-game">
        <section className="page-heading" aria-labelledby="page-title">
          <div>
            <h1 id="page-title">Parole in <span>viaggio</span></h1>
          </div>
          <button className="parents-button" type="button" onClick={() => setParentsOpen(true)}>
            <ShieldCheck size={20} />
            <span>Per i genitori</span>
          </button>
        </section>

        <div className="game-layout">
          <aside className="adventure-panel" aria-label="La tua avventura">
            <div className="adventure-heading">
              <div>
                <h2>Livelli</h2>
              </div>
              <span className="percentage-badge">{adventurePercentage}%</span>
            </div>
            <div className="adventure-progress" aria-hidden="true">
              <span style={{ width: `${adventurePercentage}%` }} />
            </div>

            <div className="level-list">
              {LEVELS.map((level, index) => {
                const locked = index > progress.unlockedLevel;
                const active = index === levelIndex;
                const levelCompleted = level.words.every((word) =>
                  progress.completedWordIds.includes(word.id),
                );
                const levelCompletedCount = countCompletedWords(level, progress.completedWordIds);

                return (
                  <button
                    className={`level-item${active ? ' is-active' : ''}${locked ? ' is-locked' : ''}`}
                    type="button"
                    key={level.id}
                    onClick={() => selectLevel(index)}
                    disabled={locked}
                    aria-current={active ? 'step' : undefined}
                    aria-label={`${level.name}. ${locked ? 'Bloccato' : `${levelCompletedCount} parole su ${level.words.length} completate`}`}
                  >
                    <span className={`level-number level-number--${index}`}>
                      {locked ? <LockKeyhole size={19} /> : levelCompleted ? <Check size={22} /> : index}
                    </span>
                    <span className="level-copy">
                      <strong>{level.shortName}</strong>
                      {!locked && (
                        <span className="level-word-count">
                          {levelCompletedCount}/{level.words.length}
                        </span>
                      )}
                    </span>
                    {active && <ChevronRight className="level-chevron" size={19} />}
                  </button>
                );
              })}
            </div>

            <button
              className="unicorn-progress-card"
              type="button"
              onClick={() => setCollectionOpen(true)}
              aria-label={`${currentUnicorn.name}: ${currentUnicornBlocks} mattoncini su ${currentLevel.words.length}. Apri la collezione`}
            >
              <BlockUnicorn
                unicorn={currentUnicorn}
                blocks={currentUnicornBlocks}
                totalBlocks={currentLevel.words.length}
                className="unicorn-progress-picture"
              />
              <span className="unicorn-progress-copy">
                <strong>{currentUnicorn.name}</strong>
                <span className="unicorn-block-count"><Blocks size={14} /> {currentUnicornBlocks}/{currentLevel.words.length}</span>
                <span className="unicorn-mini-progress" aria-hidden="true">
                  <i style={{ width: `${(currentUnicornBlocks / currentLevel.words.length) * 100}%` }} />
                </span>
              </span>
            </button>
          </aside>

          <section className={`game-card${roundStatus === 'word-complete' ? ' is-celebrating' : ''}`} aria-label={`Gioco: ${currentLevel.name}`}>
            <div className="game-card-top">
              <div className="game-meta">
                <span className={`level-badge level-badge--${levelIndex}`}>Livello {levelIndex}</span>
              </div>
              <span className="word-counter" aria-label={`Parola ${wordIndex + 1} di ${currentLevel.words.length}`}><strong>{wordIndex + 1}</strong>/{currentLevel.words.length}</span>
            </div>

            <div className="word-progress" aria-label={`Avanzamento nel livello: parola ${wordIndex + 1} di ${currentLevel.words.length}`}>
              {currentLevel.words.map((word, index) => (
                <span
                  key={word.id}
                  className={`${index < wordIndex || (index === wordIndex && roundStatus !== 'playing') ? 'is-done' : ''}${index === wordIndex ? ' is-current' : ''}`}
                />
              ))}
            </div>

            <div className="challenge-stage">
              {roundStatus === 'word-complete' && (
                <div className="confetti" aria-hidden="true">
                  {Array.from({ length: 20 }, (_, index) => (
                    <i
                      key={index}
                      style={{
                        '--confetti-x': `${(index * 47) % 100}%`,
                        '--confetti-delay': `${(index % 6) * 0.07}s`,
                        '--confetti-color': confettiColors[index % confettiColors.length],
                        '--confetti-rotate': `${(index * 41) % 180}deg`,
                      } as CSSProperties}
                    />
                  ))}
                </div>
              )}

              <div className="picture-scene">
                <div className="scene-magic" aria-hidden="true">
                  <span className="scene-soft-cloud scene-soft-cloud--one" />
                  <span className="scene-soft-cloud scene-soft-cloud--two" />
                  <Candy className="scene-candy" />
                  <i className="scene-star scene-star--one" />
                  <i className="scene-star scene-star--two" />
                </div>
                {wordGuide && (
                  <div
                    className={`picture-word-guide picture-word-guide--${currentLevel.guide}`}
                    role="img"
                    aria-label={currentLevel.guide === 'full'
                      ? `Parola da copiare: ${currentWord.text}`
                      : 'Alcune lettere della parola sono nascoste'}
                  >
                    <span className="picture-word-guide-letters" aria-hidden="true">
                      {wordGuide.split('').map((character, index) => (
                        <span className={character === '_' ? 'is-hidden-letter' : ''} key={index}>
                          {character}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                <WordPicture name={currentWord.illustration} />
                <button className="listen-button" type="button" onClick={listenToWord}>
                  <Volume2 size={19} />
                  <span>Ascolta</span>
                </button>
              </div>

              <div className="answer-zone">
                <h2>Componi la parola</h2>
                <div
                  className={`word-slots${currentWord.text.length > 7 ? ' word-slots--long' : ''}`}
                  aria-label={`Parola da comporre di ${currentWord.text.length} lettere. Lettere inserite: ${enteredLetters.join(', ') || 'nessuna'}`}
                >
                  {currentWord.text.split('').map((_, index) => (
                    <span
                      key={index}
                      className={`word-slot${enteredLetters[index] ? ' is-filled' : ''}${index === enteredLetters.length && roundStatus === 'playing' ? ' is-next' : ''}`}
                      aria-hidden="true"
                    >
                      {enteredLetters[index] ?? ''}
                    </span>
                  ))}
                </div>

                <div className={`feedback feedback--${feedback.kind}`} role="status" aria-live="polite">
                  <span className="feedback-icon">
                    {feedback.kind === 'success' || feedback.kind === 'good' ? (
                      <Check size={17} strokeWidth={3} />
                    ) : feedback.kind === 'hint' ? (
                      <Lightbulb size={17} />
                    ) : (
                      <Sparkles size={16} />
                    )}
                  </span>
                  <span>{feedback.text}</span>
                </div>

                {roundStatus === 'word-complete' && (
                  <>
                    <div className={`block-reward${earnedBlock ? '' : ' is-practice'}`}>
                      {earnedBlock ? <Blocks size={17} /> : <Sparkles size={16} />}
                      <span>{earnedBlock ? `+1 mattoncino per ${currentUnicorn.name}` : 'Bravo, continua ad allenarti!'}</span>
                    </div>
                    <div className="word-complete-actions">
                      <button className="button button--light button--small" type="button" onClick={resetRound}>
                        <RotateCcw size={17} /> Ripeti
                      </button>
                      <button className="button button--primary button--small" type="button" onClick={goForward}>
                        {isLastWord ? 'Vai al traguardo' : 'Prossima parola'}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="letter-deck">
              <div className="letter-deck-heading">
                <button
                  className="hint-button"
                  type="button"
                  onClick={showHint}
                  disabled={roundStatus !== 'playing'}
                >
                  <Lightbulb size={19} />
                  <span>Aiuto</span>
                </button>
              </div>

              <div className="alphabet-grid" role="group" aria-label={currentLevel.shuffled ? 'Alfabeto mischiato' : 'Alfabeto in ordine'}>
                {letters.map((letter) => (
                  <button
                    className={`letter-key${wrongLetter === letter ? ' is-wrong' : ''}${correctLetter === letter ? ' is-right' : ''}${hintLetter === letter ? ' is-hint' : ''}`}
                    type="button"
                    key={letter}
                    onClick={() => handleLetter(letter)}
                    disabled={roundStatus !== 'playing'}
                    aria-label={`Lettera ${letter}`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

      </main>

      {parentsOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setParentsOpen(false);
        }}>
          <section className="parents-modal" role="dialog" aria-modal="true" aria-labelledby="parents-title">
            <button className="modal-close" type="button" onClick={() => setParentsOpen(false)} aria-label="Chiudi">
              <X size={22} />
            </button>
            <div className="parents-modal-icon"><ShieldCheck size={30} /></div>
            <span className="section-kicker">UN ANGOLO PER I GRANDI</span>
            <h2 id="parents-title">Imparare con serenità.</h2>
            <p className="parents-intro">Logos è un piccolo spazio sicuro dove scoprire le parole attraverso il gioco, senza fretta e senza distrazioni.</p>

            <div className="parent-features">
              <div><span><Check size={20} /></span><p><strong>Gratis, davvero</strong>Nessuna pubblicità, acquisto o iscrizione.</p></div>
              <div><span><Sparkles size={20} /></span><p><strong>Errori che aiutano</strong>Niente vite perse né cronometro: solo indizi e nuovi tentativi.</p></div>
              <div><span><LockKeyhole size={20} /></span><p><strong>Progressi sul dispositivo</strong>I risultati restano qui, senza profili o dati online.</p></div>
            </div>

            <div className="difficulty-note">
              <strong>Come cresce la difficoltà?</strong>
              <p>All’inizio la parola è tutta visibile nell’illustrazione. Poi restano solo alcune lettere, poi la prima e infine soltanto l’immagine. Anche l’alfabeto si mischia nei livelli più difficili. Il pulsante <b>Aiuto</b> è sempre disponibile.</p>
            </div>

            <button className="button button--primary parents-resume" type="button" onClick={() => setParentsOpen(false)} autoFocus>
              Torna al gioco <ArrowRight size={18} />
            </button>

            <div className="reset-zone">
              {!confirmReset ? (
                <button type="button" onClick={() => setConfirmReset(true)}>Azzera i progressi su questo dispositivo</button>
              ) : (
                <div className="reset-confirm" role="alert">
                  <span>Vuoi ricominciare dall’inizio?</span>
                  <button type="button" onClick={resetAdventure}>Sì, ricomincia</button>
                  <button type="button" onClick={() => setConfirmReset(false)}>Annulla</button>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {collectionOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setCollectionOpen(false);
        }}>
          <section className="collection-modal" role="dialog" aria-modal="true" aria-labelledby="collection-title">
            <button className="modal-close" type="button" onClick={() => setCollectionOpen(false)} aria-label="Chiudi la collezione">
              <X size={22} />
            </button>
            <div className="collection-heading-icon"><Blocks size={29} /></div>
            <span className="section-kicker">I TUOI CAPOLAVORI A BLOCCHI</span>
            <h2 id="collection-title">I miei unicorni</h2>
            <p className="collection-intro">Ogni nuova parola aggiunge un mattoncino. Completa i livelli per costruirli tutti!</p>
            <div className="collection-summary">
              <span><Blocks size={18} /> {completedCount} {completedCount === 1 ? 'mattoncino' : 'mattoncini'}</span>
              <span><Sparkles size={18} /> {completedUnicornCount}/{UNICORNS.length} unicorni</span>
            </div>

            <div className="collection-grid">
              {LEVELS.map((level, index) => {
                const unicorn = UNICORNS[index];
                const blocks = countCompletedWords(level, progress.completedWordIds);
                const complete = blocks === level.words.length;
                const locked = index > progress.unlockedLevel;
                return (
                  <article className={`collection-card${complete ? ' is-complete' : ''}${locked ? ' is-locked' : ''}`} key={unicorn.id}>
                    <span className="collection-card-level">LIVELLO {index}</span>
                    <BlockUnicorn
                      unicorn={unicorn}
                      blocks={blocks}
                      totalBlocks={level.words.length}
                      className="collection-unicorn"
                    />
                    <h3>{unicorn.name}</h3>
                    <div className="collection-card-progress" aria-hidden="true">
                      <i style={{ width: `${(blocks / level.words.length) * 100}%` }} />
                    </div>
                    <p><Blocks size={14} /> {blocks}/{level.words.length} mattoncini</p>
                    <small>
                      {complete
                        ? 'Unicorno completato!'
                        : locked
                          ? `Si sblocca al livello ${index}`
                          : `Mancano ${level.words.length - blocks} mattoncini`}
                    </small>
                  </article>
                );
              })}
            </div>

            <button className="button button--primary collection-resume" type="button" onClick={() => setCollectionOpen(false)} autoFocus>
              Continua a costruire <ArrowRight size={18} />
            </button>
          </section>
        </div>
      )}

      {roundStatus === 'level-complete' && (
        <div className="modal-backdrop level-backdrop">
          <section className="level-complete-modal" role="dialog" aria-modal="true" aria-labelledby="level-complete-title">
            <div className="celebration-spark celebration-spark--one" aria-hidden="true" />
            <div className="celebration-spark celebration-spark--two" aria-hidden="true" />
            <BlockUnicorn
              unicorn={currentUnicorn}
              blocks={currentLevel.words.length}
              totalBlocks={currentLevel.words.length}
              className="level-unicorn"
            />
            <span className="section-kicker">{isLastLevel ? 'COLLEZIONE COMPLETATA' : 'UNICORNO COMPLETATO'}</span>
            <h2 id="level-complete-title">{isLastLevel ? 'Sei un mago delle parole!' : `Hai costruito ${currentUnicorn.name}!`}</h2>
            <p>{isLastLevel ? 'Hai costruito tutti gli unicorni e completato questa avventura. Che campione!' : `Hai usato ${currentLevel.words.length} mattoncini e sbloccato un nuovo livello. Continua a costruire!`}</p>
            <div className="celebration-stars" aria-label="Gran bel lavoro">
              <Star size={38} fill="currentColor" />
              <Star size={48} fill="currentColor" />
              <Star size={38} fill="currentColor" />
            </div>
            <div className="level-result"><Check size={19} /> {currentLevel.words.length} parole su {currentLevel.words.length}</div>
            <div className="level-complete-actions">
              <button className="button button--light" type="button" onClick={() => {
                setWordIndex(0);
                resetRound();
              }}>
                <RotateCcw size={18} /> Rigioca
              </button>
              <button className="button button--primary" type="button" onClick={goToNextLevel} autoFocus>
                {isLastLevel ? 'Gioca ancora' : `Vai al livello ${levelIndex + 1}`}
                <ArrowRight size={19} />
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
