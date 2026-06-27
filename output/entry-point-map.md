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
| `server/data/tickets.js` | studente | Contiene l'array `tickets` esportato | vietato |
| `src/App.jsx` (e componenti UI) | repo | Il main file React dove andrà collegato il form di inserimento ticket | ammesso |

## File Ammessi Per Il Primo Slice

- `server/index.js`
- `src/api.js`
- Area `src/components/` (nuovo form UI o aggiunte ad `App.jsx`)

## File Vietati O Fuori Scope

- Modelli DB o file di migration - non ci sono database persistenti in uso.
- `server/data/tickets.js` - Non va modificato il file. L'array esportato verrà aggiornato in memoria tramite `push()` direttamente in `index.js`.
- Aree di Auth / Login - esplicitamente fuori scope (issue).
- Upload di allegati - esplicitamente fuori scope.
- Logica di assegnazione owner / dashboard avanzata - fuori scope.

## Primo Slice Proposto

```txt
Implementare nel server l'endpoint POST `/api/tickets` accettando solo `title` e `description` e validandoli.
Creare nel client una funzione in `src/api.js` per chiamare la POST.
Costruire un form minimo nella UI per inserire il ticket e mostrare gli errori di validazione (400) o il successo (201).
```

## Perche' Questo Slice E' Piccolo

- Si occupa solo di due campi (`title`, `description`).
- Non necessita di sistemi di auth o ruoli reali.
- Sfrutta il database in memory esistente (array `tickets`).

## Verifica Manuale Proposta

```txt
Azione 1: Compilare il form con titolo vuoto o descrizione vuota e inviare.
Risultato 1: Il form deve bloccarsi e mostrare il messaggio d'errore (400 Bad Request).
Azione 2: Compilare il form correttamente e inviare.
Risultato 2: Ritorno 201 Created, ticket aggiunto all'elenco e form resettato.
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