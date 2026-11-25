# Øvelse 1: Find stien

**Mål:** Forstå sammenhængen mellem theme.json, Site Editoren og databasen.

**Forudsætninger:** WordPress med Tavle aktiveret.

## Trin

1. Åbn `docs/theme.jsonc`, og find den linje, der gør links understregede. Læs kommentaren ved den. Hvilket WCAG-succeskriterie henviser den til, og hvorfor?
2. Åbn **Udseende → Editor → Stilarter → Typografi → Links**, og fjern understregningen. Gem.
3. Se en side med links i et privat vindue. Er understregningen væk?
4. Åbn `theme.json` i temamappen. Står understregningen der stadig?
5. Eksportér temaet fra Site Editoren (⋮ → Eksportér), pak zip-filen ud, og åbn den eksporterede theme.json. Hvad står der nu ved links?
6. Nulstil stilarterne i Site Editoren, så temaets standard gælder igen.

## Refleksion

- Hvor blev din ændring i trin 2 gemt, siden theme.json i temamappen ikke ændrede sig?
- Hvad sker der, hvis en udvikler ændrer theme.json, efter at en redaktør har gemt egne stilarter i Site Editoren? Hvem "vinder"?
- Var det en god idé at fjerne understregningen? Hvad kræver WCAG 1.4.1 af links i brødtekst?
