/**
 * ============================================================================
 * src/index.js – indgangen til build-processen
 * ----------------------------------------------------------------------------
 * @wordpress/scripts (wp-scripts) bygger alt, der importeres herfra.
 * Når man kører "npm run build", sker følgende:
 *
 *   src/index.js          →  build/index.js         (JavaScript, minificeret)
 *   src/scss/main.scss    →  build/index.css        (SCSS oversat til CSS)
 *                         →  build/index.asset.php  (version + afhængigheder)
 *
 * Temaet har i øjeblikket ikke brug for JavaScript på hjemmesiden.
 * Derfor indlæser functions.php KUN build/index.css – ikke build/index.js.
 * Mindre kode til browseren betyder hurtigere sider og mindre strømforbrug.
 *
 * Skal temaet senere bruge JavaScript, skrives det her, og functions.php
 * udvides med wp_enqueue_script() (se kommentaren dér).
 * ============================================================================
 */

// Import af SCSS: wp-scripts trækker CSS'en ud i en separat fil (build/index.css).
import './scss/main.scss';
