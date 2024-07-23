/**
 * @description Generate a slug for passed string
 * @param str
 */
export const generateSlug = (str: string, length = 120): string => {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // remove consecutive hyphens
    .substring(0, length); // trim to specified length if more
};

/**
 * Checks if an object data is empty and returns.
 * @param  {object} obj - The object to check.
 * @return {boolean} - The result.
 */
export const isEmptyObject = (obj: object): boolean => {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};
