# Ricettario

Web app installabile su iPhone, senza App Store e senza Apple Developer Program.

## Pubblicarla (una volta sola, gratis)

1. Crea un account su github.com, poi un nuovo repository **pubblico** (per esempio `ricettario`).
2. Carica tutti i file di questa cartella con "Add file → Upload files", mantenendo la cartella `ricette/`.
3. In Settings → Pages scegli "Deploy from a branch", branch `main`, cartella `/ (root)`, e salva.
4. Dopo un minuto l'app è su `https://<tuo-utente>.github.io/ricettario/`.

## Installarla sull'iPhone

Apri l'indirizzo in **Safari** → tasto Condividi → "Aggiungi alla schermata Home". Da lì si apre a tutto schermo e funziona anche offline.

## Aggiungere o aggiornare ricette predefinite

1. Metti il file `nome.ricetta.json` nella cartella `ricette/`.
2. Aggiungi il nome del file in `ricette/indice.json`.
3. Aggiungi lo stesso percorso nell'elenco `FILE` di `sw.js` e aumenta `VERSIONE` (per esempio da `ricettario-v2` a `ricettario-v3`): serve perché la ricetta sia disponibile anche offline.

L'app scarica le novità alla prossima apertura con internet.

`index.html` contiene anche una copia di sicurezza delle ricette predefinite, usata solo se la cartella `ricette/` non è raggiungibile. Non serve aggiornarla a mano.

## Le ricette personali

Restano salvate solo su quel telefono, e si perdono se cancelli l'icona dalla schermata Home. Per questo c'è il backup.

**Backup.** Nella schermata principale tocca "Fai backup" → "Salva su File" → una cartella di iCloud Drive. Il file si chiama sempre `ricettario-backup.json`, quindi ogni backup sostituisce il precedente. Il riquadro del backup diventa evidenziato quando ci sono modifiche successive all'ultimo salvataggio.

**Ripristino.** "Ripristina backup" → scegli il file su iCloud Drive. Le ricette vengono unite a quelle già presenti: quelle mancanti si aggiungono, e se una ricetta c'è già resta la versione modificata più di recente.

**Condividere una ricetta.** "Condividi link" crea un link che contiene tutta la ricetta, da mandare via WhatsApp, Messaggi o email. Chi lo apre vede l'anteprima e la aggiunge con un tocco. Su iPhone i link si aprono sempre in Safari, che tiene i dati separati dall'app installata: dalla pagina si tocca "Copia per l'app", poi nell'app "Incolla link".

"Esporta file" e "Importa file" fanno la stessa cosa con un file `.ricetta.json`.

## Formato `.ricetta.json`

| Campo | Significato |
|---|---|
| `titolo`, `autore`, `descrizione`, `note` | Testi |
| `resa.nome`, `resa.nome_plurale` | Come si chiama un pezzo ("pane", "pani") |
| `resa.pezzi` | Quanti pezzi proporre all'apertura |
| `resa.peso_pezzo_g` | Facoltativo. Se c'è, le dosi si calcolano da pezzi × peso rispetto al totale in grammi degli ingredienti |
| `resa.pezzi_base` | Senza peso: per quanti pezzi valgono le quantità scritte |
| `resa.pesi_suggeriti` | Pesi proposti come scorciatoia, es. `[750, 1200]` |
| `ingredienti[]` | `id`, `nome`, `qta`, `unita` (`g`, `ml`, `pz`, `cucchiaini`). Solo i `g` entrano nel totale |
| `varianti[]` | `nome`, `nota`, `modifiche`: `{ "id-ingrediente": nuova quantità base }` |
| `fasi[]` | `id`, `nome`, `durata_min`, `nota` |
| `fasi[].sovrapponi_min` | La fase parte questi minuti prima della fine della precedente |
| `fasi[].durata_per_peso` | Durata che dipende dal peso del pezzo, es. `[[750, 60], [1200, 80]]`; i valori intermedi si interpolano |
