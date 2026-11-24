<?php
/**
 * ============================================================================
 * MØNSTER (PATTERN): Introsektion
 * ----------------------------------------------------------------------------
 * Filer i mappen /patterns registreres automatisk som mønstre.
 * WordPress læser oplysningerne i kommentaren herunder:
 *
 * Title:       Navnet i mønsterbiblioteket
 * Slug:        Unikt id. Skal starte med temaets navn.
 * Categories:  Kategorien, oprettet i functions.php
 * Description: Kort forklaring til redaktøren
 *
 * Under PHP-blokken følger almindelig blokmarkup – præcis som i en skabelon.
 * Fordi filen er PHP, kan man bruge esc_html_e() til at gøre teksterne
 * oversættelige og sikre.
 *
 * Farvevalg: Lysegul baggrund med næsten sort tekst = 15,3:1.
 * Knappen bruger temaets standard (hvid på blå = 6,3:1).
 * ============================================================================
 *
 * Title: Introsektion
 * Slug: tavle/intro
 * Categories: tavle
 * Description: En fremhævet sektion med overskrift, tekst og knap.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"yellow-light","textColor":"contrast","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-contrast-color has-yellow-light-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)"><!-- wp:heading -->
<h2 class="wp-block-heading"><?php esc_html_e( 'Velkommen til forløbet', 'tavle' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Her kan du skrive en kort introduktion. Udskift teksten og knappens link, så de passer til dit indhold.', 'tavle' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#"><?php esc_html_e( 'Kom i gang', 'tavle' ); ?></a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->
