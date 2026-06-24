// place files you want to import through the `$lib` alias in this folder.
/**
 * Returns the first 9 characters of a string, or empty string if not a string
 * @param {*} input
 * @returns {string}
 */
export function shortId(input) {
  if (typeof input !== "string") {
    return "";
  }
  return input.slice(0, 9);
}

/**
 * Parses an ISO date string into a Date object
 * @param {*} input
 * @returns {Date | null}
 */
export function parseDate(input) {
  if (typeof input !== "string") {
    return null;
  }
  const date = new Date(input);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date;
}