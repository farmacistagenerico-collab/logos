# Logos — Parole in viaggio

Un portale gratuito di giochi educativi per bambini, progettato per tablet, smartphone e desktop. La prima avventura insegna a riconoscere le lettere e comporre parole italiane partendo da un’illustrazione.

## Gioca online

**[Apri Logos — Parole in viaggio](https://raw.githack.com/farmacistagenerico-collab/logos/arena/59040594-logos/logos.html)**

Il gioco è pubblicato su GitHub nel file autonomo `logos.html` e aperto come pagina HTML tramite RawGitHack. Alla prima apertura il servizio chiede di premere **Open the page** per confermare la visualizzazione. Tutte le risorse sono incorporate nel file: non richiede backend, build o servizi esterni durante il gioco.

## Avvia il progetto

```bash
npm install
npm run dev
```

Il server Vite è disponibile su `http://localhost:5173`.

## Comandi

```bash
npm run build            # controllo TypeScript e build di produzione
npm test                 # test della logica di gioco
npm run preview          # anteprima della build
npm run build:standalone # genera il file autonomo logos.html
```

## Il gioco

- **Livello 0 — Impariamo a leggere:** la parola completa è visibile nell’illustrazione e l’alfabeto è ordinato.
- **Livello 1 — Le prime parole:** alcune lettere restano visibili come indizio.
- **Livello 2 — Parole in salita:** resta soltanto la prima lettera e l’alfabeto si mischia.
- **Livello 3 — Sfida da campione:** la parola scritta scompare, restano solo l’immagine e le lettere mischiate.
- **22 parole da comporre**, ciascuna con un’illustrazione originale, pronuncia tramite le voci italiane del dispositivo ed effetti sonori sintetizzati localmente.
- **Un mattoncino per ogni nuova parola completata:** rigiocare la stessa parola è sempre possibile, ma non assegna premi doppi.
- Quattro unicorni da costruire pezzo per pezzo — **Stellina, Nuvoletta, Arcobaleno e Galassia** — uno per ogni livello.
- La raccolta **“I miei unicorni”** mostra i pezzi ottenuti, quelli mancanti e i modelli completati. I mattoncini già presenti nei salvataggi vengono riconosciuti automaticamente.
- Indizi su richiesta, feedback positivo, supporto alla tastiera e nessuna penalità o limite di tempo.
- Livelli sbloccabili e progressi salvati esclusivamente nel `localStorage` del dispositivo, con migrazione dai salvataggi precedenti.
- Area genitori con possibilità di azzerare parole, livelli e mattoncini.

Non sono richiesti account, acquisti o connessione a un backend. La grafica moderna, ispirata a unicorni e caramelle, è originale e non utilizza personaggi o risorse di franchise esistenti. L’interfaccia riduce il testo non essenziale e usa tasti delle lettere uniformi, senza distinguere le vocali per colore.

## Tecnologie

React, TypeScript, Vite, CSS responsive, Lucide Icons e Nunito (font incluso localmente nella build).
