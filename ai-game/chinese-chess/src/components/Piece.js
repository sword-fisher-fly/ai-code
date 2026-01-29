// 棋子组件

import React from 'react';

const Piece = ({ piece, isSelected, onClick }) => {
  if (!piece) return null;

  const pieceStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '3px solid #8B4513',
    backgroundColor: piece.color === 'red' ? '#FFD700' : '#8B4513',
    color: piece.color === 'red' ? '#8B0000' : '#FFD700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'serif',
    cursor: 'pointer',
    transition: 'all 0.2s',
    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
    boxShadow: isSelected
      ? '0 0 10px #FFD700, 0 2px 4px rgba(0,0,0,0.3)'
      : '0 2px 4px rgba(0,0,0,0.3)',
    zIndex: isSelected ? 10 : 1
  };

  return (
    <div
      style={pieceStyle}
      onClick={onClick}
    >
      {piece.name}
    </div>
  );
};

export default Piece;