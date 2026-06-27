# Contratto Iniziale (Contract Sketch) - Create Ticket

## Request

```txt
Serve creare ticket dal supporto.
```

## Boundary Map

| Superficie | Cosa riguarda | Nota |
| --- | --- | --- |
| UI | Non obbligatoria nel primo slice | UI completa fuori scope |
| API / azione | `POST /api/tickets` | Da verificare in L07 nella repo reale |
| Dati | Ticket creato da richiesta supporto | Campi tecnici generati dal server |
| Verifica | GET esistente e POST valido/invalido | Verifica manuale minima |

## Action

Per questo slice, `create ticket` significa:

```txt
creare un ticket aperto da una richiesta supporto, senza auth, senza allegati e senza persistenza database.
```

## Payload Valido

```json
{
  "title": "Errore nel download della fattura",
  "description": "Il cliente segnala errore 500 durante il download della fattura.",
  "customer": "Studio Verdi",
  "priority": "Alta",
  "area": "Billing"
}
```

Perche' e' valido:

- `title` e' presente e non vuoto.
- `priority` usa un valore previsto dal contratto iniziale.
- Non richiede auth, allegati, notifiche o owner avanzato.

## Risposta Attesa Di Successo

```txt
201 Created
```

Campi attesi:

- `id` generato dal server;
- `status: "open"` generato dal server;
- `source: "support"` generato dal server;
- `createdAt` e `updatedAt` generati dal server;
- campi accettati dal payload restituiti o conservati.

## Payload Invalido 1

```json
{
  "title": "",
  "description": "Il cliente segnala errore 500 durante il download della fattura.",
  "customer": "Studio Verdi",
  "priority": "Alta",
  "area": "Billing"
}
```

Motivo del rifiuto:

```txt
`title` e' richiesto e non puo' essere vuoto.
```

Risposta attesa:

```txt
400 Bad Request con errore leggibile sul campo `title`
```

## Payload Invalido 2

```json
{
  "title": "Errore nel download della fattura",
  "description": "Il cliente segnala errore 500 durante il download della fattura.",
  "customer": "Studio Verdi",
  "priority": "Urgente",
  "area": "Billing"
}
```

Motivo del rifiuto:

```txt
`priority` non e' tra i valori ammessi.
```

Risposta attesa:

```txt
400 Bad Request con errore leggibile sul campo `priority`
```

## Error Model Minimo

| Caso | Motivo | Risposta attesa |
| --- | --- | --- |
| `title` mancante o vuoto | Campo minimo per riconoscere il ticket | `400 Bad Request` con errore su `title` |
| `priority` fuori contratto | Evita valori non gestiti | `400 Bad Request` con errore su `priority` |

## Non-Goals Confermati

- Auth.
- Reporter autenticato obbligatorio.
- Owner avanzato.
- Allegati.
- Notifiche.
- Dashboard.
- Database o migration.
- UI completa.
- Refactor generale.
