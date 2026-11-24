/**
 * ============================================================================
 * scripts/build-theme-json.mjs
 * ----------------------------------------------------------------------------
 * Bygger theme.json ud fra den kommenterede docs/theme.jsonc.
 *
 * Hvorfor? JSON tillader ikke kommentarer, men til undervisning er
 * kommentarer guld værd. Derfor skriver vi i theme.jsonc (JSON med
 * kommentarer), og dette script fjerner kommentarerne og gemmer resultatet
 * som en gyldig theme.json, som WordPress kan læse.
 *
 * Kør:   npm run build:theme-json
 * Eller: npm run watch:theme-json   (bygger igen, hver gang filen gemmes)
 *
 * Scriptet bruger kun Node.js' indbyggede moduler – ingen pakker.
 * ".mjs" betyder, at filen er et ES-modul, så vi kan bruge "import".
 * ============================================================================
 */

import { readFileSync, writeFileSync, watch } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Find temaets rodmappe ud fra dette scripts placering (scripts/ → ..).
const rod = join( dirname( fileURLToPath( import.meta.url ) ), '..' );
const kilde = join( rod, 'docs', 'theme.jsonc' );
const maal = join( rod, 'theme.json' );

/**
 * Fjerner // og /* *\/ kommentarer fra en tekst.
 *
 * Vi går tegn for tegn igennem teksten og holder styr på, om vi er inde i
 * en tekststreng ("..."). Det er nødvendigt, fordi fx "https://..." indeholder
 * // uden at være en kommentar.
 *
 * @param {string} tekst JSON med kommentarer.
 * @return {string} JSON uden kommentarer.
 */
function fjernKommentarer( tekst ) {
	let resultat = '';
	let iStreng = false;

	for ( let i = 0; i < tekst.length; i++ ) {
		const tegn = tekst[ i ];
		const naeste = tekst[ i + 1 ];

		if ( iStreng ) {
			resultat += tegn;
			// \" inde i en streng afslutter den ikke – spring næste tegn over.
			if ( tegn === '\\' ) {
				resultat += naeste;
				i++;
			} else if ( tegn === '"' ) {
				iStreng = false;
			}
			continue;
		}

		if ( tegn === '"' ) {
			iStreng = true;
			resultat += tegn;
		} else if ( tegn === '/' && naeste === '/' ) {
			// Linjekommentar: spring frem til linjeskift.
			while ( i < tekst.length && tekst[ i ] !== '\n' ) {
				i++;
			}
			resultat += '\n';
		} else if ( tegn === '/' && naeste === '*' ) {
			// Blokkommentar: spring frem til */.
			i += 2;
			while ( i < tekst.length && ! ( tekst[ i ] === '*' && tekst[ i + 1 ] === '/' ) ) {
				i++;
			}
			i++;
		} else {
			resultat += tegn;
		}
	}
	return resultat;
}

/**
 * Læser theme.jsonc, fjerner kommentarer, tjekker at resultatet er gyldig
 * JSON og skriver theme.json.
 *
 * @return {boolean} true hvis det lykkedes.
 */
function byg() {
	try {
		const ren = fjernKommentarer( readFileSync( kilde, 'utf8' ) );

		// JSON.parse kaster en fejl, hvis der fx mangler et komma.
		const data = JSON.parse( ren );

		// Skriv pænt formateret med tabulatorer (WordPress' kodestandard).
		writeFileSync( maal, JSON.stringify( data, null, '\t' ) + '\n' );
		console.log( '✔ theme.json bygget fra docs/theme.jsonc' );
		return true;
	} catch ( fejl ) {
		console.error( '✖ Kunne ikke bygge theme.json:' );
		console.error( '  ' + fejl.message );
		console.error( '  Tjek docs/theme.jsonc for manglende kommaer eller anførselstegn.' );
		return false;
	}
}

// --watch: byg igen, hver gang theme.jsonc ændres.
if ( process.argv.includes( '--watch' ) ) {
	byg();
	console.log( '… holder øje med docs/theme.jsonc (stop med Ctrl+C)' );
	watch( kilde, () => byg() );
} else if ( ! byg() ) {
	// Afslut med fejlkode 1, så "npm run build" stopper her.
	process.exit( 1 );
}
