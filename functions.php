<?php
/**
 * ============================================================================
 * FUNCTIONS.PHP – temaets PHP-kode
 * ----------------------------------------------------------------------------
 * Et bloktema behøver faktisk ikke en functions.php. Al layout og styling
 * ligger i theme.json og HTML-skabelonerne.
 *
 * Vi bruger den her til:
 *   1. Indlæse den byggede CSS (build/index.css) på hjemmesiden
 *   2. Indlæse den samme CSS i editoren, så det ser ens ud begge steder
 *   3. Oprette en mønsterkategori til temaets egne mønstre (patterns)
 *
 * Desuden viser den en advarsel i kontrolpanelet, hvis temaet ikke er bygget.
 *
 * Al kode er pakket ind i funktioner, som "hægtes på" WordPress via
 * add_action(). Det betyder: "Når WordPress når til dette punkt, så kør
 * min funktion."
 * ============================================================================
 */

// Sikkerhed: Stop, hvis filen åbnes direkte i browseren i stedet for
// at blive indlæst af WordPress.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 1. Indlæs temaets CSS på hjemmesiden.
 *
 * CSS'en skrives i src/scss/main.scss og bygges med "npm run build" til:
 *   build/index.css        – den færdige CSS
 *   build/index.asset.php  – en lille PHP-fil, som wp-scripts laver automatisk.
 *                            Den indeholder bl.a. en "version", der ændres,
 *                            hver gang koden ændres.
 *
 * Versionen sættes på filens adresse (index.css?ver=...). Når den ændres,
 * henter browseren den nye fil i stedet for en gammel kopi fra cachen.
 *
 * wp_enqueue_style( navn, adresse, afhængigheder, version )
 */
function tavle_enqueue_styles() {
	$asset_fil = get_theme_file_path( 'build/index.asset.php' );

	// Er temaet ikke bygget endnu, gør vi ingenting (se tavle_build_notice).
	if ( ! file_exists( $asset_fil ) ) {
		return;
	}

	// "require" kører PHP-filen og giver os det array, den returnerer.
	$asset = require $asset_fil;

	wp_enqueue_style(
		'tavle-style',
		get_theme_file_uri( 'build/index.css' ),
		array(),
		$asset['version']
	);

	/*
	 * Skal temaet senere bruge JavaScript på hjemmesiden, indlæses det sådan:
	 *
	 * wp_enqueue_script(
	 *     'tavle-script',
	 *     get_theme_file_uri( 'build/index.js' ),
	 *     $asset['dependencies'],
	 *     $asset['version'],
	 *     array( 'strategy' => 'defer' )
	 * );
	 *
	 * 'dependencies' er de WordPress-pakker, koden importerer – wp-scripts
	 * finder dem automatisk. 'defer' venter med at køre scriptet, til siden
	 * er indlæst, så det ikke forsinker visningen.
	 */
}
add_action( 'wp_enqueue_scripts', 'tavle_enqueue_styles' );

/**
 * 2. Indlæs den samme CSS i blok-editoren.
 *
 * add_editor_style() tager en sti relativ til temamappen.
 * 'after_setup_theme' kører tidligt, når temaet indlæses.
 */
function tavle_editor_styles() {
	add_editor_style( 'build/index.css' );
}
add_action( 'after_setup_theme', 'tavle_editor_styles' );

/**
 * Advarsel i kontrolpanelet, hvis temaet ikke er bygget.
 *
 * Mangler build-mappen, ser alt næsten normalt ud – men fokusrammer og
 * klikflader fra main.scss mangler. Derfor gør vi administratorer opmærksomme
 * på det.
 *
 * current_user_can( 'switch_themes' ) sikrer, at kun administratorer ser den.
 */
function tavle_build_notice() {
	if ( file_exists( get_theme_file_path( 'build/index.asset.php' ) ) || ! current_user_can( 'switch_themes' ) ) {
		return;
	}
	echo '<div class="notice notice-warning"><p>';
	echo esc_html__( 'Temaet Tavle er ikke bygget. Kør "npm install" og "npm run build" i temamappen.', 'tavle' );
	echo '</p></div>';
}
add_action( 'admin_notices', 'tavle_build_notice' );

/**
 * 3. Opret en kategori til temaets mønstre.
 *
 * Mønstre (patterns) er færdige blokkombinationer, redaktøren kan indsætte.
 * Filerne ligger i /patterns og registreres automatisk af WordPress.
 * Her giver vi dem bare deres egen kategori i mønsterbiblioteket.
 *
 * __() gør teksten oversættelig. 'tavle' er temaets Text Domain fra style.css.
 */
function tavle_pattern_categories() {
	register_block_pattern_category(
		'tavle',
		array( 'label' => __( 'Tavle', 'tavle' ) )
	);
}
add_action( 'init', 'tavle_pattern_categories' );
