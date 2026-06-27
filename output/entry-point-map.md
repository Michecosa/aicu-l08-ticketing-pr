# Mappa Dei Punti Di Intervento (Entry-Point Map) - Create Ticket

## Prima Di Compilare

Una mappa dei punti di intervento (entry-point map) e' una mappa dei file o delle aree in cui la modifica potrebbe entrare.

Serve a distinguere:

- file suggeriti dall'AI;
- file trovati nel repo;
- file davvero collegati al task;
- file da non toccare.

L'output atteso e' una lista di candidati con evidenza, non una lista di nomi plausibili.

Non segnare un file come `ammesso` se non lo hai aperto o letto.

## Task

```txt
Serve creare ticket dal supporto.
```

## Input Usati

- Issue L05 importata: `lavoro-precedente/issue-create-ticket.md`
- Contract sketch L06 importato: `lavoro-precedente/contract-sketch-create-ticket.md`
- Data sketch L06 importato: `lavoro-precedente/data-sketch-create-ticket.md`

## Regola

Un file suggerito dall'AI non e' ancora un file candidato verificato.

Diventa candidato solo se:

- esiste;
- e' stato aperto o letto;
- ha un ruolo collegato al task;
- hai scritto l'evidenza minima.

## File Candidati

| File / area | Suggerito da | Evidenza verificata | Stato |
| --- | --- | --- | --- |
| `server/index.js` | repo | La rotta POST /api/tickets ritorna 501 NOT_IMPLEMENTED | ammesso |
| `src/api.js` | studente | Manca una funzione createTicket per fare la POST | ammesso |
| `server/data/tickets.js` | AI | Esporta `tickets`, `allowedPriorities` e `allowedAreas`; non va modificato ma va importato in lettura da index.js per la validazione | ammesso (lettura) |
| `src/App.jsx` (e componenti UI) | repo | Il main file React dove andrà collegato il form di inserimento ticket | ammesso |

## File Ammessi Per Il Primo Slice

- `server/index.js`
- `src/api.js`
- Area `src/components/` (nuovo form UI o aggiunte ad `App.jsx`)
- `server/data/tickets.js` - solo lettura: importare `allowedPriorities` e `allowedAreas` per la validazione; non modificare.

## File Vietati O Fuori Scope

- Modelli DB o file di migration - non ci sono database persistenti in uso.
- Aree di Auth / Login - esplicitamente fuori scope (issue).
- Upload di allegati - esplicitamente fuori scope.
- Logica di assegnazione owner / dashboard avanzata - fuori scope.

## Primo Slice Proposto

```txt
Implementare nel server l'endpoint POST `/api/tickets` accettando title, description, customer, priority e area,
validando che i campi siano non vuoti e che priority sia in allowedPriorities e area in allowedAreas
(importati in lettura da server/data/tickets.js).
Generare automaticamente id, status "open", source "support", createdAt e updatedAt.
Creare nel client una funzione in `src/api.js` per chiamare la POST.
Costruire un form minimo nella UI per inserire il ticket con i cinque campi e mostrare gli errori di validazione (400) o il successo (201).
```

## Perche' Questo Slice E' Piccolo

- Si occupa di cinque campi accettati (title, description, customer, priority, area); i valori ammessi per priority e area sono già definiti nel file dati esistente.
- Non necessita di sistemi di auth o ruoli reali.
- Sfrutta il database in memory esistente (array `tickets`) e le costanti già esportate.

## Verifica Manuale Proposta

```txt
Azione 1: Compilare il form con title vuoto e inviare.
Risultato 1: 400 Bad Request, campo title segnalato.
Azione 2: Inviare priority con valore non ammesso (es. "Critica").
Risultato 2: 400 Bad Request, campo priority con valori ammessi.
Azione 3: Inviare area con valore non ammesso (es. "Sconosciuta").
Risultato 3: 400 Bad Request, campo area con valori ammessi.
Azione 4: Compilare tutti i campi correttamente e inviare.
Risultato 4: 201 Created, ticket aggiunto all'elenco, source "support" generato, form resettato.
```

## Stop Condition

Fermarsi se:

- serve auth;
- serve migration;
- serve redesign;
- serve dashboard;
- serve toccare file non verificati;
- il tool propone piu' dello slice approvato.

## Domande Aperte Per L08

- Come posizionare e presentare il form all'interno di `App.jsx` senza un redesign completo?
- C'è bisogno di una route separata o lo teniamo nella stessa pagina?