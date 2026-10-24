# Logos — Parole in viaggio

Un portale gratuito di giochi educativi per bambini, progettato per tablet, smartphone e desktop. La prima avventura insegna a riconoscere le lettere e comporre parole italiane partendo da un’illustrazione.

## Gioca online

**[Apri Logos — Parole in viaggio](https://htmlpreview.github.io/?https://raw.githubusercontent.com/farmacistagenerico-collab/logos/arena/59040594-logos/logos.html)**

Il gioco è pubblicato su GitHub nel file autonomo `logos.html` e reso giocabile tramite HTMLPreview. Tutte le risorse sono incorporate nel file: non richiede backend, build o servizi esterni durante il gioco.

## Avvia il progetto

```bash
npm install
npm run dev
```

Il server Vite è disponibile su `http://localhost:5173`.

## Comandi

```bash
npm run build   # controllo TypeScript e build di produzione
npm test        # test della logica di gioco
npm run preview # anteprima della build
```

## Il gioco

- **Livello 1 — Le prime parole:** alfabeto italiano ordinato e parole corte.
- **Livello 2 — Parole in salita:** alfabeto mischiato e nuove parole.
- **Livello 3 — Sfida da campione:** parole lunghe e lettere mischiate.
- 11 illustrazioni originali, pronuncia tramite le voci italiane del dispositivo ed effetti sonori sintetizzati localmente.
- Indizi su richiesta, feedback positivo, supporto alla tastiera e nessuna penalità o limite di tempo.
- Livelli sbloccabili e progressi salvati esclusivamente nel `localStorage` del dispositivo.
- Area genitori con possibilità di azzerare i progressi.

Non sono richiesti account, servizi esterni, acquisti o connessione a un backend. La grafica pixel-art è originale e non utilizza personaggi o risorse di franchise esistenti.

## Tecnologie

React, TypeScript, Vite, CSS responsive, Lucide Icons, Nunito e Press Start 2P (font inclusi localmente nella build).
