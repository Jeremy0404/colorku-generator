export type Grid = number[][];

export const Difficulty: {
    readonly Easy: 30;
    readonly Medium: 40;
    readonly Hard: 50;
    readonly Expert: 55;
} = {
    Easy: 30,
    Medium: 40,
    Hard: 50,
    Expert: 55
};

export type Difficulty = typeof Difficulty[keyof typeof Difficulty];

export class SudokuGenerator {
    private static readonly SIZE = 9;
    private static readonly BOX_SIZE = 3;

    public generate(difficulty: Difficulty): Grid {
        const grid = this.generateCompleteGrid();
        return this.removeNumbers(grid, difficulty);
    }

    public generateCompleteGrid(): Grid {
        const grid: Grid = Array.from({ length: SudokuGenerator.SIZE }, () =>
            Array(SudokuGenerator.SIZE).fill(0)
        );

        this.fillDiagonalBoxes(grid);
        this.solve(grid);

        return grid;
    }

    private fillDiagonalBoxes(grid: Grid): void {
        for (let i = 0; i < SudokuGenerator.SIZE; i += SudokuGenerator.BOX_SIZE) {
            this.fillBox(grid, i, i);
        }
    }

    private fillBox(grid: Grid, rowStart: number, colStart: number): void {
        let num: number;
        for (let i = 0; i < SudokuGenerator.BOX_SIZE; i++) {
            const row = grid[rowStart + i];
            if (!row) continue;

            for (let j = 0; j < SudokuGenerator.BOX_SIZE; j++) {
                do {
                    num = Math.floor(Math.random() * SudokuGenerator.SIZE) + 1;
                } while (!this.isSafeInBox(grid, rowStart, colStart, num));
                row[colStart + j] = num;
            }
        }
    }

    private isSafeInBox(grid: Grid, rowStart: number, colStart: number, num: number): boolean {
        for (let i = 0; i < SudokuGenerator.BOX_SIZE; i++) {
            const row = grid[rowStart + i];
            if (!row) continue;

            for (let j = 0; j < SudokuGenerator.BOX_SIZE; j++) {
                if (row[colStart + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    private isSafe(grid: Grid, row: number, col: number, num: number): boolean {
        // Check row
        const currentRow = grid[row];
        if (currentRow) {
            for (let x = 0; x < SudokuGenerator.SIZE; x++) {
                if (currentRow[x] === num) return false;
            }
        }

        // Check col
        for (let x = 0; x < SudokuGenerator.SIZE; x++) {
            const r = grid[x];
            if (r && r[col] === num) return false;
        }

        // Check box
        const startRow = row - (row % SudokuGenerator.BOX_SIZE);
        const startCol = col - (col % SudokuGenerator.BOX_SIZE);
        return this.isSafeInBox(grid, startRow, startCol, num);
    }

    private solve(grid: Grid): boolean {
        let row = -1;
        let col = -1;
        let isEmpty = true;

        for (let i = 0; i < SudokuGenerator.SIZE; i++) {
            const currentRow = grid[i];
            if (!currentRow) continue;

            for (let j = 0; j < SudokuGenerator.SIZE; j++) {
                if (currentRow[j] === 0) {
                    row = i;
                    col = j;
                    isEmpty = false;
                    break;
                }
            }
            if (!isEmpty) break;
        }

        // No empty space left
        if (isEmpty) return true;

        for (let num = 1; num <= SudokuGenerator.SIZE; num++) {
            if (this.isSafe(grid, row, col, num)) {
                const targetRow = grid[row];
                if (targetRow) {
                    targetRow[col] = num;
                    if (this.solve(grid)) return true;
                    targetRow[col] = 0;
                }
            }
        }
        return false;
    }

    private removeNumbers(originalGrid: Grid, count: number): Grid {
        const grid = originalGrid.map(row => [...row]); // Deep copy
        let attempts = count;

        while (attempts > 0) {
            const rowIdx = Math.floor(Math.random() * SudokuGenerator.SIZE);
            const colIdx = Math.floor(Math.random() * SudokuGenerator.SIZE);
            const row = grid[rowIdx];

            if (row && row[colIdx] !== 0) {
                row[colIdx] = 0;
                attempts--;
            }
        }
        return grid;
    }
}
