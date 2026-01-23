# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple **Snake Game** (贪吃蛇游戏) implemented as a single standalone HTML file with embedded CSS and JavaScript. The game runs directly in a web browser without requiring any build system or dependencies.

## Running the Game

**To play the game:**
```bash
# Simply open the HTML file in any web browser
open snake_game.html
# or
firefox snake_game.html
# or
google-chrome snake_game.html
```

## Project Structure

- **snake_game.html** - Single self-contained file containing:
  - HTML canvas element for rendering
  - CSS styling for dark theme
  - JavaScript game logic for Snake mechanics

## Game Controls

- **Arrow Keys** - Control snake direction (Up/Down/Left/Right)
- **Spacebar** - Pause/Resume game

## Architecture

The game is implemented in vanilla JavaScript with the following key functions:

- **randomFood()** (line 63) - Generates random food positions on the grid
- **drawGame()** (line 71) - Renders snake and food on canvas
- **gameLoop()** (line 98) - Main game loop handling movement and collision detection
- **resetGame()** (line 132) - Resets game state on collision

The game uses:
- 20x20 pixel grid with 20x20 tile count
- 400x400 pixel canvas
- 150ms game tick interval
- Collision detection for walls and self

## Common Development Tasks

Since this is a simple single-file project, there are no build, test, or lint commands. All modifications should be made directly to `snake_game.html`.

**No existing commands for:**
- Building
- Linting
- Testing
- Development server

## Language

The game interface and comments are in **Chinese** (Simplified).
