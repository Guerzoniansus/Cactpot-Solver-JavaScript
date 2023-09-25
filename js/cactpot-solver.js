/**
 * A dictionary containing key-value pairs where the key is a sum of numbers and the value is the payout in Gil.
 */
const PAYOUTS = {
    6: 10000,
    7: 36,
    8: 720,
    9: 360,
    10: 80,
    11: 252,
    12: 108,
    13: 72,
    14: 52,
    15: 180,
    16: 72,
    17: 180,
    18: 119,
    19: 36,
    20: 306,
    21: 1080,
    22: 144,
    23: 1800,
    24: 3600
};

/**
 * Determines which line on the board has the highest average profit.
 * @param {number[]} board An array of 9 numbers that represents a valid 9x9 Cactpot board.
 * @returns {{averagePayout: number, line: {values: number[], name: string}}} An object with the best line and the average payout.
 */
function getHighestAverageLine(board) {
    const lines = createLines(board);
    const knownNumbers = board.filter(tile => tile > 0);

    return lines.reduce((bestProfitCalculation, line) => {
        // Possible numbers for 0 tiles cannot include known numbers
        const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(tile => knownNumbers.includes(tile) === false);

        const allPayouts = getAllPossiblePayouts(line.values, possibleNumbers);
        const averagePayout = Math.floor(getSum(allPayouts) / allPayouts.length); // Floor to stay consistent with the Integer-casted values from Java

        return averagePayout > bestProfitCalculation.averagePayout
                                                    ? {line: line, averagePayout: averagePayout}
                                                    : bestProfitCalculation;
    }, {line: {name: "Unknown", values: [-1, -1, -1]}, averagePayout: 0});
}

/**
 * Gets all possible payouts for one line.
 * @param {number[]} lineValues The values in a line.
 * @param {number[]} possibleNumbers The numbers that the 0 tiles in this line can be.
 * @returns {number[]} An array with payout numbers.
 */
function getAllPossiblePayouts(lineValues, possibleNumbers) {
    // Removes index from array (i needs to be in range)
    const remove  = (array, i) => [...array.slice(0, i), ...array.slice(i+1)];

    // Replaces index in array with x (i needs to be in range)
    const replace = (array, i, x) => [...array.slice(0, i), x, ...array.slice(i+1)];

    const zeroIndex = lineValues.indexOf(0);

    return zeroIndex === -1
                        ? [getPayout(getSum(lineValues))]
                        : possibleNumbers.map((number, i) => getAllPossiblePayouts(replace(lineValues, zeroIndex, number), remove(possibleNumbers, i))).flat();
}

/**
 * Gets the sum of an array.
 * @param {array} array The array to determine the sum of.
 * @returns {*} The sum of all elements combined.
 */
function getSum(array) {
    return array.reduce((a, b) => a + b);
}

/**
 * Gets the payout in Gil for a given sum.
 * @param {number} sum The sum to get the payout for.
 * @returns {number} The payout in Gil.
 */
function getPayout(sum) {
    return PAYOUTS[sum];
}

/**
 * Creates 8 Line objects to represent the board. Three rows, three columns and two diagonals.
 * @param {number[]} board An array of numbers representing the Cactpot board.
 * @returns {{values: number[], name: string}[]} An array of Line objects.
 */
function createLines(board) {
    return [
        {name: "Top row", values: [board[0], board[1], board[2]]},
        {name: "Middle row", values: [board[3], board[4], board[5]]},
        {name: "Bottom row", values: [board[6], board[7], board[8]]},
        {name: "Left column", values: [board[0], board[3], board[6]]},
        {name: "Middle column", values: [board[1], board[4], board[7]]},
        {name: "Right column", values: [board[2], board[5], board[8]]},
        {name: "Top left to bottom right", values: [board[0], board[4], board[8]]},
        {name: "Bottom left to top right", values: [board[6], board[4], board[2]]},
    ]
}

module.exports = getHighestAverageLine;