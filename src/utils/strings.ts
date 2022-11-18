
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