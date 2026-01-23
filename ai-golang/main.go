package main

import (
	"fmt"
	"image/color"
	"log"
	"math/rand"
	"time"

	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/ebitenutil"
	// "github.com/hajimehoshi/ebiten/v2/text"
)

const (
	ScreenWidth  = 600
	ScreenHeight = 700
	GridSize     = 10
	CellSize     = 50
	InitialTiles = 8
	GridStartX   = 50
	GridStartY   = 100
)

// Tile represents a single tile on the grid
type Tile struct {
	Value int
	X     int
	Y     int
}

// Game represents the main game state
type Game struct {
	grid     [GridSize][GridSize]int
	tiles    []Tile
	score    int
	gameOver bool
	moved    bool
}

var (
	// Color palette
	emptyColor = color.RGBA{238, 228, 218, 255}
	tileColors = map[int]color.Color{
		2:    color.RGBA{238, 228, 218, 255},
		4:    color.RGBA{237, 224, 200, 255},
		8:    color.RGBA{242, 177, 121, 255},
		16:   color.RGBA{245, 149, 99, 255},
		32:   color.RGBA{246, 124, 95, 255},
		64:   color.RGBA{246, 94, 59, 255},
		128:  color.RGBA{237, 207, 114, 255},
		256:  color.RGBA{237, 204, 97, 255},
		512:  color.RGBA{237, 200, 80, 255},
		1024: color.RGBA{237, 197, 63, 255},
		2048: color.RGBA{237, 194, 46, 255},
	}
)

// NewGame creates a new game instance
func NewGame() *Game {
	g := &Game{
		tiles: make([]Tile, 0),
		score: 0,
	}
	g.initGrid()
	g.addRandomTiles(InitialTiles)
	return g
}

// initGrid initializes the game grid
func (g *Game) initGrid() {
	for i := 0; i < GridSize; i++ {
		for j := 0; j < GridSize; j++ {
			g.grid[i][j] = 0
		}
	}
}

// addRandomTiles adds random tiles to empty positions
func (g *Game) addRandomTiles(count int) {
	emptyPositions := g.getEmptyPositions()
	if len(emptyPositions) < count {
		count = len(emptyPositions)
	}

	for i := 0; i < count; i++ {
		pos := emptyPositions[rand.Intn(len(emptyPositions))]
		value := 2
		if rand.Float32() < 0.1 {
			value = 4
		}
		g.grid[pos[0]][pos[1]] = value
		g.tiles = append(g.tiles, Tile{Value: value, X: pos[0], Y: pos[1]})
	}
}

// getEmptyPositions returns all empty positions on the grid
func (g *Game) getEmptyPositions() [][]int {
	empty := make([][]int, 0)
	for i := 0; i < GridSize; i++ {
		for j := 0; j < GridSize; j++ {
			if g.grid[i][j] == 0 {
				empty = append(empty, []int{i, j})
			}
		}
	}
	return empty
}

// canMove checks if any moves are possible
func (g *Game) canMove() bool {
	// Check for empty cells
	if len(g.getEmptyPositions()) > 0 {
		return true
	}

	// Check for possible merges
	for i := 0; i < GridSize; i++ {
		for j := 0; j < GridSize-1; j++ {
			if g.grid[i][j] == g.grid[i][j+1] || g.grid[i][j] == g.grid[i+1][j] {
				return true
			}
		}
	}
	return false
}

// moveLeft handles left movement
func (g *Game) moveLeft() bool {
	g.moved = false
	for i := 0; i < GridSize; i++ {
		row := g.grid[i][:]
		newRow := make([]int, GridSize)
		pos := 0

		for j := 0; j < GridSize; j++ {
			if row[j] != 0 {
				if pos > 0 && newRow[pos-1] == row[j] {
					newRow[pos-1] *= 2
					g.score += newRow[pos-1]
					g.moved = true
				} else {
					if pos != j {
						g.moved = true
					}
					newRow[pos] = row[j]
					pos++
				}
			}
		}

		for j := 0; j < GridSize; j++ {
			g.grid[i][j] = newRow[j]
		}
	}
	return g.moved
}

