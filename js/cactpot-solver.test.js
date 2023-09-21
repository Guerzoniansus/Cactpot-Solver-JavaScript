const getHighestAverageLine = require("./cactpot-solver");

describe("Cactpot Solver", () => {

    test("Full line 10k profit right column", () => {
        /*
        0 0 3
        9 0 2
        0 0 1
        Guaranteed average profit of 10k in right column
         */

        const board = [0, 0, 3, 9, 0, 2, 0, 0, 1];
        const result = getHighestAverageLine(board);

        const expected = {line: {name: "Right column", values: [3, 2, 1]}, averagePayout: 10000};

        expect(result).toEqual(expected);
    })

    test("Full line 3600 profit top left to bottom right", () => {
        /*
        7 0 0
        0 8 1
        0 0 9
        Guaranteed 7-8-9 high payout while 1-2-3 is not possible
         */

        const board = [7, 0, 0, 0, 8, 1, 0, 0, 9];
        const result = getHighestAverageLine(board);

        const expected = {line: {name: "Top left to bottom right", values: [7, 8, 9]}, averagePayout: 3600};

        expect(result).toEqual(expected);
    })

    test("2/3 line test right column A", () => {
        /*
        [9, 0, 3]
        [0, 8, 0]
        [0, 0, 1]
        Combinations and payouts:
        3+1+2 = 6 -> 10000
        3+1+4 = 8 -> 720
        3+1+5 = 9 -> 360
        3+1+6 = 10 -> 80
        3+1+7 = 11 -> 252
        (10000 + 720 + 360 + 80 + 252) / 5 = 2282
        Highest average should be 3-0-1 with 2282
         */

        const board = [9, 0, 3, 0, 8, 0, 0, 0, 1];
        const result = getHighestAverageLine(board);

        const expected = {line: {name: "Right column", values: [3, 0, 1]}, averagePayout: 2282};

        expect(result).toEqual(expected);
    })

    test("2/3 line right column B", () => {
        /*
        [8, 0, 0]
        [0, 9, 1]
        [0, 0, 3]
        Same numbers as above but slightly shuffled
         */

        const board = [8, 0, 0, 0, 9, 1, 0, 0, 3];
        const result = getHighestAverageLine(board);

        const expected = {line: {name: "Right column", values: [0, 1, 3]}, averagePayout: 2282};

        expect(result).toEqual(expected);
    })

    test("2/3 line bottom left to top right", () => {
        /*
        [8, 0, 3]
        [0, 0, 0]
        [2, 9, 0]
        Best line should be diagonal bottom-left to top-right 3-0-2
        Combinations and payouts:
        2+3+1 = 6 -> 10000
        2+3+4 = 9 -> 360
        2+3+5 = 10 -> 80
        2+3+6 = 11 -> 252
        2+3+7 = 12 -> 108
        (10000 + 360 + 80 + 252 + 108) / 5 = 2160
        Highest average should be 2-0-3 with 2160
         */

        const board = [8, 0, 3, 0, 0, 0, 2, 9, 0];
        const result = getHighestAverageLine(board).line;

        const expected = {name: "Bottom left to top right", values: [2, 0, 3]};

        expect(result).toEqual(expected);
    })

    test("1/3 line top left to bottom right", () => {
        /*
        [8, 0, 0]
        [0, 1, 0]
        [0, 5, 9]
        Best line should be middle row 0-1-0 because of 1-2-3 = 10000
        and 7+8+9 (3600) cannot be in the same line
         */

        const board = [8, 0, 0, 0, 1, 0, 0, 5, 9];
        const result = getHighestAverageLine(board).line;

        const expected = {name: "Middle row", values: [0, 1, 0]};

        expect(result).toEqual(expected);
    })

    test("1/3 line middle row", () => {
        /*
        [0, 3, 0]
        [0, 0, 7]
        [1, 0, 2]
        Best line should be middle row 0-0-7 because it can have 3 of the 4 highest sums:
        21 (1080), 23 (1800), 24 (3600)
        Meanwhile 1-2-3 (10000) is not possible anywhere
         */

        const board= [0, 3, 0, 0, 0, 7, 1, 0, 2];
        const result = getHighestAverageLine(board).line;

        const expected = {name: "Middle row", values: [0, 0, 7]};

        expect(result).toEqual(expected);
    })
})