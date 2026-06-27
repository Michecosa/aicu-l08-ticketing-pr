# Handoff / PR Description - Create Ticket

## Prima Di Compilare

Un handoff / PR description e' la sintesi tecnica dello stato del lavoro.

Serve a far capire a un reviewer:

- perche' esiste il branch o la PR;
- cosa include il primo slice;
- quale piano e' stato autorizzato;
- cosa e' stato verificato;
- cosa resta fuori o va ripreso.

Non usarlo per promettere la feature completa o nascondere blocchi.

## Summary

```txt
Primo slice per "create ticket dal supporto".
Implementato endpoint POST /api/tickets con validazione dei 5 campi accettati (title, description, customer,
priority, area), generazione automatica dei campi di sistema (id, status "open", source "support", createdAt,
updatedAt), funzione client createTicket in src/api.js e form UI minimo in CreateTicketForm.jsx.
La verifica manuale non e' ancora stata eseguita.
```

## Issue

- Issue collegata: `lavoro-precedente/issue-create-ticket.md`

## Scope

Incluso:

- Endpoint `POST /api/tickets` in `server/index.js` con validazione completa
- Funzione `createTicket` in `src/api.js`
- Componente `CreateTicketForm.jsx` con form a 5 campi, gestione errori e feedback successo
- Collegamento del form in `App.jsx` con refresh automatico della lista al successo

Fuori scope:

- auth;
- allegati;
- notifiche;
- owner avanzato;
- dashboard;
- migration;
- refactor generale.

## File Toccati

| File | Perche' e' stato toccato |
| --- | --- |
| `server/index.js` | Implementato POST /api/tickets |
| `src/api.js` | Aggiunta funzione createTicket per la chiamata POST |
| `src/App.jsx` | Importato CreateTicketForm; aggiunto refreshKey per ricaricare la lista dopo creazione |
| `src/components/CreateTicketForm.jsx` | Nuovo componente: form con 5 campi, validazione lato client via HTML required, gestione errori API |

## Gate Prima Della Patch

Il tool ha confermato prima di modificare:

- [x] task;
- [x] file da toccare;
- [x] file da non toccare;
- [x] verifica manuale proposta;
- [x] quando fermarsi.

## Verifica

- [x] Caso valido provato: POST con tutti i campi corretti... 201 Created (vedi screenshot)
- [x] Casi invalidi provati: title vuoto, priority non ammessa, area non ammessa, status nel body... 400 Bad Request con campo in errore (vedi screenshot)
- [x] Comportamento esistente non intenzionalmente cambiato: GET /api/tickets restituisce ancora 200 OK con la lista


## Output AI

| Output | Decisione |
| --- | --- |
| Piano | accettato |
| Patch | accettata |
| Review | eseguita |

## Residuo

- `CreateTicketForm.jsx` ha PRIORITIES e AREAS hardcoded invece di usare /api/ticket-options: se i valori ammessi cambiano nel server, il client non si aggiorna automaticamente

## Rischio Residuo

- Desincronizzazione valori ammessi: se allowedPriorities o allowedAreas cambiano in tickets.js, la UI non lo riflette senza un aggiornamento manuale del componente
