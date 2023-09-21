const isValid = require("./input-validator");
const getHighestAverageLine = require("./cactpot-solver");

const OUTPUT = document.getElementById("output");

document.getElementById("input").addEventListener("keypress", event => {
    if (event.key === "Enter") {
        const input = event.currentTarget.value;
        processInput(input);
    }
});

/**
 * Processes a board input.
 * @param input The input to process.
 */
function processInput(input) {
    if (isValid(input, setOutput)) {
        const boardArray = toNumberArray(input);
        const profitCalculation = getHighestAverageLine(boardArray);

        setOutput(`You entered: 
        [${boardArray[0]}, ${boardArray[1]}, ${boardArray[2]}]
        [${boardArray[3]}, ${boardArray[4]}, ${boardArray[5]}]
        [${boardArray[6]}, ${boardArray[7]}, ${boardArray[8]}]
        
The best line is ${profitCalculation.line.name} with an average payout of ${profitCalculation.averagePayout}`);
    }
}

/**
 * Transforms a (valid) Board input into an array of numbers.
 * @param input The input to transform.
 * @returns {number[]} The array of numbers.
 */
function toNumberArray(input) {
    // Regular expression removes whitespaces
    return input.trim().replace(/\s+/g, "").split(",").map(char => Number(char));
}

/**
 * Sets the output text in the HTML.
 * @param output The text to display.
 */
function setOutput(output) {
    OUTPUT.innerText = output;
}


