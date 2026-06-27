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
Implementare l'endpoint POST `/api/tickets` nel server per creare un ticket accettando title, description, customer,
priority e area; validare che i campi siano non vuoti e che priority sia in allowedPriorities e area in allowedAreas
(importati da server/data/tickets.js in lettura).
Generare automaticamente id, status "open", source "support", createdAt e updatedAt.
Aggiungere la funzione API client in `src/api.js`.
Creare un form base nella UI con i cinque campi, con gestione degli errori (400) e del successo (201).

File o aree ammesse:
- server/index.js
- src/api.js
- src/App.jsx e/o un nuovo componente form in src/components/
- server/data/tickets.js (solo lettura: importare allowedPriorities e allowedAreas; non modificare il file)

File o aree vietate:
- Sistemi di login / autenticazione
- Modelli di database / migrazioni
- Logiche per allegati, owner
- Modifica dei dati di seed in server/data/tickets.js

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
1. Inviare un campo obbligatorio vuoto (es. title): atteso 400 con campo indicato.
2. Inviare priority con valore non in allowedPriorities (es. "Critica"): atteso 400 con valori ammessi.
3. Inviare area con valore non in allowedAreas (es. "Sconosciuta"): atteso 400 con valori ammessi.
4. Inviare un ticket valido con tutti i campi: atteso 201, source "support" generato, ticket visibile in lista.
```

## Note

- Non chiedere feature completa.
- Non chiedere di "sistemare tutto".
- Non autorizzare file non verificati.
