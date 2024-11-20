export class Hole {
    public x: number; // X coordinate of the hole
    public y: number; // Y coordinate of the hole
    public isFilled: boolean; // Indicates if the hole is filled by a rock

    /**
     * Initializes a hole at a specific position
     * @param x - X coordinate of the hole
     * @param y - Y coordinate of the hole
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.isFilled = false; 
    }

    /**
     * Fills the hole with a rock
     */
    public fill(): void {
        this.isFilled = true;
    }

    /**
     * Checks if the hole is at the given position
     * @param x - X coordinate to check
     * @param y - Y coordinate to check
     * @returns True if the hole is at the given position, if not false
     */
    public isAtPosition(x: number, y: number): boolean {
        return this.x === x && this.y === y;
    }
}
