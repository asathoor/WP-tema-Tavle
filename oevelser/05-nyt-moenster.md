# Øvelse 5: Nyt mønster

**Mål:** Lave et genbrugeligt mønster (pattern), som redaktører kan indsætte i editoren.

**Forudsætninger:** WordPress med Tavle aktiveret. Slå gerne udviklingstilstand til (se oversigten), så nye mønstre vises med det samme.

## Baggrund

Filer i mappen `patterns/` registreres automatisk som mønstre. WordPress læser mønstrets oplysninger fra PHP-kommentaren øverst i filen og bruger **den første linje**, der matcher fx `Title:` eller `Slug:`. Står samme ord med kolon tidligere i filen, fx i en forklaring, går mønstret i stykker.

## Trin

1. Kopiér `patterns/intro.php` til `patterns/to-kolonner.php`.
2. Ret oplysningerne øverst, så de står **før** alle forklarende kommentarer:
   ```
   Title: To kolonner
   Slug: tavle/to-kolonner
   Categories: tavle
   Description: To kolonner med overskrift og tekst
   ```
3. Byg en sektion med to kolonner i editoren, hver med en overskrift og et afsnit. Kopiér markuppen fra *Kodeeditor* (⋮ → Kodeeditor) ind i din mønsterfil under PHP-blokken.
4. Gør teksterne oversættelige ved at erstatte dem med `<?php esc_html_e( 'Din tekst', 'tavle' ); ?>`.
5. Find mønstret i editorens indsætter under kategorien *Tavle*, og indsæt det på en side.
6. Lav din egen kategori: Tilføj `register_block_pattern_category( 'mine', array( 'label' => 'Mine mønstre' ) );` i functions.php, og flyt mønstret til den.

## Fejlfinding

Dukker mønstret ikke op, så tjek:

- Står `Title:`, `Slug:` osv. først i kommentaren?
- Indeholder slug'en kun små bogstaver, tal, bindestreger og skråstreg?
- Findes kategorien, og er den skrevet med små bogstaver?
- Er udviklingstilstand slået til, så WordPress ikke bruger en gammel cache?

## Refleksion

- Hvad er forskellen på et mønster og en template part?
- Hvad sker der med sider, hvor mønstret allerede er indsat, hvis du senere ændrer mønsterfilen?
- Hvorfor bruger man `esc_html_e()` i stedet for bare at skrive teksten?
