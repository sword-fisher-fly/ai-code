// 象棋游戏状态管理Hook

import { useState, useEffect } from 'react';
import {
  initializeBoard,
  getPossibleMoves,
  isGameOver,
  getWinner,
  isCheckmate,
  isInCheck
} from '../utils/chessLogic.js';
import { getBestMove } from '../utils/minimaxAI.js';

const INITIAL_TIME = 300; // 5分钟 = 300秒

export const useChessGame = () => {
  const [board, setBoard] = useState(() => initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState('red'); // 红方先手
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [redTime, setRedTime] = useState(INITIAL_TIME);
  const [blackTime, setBlackTime] = useState(INITIAL_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);

  // 计时器效果
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      if (currentPlayer === 'red') {
        setRedTime(prev => {
          if (prev <= 1) {
            setGameOver(true);
            setWinner('black');
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime(prev => {
          if (prev <= 1) {
            setGameOver(true);
            setWinner('red');
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayer, gameOver]);

  // AI移动效果
  useEffect(() => {
    if (currentPlayer === 'black' && !gameOver && !isThinking) {
      setIsThinking(true);

      // 给AI一点思考时间，让游戏更真实
      setTimeout(() => {
        const bestMove = getBestMove(board, 'black', 3);

        if (bestMove) {
          const newBoard = board.map(row => [...row]);
          newBoard[bestMove.to[0]][bestMove.to[1]] = newBoard[bestMove.from[0]][bestMove.from[1]];
          newBoard[bestMove.from[0]][bestMove.from[1]] = null;

          setBoard(newBoard);
          setCurrentPlayer('red');
          setMoveHistory(prev => [...prev, {
            from: bestMove.from,
            to: bestMove.to,
            piece: bestMove.piece
          }]);
        }

        setIsThinking(false);
      }, 500);
    }
  }, [currentPlayer, gameOver, board, isThinking]);

  // 检查游戏结束 - 只在移动后检查
  useEffect(() => {
    if (gameOver) return;

    // 只在玩家切换时检查（红->黑 或 黑->红）
    if (currentPlayer === 'red') {
      // 刚轮到红方，检查黑方是否被将死
      if (isCheckmate(board, 'black')) {
        setGameOver(true);
        setWinner('red');
      }
    } else if (currentPlayer === 'black') {
      // 刚轮到黑方，检查红方是否被将死
      if (isCheckmate(board, 'red')) {
        setGameOver(true);
        setWinner('black');
      }
    }
  }, [currentPlayer, gameOver, board]);

  // 处理棋盘点击
  const handleSquareClick = (row, col) => {
    if (gameOver || isThinking) return;

    // 玩家点击棋盘
    if (currentPlayer === 'red') {
      const piece = board[row][col];

      // 如果点击的是己方棋子，选择它
      if (piece && piece.color === 'red') {
        setSelectedPiece([row, col]);
        setPossibleMoves(getPossibleMoves(board, row, col));
        return;
      }

      // 如果已选择棋子，尝试移动
      if (selectedPiece) {
        const isValidMove = possibleMoves.some(([r, c]) => r === row && c === col);

        if (isValidMove) {
          const newBoard = board.map(row => [...row]);
          newBoard[row][col] = newBoard[selectedPiece[0]][selectedPiece[1]];
          newBoard[selectedPiece[0]][selectedPiece[1]] = null;

          // 验证移动：不能导致自己被将军
          const pieceColor = newBoard[row][col].color;
          if (isInCheck(newBoard, pieceColor)) {
            // 不允许会导致自己被将军的移动
            setSelectedPiece(null);
            setPossibleMoves([]);
            return;
          }

          setBoard(newBoard);
          setCurrentPlayer('black');
          setSelectedPiece(null);
          setPossibleMoves([]);
          setMoveHistory(prev => [...prev, {
            from: selectedPiece,
            to: [row, col],
            piece: board[selectedPiece[0]][selectedPiece[1]]
          }]);
        } else {
          // 重新选择
          setSelectedPiece(null);
          setPossibleMoves([]);
        }
      }
    }
  };

  // 重新开始游戏
  const resetGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer('red');
    setSelectedPiece(null);
    setPossibleMoves([]);
    setRedTime(INITIAL_TIME);
    setBlackTime(INITIAL_TIME);
    setGameOver(false);
    setWinner(null);
    setIsThinking(false);
    setMoveHistory([]);
  };

  // 格式化时间
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    board,
    currentPlayer,
    selectedPiece,
    possibleMoves,
    redTime,
    blackTime,
    gameOver,
    winner,
    isThinking,
    moveHistory,
    handleSquareClick,
    resetGame,
    formatTime
  };
};