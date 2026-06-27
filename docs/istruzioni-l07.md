# Istruzioni L07 - Preparare Il Brief Tecnico

## Obiettivo

Preparare il pacchetto tecnico che userai in L08, senza avviare patch e senza modificare codice applicativo.

Task:

```txt
Serve creare ticket dal supporto.
```

In questa repo `dal supporto` significa sorgente/canale della richiesta, non utente autenticato.

## Input Necessari

Prima di iniziare, porta in `lavoro-precedente/`:

```txt
issue-create-ticket.md
contract-sketch-create-ticket.md
data-sketch-create-ticket.md
```

Se non hai completato L05-L06, usa i file in:

```txt
per-chi-non-ha-completato-l05-06/
```

Non copiare repo precedenti intere.

## File Da Compilare

Usa i template:

```txt
template/entry-point-map.md
template/prompt-patch-limitato.md
template/reviewer-leggero.md
```

Salva gli output finali in:

```txt
output/entry-point-map.md
output/prompt-patch-limitato.md
output/reviewer-leggero.md
```

## Cosa Fare

1. Rileggi issue L05, contract sketch L06 e data sketch L06.
2. Chiedi orientamento al tool, ma vieta modifiche ai file.
3. Tratta ogni file suggerito dal tool come ipotesi, non come prova.
4. Apri e leggi i file candidati nella repo.
5. Compila la mappa dei punti di intervento con evidenze brevi.
6. Distingui file ammessi, file dubbi e file vietati.
7. Scegli un primo slice piccolo per L08.
8. Scrivi il prompt patch limitato.
9. Scrivi il reviewer leggero.
10. Fermati: L07 non prevede patch.

## Regole

- Non scrivere codice.
- Non aprire PR.
- Non autorizzare patch.
- Non segnare un file come `ammesso` se non lo hai letto.
- Non aggiungere auth, allegati, notifiche, owner avanzato, dashboard, migration o refactor generale.
- Non trasformare il reviewer in un progettista di nuove feature.

## Output Atteso

Il pacchetto L07 e' buono quando:

- ogni file candidato ha evidenza;
- i file non letti restano `dubbio` o fuori scope;
- il prompt patch contiene task, scope, file ammessi, file vietati, verifica e stop condition;
- il reviewer controlla solo scope, contract, diff e verifica;
- L08 puo' partire senza ridiscutere tutto.

## Pronto Quando

Hai finito L07 quando puoi rispondere:

```txt
Quali file ho letto davvero?
Che evidenza ho trovato?
Cosa posso toccare nel primo slice?
Cosa non devo toccare ora?
Quale prompt patch usero' in L08?
Che cosa controlla il reviewer sul diff?
```
