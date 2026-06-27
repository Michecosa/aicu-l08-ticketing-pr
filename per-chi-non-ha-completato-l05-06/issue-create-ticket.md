# Issue: Create Ticket Dal Supporto

## Request

```txt
Serve creare ticket dal supporto.
```

## Fatti (Facts)

- La repo riguarda una piccola app ticketing.
- Il task chiede di creare ticket a partire da una richiesta arrivata dal supporto.
- L'obiettivo del percorso L07-L08 e' preparare e poi avviare un primo slice piccolo, non una feature completa.

## Assunzioni (Assumptions)

- `dal supporto` indica il canale o la sorgente della richiesta, non un utente autenticato.
- Per il primo slice basta creare un ticket con campi minimi e verificabili.
- Il sistema puo' generare valori tecnici come `id`, `status`, `source`, `createdAt` e `updatedAt`.

## Domande Aperte (Questions)

- Quali valori di `priority` e `area` sono gia' presenti o ammessi nella repo?
- Il campo `customer` e' obbligatorio nel primo slice o puo' restare opzionale?

## Decisione (Decision)

Per questo slice, "creare ticket" significa:

```txt
accettare una richiesta supporto minima, creare un ticket aperto e renderlo disponibile alla lista dei ticket aperti, senza auth e senza UI completa.
```

## Fuori Scope / Non-Obiettivi (Non-Goals)

- Auth.
- Reporter autenticato obbligatorio.
- Owner avanzato.
- Allegati.
- Notifiche.
- Dashboard.
- Database o migration.
- UI completa.
- Refactor generale.

## Criteri Di Accettazione (Acceptance Criteria)

1. Un payload valido crea un ticket con `status: "open"` e `source: "support"`.
2. Un payload con `title` vuoto viene rifiutato con errore leggibile.
3. Un payload con `priority` non ammessa viene rifiutato con errore leggibile.

## Piano Di Verifica Manuale (Manual Test Plan)

- Caso valido: inviare `POST /api/tickets` con titolo e priorita' ammessa; atteso ticket creato.
- Caso invalido: inviare `POST /api/tickets` con `title` vuoto; atteso errore leggibile.
- Regressione minima: chiamare `GET /api/tickets`; atteso elenco dei ticket aperti ancora funzionante.

## Note Per L06

- Chiarire payload minimo valido.
- Chiarire forma minima degli errori.
- Classificare quali campi arrivano dall'input e quali sono generati dal server.
