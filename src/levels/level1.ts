export const walls = new Set() as Set<string>;

walls.add(`48,48`); // tree

walls.add(`48,64`);
walls.add(`48,80`);
walls.add(`64,64`);
walls.add(`64,80`);

walls.add(`112,48`);
walls.add(`128,48`);

walls.add(`96,80`); // water
walls.add(`112,80`);
walls.add(`128,80`);
walls.add(`144,80`);