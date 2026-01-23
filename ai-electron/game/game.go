package game

import (
	"encoding/json"
	"math/rand"
	"time"
)

const (
	BoardSize  = 8
	InitialNumbers = 8
	TargetNumber = 2024
)

type Direction int

const (
	Up Direction = iota
	Down
	Left
	Right
)

type Game struct {
	Board    [BoardSize][BoardSize]int
	Score    int
	Won      bool
	Over     bool
	CanMove  bool
}

type GameState struct {
	Board  [BoardSize][BoardSize]int `json:"board"`
	Score  int                        `json:"score"`
	Won    bool                      `json:"won"`
	Over   bool                      `json:"over"`
	CanMove bool                     `json:"canMove"`
}

func NewGame() *Game {
	g := &Game{
		Board:  [BoardSize][BoardSize]int{},
		Score:  0,
		Won:    false,
		Over:   false,
		CanMove: true,
	}
	g.addInitialNumbers()
	g.CheckGameState()
	return g
}

func (g *Game) addInitialNumbers() {
	rand.Seed(time.Now().UnixNano())
	for i := 0; i < InitialNumbers; i++ {
		g.addRandomNumber()
	}
}

func (g *Game) addRandomNumber() {
	emptyCells := []struct{ x, y int }{}

	for x := 0; x < BoardSize; x++ {
		for y := 0; y < BoardSize; y++ {
			if g.Board[x][y] == 0 {
				emptyCells = append(emptyCells, struct{ x, y int }{x, y})
			}
		}
	}

	if len(emptyCells) > 0 {
		cell := emptyCells[rand.Intn(len(emptyCells))]
		g.Board[cell.x][cell.y] = 2
	}
}

func (g *Game) Move(dir Direction) {
	if g.Over || !g.CanMove {
		return
	}

	moved := false

	switch dir {
	case Left:
		moved = g.moveLeft()
	case Right:
		moved = g.moveRight()
	case Up:
		moved = g.moveUp()
	case Down:
		moved = g.moveDown()
	}

	if moved {
		g.addRandomNumber()
		g.CheckGameState()
	}
}

func (g *Game) moveLeft() bool {
	moved := false
	for x := 0; x < BoardSize; x++ {
		row := []int{}
		for y := 0; y < BoardSize; y++ {
			if g.Board[x][y] != 0 {
				row = append(row, g.Board[x][y])
			}
		}

		mergedRow := []int{}
		i := 0
		for i < len(row) {
			if i+1 < len(row) && row[i] == row[i+1] {
				merged := row[i] + row[i+1]
				g.Score += merged
				mergedRow = append(mergedRow, merged)
				i += 2
			} else {
				mergedRow = append(mergedRow, row[i])
				i++
			}
		}

		for y := 0; y < BoardSize; y++ {
			if y < len(mergedRow) {
				if g.Board[x][y] != mergedRow[y] {
					moved = true
				}
				g.Board[x][y] = mergedRow[y]
			} else {
				if g.Board[x][y] != 0 {
					moved = true
				}
				g.Board[x][y] = 0
			}
		}
	}
	return moved
}

func (g *Game) moveRight() bool {
	moved := false
	for x := 0; x < BoardSize; x++ {
		row := []int{}
		for y := BoardSize - 1; y >= 0; y-- {
			if g.Board[x][y] != 0 {
				row = append(row, g.Board[x][y])
			}
		}

		mergedRow := []int{}
		i := 0
		for i < len(row) {
			if i+1 < len(row) && row[i] == row[i+1] {
				merged := row[i] + row[i+1]
				g.Score += merged
				mergedRow = append(mergedRow, merged)
				i += 2
			} else {
				mergedRow = append(mergedRow, row[i])
				i++
			}
		}

		for y := BoardSize - 1; y >= 0; y-- {
			idx := BoardSize - 1 - y
			if idx < len(mergedRow) {
				if g.Board[x][y] != mergedRow[idx] {
					moved = true
				}
				g.Board[x][y] = mergedRow[idx]
			} else {
				if g.Board[x][y] != 0 {
					moved = true
				}
				g.Board[x][y] = 0
			}
		}
	}
	return moved
}

func (g *Game) moveUp() bool {
	moved := false
	for y := 0; y < BoardSize; y++ {
		col := []int{}
		for x := 0; x < BoardSize; x++ {
			if g.Board[x][y] != 0 {
				col = append(col, g.Board[x][y])
			}
		}

		mergedCol := []int{}
		i := 0
		for i < len(col) {
			if i+1 < len(col) && col[i] == col[i+1] {
				merged := col[i] + col[i+1]
				g.Score += merged
				mergedCol = append(mergedCol, merged)
				i += 2
			} else {
				mergedCol = append(mergedCol, col[i])
				i++
			}
		}

		for x := 0; x < BoardSize; x++ {
			if x < len(mergedCol) {
				if g.Board[x][y] != mergedCol[x] {
					moved = true
				}
				g.Board[x][y] = mergedCol[x]
			} else {
				if g.Board[x][y] != 0 {
					moved = true
				}
				g.Board[x][y] = 0
			}
		}
	}
	return moved
}

func (g *Game) moveDown() bool {
	moved := false
	for y := 0; y < BoardSize; y++ {
		col := []int{}
		for x := BoardSize - 1; x >= 0; x-- {
			if g.Board[x][y] != 0 {
				col = append(col, g.Board[x][y])
			}
		}

		mergedCol := []int{}
		i := 0
		for i < len(col) {
			if i+1 < len(col) && col[i] == col[i+1] {
				merged := col[i] + col[i+1]
				g.Score += merged
				mergedCol = append(mergedCol, merged)
				i += 2
			} else {
				mergedCol = append(mergedCol, col[i])
				i++
			}
		}

		for x := BoardSize - 1; x >= 0; x-- {
			idx := BoardSize - 1 - x
			if idx < len(mergedCol) {
				if g.Board[x][y] != mergedCol[idx] {
					moved = true
				}
				g.Board[x][y] = mergedCol[idx]
			} else {
				if g.Board[x][y] != 0 {
					moved = true
				}
				g.Board[x][y] = 0
			}
		}
	}
	return moved
}

func (g *Game) CheckGameState() {
	for x := 0; x < BoardSize; x++ {
		for y := 0; y < BoardSize; y++ {
			if g.Board[x][y] >= TargetNumber {
				g.Won = true
			}
		}
	}

	g.CanMove = g.checkCanMove()
	if !g.CanMove {
		g.Over = true
	}
}

func (g *Game) checkCanMove() bool {
	for x := 0; x < BoardSize; x++ {
		for y := 0; y < BoardSize; y++ {
			if g.Board[x][y] == 0 {
				return true
			}

			if x+1 < BoardSize && g.Board[x][y] == g.Board[x+1][y] {
				return true
			}
			if y+1 < BoardSize && g.Board[x][y] == g.Board[x][y+1] {
				return true
			}
		}
	}
	return false
}

func (g *Game) GetState() GameState {
	return GameState{
		Board:  g.Board,
		Score:  g.Score,
		Won:    g.Won,
		Over:   g.Over,
		CanMove: g.CanMove,
	}
}

func (g *Game) ToJSON() string {
	state := g.GetState()
	jsonData, _ := json.Marshal(state)
	return string(jsonData)
}
