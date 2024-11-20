export class Display {
    private ctx: CanvasRenderingContext2D | null; // Canvas rendering context
    private scale: number; // Scale of each grid cell
    public speed: number; // Speed 
    public score: number = 0; // Game score
    public static canvasWalls: number[] = [0, 0]; // Canvas dimensions in grid units

    constructor(width: number, height: number, scale: number = 10, speed: number = 200) {
        this.scale = scale;
        this.speed = speed;
        const canvas = document.createElement("canvas");
        canvas.width = width * this.scale;
        canvas.height = height * this.scale;
        this.ctx = canvas.getContext("2d");
        const displayElement = document.getElementById("display");
        if (displayElement) displayElement.appendChild(canvas);
        Display.canvasWalls = [width, height]; 
    }

    /**
     * Draws a rectangle on the canvas
     * @param x - X coordinate 
     * @param y - Y coordinate 
     * @param color - Fill color 
     */
    public drawRectangle(x: number, y: number, color: string): void {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
        }
    }

    /**
     * Draws a circle on the canvas
     * @param x - X coordinate 
     * @param y - Y coordinate 
     * @param color - Fill color 
     */
    public drawCircle(x: number, y: number, color: string): void {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.fillStyle = color;
            this.ctx.arc(
                x * this.scale + this.scale / 2, 
                y * this.scale + this.scale / 2, 
                this.scale / 2, 
                0,
                2 * Math.PI
            );
            this.ctx.fill();
        }
    }

    /**
     * Clears the canvas.
     */
    public clear(): void {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
    }

    /**
     * Gets the canvas walls as an array [width, height] in grid units.
     * @returns The canvas dimensions in grid units.
     */
    public getCanvasWalls(): number[] {
        if (this.ctx) {
            return [
                this.ctx.canvas.width / this.scale,
                this.ctx.canvas.height / this.scale,
            ];
        }
        return [0, 0];
    }
}

