// 中国象棋游戏逻辑

// 棋子类型：帅/将、仕/士、相/象、马、车、炮、兵/卒
export const PIECE_TYPES = {
  KING: 'king',    // 帅/将
  ADVISOR: 'advisor', // 仕/士
  ELEPHANT: 'elephant', // 相/象
  HORSE: 'horse',    // 马
  ROOK: 'rook',      // 车
  CANNON: 'cannon',  // 炮
  PAWN: 'pawn'       // 兵/卒
};

// 棋盘大小
export const BOARD_SIZE = 10; // 10行棋盘 + 1行楚河汉界（不计入棋盘逻辑）
export const BOARD_WIDTH = 9;

// 找到帅/将的位置
export const findKing = (board, color) => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_WIDTH; j++) {
      const piece = board[i][j];
      if (piece && piece.type === PIECE_TYPES.KING && piece.color === color) {
        return [i, j];
      }
    }
  }
  return null;
};

// 初始化棋盘
export const initializeBoard = () => {
  const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_WIDTH).fill(null));

  // 红方棋子 (下方)
  board[0][0] = { type: PIECE_TYPES.ROOK, color: 'black', name: '車' };
  board[0][1] = { type: PIECE_TYPES.HORSE, color: 'black', name: '馬' };
  board[0][2] = { type: PIECE_TYPES.ELEPHANT, color: 'black', name: '相' };
  board[0][3] = { type: PIECE_TYPES.ADVISOR, color: 'black', name: '仕' };
  board[0][4] = { type: PIECE_TYPES.KING, color: 'black', name: '將' };
  board[0][5] = { type: PIECE_TYPES.ADVISOR, color: 'black', name: '仕' };
  board[0][6] = { type: PIECE_TYPES.ELEPHANT, color: 'black', name: '相' };
  board[0][7] = { type: PIECE_TYPES.HORSE, color: 'black', name: '馬' };
  board[0][8] = { type: PIECE_TYPES.ROOK, color: 'black', name: '車' };

  board[2][1] = { type: PIECE_TYPES.CANNON, color: 'black', name: '炮' };
  board[2][7] = { type: PIECE_TYPES.CANNON, color: 'black', name: '炮' };

  board[3][0] = { type: PIECE_TYPES.PAWN, color: 'black', name: '卒' };
  board[3][2] = { type: PIECE_TYPES.PAWN, color: 'black', name: '卒' };
  board[3][4] = { type: PIECE_TYPES.PAWN, color: 'black', name: '卒' };
  board[3][6] = { type: PIECE_TYPES.PAWN, color: 'black', name: '卒' };
  board[3][8] = { type: PIECE_TYPES.PAWN, color: 'black', name: '卒' };

  // 红方棋子 (上方)
  board[7][0] = { type: PIECE_TYPES.ROOK, color: 'red', name: '車' };
  board[7][1] = { type: PIECE_TYPES.HORSE, color: 'red', name: '馬' };
  board[7][2] = { type: PIECE_TYPES.ELEPHANT, color: 'red', name: '相' };
  board[7][3] = { type: PIECE_TYPES.ADVISOR, color: 'red', name: '仕' };
  board[7][4] = { type: PIECE_TYPES.KING, color: 'red', name: '帥' };
  board[7][5] = { type: PIECE_TYPES.ADVISOR, color: 'red', name: '仕' };
  board[7][6] = { type: PIECE_TYPES.ELEPHANT, color: 'red', name: '相' };
  board[7][7] = { type: PIECE_TYPES.HORSE, color: 'red', name: '馬' };
  board[7][8] = { type: PIECE_TYPES.ROOK, color: 'red', name: '車' };

  board[6][1] = { type: PIECE_TYPES.CANNON, color: 'red', name: '炮' };
  board[6][7] = { type: PIECE_TYPES.CANNON, color: 'red', name: '炮' };

  board[5][0] = { type: PIECE_TYPES.PAWN, color: 'red', name: '兵' };
  board[5][2] = { type: PIECE_TYPES.PAWN, color: 'red', name: '兵' };
  board[5][4] = { type: PIECE_TYPES.PAWN, color: 'red', name: '兵' };
  board[5][6] = { type: PIECE_TYPES.PAWN, color: 'red', name: '兵' };
  board[5][8] = { type: PIECE_TYPES.PAWN, color: 'red', name: '兵' };

  return board;
};

// 检查位置是否在棋盘内
export const isValidPosition = (row, col) => {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_WIDTH;
};