// moveRight handles right movement
func (g *Game) moveRight() bool {
	g.moved = false
	for i := 0; i < GridSize; i++ {
		row := g.grid[i][:]
		newRow := make([]int, GridSize)
		pos := GridSize - 1

		for j := GridSize - 1; j >= 0; j-- {
			if row[j] != 0 {
				if pos < GridSize-1 && newRow[pos+1] == row[j] {
					newRow[pos+1] *= 2
					g.score += newRow[pos+1]
					g.moved = true
				} else {
					if pos != j {
						g.moved = true
					}
					newRow[pos] = row[j]
					pos--
				}
			}
		}

		for j := 0; j < GridSize; j++ {
			g.grid[i][j] = newRow[j]
		}
	}
	return g.moved
}

// moveUp handles up movement
func (g *Game) moveUp() bool {
	g.moved = false
	for j := 0; j < GridSize; j++ {
		col := make([]int, GridSize)
		for i := 0; i < GridSize; i++ {
			col[i] = g.grid[i][j]
		}

		newCol := make([]int, GridSize)
		pos := 0

		for i := 0; i < GridSize; i++ {
			if col[i] != 0 {
				if pos > 0 && newCol[pos-1] == col[i] {
					newCol[pos-1] *= 2
					g.score += newCol[pos-1]
					g.moved = true
				} else {
					if pos != i {
						g.moved = true
					}
					newCol[pos] = col[i]
					pos++
				}
			}
		}

		for i := 0; i < GridSize; i++ {
			g.grid[i][j] = newCol[i]
		}
	}
	return g.moved
}

// moveDown handles down movement
func (g *Game) moveDown() bool {
	g.moved = false
	for j := 0; j < GridSize; j++ {
		col := make([]int, GridSize)
		for i := 0; i < GridSize; i++ {
			col[i] = g.grid[i][j]
		}

		newCol := make([]int, GridSize)
		pos := GridSize - 1

		for i := GridSize - 1; i >= 0; i-- {
			if col[i] != 0 {
				if pos < GridSize-1 && newCol[pos+1] == col[i] {
					newCol[pos+1] *= 2
					g.score += newCol[pos+1]
					g.moved = true
				} else {
					if pos != i {
						g.moved = true
					}
					newCol[pos] = col[i]
					pos--
				}
			}
		}

		for i := 0; i < GridSize; i++ {
			g.grid[i][j] = newCol[i]
		}
	}
	return g.moved
}

// Update updates the game state
func (g *Game) Update() error {
	if g.gameOver {
		return nil
	}

	// Handle input
	ebiten.SetCursorMode(ebiten.CursorModeHidden)

	// Check for key presses
	if ebiten.IsKeyPressed(ebiten.KeyArrowLeft) || ebiten.IsKeyPressed(ebiten.KeyA) {
		g.HandleInput(ebiten.KeyArrowLeft)
		time.Sleep(150 * time.Millisecond) // Prevent too fast movement
	} else if ebiten.IsKeyPressed(ebiten.KeyArrowRight) || ebiten.IsKeyPressed(ebiten.KeyD) {
		g.HandleInput(ebiten.KeyArrowRight)
		time.Sleep(150 * time.Millisecond)
	} else if ebiten.IsKeyPressed(ebiten.KeyArrowUp) || ebiten.IsKeyPressed(ebiten.KeyW) {
		g.HandleInput(ebiten.KeyArrowUp)
		time.Sleep(150 * time.Millisecond)
	} else if ebiten.IsKeyPressed(ebiten.KeyArrowDown) || ebiten.IsKeyPressed(ebiten.KeyS) {
		g.HandleInput(ebiten.KeyArrowDown)
		time.Sleep(150 * time.Millisecond)
	} else if ebiten.IsKeyPressed(ebiten.KeyR) {
		g.Restart()
		time.Sleep(200 * time.Millisecond)
	}

	return nil
}

