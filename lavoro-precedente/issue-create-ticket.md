# Issue: Create ticket with validation

## Request

```txt
Serve creare ticket dal supporto.
```

## Fatti (Facts)

- Siamo in un applicazione SPA in React con JavaScript dedicata alla gestione di ticket
- L'applicazione contiene ticket e ne consente la creazione da parte di utenti generici
- NON hai ancora accesso all'applicazione: siamo in una fase precedente di analisi
- La struttura base del ticket (titolo e descrizione) è identica per tutti i ruoli
- I campi obbligatori di un ticket sono titolo e descrizione 

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

1. Compilazione e Validazione dei Campi Obbligatori: Il sistema deve mostrare un form con i campi "Titolo" e "Descrizione". Entrambi i campi devono essere obbligatori. Se l'utente tenta di inviare il form lasciando uno o entrambi i campi vuoti, l'invio deve essere bloccato e deve comparire un messaggio di errore di validazione specifico per il campo mancante.

2. Tracciamento del Ruolo (Supporto): Al momento del salvataggio del ticket, il sistema deve associare automaticamente e correttamente l'attributo/etichetta "Supporto" al ticket, senza che l'utente debba selezionarlo manualmente.

3. Una volta inviato il form con dati validi, l'applicazione deve mostrare un feedback visivo di successo (es. un messaggio temporaneo o un banner) e resettare i campi del form / reindirizzare l'utente". Sposta il dettaglio del payload/salvataggio nelle note tecniche.

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

## Note Per L06

- [quale payload andra' chiarito]
- [quale errore andra' chiarito]
- [quale campo dati andra' deciso]
