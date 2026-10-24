let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!('AudioContext' in window)) return null;
  audioContext ??= new AudioContext();
  if (audioContext.state === 'suspended') void audioContext.resume();
  return audioContext;
}

function tone(
  frequency: number,
  delay: number,
  duration: number,
  volume = 0.035,
  type: OscillatorType = 'square',
) {
  const context = getAudioContext();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime + delay;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

export function playCorrectSound() {
  tone(523.25, 0, 0.1);
  tone(783.99, 0.08, 0.14);
}

export function playWrongSound() {
  tone(220, 0, 0.11, 0.025, 'triangle');
  tone(174.61, 0.09, 0.14, 0.02, 'triangle');
}

export function playWordCompleteSound() {
  [523.25, 659.25, 783.99, 1046.5].forEach((note, index) => {
    tone(note, index * 0.09, 0.2, 0.04);
  });
}

export function playLevelCompleteSound() {
  [392, 523.25, 659.25, 783.99, 1046.5].forEach((note, index) => {
    tone(note, index * 0.12, 0.28, 0.045);
  });
  tone(523.25, 0.62, 0.5, 0.035);
  tone(659.25, 0.62, 0.5, 0.025);
  tone(783.99, 0.62, 0.5, 0.025);
}

export function speakItalian(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.toLocaleLowerCase('it-IT'));
  utterance.lang = 'it-IT';
  utterance.rate = 0.78;
  utterance.pitch = 1.08;
  const italianVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().startsWith('it'));
  if (italianVoice) utterance.voice = italianVoice;
  window.speechSynthesis.speak(utterance);
}
