# Øvelse 7: Begræns bevidst

**Mål:** Forstå, hvordan `settings` i theme.json styrer redaktørens muligheder, og diskutere fordele og ulemper ved at begrænse dem.

**Forudsætninger:** Node.js installeret, og `npm install` er kørt i temamappen.

## Baggrund

Tavle er bygget til at være så lidt restriktivt som muligt. Alle valgmuligheder er slået til, også WordPress' egne standardfarver og helt frie farvevalg. Det giver frihed, men betyder også, at redaktører kan vælge farvekombinationer, der ikke opfylder kontrastkravene.

## Trin

1. Åbn en side i editoren, markér et afsnit, og åbn farvevælgeren. Notér, hvilke farvegrupper du kan vælge imellem.
2. Vælg en lysegul tekstfarve fra WordPress' standardpalet på hvid baggrund. Viser editoren en advarsel?
3. Åbn `docs/theme.jsonc`. Sæt `"defaultPalette"` og `"custom"` til `false` under `settings.color`. Kør `npm run build`.
4. Genindlæs editoren, og åbn farvevælgeren igen. Hvad er forsvundet?
5. Hvad sker der med afsnittet fra trin 2, som allerede har en standardfarve?
6. Prøv selv at begrænse andre ting, fx `"dropCap"` eller `"customFontSize"` under `settings.typography`. Hvad forsvinder fra editoren?
7. Sæt alle indstillinger tilbage til `true`, og byg igen.

## Refleksion

- Hvornår er det en god idé at begrænse redaktørens valg? Tænk fx på en kommune, en virksomhed med en designmanual eller et undervisningssite.
- Hvilken betydning har det for overholdelse af tilgængelighedsloven, hvis redaktører frit kan vælge farver?
- Hvad er et designsystem, og hvordan kan theme.json fungere som ét?