// HandleInput handles keyboard input
func (g *Game) HandleInput(key ebiten.Key) bool {
	if g.gameOver {
		return false
	}

	var moved bool
	switch key {
	case ebiten.KeyArrowLeft, ebiten.KeyA:
		moved = g.moveLeft()
	case ebiten.KeyArrowRight, ebiten.KeyD:
		moved = g.moveRight()
	case ebiten.KeyArrowUp, ebiten.KeyW:
		moved = g.moveUp()
	case ebiten.KeyArrowDown, ebiten.KeyS:
		moved = g.moveDown()
	case ebiten.KeyR:
		g.Restart()
		return true
	}

	if moved {
		g.addRandomTiles(1)
		if !g.canMove() {
			g.gameOver = true
		}
	}

	return moved
}

// Restart restarts the game
func (g *Game) Restart() {
	g.initGrid()
	g.tiles = make([]Tile, 0)
	g.score = 0
	g.gameOver = false
	g.addRandomTiles(InitialTiles)
}

// Layout calculates the screen size
func (g *Game) Layout(outsideWidth, outsideHeight int) (screenWidth, screenHeight int) {
	return ScreenWidth, ScreenHeight
}

// Draw renders the game
func (g *Game) Draw(screen *ebiten.Image) {
	// Clear background
	screen.Fill(color.RGBA{187, 173, 160, 255})

	// Draw title using ebitenutil
	ebitenutil.DebugPrint(screen, fmt.Sprintf("2048 - 10x10"))

	// Draw score
	ebitenutil.DebugPrintAt(screen, fmt.Sprintf("Score: %d", g.score), GridStartX, 80)

	// Draw instructions
	ebitenutil.DebugPrintAt(screen, "Use arrow keys or WASD to move, R to restart", GridStartX, ScreenHeight-30)

	// Draw game over message
	if g.gameOver {
		ebitenutil.DebugPrintAt(screen, "GAME OVER!", ScreenWidth/2-100, ScreenHeight/2)
		ebitenutil.DebugPrintAt(screen, "Press R to restart", ScreenWidth/2-100, ScreenHeight/2+40)
	}

	// Draw grid
	for i := 0; i < GridSize; i++ {
		for j := 0; j < GridSize; j++ {
			x := GridStartX + j*CellSize
			y := GridStartY + i*CellSize

			// Create empty cell image
			cellImg := ebiten.NewImage(CellSize-2, CellSize-2)
			cellImg.Fill(emptyColor)

			// Draw empty cell
			opts := &ebiten.DrawImageOptions{}
			opts.GeoM.Translate(float64(x+1), float64(y+1))
			screen.DrawImage(cellImg, opts)

			// Draw tile
			if g.grid[i][j] != 0 {
				var tileColor color.Color
				if c, ok := tileColors[g.grid[i][j]]; ok {
					tileColor = c
				} else {
					// Generate color for larger numbers
					tileColor = color.RGBA{60, 60, 60, 255}
				}

				// Create tile image
				tileImg := ebiten.NewImage(CellSize-2, CellSize-2)
				tileImg.Fill(tileColor)

				// Draw tile background
				opts := &ebiten.DrawImageOptions{}
				opts.GeoM.Translate(float64(x+1), float64(y+1))
				screen.DrawImage(tileImg, opts)

				// Draw tile value using DebugPrintAt
				valueStr := fmt.Sprintf("%d", g.grid[i][j])
				textX := x + 15

				if g.grid[i][j] >= 1024 {
					textX = x + 5
				} else if g.grid[i][j] >= 128 {
					textX = x + 10
				} else if g.grid[i][j] >= 16 {
					textX = x + 15
				}

				ebitenutil.DebugPrintAt(screen, valueStr, textX, y+25)
			}
		}
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())

	// Create game instance
	game := NewGame()

	// Create and run the game
	ebiten.SetWindowTitle("2048 - 10x10")
	ebiten.SetWindowSize(ScreenWidth, ScreenHeight)

	if err := ebiten.RunGame(game); err != nil {
		log.Fatal(err)
	}
}
