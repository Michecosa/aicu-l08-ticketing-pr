# Prompt Patch Limitato

## Prima Di Compilare

Un prompt patch limitato e' l'istruzione operativa che userai nel lab per autorizzare solo il primo slice.

Serve a dire al builder:

- quale task affrontare;
- quali file puo' toccare;
- cosa resta fuori scope;
- quale verifica proporre;
- quando fermarsi.

Non usarlo per chiedere la feature completa o per autorizzare file non verificati.

Usa questo prompt nel lab L08, dopo il gate umano.

```txt
Dato questo task:
"Serve creare ticket dal supporto."

Usa questi input:
- issue: lavoro-precedente/issue-create-ticket.md
- contract sketch: lavoro-precedente/contract-sketch-create-ticket.md
- data sketch: lavoro-precedente/data-sketch-create-ticket.md
- mappa dei punti di intervento: output/entry-point-map.md

Applica solo il primo slice approvato:
Implementare l'endpoint POST `/api/tickets` nel server per creare un ticket validando `title` e `description`.
Aggiungere la funzione API client in `src/api.js`.
Creare un form base nella UI per inviare i dati, con gestione degli errori (400) e del successo (201).

File o aree ammesse:
- server/index.js
- src/api.js
- src/App.jsx e/o un nuovo componente form in src/components/

File o aree vietate:
- server/data/tickets.js (non serve alterare i dati di seed, basta usare push() in index.js)
- Sistemi di login / autenticazione
- Modelli di database / migrazioni
- Logiche per allegati, owner, area o priorità (rimandati)

Non aggiungere:
- auth;
- allegati;
- notifiche;
- owner avanzato;
- dashboard;
- migration;
- redesign;
- refactor generale.

Prima di modificare, conferma:
- task;
- file che toccherai;
- cosa resta fuori scope;
- verifica manuale proposta.

Applica solo la patch minima approvata.
Fermati se servono file o decisioni fuori piano.
```

## Gate Umano Prima Della Patch

Prima di autorizzare modifiche, controlla che la risposta AI dica chiaramente:

- quali file tocchera';
- quali file non tocchera';
- quale verifica manuale propone;
- quando si fermera'.

Se manca uno di questi punti, chiedi correzione prima della patch.

## Verifica Attesa

```txt
1. Inserire titolo/descrizione vuoti nel form e assicurarsi che l'invio venga impedito con messaggio di errore.
2. Inviare un ticket valido, controllare il Network tab dei devtools (richiesta 201) e vedere il ticket apparire in lista.
```

## Note

- Non chiedere feature completa.
- Non chiedere di "sistemare tutto".
- Non autorizzare file non verificati.
