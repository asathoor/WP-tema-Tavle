# Øvelse 6: Test tilgængeligheden

**Mål:** Teste et site med tastaturet og automatiske værktøjer og forstå de vigtigste WCAG-krav til navigation.

**Forudsætninger:** WordPress med Tavle aktiveret, en menu med mindst tre punkter og nogle indlæg.

## Forberedelse på Mac

Safari tabber som standard kun mellem formularfelter. Slå det til under *Safari → Indstillinger → Avanceret → "Tryk på Tab for at fremhæve hvert emne på en webside"*, eller brug Chrome eller Firefox.

## Trin

1. Åbn forsiden i et privat vindue. Læg musen væk.
2. Tryk Tab én gang. Dukker et "Spring til indhold"-link op? Tryk Enter. Hvor havner fokus?
3. Genindlæs, og tab dig gennem hele siden. Notér rækkefølgen. Forventet rækkefølge i Tavle er:
   1. Spring til indhold
   2. Sitetitlen i headeren
   3. Menupunkterne
   4. Links i hovedindholdet
   5. Pagineringen
   6. Sitetitlen i footeren
4. Kunne du hele vejen se, hvor fokus var? Var der steder, hvor fokusrammen forsvandt?
5. Gå baglæns med Shift+Tab. Bliver du fanget nogen steder?
6. Kør siden igennem [WAVE](https://wave.webaim.org/extension/) eller axe DevTools. Hvilke fejl og advarsler finder de?
7. Zoom til 200 % og derefter 400 % (⌘+). Kan alt stadig læses og bruges uden vandret scroll?

## Refleksion

| WCAG       | Krav                               | Bestod? |
|------------|------------------------------------|---------|
| 2.1.1      | Alt kan nås med tastaturet         |         |
| 2.1.2      | Ingen tastaturfælder               |         |
| 2.4.1      | Mulighed for at springe over blokke |        |
| 2.4.3      | Logisk fokusrækkefølge             |         |
| 2.4.7      | Synligt fokus                      |         |
| 1.4.10     | Reflow ved 400 % zoom              |         |

- Hvilke fejl fandt de automatiske værktøjer, som du ikke selv opdagede, og omvendt?
- Hvorfor kan automatiske værktøjer kun finde en del af tilgængelighedsproblemerne?
