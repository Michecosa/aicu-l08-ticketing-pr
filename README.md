# AICU M02 L07-L08 - Ticketing PR Parziale

Starter repo per L07 e L08 del Modulo 02.

L'app e' volutamente piccola: una API Express espone ticket aperti fittizi, una UI React mostra la lista.

Usa questa repo in due fasi:

- L07: prepari mappa dei punti di intervento, prompt patch limitato e reviewer leggero, senza modificare codice.
- L08: usi il brief L07 per avviare una PR o branch parziale per `create ticket`, senza completare una feature full-stack.

## Interpretazione Del Task

Task:

```txt
Serve creare ticket dal supporto.
```

In questa repo `dal supporto` indica la sorgente/canale della richiesta, non un utente autenticato.

Per questo slice:

- il server puo' generare `source: "support"`;
- il server puo' generare `id`, `status`, `createdAt` e `updatedAt`;
- auth, reporter autenticato, ownership avanzata, allegati, notifiche, dashboard e migration sono fuori scope.

## Stack

- Node.js
- Express
- React
- Vite
- JavaScript e JSX

Non c'e' TypeScript.

Non c'e' database: i dati sono fixture in memoria.

## Setup

Installa le dipendenze:

```bash
pnpm install
```

Avvia API e frontend:

```bash
pnpm dev
```

Apri:

```txt
http://127.0.0.1:5173/
```

## Istruzioni

Leggi:

```txt
consegna.md
docs/istruzioni-l07.md
docs/istruzioni-l08.md
```

## Stati Da Verificare

Lista ticket:

```txt
http://127.0.0.1:5173/
```

API diretta:

```txt
http://127.0.0.1:3001/api/tickets
```

Endpoint da implementare in L08:

```txt
POST http://127.0.0.1:3001/api/tickets
```

Lo stub attuale restituisce `501 NOT_IMPLEMENTED`: e' il punto di ingresso da far completare all'LLM nel primo slice.

## Task Del Percorso

Preparare e poi avviare una PR o branch parziale per il primo slice:

```txt
backend skeleton minimo per create ticket da richiesta supporto, senza auth
```

Il lavoro deve restare piccolo e reviewabile.

## Input Da Portare

Per L07 importa solo gli artefatti L05-L06 richiesti:

```txt
lavoro-precedente/
  issue-create-ticket.md
  contract-sketch-create-ticket.md
  data-sketch-create-ticket.md
```

Non copiare le repo precedenti intere.

Se non hai completato L05-L06, usa gli artefatti fallback in:

```txt
per-chi-non-ha-completato-l05-06/
```

Per L08 userai anche gli output prodotti in L07:

```txt
output/entry-point-map.md
output/prompt-patch-limitato.md
output/reviewer-leggero.md
```

## File Principali

```txt
server/index.js
server/data/tickets.js
src/App.jsx
src/api.js
src/components/TicketList.jsx
src/components/TicketCard.jsx
src/styles.css
```

Punto di ingresso probabile per il primo slice:

```txt
server/index.js
```

Verifica sempre con la mappa L07 prima di modificare.

## Fuori Scope

- Auth.
- Reporter autenticato obbligatorio.
- Owner avanzato.
- Allegati.
- Notifiche.
- Dashboard.
- Database o migration.
- UI completa.
- Refactor generale.
- Test automatici obbligatori.

## Build

Per controllare che il frontend compili:

```bash
pnpm run build
```

Per servire la build con Express:

```bash
pnpm start
```
