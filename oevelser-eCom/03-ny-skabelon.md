# Øvelse 3: Ny skabelon

**Mål:** Forstå WordPress' skabelonhierarki og skrive blokmarkup i hånden.

**Forudsætninger:** WordPress med Tavle aktiveret og nogle indlæg fordelt på mindst to kategorier.

## Baggrund

Når nogen besøger en kategoriside, leder WordPress efter skabeloner i denne rækkefølge: `category-{slug}.html` → `category-{id}.html` → `category.html` → `archive.html` → `index.html`. Den første, der findes, bruges. Tavle har kun `archive.html`, så den bruges i dag til alle arkiver.

## Trin

1. Kopiér `templates/archive.html` til `templates/category.html`.
2. Gør kategorisiderne anderledes end andre arkiver. Vis fx indlæggene i et gitter med tre kolonner ved at ændre post-template-blokken til:
   `<!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->`
3. Besøg en kategoriside og en tag-side. Bruger de hver sin skabelon?
4. Åbn **Udseende → Editor → Skabeloner**. Hvordan vises den nye skabelon dér?
5. Lav nu `templates/category-nyheder.html` (eller med slug'en på en af dine egne kategorier) med en anden overskrift eller et andet layout. Kontrollér, at netop den kategori får sin egen skabelon.

## Refleksion

- Hvorfor skal `index.html` altid findes i et bloktema?
- Hvad er fordelen og ulempen ved at lave en skabelon til én bestemt kategori via dens slug?
- Ændrer en redaktør kategorien i Site Editoren, gemmes ændringen i databasen. Hvad betyder det for dine senere ændringer i filen?
