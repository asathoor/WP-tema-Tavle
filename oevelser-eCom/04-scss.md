# Øvelse 4: SCSS og build-processen

**Mål:** Forstå, hvad der sker fra SCSS-kildekode til den CSS, browseren får.

**Forudsætninger:** Node.js installeret, og `npm install` er kørt i temamappen.

## Trin

1. Kør `npm start` i temamappen. Lad terminalen køre.
2. Åbn `src/scss/_variables.scss`, og ændr `$fokus-bredde` fra `3px` til `6px`. Gem.
3. Genindlæs en side i browseren, og tryk Tab et par gange. Kan du se forskel?
4. Åbn `build/index.css`. Find fokusreglen. Står variablen `$fokus-bredde` der, eller kun værdien?
5. Stop `npm start` (Ctrl+C), og kør `npm run build`. Åbn `build/index.css` igen. Hvad er forskellen fra før?
6. Prøv at skrive en CSS-regel direkte i `style.css`, og byg igen. Virker den? Find forklaringen i `functions.php`.
7. Sæt `$fokus-bredde` tilbage til `3px`.

## Refleksion

- Hvad er forskellen på en SCSS-variabel (`$fokus-bredde`) og en CSS-variabel (`var(--wp--preset--color--blue)`)? Hvornår bør man bruge hvilken?
- Hvorfor er CSS'en fra `npm start` ikke minificeret, mens den fra `npm run build` er det?
- Hvorfor må `style.css` i et WordPress-tema ikke minificeres?
