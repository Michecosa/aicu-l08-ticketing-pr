# Istruzioni L08 - Patch Parziale E Reviewabile

## Obiettivo

Avviare una PR o branch parziale per `create ticket`, usando il brief preparato in L07.

Il risultato atteso non e' una feature completa. Il risultato atteso e' un primo slice piccolo, leggibile e verificabile.

Task:

```txt
Serve creare ticket dal supporto.
```

In questa repo `dal supporto` significa sorgente/canale della richiesta, non utente autenticato.

## Input Necessari

Prima di autorizzare qualsiasi patch, controlla di avere:

```txt
lavoro-precedente/issue-create-ticket.md
lavoro-precedente/contract-sketch-create-ticket.md
lavoro-precedente/data-sketch-create-ticket.md
output/entry-point-map.md
output/prompt-patch-limitato.md
output/reviewer-leggero.md
```

Se vuoi tenere tutti gli input del lab nello stesso posto, puoi copiare gli output L07 anche in `lavoro-precedente/`.

## File Da Compilare

Usa i template:

```txt
template/manual-test-plan.md
template/handoff-pr-description.md
template/review-note.md
```

Salva gli output finali in:

```txt
output/manual-test-plan.md
output/handoff-pr-description.md
output/review-note.md
```

## Cosa Fare

1. Apri o prepara un branch dedicato.
2. Controlla coerenza tra issue, contract, data sketch e mappa L07.
3. Chiedi al tool un piano breve prima della patch.
4. Riduci il piano al primo slice approvato.
5. Fai ripetere al tool task, file ammessi, file vietati, verifica e stop condition.
6. Autorizza solo la patch minima.
7. Leggi il diff e controlla che tocchi solo file ammessi.
8. Esegui verifica manuale o dichiara un blocco concreto.
9. Compila `manual-test-plan.md`.
10. Compila `handoff-pr-description.md`.
11. Usa `reviewer-leggero.md` per controllare file, contract, diff e verifica.
12. Compila `review-note.md`.

## Default Di Slice

Default didattico:

```txt
backend skeleton minimo per create ticket da richiesta supporto, senza auth
```

Se scegli uno slice diverso, deve essere piu' piccolo di una feature full-stack e deve rispettare i file ammessi in L07.

## Verifica Manuale Minima

Controlli minimi:

```txt
GET http://127.0.0.1:3001/api/tickets
POST http://127.0.0.1:3001/api/tickets
```

Atteso dopo la patch:

- `GET /api/tickets` continua a restituire ticket aperti;
- `POST /api/tickets` accetta un payload minimo valido;
- `POST /api/tickets` rifiuta titolo vuoto o priorita' non ammessa;
- nessuna modifica a auth, dashboard, notifiche, allegati o migration.

## Regole

- PR o branch parziale, non feature completa.
- Diff piccolo.
- Nessuna patch prima del gate umano.
- Nessun file fuori scope senza fermarsi.
- Nessuna UI completa.
- Nessuna auth.
- Nessun reporter autenticato obbligatorio.
- Nessun allegato.
- Nessuna notifica.
- Nessun owner avanzato.
- Nessuna dashboard.
- Nessuna migration.
- Nessun refactor generale.

## Pronto Quando

Hai finito L08 quando puoi rispondere:

```txt
Che cosa ho tentato?
Che cosa ho modificato?
Che cosa ho verificato?
Cosa ho lasciato fuori?
Cosa serve per riprendere in L09?
```
