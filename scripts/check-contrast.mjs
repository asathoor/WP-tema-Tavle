/**
 * ============================================================================
 * scripts/check-contrast.mjs
 * ----------------------------------------------------------------------------
 * Kontrollerer, at temaets farvepalet opfylder WCAG 2.1 niveau AA.
 *
 * Paletten er bygget efter én regel:
 *   Enhver MØRK farve på enhver LYS farve skal have en kontrast på mindst 4,5:1.
 *
 * Scriptet læser paletten i theme.json, deler farverne i lyse og mørke ud fra
 * deres lysstyrke og måler alle kombinationer. Er bare én kombination under
 * kravet, stopper "npm run build" med en fejl. Så opdager man det med det
 * samme, hvis man tilføjer en farve, der ikke passer ind.
 *
 * Kør:  npm run check:contrast
 *
 * Formlerne er de officielle fra WCAG:
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 * ============================================================================
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const rod = join( dirname( fileURLToPath( import.meta.url ) ), '..' );

// Kravet for almindelig tekst i WCAG 2.1 AA (succeskriterie 1.4.3).
const KRAV = 4.5;

// Farver med en relativ lysstyrke over denne grænse regnes som "lyse".
const LYS_GRAENSE = 0.5;

/**
 * Relativ lysstyrke (0 = sort, 1 = hvid) for en hex-farve som "#1a5fb4".
 *
 * @param {string} hex Farve i formatet #rrggbb eller #rgb.
 * @return {number} Lysstyrke mellem 0 og 1.
 */
function lysstyrke( hex ) {
	let h = hex.replace( '#', '' );
	if ( h.length === 3 ) {
		// #abc → #aabbcc
		h = h.split( '' ).map( ( c ) => c + c ).join( '' );
	}
	const [ r, g, b ] = [ 0, 2, 4 ].map( ( i ) => {
		const kanal = parseInt( h.slice( i, i + 2 ), 16 ) / 255;
		// Omregning fra skærmværdi til lineært lys (sRGB-gammakorrektion).
		return kanal <= 0.03928 ? kanal / 12.92 : ( ( kanal + 0.055 ) / 1.055 ) ** 2.4;
	} );
	// Øjet er mest følsomt for grøn og mindst for blå.
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Kontrastforholdet mellem to farver, fra 1 (ingen) til 21 (sort på hvid).
 *
 * @param {string} a Første farve.
 * @param {string} b Anden farve.
 * @return {number} Kontrastforhold.
 */
function kontrast( a, b ) {
	const [ lys, moerk ] = [ lysstyrke( a ), lysstyrke( b ) ].sort( ( x, y ) => y - x );
	return ( lys + 0.05 ) / ( moerk + 0.05 );
}

// --- Læs paletten -----------------------------------------------------------
const tema = JSON.parse( readFileSync( join( rod, 'theme.json' ), 'utf8' ) );
const palet = tema?.settings?.color?.palette ?? [];

// Kun hex-farver kan måles. Andre formater (fx rgb() eller var()) springes over.
const hexFarver = palet.filter( ( f ) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test( f.color ) );
const springetOver = palet.filter( ( f ) => ! hexFarver.includes( f ) );

const lyse = hexFarver.filter( ( f ) => lysstyrke( f.color ) > LYS_GRAENSE );
const moerke = hexFarver.filter( ( f ) => lysstyrke( f.color ) <= LYS_GRAENSE );

console.log( `Lyse farver:  ${ lyse.map( ( f ) => f.name ).join( ', ' ) }` );
console.log( `Mørke farver: ${ moerke.map( ( f ) => f.name ).join( ', ' ) }\n` );

// --- Mål alle kombinationer -------------------------------------------------
const fejl = [];
let laveste = Infinity;

for ( const m of moerke ) {
	for ( const l of lyse ) {
		const k = kontrast( m.color, l.color );
		laveste = Math.min( laveste, k );
		if ( k < KRAV ) {
			fejl.push( `${ m.name } (${ m.color }) på ${ l.name } (${ l.color }): ${ k.toFixed( 2 ) }:1` );
		}
	}
}

// console.table viser en tabel i terminalen – mørke farver som rækker.
const tabel = {};
for ( const m of moerke ) {
	tabel[ m.name ] = {};
	for ( const l of lyse ) {
		tabel[ m.name ][ l.name ] = kontrast( m.color, l.color ).toFixed( 1 );
	}
}
console.table( tabel );

if ( springetOver.length ) {
	console.warn( `⚠ Ikke målt (ikke hex): ${ springetOver.map( ( f ) => f.name ).join( ', ' ) }` );
}

if ( fejl.length ) {
	console.error( `\n✖ ${ fejl.length } kombination(er) under ${ KRAV }:1 (WCAG 2.1 AA):` );
	fejl.forEach( ( f ) => console.error( '  ' + f ) );
	process.exit( 1 );
}

console.log( `\n✔ Alle ${ moerke.length * lyse.length } kombinationer opfylder WCAG 2.1 AA. Laveste: ${ laveste.toFixed( 2 ) }:1` );
