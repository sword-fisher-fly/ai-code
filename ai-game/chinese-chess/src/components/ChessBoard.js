// 棋盘组件

import React from 'react';
import Piece from './Piece';

const ChessBoard = ({ board, selectedPiece, possibleMoves, onSquareClick }) => {
  const boardStyle = {
    width: '540px',
    height: '540px',
    backgroundColor: '#DEB887',
    border: '5px solid #8B4513',
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'repeat(9, 1fr)',
    gridTemplateColumns: 'repeat(9, 1fr)',
    gap: '0',
    boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
  };

  const isSelected = (row, col) => {
    return selectedPiece && selectedPiece[0] === row && selectedPiece[1] === col;
  };

  const isPossibleMove = (row, col) => {
    return possibleMoves.some(([r, c]) => r === row && c === col);
  };

  const squareStyle = (row, col) => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    };

    // 棋子居中显示，不偏移
    const piece = board[row][col];
    if (piece) {
      baseStyle.zIndex = 5;
    }

    if (isSelected(row, col)) {
      baseStyle.backgroundColor = 'rgba(255, 215, 0, 0.5)';
    } else if (isPossibleMove(row, col)) {
      baseStyle.backgroundColor = 'rgba(255, 255, 0, 0.3)';
    }

    return baseStyle;
  };

  const renderGridLines = () => {
    const lines = [];

    // 竖直线（经线）- 以四个车为基准等分（9列）
    for (let i = 0; i <= 9; i++) {
      const x = (480 / 8) * i;
      lines.push(
        <line
          key={`v-${i}`}
          x1={x}
          y1={30}
          x2={x}
          y2={510}
          stroke="#8B4513"
          strokeWidth="1.5"
        />
      );
    }

    // 横直线（纬线）- 以四个车为基准等分（9行）
    for (let i = 0; i <= 9; i++) {
      const y = 30 + (480 / 8) * i;
      lines.push(
        <line
          key={`h-${i}`}
          x1={0}
          y1={y}
          x2={480}
          y2={y}
          stroke="#8B4513"
          strokeWidth="1.5"
        />
      );
    }

    // 红方九宫格斜线（以车的中心为基准）
    lines.push(
      <line
        key="red-1"
        x1="180"
        y1="330"
        x2="300"
        y2="450"
        stroke="#8B4513"
        strokeWidth="2"
      />,
      <line
        key="red-2"
        x1="300"
        y1="330"
        x2="180"
        y2="450"
        stroke="#8B4513"
        strokeWidth="2"
      />
    );

    // 黑方九宫格斜线（以车的中心为基准）
    lines.push(
      <line
        key="black-1"
        x1="180"
        y1="30"
        x2="300"
        y2="90"
        stroke="#8B4513"
        strokeWidth="2"
      />,
      <line
        key="black-2"
        x1="300"
        y1="30"
        x2="180"
        y2="90"
        stroke="#8B4513"
        strokeWidth="2"
      />
    );

    return lines;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 列号显示 */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '30px',
          width: '480px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#8B4513',
          fontFamily: 'serif'
        }}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={`col-${i}`}
            style={{
              width: `${480 / 8}px`,
              textAlign: 'center'
            }}
          >
            {i}
          </div>
        ))}
      </div>

      {/* 行号显示 */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          left: '0',
          width: '30px',
          height: '480px',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#8B4513',
          fontFamily: 'serif'
        }}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={`row-${i}`}
            style={{
              height: `${480 / 8}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {i}
          </div>
        ))}
      </div>

      <div style={boardStyle}>
        {board.map((row, rowIndex) => {
          // 第8行为楚河汉界行，合并显示
          if (rowIndex === 8) {
            return (
              <div
                key="chuhe-hanjie"
                style={{
                  gridColumn: '1 / -1',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 60px',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#8B4513',
                  fontFamily: 'serif',
                  backgroundColor: '#DEB887',
                  pointerEvents: 'none'
                }}
              >
                <span>楚河</span>
                <span>汉界</span>
              </div>
            );
          }

          return row.map((piece, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={squareStyle(rowIndex, colIndex)}
              onClick={() => onSquareClick(rowIndex, colIndex)}
            >
              {piece && (
                <Piece
                  piece={piece}
                  isSelected={isSelected(rowIndex, colIndex)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSquareClick(rowIndex, colIndex);
                  }}
                />
              )}
              {isPossibleMove(rowIndex, colIndex) && !piece && (
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    border: '2px solid #8B4513'
                  }}
                />
              )}
            </div>
          ));
        })}
      </div>
      <svg
        style={{
          position: 'absolute',
          top: '0',
          left: '30px',
          width: '480px',
          height: '540px',
          pointerEvents: 'none'
        }}
      >
        {renderGridLines()}
      </svg>
    </div>
  );
};

export default ChessBoard;