// 检查位置是否在九宫格内（帅/将和仕/士的活动范围）
export const isInPalace = (row, col, color) => {
  if (color === 'red') {
    return row >= 7 && row <= 9 && col >= 3 && col <= 5;
  } else {
    return row >= 0 && row <= 2 && col >= 3 && col <= 5;
  }
};

// 检查位置是否在己方半场（相/象的活动范围）
export const isInOwnSide = (row, color) => {
  if (color === 'red') {
    return row >= 5;
  } else {
    return row <= 4;
  }
};

// 获取棋子的所有可能移动位置
export const getPossibleMoves = (board, row, col) => {
  const piece = board[row][col];
  if (!piece) return [];

  const moves = [];
  const { type, color } = piece;

  switch (type) {
    case PIECE_TYPES.KING:
      return getKingMoves(board, row, col, color);
    case PIECE_TYPES.ADVISOR:
      return getAdvisorMoves(board, row, col, color);
    case PIECE_TYPES.ELEPHANT:
      return getElephantMoves(board, row, col, color);
    case PIECE_TYPES.HORSE:
      return getHorseMoves(board, row, col);
    case PIECE_TYPES.ROOK:
      return getRookMoves(board, row, col);
    case PIECE_TYPES.CANNON:
      return getCannonMoves(board, row, col);
    case PIECE_TYPES.PAWN:
      return getPawnMoves(board, row, col, color);
    default:
      return moves;
  }
};

// 帅/将的移动规则
const getKingMoves = (board, row, col, color) => {
  const moves = [];
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (isValidPosition(newRow, newCol) && isInPalace(newRow, newCol, color)) {
      const targetPiece = board[newRow][newCol];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push([newRow, newCol]);
      }
    }
  }

  return moves;
};

// 仕/士的移动规则
const getAdvisorMoves = (board, row, col, color) => {
  const moves = [];
  const diagonalDirections = [
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];

  for (const [dx, dy] of diagonalDirections) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (isValidPosition(newRow, newCol) && isInPalace(newRow, newCol, color)) {
      const targetPiece = board[newRow][newCol];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push([newRow, newCol]);
      }
    }
  }

  return moves;
};

// 相/象的移动规则
const getElephantMoves = (board, row, col, color) => {
  const moves = [];
  const elephantDirections = [
    [[-2, -2], [-1, -1]], [[-2, 2], [-1, 1]],
    [[2, -2], [1, -1]], [[2, 2], [1, 1]]
  ];

  for (const [[moveRow, moveCol], [blockRow, blockCol]] of elephantDirections) {
    const newRow = row + moveRow;
    const newCol = col + moveCol;
    const blockPieceRow = row + blockRow;
    const blockPieceCol = col + blockCol;

    if (isValidPosition(newRow, newCol) && isInOwnSide(newRow, color)) {
      // 检查是否被塞象眼
      if (!board[blockPieceRow][blockPieceCol]) {
        const targetPiece = board[newRow][newCol];
        if (!targetPiece || targetPiece.color !== color) {
          moves.push([newRow, newCol]);
        }
      }
    }
  }

  return moves;
};

// 马的移动规则
const getHorseMoves = (board, row, col) => {
  const moves = [];
  const piece = board[row][col];
  if (!piece) return moves;

  // 马的8个可能移动方向
  const horseSteps = [
    [-2, -1], [-2, 1],   // 上方两步 + 左右各一步
    [-1, -2], [-1, 2],   // 水平两步 + 上下各一步
    [1, -2], [1, 2],     // 水平两步 + 上下各一步
    [2, -1], [2, 1]      // 下方两步 + 左右各一步
  ];

  // 相应的蹩马腿位置（移动方向的一半）
  const blockOffsets = [
    [-1, 0], [-1, 0],    // 上两步：蹩上方一格
    [0, -1], [0, 1],     // 水平两步：蹩水平一格
    [0, -1], [0, 1],     // 水平两步：蹩水平一格
    [1, 0], [1, 0]       // 下两步：蹩下方一格
  ];

  for (let i = 0; i < horseSteps.length; i++) {
    const [stepRow, stepCol] = horseSteps[i];
    const [blockRow, blockCol] = blockOffsets[i];

    const newRow = row + stepRow;
    const newCol = col + stepCol;
    const blockPositionRow = row + blockRow;
    const blockPositionCol = col + blockCol;

    // 检查新位置是否在棋盘内
    if (!isValidPosition(newRow, newCol)) continue;

    // 检查是否被蹩马腿
    if (isValidPosition(blockPositionRow, blockPositionCol)) {
      if (board[blockPositionRow][blockPositionCol]) {
        continue;
      }
    }

    // 检查目标位置
    const targetPiece = board[newRow][newCol];
    if (!targetPiece || targetPiece.color !== piece.color) {
      moves.push([newRow, newCol]);
    }
  }

  return moves;
};

