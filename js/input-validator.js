/**
 * Checks if a Cactpot board input is valid.
 * @param {string} input The input string.
 * @param {function} errorCallback The function to execute when an input is not valid. It will be passed the rrror message.
 * @returns {boolean} True is valid, false is not valid.
 */
function isValid(input, errorCallback) {
    if (input === "") {
        errorCallback("Input cannot be empty");
        return false;
    }

    // Regular expression removes whitespaces
    const characters = input.trim().replace(/\s+/g, "").split(",");

    if (characters.length !== 9) {
        errorCallback("There must be exactly 9 numbers.");
        return false;
    }

    if (hasFiveZeros(characters) === false) {
        errorCallback("There must be exactly five zeros.");
        return false;
    }

    const uniqueCharacters = [...new Set(characters)];
    if (uniqueCharacters.length !== 5) {
        errorCallback("There should be 5 unique characters: 4 numbers between 1-9 and the rest 0.");
        return false;
    }

    characters.forEach(char => {
        if (/^\d+$/.test(char) === false) {
            errorCallback("Not all entered characters are a number.");
            return false;
        }
    })

    const numbers = characters.map(char => Number(char));
    if (numbers.filter(number => number >= 0 && number <= 9).length !== 9) {
        errorCallback("Not all numbers are between 0 and 9");
        return false;
    }

    return true;
}

/**
 * Checks if an array of characters has exactly five zeros.
 * @param {string[]} characters The characters to check.
 * @returns {boolean} True if there are exactly five zeros, otherwise false.
 */
function hasFiveZeros(characters) {
    const amountOfZeros = characters.reduce((total, char) => {
        return char === "0" ? total + 1 : total;
    }, 0);

    return amountOfZeros === 5;
}

module.exports = isValid;