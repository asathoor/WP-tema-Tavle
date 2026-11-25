<?php
/**
 * Title: To kolonner PETJ
 * Slug: tavle/kolonner
 * Categories: tavle
 * Description: To kolonner hvor du kan udskifte indholdet
 *
 * ============================================================================
 * MØNSTER (PATTERN)
 * ----------------------------------------------------------------------------
 * Filer i mappen /patterns registreres automatisk som mønstre.
 * Oplysningerne øverst læses af WordPress og SKAL stå først:
 *
 *   Title       = navnet i mønsterbiblioteket
 *   Slug        = unikt id, starter med temaets navn, fx tavle/kolonner
 *   Categories  = kategoriens slug (oprettes i functions.php)
 *   Description = kort forklaring til redaktøren
 *
 * Skriv ALDRIG et ord efterfulgt af kolon (fx "Slug:") i forklaringen her.
 * WordPress bruger den første linje, den finder, og så går mønstret i stykker.
 * ============================================================================
 */
?>
<!-- wp:heading -->
<h2 class="wp-block-heading">Overskrift</h2>
<!-- /wp:heading -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:paragraph -->
<p><?php esc_html_e( 'TEST TEST TEST', 'tavle' ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:paragraph -->
<p><?php esc_html_e( 'MERE MERE MERE', 'tavle' ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->