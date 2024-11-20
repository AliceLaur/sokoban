import { Display } from "./Display.js";
import { Player } from "./Player.js";
import { Rock } from "./Rock.js";
import { Hole } from "./Hole.js";

export class Game {
    private width: number;
    private height: number;
    private display: Display;
    private player: Player;
    private rocks: Rock[] = [];
    private holes: Hole[] = [];
    private level: number = 1;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.display = new Display(width, height, 40);
        this.player = new Player(1, 1);
    }

    /**
     * Starts the game and initializes the first level
     */
    public start(): void {
        this.generateLevel();
        this.render();
    }

    /**
     * Handles player input and updates the game state
     * @param direction - Direction of movement ("up", "down", "left", "right")
     */
    public handleInput(direction: string): void {
        const moved = this.player.move(direction, this.width, this.height, this.rocks);
        if (moved) {
            this.checkRocksInHoles();
            this.checkLevelCompletion();
            this.render();
        }
    }

    /**
     * Generates the level by creating rocks and holes
     */
    private generateLevel(): void {
        this.rocks = [];
        this.holes = [];

        for (let i = 0; i < this.level; i++) {
            const rockPos = this.getRandomEmptyPosition();
            const holePos = this.getRandomEmptyPosition();

            const rock = new Rock(rockPos.x, rockPos.y);
            const hole = new Hole(holePos.x, holePos.y);

            this.rocks.push(rock);
            this.holes.push(hole);
        }
    }

    /**
     * Checks if any rocks are inside holes and updates their state
     */
    private checkRocksInHoles(): void {
        for (const hole of this.holes) {
            if (!hole.isFilled) {
                const rock = this.rocks.find((r) => r.x === hole.x && r.y === hole.y);
                if (rock) {
                    hole.fill();
                }
            }
        }
    }

    /**
     * Checks if all holes are filled to progress to the next level
     */
    private checkLevelCompletion(): void {
        if (this.holes.every((hole) => hole.isFilled)) {
            alert(`Level ${this.level} complete!`);
            this.level++;
            this.generateLevel();
        }
    }

    /**
     * Renders all game objects on the canvas
     */
    private render(): void {
        this.display.clear();

        for (const hole of this.holes) {
            const color = hole.isFilled ? "green" : "black";
            this.display.drawRectangle(hole.x, hole.y, color);
        }

        for (const rock of this.rocks) {
            this.display.drawRectangle(rock.x, rock.y, "gray");
        }

        this.display.drawCircle(this.player.x, this.player.y, "blue");
    }

    /**
     * Returns a random unoccupied position on the grid
     * Ensures rocks are not placed directly against the walls
     */
    private getRandomEmptyPosition(): { x: number; y: number } {
        let position;
        do {
            position = {
                x: Math.floor(Math.random() * (this.width - 2)) + 1, 
                y: Math.floor(Math.random() * (this.height - 2)) + 1, 
            };
        } while (this.isPositionOccupied(position.x, position.y));
        return position;
    }

    /**
     * Checks if a position is occupied 
     */
    private isPositionOccupied(x: number, y: number): boolean {
        if (this.player.x === x && this.player.y === y) return true;
        if (this.rocks.some((rock) => rock.x === x && rock.y === y)) return true;
        if (this.holes.some((hole) => hole.x === x && hole.y === y)) return true;
        return false;
    }
}
