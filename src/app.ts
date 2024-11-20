import { Game } from "./Game.js";

// Initialize the game with a grid size
const game = new Game(15,15);

window.onload = () => {
    game.start();

    // Set up event listeners for player input
    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                game.handleInput("up");
                break;
            case "ArrowDown":
                game.handleInput("down");
                break;
            case "ArrowLeft":
                game.handleInput("left");
                break;
            case "ArrowRight":
                game.handleInput("right"); 
                break;
        }
    });
};
