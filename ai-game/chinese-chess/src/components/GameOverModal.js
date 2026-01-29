// 获胜弹窗组件

import React from 'react';

const GameOverModal = ({ winner, onRestart }) => {
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: '#F5DEB3',
    padding: '40px',
    borderRadius: '15px',
    border: '5px solid #8B4513',
    boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
    textAlign: 'center',
    minWidth: '400px',
    animation: 'fadeIn 0.3s ease-in'
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  };

  const winnerTextStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: winner === 'red' ? '#8B0000' : '#000',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#DEB887',
    borderRadius: '10px',
    border: '3px solid #8B4513'
  };

  const buttonStyle = {
    padding: '15px 40px',
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: '#8B4513',
    color: '#FFD700',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <div style={titleStyle}>游戏结束</div>
        <div style={winnerTextStyle}>
          {winner === 'red' ? '🎉 红方获胜！' : '🤖 黑方(AI)获胜！'}
        </div>
        <button
          style={buttonStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#A0522D';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#8B4513';
            e.target.style.transform = 'scale(1)';
          }}
          onClick={onRestart}
        >
          重新开始
        </button>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default GameOverModal;