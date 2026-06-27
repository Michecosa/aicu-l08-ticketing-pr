# Contratto Iniziale (Contract Sketch) - Create Ticket

## Prima Di Compilare

Un contratto iniziale (contract sketch) è una descrizione leggera di input, output e risposte attese.

Serve a rendere verificabile `create ticket` prima di chiedere codice all'AI.

Compila solo la superficie minima:

- cosa entra;
- cosa esce;
- cosa viene rifiutato;
- quale errore ti aspetti.

Non trasformarlo in una specifica API completa, uno schema di un database o un piano di una patch.

Quando compili, ogni esempio deve rispondere (almeno) a tre domande:

- perché questo input è valido o invalido?
- quale risposta mi aspetto?
- quale parte della issue o del fuori scope giustifica la scelta?

## Request

```txt
Serve creare ticket dal supporto.
```

## Boundary Map

| Superficie | Cosa riguarda | Nota |
| --- | --- | --- |
| UI | Il supporto compila titolo e descrizione del problema | Nessun campo generato visibile nel form di input |
| API / azione | Riceve title e description; restituisce id, status e createdAt | Il client non può impostare campi generati dal sistema |
| Dati | title e description arrivano dall'input; id, status, createdAt sono generati | Allegati, owner avanzato e area sono fuori scope nel primo slice |
| Verifica | 201 con id non nullo in caso di successo; 400 con campo e messaggio leggibile in caso di errore | Verificabile senza codice: basta leggere la risposta |

## Action

Per questo slice, `create ticket` significa:

```txt
Accettare title e description non vuoti forniti dal supporto,
generare id univoco, status "open" e createdAt,
restituire il ticket creato con i campi generati.
```

## Payload Valido

```json
{
  "title": "Impossibile accedere all'account",
  "description": "Dal 26 giugno non riesco a fare login. Il sistema mostra errore 403."
}
```

perché è valido:

- title è presente e non vuoto: soddisfa il requisito minimo del contratto
- description è presente e non vuota: soddisfa il requisito minimo del contratto
- nessun campo generato (id, status, createdAt) viene inviato dal client

## Risposta Attesa Di Successo

```txt
HTTP 201 Created
```

Campi attesi:

- `id` - generato dal sistema, non nullo
- `title` - confermato dall'input
- `description` - confermata dall'input
- `status` - generato con valore "open"
- `createdAt` - generato con timestamp di creazione

## Payload Invalido 1

```json
{
  "title": "",
  "description": "Dal 26 giugno non riesco a fare login. Il sistema mostra errore 403."
}
```

Motivo del rifiuto:

```txt
title è un campo obbligatorio e non può essere vuoto.
Un ticket senza titolo non è identificabile nè leggibile dal supporto.
Giustificazione: la issue richiede la creazione del ticket, che senza titolo è incompleta.
```

Risposta attesa:

```txt
HTTP 400 Bad Request
{ "error": "Il campo title è obbligatorio", "field": "title" }
```

## Payload Invalido 2

```json
{
  "title": "Problema di accesso",
  "description": ""
}
```

Motivo del rifiuto:

```txt
description è un campo obbligatorio e non può essere vuota.
Un ticket senza descrizione non permette al supporto di capire il problema.
Giustificazione: la issue richiede title e description non vuoti come requisito minimo.
```

Risposta attesa:

```txt
HTTP 400 Bad Request
{ "error": "Il campo description è obbligatorio", "field": "description" }
```

## Payload Invalido 3

```json
{
  "title": "Problema di accesso",
  "description": "Non riesco a entrare nel sistema.",
  "status": "resolved"
}
```

Motivo del rifiuto:

```txt
status è un campo generato dal sistema, non accettato come input.
Il client non può impostare lo stato del ticket alla creazione.
Valore "resolved" è fuori contratto: lo status è sempre "open" alla creazione.
Giustificazione: accettare status come input violerebbe il controllo del ciclo di vita del ticket.
```

Risposta attesa:

```txt
HTTP 400 Bad Request
{ "error": "Il campo status non è accettato come input", "field": "status" }
```

## Error Model Minimo

| Caso | Motivo | Risposta attesa |
| --- | --- | --- |
| Campo richiesto mancante o vuoto | title o description assenti o stringhe vuote | 400 Bad Request con campo e messaggio leggibile |
| Valore fuori contratto | campo generato (es. status, id, createdAt) inviato come input | 400 Bad Request con indicazione del campo non accettato |
| Campo sconosciuto o non accettato | chiave non prevista dal contratto (es. priority) | 400 Bad Request con indicazione del campo non riconosciuto |

In caso di più campi invalidi simultaneamente, la risposta riporta solo il primo campo invalido trovato.

## Non-Goals Confermati

- Autenticazione e autorizzazione: rimandato, non nel primo slice
- Allegati: fuori scope esplicito
- Notifiche: fuori scope esplicito
- Owner avanzato: fuori scope esplicito
- Dashboard: fuori scope esplicito
- Area/categoria: rimandato, decisione non ancora presa
- Priority: mancante, nessuna fonte o insieme di valori definito
- Specifica API completa: non richiesta
