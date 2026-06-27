# Issue: Create ticket with validation

## Request

```txt
Serve creare ticket dal supporto.
```

## Fatti (Facts)

- Siamo in un applicazione SPA in React con JavaScript dedicata alla gestione di ticket
- L'applicazione contiene ticket e ne consente la creazione da parte di utenti generici
- La struttura reale del ticket include: title, description, customer, priority, area (campi accettati); id, status, source, createdAt, updatedAt (campi generati)
- I valori ammessi per priority sono definiti in `allowedPriorities`: Alta, Media, Bassa
- I valori ammessi per area sono definiti in `allowedAreas`: Billing, Accessi, Comunicazioni, Tecnico
- source è sempre "support" per le richieste dal canale supporto; non viene inserito dal client

## Assunzioni (Assumptions)

- Un ticket creato dal supporto sarà contrassegnato da un'etichetta (come il ruolo dell'autore, ossia "Supporto") per distinguerlo da quello di un utente generico

## Domande Aperte (Questions)

- Che forma ha il feedback di successo?
- Esistono limiti di lunghezza minima o massima per i campi titolo e descrizione?
- Come deve comportarsi l'interfaccia utente se la richiesta di salvataggio fallisce lato server (es. errore di rete o errore 500)?

## Decisione (Decision)

Per questo slice, "creare ticket" significa:

```txt
Permettere a un utente con ruolo Supporto di compilare e inviare il form di creazione ticket, salvandolo nel sistema con l'attributo del ruolo tracciato correttamente.
```

## Fuori Scope / Non-Obiettivi (Non-Goals)

- allegati
- menzioni
- auth
- notifiche
- owner avanzato
- dashboard
- integrazione reale con le API di backend (il salvataggio può essere simulato/mockato in questa fase)

## Criteri Di Accettazione (Acceptance Criteria)

1. Compilazione e Validazione dei Campi Obbligatori: Il sistema deve mostrare un form con i campi "Titolo", "Descrizione", "Cliente", "Priorità" e "Area". Tutti i campi devono essere obbligatori. Se l'utente tenta di inviare il form lasciando uno o più campi vuoti, l'invio deve essere bloccato e deve comparire un messaggio di errore di validazione specifico per il campo mancante.

2. Validazione dei Valori Ammessi: Il campo "Priorità" accetta solo i valori Alta, Media, Bassa. Il campo "Area" accetta solo i valori Billing, Accessi, Comunicazioni, Tecnico. Un valore fuori da questi insiemi deve produrre errore 400 con indicazione del campo e dei valori ammessi.

3. Tracciamento del Canale (Supporto): Al momento del salvataggio del ticket, il sistema deve associare automaticamente il campo `source: "support"` al ticket, senza che l'utente debba selezionarlo manualmente.

4. Una volta inviato il form con dati validi, l'applicazione deve mostrare un feedback visivo di successo (es. un messaggio temporaneo o un banner) e resettare i campi del form / reindirizzare l'utente.

## Piano Di Verifica Manuale (Manual Test Plan)

- Scenario 1: Tentativo di invio form vuoto (Validazione)

    - Azione: Navigare alla pagina di creazione ticket, lasciare i campi "Titolo" e "Descrizione" vuoti e cliccare sul pulsante di invio.

    - Risultato atteso: Il form non viene inviato. Vengono mostrati i messaggi di errore di validazione che indicano che i campi sono obbligatori.

- Scenario 2: Tentativo di invio con solo un campo compilato

    - Azione: Inserire un testo solo nel campo "Titolo", lasciare vuoto il campo "Descrizione" e cliccare su invio.

    - Risultato atteso: Il form non viene inviato. Viene mostrato l'errore di validazione specifico per il campo "Descrizione".

- Scenario 3: Creazione ticket con successo e verifica attributi

    - Azione: Compilare sia il campo "Titolo" che il campo "Descrizione" con dati validi e cliccare sul pulsante di invio.

    - Risultato atteso: Il form viene inviato con successo, viene mostrato un feedback di conferma e il ticket viene salvato nel sistema. Verificare tramite i DevTools del browser che la richiesta di creazione inviata contenga il flag/attributo corretto

## Note Per L06 - Risolte

- Payload chiarito: title, description, customer, priority, area (vedi contract-sketch).
- Errori chiariti: 400 per campo vuoto, 400 per priority/area fuori dai valori ammessi, 400 per campo generato inviato come input.
- Campi decisi: priority e area hanno valori ammessi fissi; source e updatedAt sono generati automaticamente.
