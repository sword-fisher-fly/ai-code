// 主App组件

import React from 'react';
import ChessBoard from './components/ChessBoard';
import Sidebar from './components/Sidebar';
import GameOverModal from './components/GameOverModal';
import { useChessGame } from './hooks/useChessGame';
import './App.css';

function App() {
  const {
    board,
    currentPlayer,
    selectedPiece,
    possibleMoves,
    redTime,
    blackTime,
    gameOver,
    winner,
    isThinking,
    handleSquareClick,
    resetGame
  } = useChessGame();

  const appStyle = {
    minHeight: '100vh',
    backgroundColor: '#2C1810',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'serif'
  };

  const containerStyle = {
    display: 'flex',
    gap: '30px',
    backgroundColor: '#8B4513',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
    border: '5px solid #654321'
  };

  return (
    <div style={appStyle}>
      <div style={containerStyle}>
        <Sidebar
          currentPlayer={currentPlayer}
          redTime={redTime}
          blackTime={blackTime}
          isThinking={isThinking}
          winner={winner}
          onResetGame={resetGame}
        />
        <ChessBoard
          board={board}
          selectedPiece={selectedPiece}
          possibleMoves={possibleMoves}
          onSquareClick={handleSquareClick}
        />
      </div>

      {gameOver && (
        <GameOverModal
          winner={winner}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}

export default App;
