# Tavle – et undervisningstema til WordPress

Tavle er et bloktema (Full Site Editing) lavet til undervisning. Det er bygget efter tre principper:

1. **Så lidt restriktivt som muligt.** Alle kreative valgmuligheder i editoren er slået til, inklusive WordPress' egne standardfarver, gradienter, skygger, afstande og skriftstørrelser.
2. **Alle browserens standardskrifter kan vælges.** Både CSS' generiske skriftfamilier og de udbredte "web-sikre" skrifttyper.
3. **Farvepaletten opfylder WCAG 2.1 niveau AA**, som er det niveau, EU-reglerne om webtilgængelighed bygger på (via standarden EN 301 549).

Temaet kræver WordPress 6.6 eller nyere. Til udvikling bruges Node.js 20 eller nyere (se "Udvikling med Node.js").

---

## Installation

Pak `tavle.zip` ud, eller upload den direkte under **Udseende → Temaer → Tilføj nyt → Upload tema**. Aktivér temaet, og åbn **Udseende → Editor** for at se skabeloner og stilarter.

---

## Filerne i temaet

```
tavle/
├── style.css              Temaets "id-kort" (navn, version osv.) – ingen CSS
├── functions.php          Indlæser build/index.css og opretter en mønsterkategori
├── theme.json             BYGGES fra docs/theme.jsonc – redigér ikke direkte
├── README.md              Denne fil
├── package.json           Node.js-opsætning: pakker og npm-kommandoer
├── .nvmrc                 Hvilken Node.js-version projektet bruger
├── .gitignore             Filer, Git skal ignorere (fx node_modules)
├── docs/
│   └── theme.jsonc        Temaets indstillinger MED kommentarer (redigér her)
├── src/                   Kildekode – det, du skriver
│   ├── index.js           Indgangen til build-processen
│   └── scss/
│       ├── _variables.scss  SCSS-variabler
│       └── main.scss        Temaets egen CSS
├── build/                 Færdigbygget kode – laves af "npm run build"
│   ├── index.css
│   └── index.asset.php
├── scripts/               Små Node.js-værktøjer til build
│   ├── build-theme-json.mjs   Laver theme.json ud fra docs/theme.jsonc
│   └── check-contrast.mjs     Tjekker paletten mod WCAG 2.1 AA
├── parts/                 Genbrugelige dele (template parts)
│   ├── header.html
│   └── footer.html
├── templates/             Skabeloner for de forskellige sidetyper
│   ├── index.html
│   ├── home.html
│   ├── archive.html
│   ├── search.html
│   ├── single.html
│   ├── page.html
│   ├── page-no-title.html
│   └── 404.html
└── patterns/              Færdige blokkombinationer (mønstre)
    └── intro.php
```
### Hvorfor er der ikke kommentarer i alle filer?

- **theme.json** er JSON, og JSON tillader ikke kommentarer. Hvis man skriver en kommentar i filen, kan WordPress ikke læse den, og hele temaets opsætning forsvinder. Derfor skrives indstillingerne i den fuldt kommenterede `docs/theme.jsonc`, og `npm run build` laver theme.json ud fra den. **Start med at læse docs/theme.jsonc.**
- **Skabelonerne (.html)** består af blokmarkup. En almindelig HTML-kommentar ville blive tolket som en "klassisk blok" og dukke op i Site Editoren. Skabelonerne forklares derfor herunder i stedet.
- **Alle andre filer** (style.css, functions.php, src/, scripts/ og patterns/intro.php) er kommenteret direkte i filerne.

---

## Udvikling med Node.js

Temaet bruger Node.js til at bygge sine filer. Det er den samme arbejdsgang, som bruges i WordPress' egne projekter.

### Kom i gang

