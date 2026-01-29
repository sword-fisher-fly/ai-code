// Minimax AI算法实现

import {
  getPossibleMoves,
  isCheckmate,
  findKing,
  isInCheck
} from './chessLogic.js';

// 棋子的分值
const PIECE_VALUES = {
  king: 10000,
  advisor: 20,
  elephant: 20,
  horse: 40,
  rook: 90,
  cannon: 45,
  pawn: 10
};

// 位置评估函数
const evaluatePosition = (board, color) => {
  let score = 0;

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const piece = board[row][col];
      if (piece) {
        const pieceValue = PIECE_VALUES[piece.type] || 0;
        const positionBonus = getPositionBonus(piece, row, col);
        const totalValue = pieceValue + positionBonus;

        if (piece.color === color) {
          score += totalValue;
        } else {
          score -= totalValue;
        }
      }
    }
  }

  // 检查将军状态
  if (isInCheck(board, ...findKing(board, color), color)) {
    score -= 50;
  }
  if (isInCheck(board, ...findKing(board, color === 'red' ? 'black' : 'red'), color === 'red' ? 'black' : 'red')) {
    score += 50;
  }

  return score;
};

// 位置奖励分数
const getPositionBonus = (piece, row, col) => {
  const { type, color } = piece;
  let bonus = 0;

  switch (type) {
    case 'pawn':
      if (color === 'red') {
        bonus = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1],
          [10, 10, 10, 10, 10, 10, 10, 10, 10],
          [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
      } else {
        bonus = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [10, 10, 10, 10, 10, 10, 10, 10, 10],
          [1, 1, 1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
      }
      return bonus[row][col];

    case 'horse':
      // 马的灵活性分数
      const mobilityBonus = [
        [0, 3, 6, 9, 12, 9, 6, 3, 0],
        [3, 6, 9, 12, 15, 12, 9, 6, 3],
        [0, 3, 16, 18, 16, 18, 16, 3, 0],
        [3, 8, 19, 24, 27, 24, 19, 8, 3],
        [0, 3, 16, 18, 16, 18, 16, 3, 0],
        [3, 6, 9, 12, 15, 12, 9, 6, 3],
        [0, 3, 6, 9, 12, 9, 6, 3, 0]
      ];
      return mobilityBonus[row] ? mobilityBonus[row][col] || 0 : 0;

    case 'cannon':
      // 炮的位置分数
      if (color === 'red') {
        return [6, 4, 0, 10, 12, 10, 0, 4, 6][col];
      } else {
        return [6, 4, 0, 10, 12, 10, 0, 4, 6][col];
      }

    case 'rook':
      // 车的中心化分数
      return Math.max(0, 4 - Math.abs(4 - col)) * 2;

    default:
      return 0;
  }
};

// Minimax算法with Alpha-Beta剪枝
const minimax = (board, depth, alpha, beta, maximizingPlayer, color) => {
  if (depth === 0 || isCheckmate(board, color) || isCheckmate(board, color === 'red' ? 'black' : 'red')) {
    return evaluatePosition(board, color);
  }

  const currentColor = maximizingPlayer ? color : (color === 'red' ? 'black' : 'red');

  // 获取所有可能的移动
  const moves = getAllPossibleMoves(board, currentColor);

  if (moves.length === 0) {
    return evaluatePosition(board, color);
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of moves) {
      const newBoard = makeMove(board, move);
      const evaluation = minimax(newBoard, depth - 1, alpha, beta, false, color);
      if (evaluation > maxEval) {
        maxEval = evaluation;
      }
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        break; // Alpha-Beta剪枝
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      const newBoard = makeMove(board, move);
      const evaluation = minimax(newBoard, depth - 1, alpha, beta, true, color);
      if (evaluation < minEval) {
        minEval = evaluation;
      }
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        break; // Alpha-Beta剪枝
      }
    }
    return minEval;
  }
};

// 获取所有可能移动
const getAllPossibleMoves = (board, color) => {
  const moves = [];

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const possibleMoves = getPossibleMoves(board, row, col);
        for (const [newRow, newCol] of possibleMoves) {
          moves.push({
            from: [row, col],
            to: [newRow, newCol],
            piece: piece
          });
        }
      }
    }
  }

  return moves;
};

// 执行移动
const makeMove = (board, move) => {
  const newBoard = board.map(row => [...row]);
  const { from, to } = move;
  newBoard[to[0]][to[1]] = newBoard[from[0]][from[1]];
  newBoard[from[0]][from[1]] = null;
  return newBoard;
};

// 获取AI的最佳移动
export const getBestMove = (board, color, depth = 3) => {
  let bestMove = null;
  let bestValue = -Infinity;
  let alpha = -Infinity;
  let beta = Infinity;

  const moves = getAllPossibleMoves(board, color);

  if (moves.length === 0) {
    return null;
  }

  // 按启发式排序移动
  moves.sort((a, b) => {
    const aValue = evaluateMove(board, a);
    const bValue = evaluateMove(board, b);
    return bValue - aValue;
  });

  for (const move of moves) {
    const newBoard = makeMove(board, move);
    const moveValue = minimax(newBoard, depth - 1, alpha, beta, false, color);

    if (moveValue > bestValue) {
      bestValue = moveValue;
      bestMove = move;
    }

    alpha = Math.max(alpha, moveValue);
  }

  return bestMove;
};

// 评估移动的启发式函数
const evaluateMove = (board, move) => {
  const { to, piece } = move;
  const targetPiece = board[to[0]][to[1]];

  let score = 0;

  // 吃子奖励
  if (targetPiece) {
    const targetValue = PIECE_VALUES[targetPiece.type] || 0;
    const pieceValue = PIECE_VALUES[piece.type] || 0;
    score += targetValue * 10 - pieceValue;
  }

  // 位置奖励
  score += getPositionBonus(piece, to[0], to[1]);

  // 移动到中心奖励
  const centerDistance = Math.abs(to[1] - 4);
  score += (4 - centerDistance) * 2;

  return score;
};