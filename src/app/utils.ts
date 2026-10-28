
// Split into thousands, e.g. prettifyNumber(1234) => "1 234"
// slightly overcomplicated maybe but was fun to do
export function prettify(num: number | string | undefined, index: number=-1, charsLeftThisBlock: number=3): string {
    if (num == undefined) return "";

    let numString = num.toString();
    const charToInsert = " ";
    if (index == -1) { // start of chain
        index = numString.length; // set index to be last pointing to after the last char
    }

    if (charsLeftThisBlock == 0){
        // src: https://www.geeksforgeeks.org/javascript/how-to-insert-a-string-at-a-specific-index-in-javascript/
        numString = numString.slice(0, index) + charToInsert + numString.slice(index)
        charsLeftThisBlock = 3 // reset "block" counter
    }

    if (index == 0) { // when we have reached the start of the string, return the grand result
        return numString;
    }
    return prettify(numString, index-1, charsLeftThisBlock-1);
    // prett(1234) -> prett("1234", 3) -> prett("1234", 2) -> prett("1234", 1)
    // prett(12345) -> prett("12345", 4, 2) -> prett("12345", 3, 1) -> prett("12345", 2, 3) -> prett("12 345", 1, 2) -> prett("12 345", 0, 1) RETURN RESULT<--
}


// Src: https://dev.to/alexparra/js-seconds-to-hh-mm-ss-22o6
const SECONDS_PER_DAY = 86400;
const HOURS_PER_DAY = 24;

/**
 * Convert seconds to HH:MM:SS
 * If seconds exceeds 24 hours, hours will be greater than 24 (30:05:10)
 *
 * @param {number} seconds
 * @returns {string}
 */
export const secondsToHms = (seconds: number): string => {
  const days = Math.floor(seconds / SECONDS_PER_DAY);
  const remainderSeconds = seconds % SECONDS_PER_DAY;
  const hms = new Date(remainderSeconds * 1000).toISOString().substring(11, 19);
  return hms.replace(/^(\d+)/, h => `${Number(h) + days * HOURS_PER_DAY}`.padStart(2, '0'));
};

export const bidErrorCodes = {
    "BID_ON_OWN_AUCTION" : "Du kan inte buda på din egen auktion",
    "AUCTION_PAST_DEADLINE" : "Auktionen har gått ut",
    "AUCTION_PAID" : "Auktionen är redan betald av vinnaren",
    "NEGATIVE_BID" : "Negativt bud accepteras ej",
    "BID_LOWER_THAN_HIGHEST" : "Budet måste vara högre än högst lagda bud",
    "BID_LARGER_THAN_AVAILABLE_BALANCE" : "Budet överskrider tillgängligt saldo",
    "OUTBID_SELF": "Du kan inte buda över dig själv",
} as const;