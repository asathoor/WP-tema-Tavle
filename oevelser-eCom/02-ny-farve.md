# Øvelse 2: Ny farve

**Mål:** Udvide farvepaletten og forstå, hvordan kontrast måles og kontrolleres automatisk.

**Forudsætninger:** Node.js installeret, og `npm install` er kørt i temamappen.

## Baggrund

Tavles palet er bygget efter reglen: *Enhver mørk farve på enhver lys farve skal have en kontrast på mindst 4,5:1* (WCAG 2.1 AA). Kommandoen `npm run build` kører scriptet `scripts/check-contrast.mjs`, som måler alle kombinationer og stopper, hvis én fejler.

## Trin

1. Åbn `docs/theme.jsonc`, og find `"palette"`. Tilføj en ny mørk farve efter samme mønster som de andre, med `slug`, `name` og `color`. Husk kommaet efter den forrige farve.
2. Kør `npm run build`. Godkender kontrastkontrollen din farve? Kig på tabellen i terminalen.
3. Skift farven ud med en klar gul, fx `#e0b000`, og kør `npm run build` igen. Hvad sker der? Læs fejlbeskeden.
4. Kontrollér scriptets resultat for gul på hvid med [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). Får du det samme tal?
5. Find en farve i samme farvetone, der består. Hvor mørk skal den være?
6. Åbn editoren, og brug den nye farve som tekstfarve i et afsnit. Hvad hedder den CSS-klasse og CSS-variabel, WordPress har lavet ud fra din slug? (Tip: Inspicér afsnittet i DevTools.)

## Hvis temaet har dark mode

7. Tilføj også en mørk-tilstand-udgave af farven under `"custom"` → `"dark"` med samme slug, og tilføj slug'en til listen `$farver` i `src/scss/main.scss`. Kør `npm run build`, og test i mørk tilstand. Hvilken kontrast skal den mørke udgave have, og mod hvilke farver?

## Refleksion

- Hvorfor kan en enkelt farve ikke "opfylde" et kontrastkrav?
- Hvorfor er gul så svær at bruge som tekstfarve på lys baggrund?
- Hvad er fordelen ved at kontrollere kontrast automatisk i build-processen frem for manuelt?
