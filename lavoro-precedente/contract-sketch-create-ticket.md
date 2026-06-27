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
| UI | Il supporto compila titolo, descrizione, cliente e seleziona priorità e area | I valori ammessi per priority e area sono fissi e definiti nel server |
| API / azione | Riceve title, description, customer, priority, area; restituisce id, status, source, createdAt, updatedAt | Il client non può impostare campi generati dal sistema |
| Dati | title, description, customer, priority, area arrivano dall'input; id, status, source, createdAt, updatedAt sono generati | priority accetta solo: Alta, Media, Bassa; area accetta solo: Billing, Accessi, Comunicazioni, Tecnico |
| Verifica | 201 con id non nullo in caso di successo; 400 con campo e messaggio leggibile in caso di errore | Verificabile senza codice: basta leggere la risposta |

## Action

Per questo slice, `create ticket` significa:

```txt
Accettare title, description, customer, priority e area forniti dal supporto,
validare che priority sia uno tra: Alta, Media, Bassa,
validare che area sia una tra: Billing, Accessi, Comunicazioni, Tecnico,
generare id univoco, status "open", source "support", createdAt e updatedAt,
restituire il ticket creato con i campi generati.
```

## Payload Valido

```json
{
  "title": "Impossibile accedere all'account",
  "description": "Dal 26 giugno non riesco a fare login. Il sistema mostra errore 403.",
  "customer": "Studio Verdi",
  "priority": "Alta",
  "area": "Accessi"
}
```

perché è valido:

- title è presente e non vuoto: soddisfa il requisito minimo del contratto
- description è presente e non vuota: soddisfa il requisito minimo del contratto
- customer è presente e non vuoto: identifica il cliente richiedente
- priority è "Alta": valore incluso in allowedPriorities
- area è "Accessi": valore incluso in allowedAreas
- nessun campo generato (id, status, source, createdAt, updatedAt) viene inviato dal client

## Risposta Attesa Di Successo

```txt
HTTP 201 Created
```

Campi attesi:

- `id` - generato dal sistema, non nullo
- `title` - confermato dall'input
- `description` - confermata dall'input
- `customer` - confermato dall'input
- `priority` - confermata dall'input
- `area` - confermata dall'input
- `status` - generato con valore "open"
- `source` - generato con valore "support"
- `createdAt` - generato con timestamp di creazione
- `updatedAt` - generato, uguale a createdAt alla creazione

## Payload Invalido 1

```json
{
  "title": "Problema di accesso",
  "description": "Non riesco a entrare nel sistema.",
  "customer": "Studio Verdi",
  "priority": "Critica",
  "area": "Accessi"
}
```

Motivo del rifiuto:

```txt
priority "Critica" non è tra i valori ammessi (Alta, Media, Bassa).
I valori ammessi sono definiti in allowedPriorities nel server.
Giustificazione: accettare un valore non censito renderebbe i ticket non ordinabili per priorità.
```

Risposta attesa:

```txt
HTTP 400 Bad Request
{ "error": "Valore priority non valido. Valori ammessi: Alta, Media, Bassa", "field": "priority" }
```

## Payload Invalido 2

```json
{
  "title": "Problema di accesso",
  "description": "Non riesco a entrare nel sistema.",
  "customer": "Studio Verdi",
  "priority": "Alta",
  "area": "Sconosciuta"
}
```

Motivo del rifiuto:

```txt
area "Sconosciuta" non è tra i valori ammessi (Billing, Accessi, Comunicazioni, Tecnico).
I valori ammessi sono definiti in allowedAreas nel server.
Giustificazione: accettare un'area non censita romperebbe i filtri e le categorie esistenti.
```

Risposta attesa:

```txt
HTTP 400 Bad Request
{ "error": "Valore area non valido. Valori ammessi: Billing, Accessi, Comunicazioni, Tecnico", "field": "area" }
```

## Error Model Minimo

| Caso | Motivo | Risposta attesa |
| --- | --- | --- |
| Campo richiesto mancante o vuoto | title, description, customer, priority o area assenti o stringhe vuote | 400 Bad Request con campo e messaggio leggibile |
| Valore priority non ammesso | priority non inclusa in allowedPriorities (Alta, Media, Bassa) | 400 Bad Request con indicazione dei valori ammessi |
| Valore area non ammessa | area non inclusa in allowedAreas (Billing, Accessi, Comunicazioni, Tecnico) | 400 Bad Request con indicazione dei valori ammessi |
| Campo generato inviato come input | campo generato (es. status, source, id, createdAt, updatedAt) inviato dal client | 400 Bad Request con indicazione del campo non accettato |

In caso di più campi invalidi simultaneamente, la risposta riporta solo il primo campo invalido trovato.

## Non-Goals Confermati

- Autenticazione e autorizzazione: rimandato, non nel primo slice
- Allegati: fuori scope esplicito
- Notifiche: fuori scope esplicito
- Owner avanzato: fuori scope esplicito
- Dashboard: fuori scope esplicito
- Specifica API completa: non richiesta
