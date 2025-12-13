import { describe, it, expect } from 'vitest';
import { SudokuGenerator, Difficulty } from './SudokuGenerator';

describe('SudokuGenerator', () => {
    const generator = new SudokuGenerator();

    it('should generate a complete 9x9 grid', () => {
        const grid = generator.generateCompleteGrid();
        expect(grid.length).toBe(9);
        grid.forEach(row => {
            expect(row.length).toBe(9);
            // Check if row contains 1-9
            const set = new Set(row);
            expect(set.size).toBe(9);
            for (let i = 1; i <= 9; i++) {
                expect(set.has(i)).toBe(true);
            }
        });

        // Check columns
        for (let col = 0; col < 9; col++) {
            const set = new Set();
            for (let row = 0; row < 9; row++) {
                const val = grid[row]?.[col];
                expect(val).toBeDefined();
                set.add(val);
            }
            expect(set.size).toBe(9);
        }
    });

    it('should generate a puzzle with removed numbers', () => {
        const difficulty = Difficulty.Easy; // Removes 30
        const result = generator.generate(difficulty);
        const grid = result.puzzle;

        let emptyCount = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i]?.[j] === 0) emptyCount++;
            }
        }

        expect(emptyCount).toBe(difficulty);
        expect(result.solution).toBeDefined();
    });
});
