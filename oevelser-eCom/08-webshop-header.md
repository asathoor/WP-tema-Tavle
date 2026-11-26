# Øvelse 8: Gør headeren klar til en webshop

**Mål:** Tilføj en minikurv og et link til kundens konto i Tavles header, og vurdér, hvad det koster i tilgængelighed og sidevægt.

**Forudsætninger:** WooCommerce er installeret og aktiveret, og der er oprettet mindst tre produkter, hvoraf ét har varianter (fx størrelse).

## Del 1: Byg headeren

1. Mål først udgangspunktet. Åbn forsiden i et privat vindue, kør Lighthouse, og notér Performance-scoren. Åbn derefter fanen *Network* i DevTools, filtrér på *JS*, og notér, hvor mange kilobyte JavaScript siden henter.
2. Åbn **Udseende → Editor → Mønstre → Header**.
3. Tilføj blokkene **Mini-Cart** og **Customer Account**. Overvej, hvor de bør placeres i forhold til menuen.
4. Skift til *Kodeeditor* (⋮ → Kodeeditor), og find de nye blokke i markuppen. Hvad hedder de, og hvilke indstillinger står der i deres JSON?
5. Kopiér den færdige markup over i `parts/header.html`, så ændringen ligger i temaet og ikke kun i databasen. Nulstil derefter headeren i Site Editoren, og kontrollér, at den stadig ser rigtig ud. Nu kommer den fra filen.

## Del 2: Test tilgængeligheden

6. Navigér til minikurven med Tab-tasten. Kan du åbne den med Enter? Bliver fokus inde i kurven, mens den er åben? Kan du lukke den med Esc, og vender fokus så tilbage til kurv-knappen?
7. Vises Customer Account kun som et ikon? Undersøg i DevTools, om linket har et tilgængeligt navn, som en skærmlæser kan læse op. Hvis ikke, så find indstillingen, der viser tekst ved siden af ikonet.
8. Er kurv og konto mindst 24 × 24 px? Mål i DevTools.
9. Har du lagt dark mode ind i Tavle, så åbn minikurven i mørk tilstand. Følger alle farver med?

## Del 3: Mål prisen

10. Gentag målingerne fra trin 1. Hvor meget mere JavaScript henter siden nu, og hvad er sket med Performance-scoren?

## Refleksion

- Hører kurv og konto til *inde i* navigationen eller *ved siden af* den? Begrund dit valg ud fra semantik og skærmlæserbrugere.
- Er minikurven værd at have på hver side, eller er et almindeligt link til kurven godt nok? Hvilke argumenter er der ud fra brugeroplevelse, tilgængelighed og bæredygtighed?
- Webshops, der sælger til forbrugere, er omfattet af tilgængelighedsloven. Hvilke af dine fund i Del 2 ville skulle rettes, før butikken måtte gå i luften?

## Ekstraopgave: En særskilt shop-header

Lav en ny template part, `parts/header-shop.html`, med kurv og konto, og behold den oprindelige header uden. Registrér den under `templateParts` i `docs/theme.jsonc`, og kør `npm run build`. Overskriv derefter WooCommerces produktskabelon ved at oprette `templates/single-product.html`, som bruger den nye header. Hvordan påvirker det sidevægten på sider uden for butikken?
