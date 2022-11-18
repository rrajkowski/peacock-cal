
/**
 * Remove leading indentation from a string argument.
 *
 * @param str - A multiline string.
 */
 export function stripIndent(str: string) : string {
	const indent = (/^[ \t]+/gm.exec(str) || [''])[0].length;
	const regex = new RegExp(`^[ \\t]{0,${indent}}`, 'gm');
	return str.replace(regex, '');
}

 /* Generates a unique numeric length integer used for 'uid' */
 export function randomizer(length: number) : string {
	return Math.floor(Math.pow(10, length-1) + (Math.random() * 9 * Math.pow(10, length-1))).toString();
 }