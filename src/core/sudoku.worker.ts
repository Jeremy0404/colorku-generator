import { SudokuGenerator, type Difficulty } from './SudokuGenerator';

const generator = new SudokuGenerator();

self.onmessage = (e: MessageEvent<Difficulty>) => {
    const grid = generator.generate(e.data);
    self.postMessage(grid);
};
