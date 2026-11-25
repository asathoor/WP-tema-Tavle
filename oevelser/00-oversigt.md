# Øvelser til temaet Tavle

Øvelserne bygger på WordPress-bloktemaet **Tavle** og kan laves i den viste rækkefølge. De første øvelser kræver kun en WordPress-installation med Tavle aktiveret. Fra øvelse 2 skal temaet kunne bygges med Node.js (`npm install` og `npm run build` i temamappen).

| Nr. | Øvelse                                  | Emner                                         | Niveau    |
|-----|-----------------------------------------|-----------------------------------------------|-----------|
| 1   | [Find stien](01-find-stien.md)          | theme.json, Site Editor, database vs. filer   | Begynder  |
| 2   | [Ny farve](02-ny-farve.md)              | Farvepalet, kontrast, WCAG, build             | Begynder  |
| 3   | [Ny skabelon](03-ny-skabelon.md)        | Skabelonhierarkiet, blokmarkup                | Begynder  |
| 4   | [SCSS](04-scss.md)                      | SCSS, build-processen, minificering           | Begynder  |
| 5   | [Nyt mønster](05-nyt-moenster.md)       | Patterns, PHP, filheadere                     | Øvet      |
| 6   | [Test tilgængeligheden](06-test-tilgaengelighed.md) | Tastaturnavigation, fokus, testværktøjer | Begynder |
| 7   | [Begræns bevidst](07-begraens-bevidst.md) | settings i theme.json, designsystemer       | Øvet      |
| 8   | [Webshop-header](08-webshop-header.md)  | WooCommerce, tilgængelighed, sidevægt         | Øvet      |

## Gode råd til alle øvelser

- **Redigér `docs/theme.jsonc`, ikke `theme.json`.** theme.json bliver genereret ved `npm run build` og overskrives hver gang.
- **Ændringer i Site Editoren gemmes i databasen,** ikke i temaets filer. Gemte ændringer har forrang for filerne. Ser en ændring i en fil ikke ud til at virke, så tjek, om skabelonen eller delen er tilpasset i Site Editoren, og nulstil den.
- **Slå udviklingstilstand til under arbejdet** ved at tilføje `define( 'WP_DEVELOPMENT_MODE', 'theme' );` i `wp-config.php`. Så læser WordPress temaets filer på ny ved hver sidevisning. Fjern linjen igen, før et site går i luften.
- **Test altid som besøgende,** dvs. i et privat vindue, hvor du ikke er logget ind. Adminbaren påvirker både udseende og målinger. Her kan du med fordel bruge en browser, som DuckDuckGo.
