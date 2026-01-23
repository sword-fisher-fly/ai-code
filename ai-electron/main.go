package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/mux"
	"merge2048/game"
)

var currentGame *game.Game
var gameMutex sync.Mutex

func init() {
	currentGame = game.NewGame()
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api/game", getGameState).Methods("GET")
	r.HandleFunc("/api/move", makeMove).Methods("POST")
	r.HandleFunc("/api/new", startNewGame).Methods("POST")
	r.HandleFunc("/api/health", healthCheck).Methods("GET")

	r.PathPrefix("/").HandlerFunc(staticHandler)

	fmt.Println("服务器启动在 http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func getGameState(w http.ResponseWriter, r *http.Request) {
	gameMutex.Lock()
	defer gameMutex.Unlock()

	w.Header().Set("Content-Type", "application/json")
	if currentGame == nil {
		currentGame = game.NewGame()
	}
	json.NewEncoder(w).Encode(currentGame.GetState())
}

func makeMove(w http.ResponseWriter, r *http.Request) {
	gameMutex.Lock()
	defer gameMutex.Unlock()

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	direction := r.URL.Query().Get("direction")
	if direction == "" {
		http.Error(w, "Direction is required", http.StatusBadRequest)
		return
	}

	var dir game.Direction
	switch direction {
	case "up":
		dir = game.Up
	case "down":
		dir = game.Down
	case "left":
		dir = game.Left
	case "right":
		dir = game.Right
	default:
		http.Error(w, "Invalid direction", http.StatusBadRequest)
		return
	}

	if currentGame == nil {
		currentGame = game.NewGame()
	}

	currentGame.Move(dir)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(currentGame.GetState())
}

func startNewGame(w http.ResponseWriter, r *http.Request) {
	gameMutex.Lock()
	defer gameMutex.Unlock()

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	currentGame = game.NewGame()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(currentGame.GetState())
}

func staticHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		http.ServeFile(w, r, "frontend/renderer/index.html")
	} else if r.URL.Path == "/style.css" {
		w.Header().Set("Content-Type", "text/css")
		http.ServeFile(w, r, "frontend/renderer/style.css")
	} else if r.URL.Path == "/renderer.js" {
		w.Header().Set("Content-Type", "application/javascript")
		http.ServeFile(w, r, "frontend/renderer/renderer.js")
	} else {
		http.NotFound(w, r)
	}
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte("OK"))
}