// 车的移动规则
const getRookMoves = (board, row, col) => {
  const moves = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (const [dx, dy] of directions) {
    for (let i = 1; i < BOARD_SIZE; i++) {
      const newRow = row + dx * i;
      const newCol = col + dy * i;

      if (!isValidPosition(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];
      if (targetPiece) {
        if (targetPiece.color !== board[row][col].color) {
          moves.push([newRow, newCol]);
        }
        break;
      }

      moves.push([newRow, newCol]);
    }
  }

  return moves;
};

// 炮的移动规则
const getCannonMoves = (board, row, col) => {
  const moves = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (const [dx, dy] of directions) {
    let foundBarrier = false;

    for (let i = 1; i < BOARD_SIZE; i++) {
      const newRow = row + dx * i;
      const newCol = col + dy * i;

      if (!isValidPosition(newRow, newCol)) break;

      const targetPiece = board[newRow][newCol];

      if (!foundBarrier) {
        if (targetPiece) {
          foundBarrier = true;
        } else {
          moves.push([newRow, newCol]);
        }
      } else {
        if (targetPiece) {
          if (targetPiece.color !== board[row][col].color) {
            moves.push([newRow, newCol]);
          }
          break;
        }
      }
    }
  }

  return moves;
};

// 兵/卒的移动规则
const getPawnMoves = (board, row, col, color) => {
  const moves = [];
  const direction = color === 'red' ? -1 : 1;

  // 向前移动
  const forwardRow = row + direction;
  if (isValidPosition(forwardRow, col)) {
    const targetPiece = board[forwardRow][col];
    if (!targetPiece || targetPiece.color !== color) {
      moves.push([forwardRow, col]);
    }
  }

  // 过河后可以左右移动
  const hasCrossedRiver = color === 'red' ? row <= 4 : row >= 5;
  if (hasCrossedRiver) {
    const leftCol = col - 1;
    const rightCol = col + 1;

    if (isValidPosition(row, leftCol)) {
      const targetPiece = board[row][leftCol];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push([row, leftCol]);
      }
    }

    if (isValidPosition(row, rightCol)) {
      const targetPiece = board[row][rightCol];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push([row, rightCol]);
      }
    }
  }

  return moves;
};

// 检查是否在将军状态
export const isInCheck = (board, row, col, color) => {
  const kingPos = findKing(board, color);
  if (!kingPos) return false;

  // 检查所有对方棋子是否能攻击到己方的帅/将
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_WIDTH; j++) {
      const piece = board[i][j];
      if (piece && piece.color !== color) {
        const possibleMoves = getPossibleMoves(board, i, j);
        if (possibleMoves.some(([r, c]) => r === kingPos[0] && c === kingPos[1])) {
          return true;
        }
      }
    }
  }

  return false;
};

// 检查是否将死
export const isCheckmate = (board, color) => {
  // 如果不在将军状态，不是将死
  const kingPos = findKing(board, color);
  if (!kingPos) return true; // 如果找不到王，说明已经被将死
  if (!isInCheck(board, kingPos[0], kingPos[1], color)) {
    return false;
  }

  // 检查是否有合法移动可以解除将军
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_WIDTH; j++) {
      const piece = board[i][j];
      if (piece && piece.color === color) {
        const possibleMoves = getPossibleMoves(board, i, j);
        for (const [newRow, newCol] of possibleMoves) {
          // 模拟移动
          const newBoard = board.map(row => [...row]);
          newBoard[newRow][newCol] = newBoard[i][j];
          newBoard[i][j] = null;

          // 检查移动后是否还在将军
          if (!isInCheck(newBoard, newRow, newCol, color)) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

// 检查游戏是否结束
export const isGameOver = (board) => {
  const redKing = findKing(board, 'red');
  const blackKing = findKing(board, 'black');

  if (!redKing || !blackKing) return true;

  if (isCheckmate(board, 'red')) return true;
  if (isCheckmate(board, 'black')) return true;

  return false;
};

// 获取获胜方
export const getWinner = (board) => {
  if (isCheckmate(board, 'red')) return 'black';
  if (isCheckmate(board, 'black')) return 'red';
  return null;
};