1. Installér [Node.js](https://nodejs.org) version 20 eller nyere. Bruger du `nvm`, kan du skrive `nvm use` i temamappen, så vælges versionen fra `.nvmrc`.
2. Åbn en terminal i temamappen (`wp-content/themes/tavle`).
3. Kør `npm install`. Det henter de nødvendige pakker til mappen `node_modules`. Det tager et par minutter første gang.
4. Kør `npm run build`.

### Hvad sker der ved `npm run build`?

Kommandoen kører tre trin i rækkefølge. Fejler et trin, stopper resten.

1. **`build:theme-json`** – fjerner kommentarerne fra `docs/theme.jsonc` og gemmer resultatet som `theme.json`.
2. **`check:contrast`** – måler alle kombinationer af lyse og mørke farver i paletten. Er én under 4,5:1, stopper build med en fejl, der viser hvilke farver det drejer sig om.
3. **`build:assets`** – bruger [`@wordpress/scripts`](https://www.npmjs.com/package/@wordpress/scripts) til at oversætte SCSS til CSS og minificere JavaScript. Resultatet havner i `build/`.

### Alle kommandoer

| Kommando                    | Hvad den gør                                                        |
|-----------------------------|---------------------------------------------------------------------|
| `npm run build`             | Bygger alt til brug på et rigtigt site                              |
| `npm start`                 | Bygger CSS/JS løbende, hver gang du gemmer en fil i `src/`          |
| `npm run watch:theme-json`  | Bygger theme.json løbende, hver gang du gemmer `docs/theme.jsonc`   |
| `npm run check:contrast`    | Kontrollerer kun farvepaletten                                      |
| `npm run lint:css`          | Tjekker SCSS for fejl og WordPress' kodestandard                    |
| `npm run lint:js`           | Tjekker JavaScript for fejl og WordPress' kodestandard              |
| `npm run format`            | Formaterer koden automatisk efter WordPress' kodestandard           |
| `npm run zip`               | Bygger og pakker temaet i en zip-fil, klar til upload               |

Under udvikling kan man køre `npm start` og `npm run watch:theme-json` i hver sin terminal.

### Hvad skal med, når temaet uploades?

Udviklingsfilerne skal ikke med på et live site. Det gælder især `node_modules`, som fylder flere hundrede MB. `npm run zip` pakker derfor kun de filer og mapper, der står under `"files"` i `package.json`: den byggede kode, skabelonerne, `docs/` (så forklaringerne følger med) og temaets PHP-, CSS- og JSON-filer. `src/`, `scripts/` og `package.json` udelades.

Skal de studerende kunne bygge temaet selv, skal de have hele mappen, fx fra et Git-repository eller den oprindelige zip-fil.

### Om build-mappen

`build/` følger med færdigbygget, så temaet virker uden at køre npm først. Kører du `npm run build`, slettes mappen og laves forfra. Redigér aldrig filerne i `build/` direkte – ændringerne forsvinder ved næste build. Mangler `build/`, viser kontrolpanelet en advarsel.

### SCSS eller CSS?

`src/scss/main.scss` er skrevet i SCSS, en udvidelse af CSS med variabler (`$fokus-bredde`), nesting og opdeling i flere filer. Al almindelig CSS er også gyldig SCSS, så man kan begynde med ren CSS og tage SCSS-funktionerne i brug efterhånden.

---

## Sådan læses blokmarkup

Skabelonerne er skrevet i det samme format, som editoren gemmer:

```html
<!-- wp:paragraph -->
<p>Et afsnit</p>
<!-- /wp:paragraph -->
```

- `<!-- wp:paragraph -->` starter en blok. `wp:paragraph` er blokken "core/paragraph".
- Indstillinger står som JSON i starten: `<!-- wp:heading {"level":1} -->`.
- Blokke, der henter indhold fra databasen (titel, dato, menu ...), er "dynamiske" og lukker sig selv: `<!-- wp:post-title /-->`.

---

## Skabelonhierarkiet

Når nogen besøger en side, vælger WordPress den mest specifikke skabelon, der findes. Findes den ikke, går den et trin ned. `index.html` er det sidste sikkerhedsnet og **skal** findes i alle bloktemaer.

| Besøger                         | WordPress leder efter (i rækkefølge)            |
|---------------------------------|-------------------------------------------------|
| Indlægsoversigten               | `home.html` → `index.html`                      |
| Et indlæg                       | `single.html` → `index.html`                    |
| En side                         | `page.html` → `index.html`                      |
| Kategori, tag, forfatter, dato  | `archive.html` → `index.html`                   |
| Søgeresultater                  | `search.html` → `index.html`                    |
| En adresse, der ikke findes     | `404.html` → `index.html`                       |

(Hierarkiet har flere trin end vist her, fx `category.html` før `archive.html`.)

### De enkelte skabeloner

- **index.html** – Fallback. Viser en liste over indhold med overskriften "Indhold".
- **home.html** – Indlægsoversigten, med h1 "Seneste indlæg".
- **archive.html** – Bruger blokken *Query Title*, som automatisk skriver fx "Kategori: Nyheder", og *Term Description*, som viser kategoriens beskrivelse.
- **search.html** – Viser "Søgeresultater for: …" og et søgefelt, så man kan søge igen.
- **single.html** – Et indlæg: titel, dato, kategori, fremhævet billede, indhold, links til forrige/næste indlæg og kommentarer.
- **page.html** – En side: titel, fremhævet billede og indhold.
- **page-no-title.html** – En *custom template*. Den er registreret i theme.json under `customTemplates` og kan vælges for den enkelte side i editorens sidepanel. Nyttig til forsider, hvor titlen står i selve indholdet.
- **404.html** – Når siden ikke findes.

Alle skabeloner har:

- **header og footer** via `<!-- wp:template-part {"slug":"header","tagName":"header"} /-->`. `slug` peger på filen i `/parts`, og `tagName` gør den til et `<header>`-element.
- **et `<main>`-element** (en gruppeblok med `"tagName":"main"`). Det giver skærmlæsere et landmark at hoppe til, og WordPress tilføjer automatisk et "Spring til indhold"-link, når det findes.
- **præcis én h1**, så sidens overskriftsstruktur er korrekt.

### Query Loop

Lister af indlæg laves med blokken *Query Loop* (`wp:query`). Indstillingen `"inherit":true` betyder: "Vis det, siden handler om". På en kategoriside er det kategoriens indlæg, på en søgeside er det søgeresultaterne. Inde i `wp:post-template` står det, der gentages for hvert indlæg.

---

## Farvepaletten og tilgængelighed

### Kravet

WCAG 2.1 AA kræver en kontrast på mindst **4,5:1** mellem almindelig tekst og baggrund, og mindst **3:1** for stor tekst (fra ca. 24 px, eller ca. 19 px fed) og for grafiske elementer som ikoner og feltkanter.

En enkelt farve kan ikke i sig selv "opfylde" kravet. Det er altid **kombinationen** af to farver, der måles. Derfor er paletten bygget i to grupper:

- **Lyse farver** (Hvid, Lyseblå, Lyserød, Lysegrøn, Lysegul, Lyselilla) – til baggrunde.
- **Mørke farver** (Næsten sort, Blå, Rød, Grøn, Lilla, Orange, Petrol, Grå) – til tekst, eller som baggrund med hvid tekst.

**Reglen er enkel: Enhver mørk farve på enhver lys farve – eller omvendt – opfylder AA.**

### Kontrasttabel

| Mørk ↓ / Lys → | Hvid | Lyseblå | Lyserød | Lysegrøn | Lysegul | Lyselilla |
|---|---|---|---|---|---|---|
| Næsten sort `#1c1c1e` | 17.0:1 | 14.6:1 | 14.5:1 | 14.9:1 | 15.3:1 | 14.4:1 |
| Blå `#1a5fb4` | 6.3:1 | 5.4:1 | 5.4:1 | 5.5:1 | 5.7:1 | 5.3:1 |
| Rød `#b3261e` | 6.5:1 | 5.6:1 | 5.6:1 | 5.7:1 | 5.9:1 | 5.5:1 |
| Grøn `#1d7a3a` | 5.4:1 | 4.6:1 | 4.6:1 | 4.7:1 | 4.9:1 | 4.6:1 |
| Lilla `#6c3fa3` | 7.3:1 | 6.3:1 | 6.2:1 | 6.4:1 | 6.6:1 | 6.2:1 |
| Orange `#a64b00` | 5.8:1 | 5.0:1 | 4.9:1 | 5.1:1 | 5.2:1 | 4.9:1 |
| Petrol `#006b75` | 6.3:1 | 5.4:1 | 5.3:1 | 5.5:1 | 5.6:1 | 5.3:1 |
| Grå `#595959` | 7.0:1 | 6.0:1 | 6.0:1 | 6.1:1 | 6.3:1 | 5.9:1 |

Den laveste værdi i tabellen er 4,6:1 (Grøn på Lyseblå), så alle kombinationer ligger over kravet.

### Kombinationer, der IKKE virker

- Mørk på mørk (fx Blå tekst på Rød baggrund).
- Lys på lys (fx Lysegul tekst på Hvid).

### Hvad temaet ikke kan garantere

Fordi temaet er så åbent som muligt, kan redaktøren stadig vælge kombinationer, der ikke opfylder kravet:

- **WordPress' standardpalet** (vist under "Standard" i farvevælgeren) er ikke afstemt efter kontrastkrav. Fx har lyse farver som "Luminous vivid amber" meget lav kontrast mod hvid.
- **Egne farver** kan vælges frit.
- **Gradienter og baggrundsbilleder** kan give lav kontrast enkelte steder bag teksten.

Editoren viser en advarsel ("Denne farvekombination kan være svær at læse"), når en blok får for lav kontrast mellem tekst og baggrund. **Tag den advarsel alvorligt.**

Ønsker man at fjerne WordPress' standardfarver, så kun den tilgængelige palet er tilbage, ændres `"defaultPalette": true` til `false` i docs/theme.jsonc, hvorefter man kører `npm run build`.

### Andet, temaet gør for tilgængeligheden

- Links er understregede, så de ikke kun kendes på farven (WCAG 1.4.1).
- Tydelig fokusramme ved tastaturnavigation (WCAG 2.4.7) – se src/scss/main.scss.
- Menupunkter er mindst 24 × 24 px (WCAG 2.5.8) – se src/scss/main.scss.
- `npm run build` stopper, hvis en farve i paletten bryder kontrastreglen.
- Linjehøjde 1,6 i brødtekst.
- Skrift i rem, så den skalerer, når brugeren zoomer eller ændrer browserens skriftstørrelse.

---

## Skrifttyperne

Alle skrifttyper i temaet bruger skrifter, der allerede findes i browseren eller på computeren. Der hentes intet fra internettet.

**CSS' generiske familier** – browseren vælger selv den konkrete skrift: `system-ui`, `sans-serif`, `serif`, `monospace`, `cursive`, `fantasy`, `ui-sans-serif`, `ui-serif`, `ui-monospace`, `ui-rounded`, `math`, `emoji` og `fangsong`.

- `cursive` og `fantasy` ser meget forskellige ud fra browser til browser.
- `ui-serif`, `ui-rounded` m.fl. understøttes især af Safari. Andre browsere bruger fallback-skriften efter kommaet.

**Web-sikre skrifttyper** – installeret på de fleste computere: Arial, Helvetica, Verdana, Tahoma, Trebuchet MS, Georgia, Times New Roman, Palatino, Garamond, Courier New, Comic Sans MS, Impact og Brush Script MT.

- Ikke alle findes på alle enheder (fx mangler mange af dem på Android og Linux). Derfor har hver skrift en kæde af fallbacks, der altid ender i en generisk familie.

Flere skrifter kan tilføjes i editorens **skrifttypebibliotek** (Stilarter → Typografi → Administrér skrifttyper), som ikke er slået fra.

**Tilgængelighedstip:** Comic Sans MS, Brush Script MT, Impact og `fantasy` er sjove at eksperimentere med, men dårlige til længere brødtekst. Brug dem til overskrifter eller korte tekster.

---

## Øvelser

1. **Find stien:** Læs `docs/theme.jsonc`. Find den linje, der gør links understregede. Fjern understregningen i Site Editoren (Stilarter → Typografi → Links) og se, hvad der sker i theme.json-koden, når du eksporterer temaet.
2. **Ny farve:** Tilføj en ny farve til paletten i `docs/theme.jsonc`, og kør `npm run build`. Godkender kontrastkontrollen den? Prøv derefter med en klar gul (fx `#e0b000`) og se, hvordan build stopper. Kontrollér resultatet med fx WebAIM Contrast Checker.
3. **Ny skabelon:** Lav `templates/category.html`, så kategorisider ser anderledes ud end andre arkiver. Kontrollér, at WordPress bruger den.
4. **SCSS:** Kør `npm start`, og ændr `$fokus-bredde` i `src/scss/_variables.scss`. Genindlæs siden og tryk Tab. Kig derefter i `build/index.css` – hvad er der blevet af variablen?
5. **Nyt mønster:** Kopiér `patterns/intro.php`, giv den ny `Title` og `Slug`, og byg et mønster med to kolonner.
6. **Test tilgængeligheden:** Navigér gennem forsiden kun med Tab-tasten. Kan du altid se, hvor du er? Kør siden igennem WAVE eller axe DevTools.
7. **Begræns bevidst:** Sæt `"defaultPalette"` og `"custom"` til `false` under `settings.color` i docs/theme.jsonc, og kør `npm run build`. Hvad forsvinder fra farvevælgeren? Hvornår kunne det være en god idé?

---

## Licens

GNU General Public License v2 eller senere – samme licens som WordPress.
