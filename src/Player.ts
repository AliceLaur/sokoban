export class Player {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Moves the player or object in a given direction.
     * @param direction - Direction of movement ("up", "down", "left", "right").
     * @param width - Width of the grid.
     * @param height - Height of the grid.
     * @param rocks - List of rocks in the game.
     * @returns True if the movement was successful, false otherwise.
     */
    public move(direction: string, width: number, height: number, rocks: any[]): boolean {
        let newX = this.x;
        let newY = this.y;

        // Calculate the new position based on the direction
        switch (direction) {
            case "up":
                newY -= 1; // Move up
                break;
            case "down":
                newY += 1; // Move down
                break;
            case "left":
                newX -= 1; // Move left
                break;
            case "right":
                newX += 1; // Move right
                break;
            default:
                return false; // Invalid direction
        }

        // Ensure the new position is within the grid boundaries
        if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
            return false;
        }

        // Check if a rock is in the way
        const rock = rocks.find((r) => r.x === newX && r.y === newY);
        if (rock && !rock.move(newX - this.x, newY - this.y, width, height, rocks)) {
            // If there's a rock and it can't be pushed, return false
            return false;
        }

        // Move to the new position
        this.x = newX;
        this.y = newY;
        return true;
    }
}