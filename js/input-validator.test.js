const isValid = require("./input-validator");

const errorCallback = jest.fn();

describe("Input Validator", () => {
    test("returns true on valid input", () => {
        const input = "4,0,1,0,3,9,0,0,0";
        expect(isValid(input)).toBe(true);
    });

    test("works with spaces", () => {
        const input = "4, 0, 1, 0, 3, 9, 0, 0, 0";
        expect(isValid(input)).toBe(true);
    });

    test("returns false on empty input", () => {
        const input = "";
        expect(isValid(input, errorCallback)).toBe(false);
        expect(errorCallback).toHaveBeenCalledWith("Input cannot be empty");
    })

    test("returns false on more than 9 numbers", () => {
        const input = "4,0,1,0,3,9,0,0,0,7"; // 10 numbers
        expect(isValid(input, errorCallback)).toBe(false);
        expect(errorCallback).toHaveBeenCalledWith("There must be exactly 9 numbers.");
    })

    test("returns false on less than 9 numbers", () => {
        const input = "4,0,0,3,9,0,0,0"; // 8 numbers
        expect(isValid(input, errorCallback)).toBe(false);
        expect(errorCallback).toHaveBeenCalledWith("There must be exactly 9 numbers.");
    })

    test("returns false on more than five zeros", () => {
        const input = "0,0,0,0,0,0,3,7,5";
        expect(isValid(input, errorCallback)).toBe(false);
        expect(errorCallback).toHaveBeenCalledWith("There must be exactly five zeros.");
    });

    test("returns false on less than five zeros", () => {
        const input = "0,0,0,0,5,1,3,7,5";
        expect(isValid(input, errorCallback)).toBe(false);
        expect(errorCallback).toHaveBeenCalledWith("There must be exactly five zeros.");
    });

    test("returns false on non-numbers", () => {
        const input = "4,0,1,0,Z,9,0,0,0";
        let error = "";
        expect(isValid(input, errorCallback)).toBe(false);
        expect(errorCallback).toHaveBeenCalledWith("Not all entered characters are a number.");
    });

    test("returns false on numbers greater than 9", () => {
        const input = "4,0,1,0,3,999999,0,0,0";
        let error = "";
        expect(isValid(input, errorCallback)).toBe(false);
        expect(errorCallback).toHaveBeenCalledWith("Not all numbers are between 0 and 9");
    });

    test("returns false on negative numbers", () => {
        const input = "4,0,1,0,3,-999999,0,0,0";
        expect(isValid(input, errorCallback)).toBe(false);
        expect(errorCallback).toHaveBeenCalledWith("Not all numbers are between 0 and 9");
    });

    test("returns false on duplicate numbers", () => {
        const input = "4,4,0,0,3,9,0,0,0";
        expect(isValid(input, errorCallback)).toBe(false);
        expect(errorCallback).toHaveBeenCalledWith("There should be 5 unique characters: 4 numbers between 1-9 and the rest 0.");
    });
})