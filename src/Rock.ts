export class Rock {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Moves the rock in a specified direction if possible
     * @param dx - Change in the X direction
     * @param dy - Change in the Y direction
     * @param width - Grid width
     * @param height - Grid height
     * @param otherRocks - Array of other rocks
     * @returns True if the movement was successful, if not false
     */
    public move(dx: number, dy: number, width: number, height: number, otherRocks: Rock[]): boolean {
        const newX = this.x + dx;
        const newY = this.y + dy;

        if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
            return false;
        }

        const isBlocked = otherRocks.some((rock) => rock !== this && rock.x === newX && rock.y === newY);
        if (isBlocked) {
            return false;
        }

        this.x = newX;
        this.y = newY;
        return true;
    }
}
