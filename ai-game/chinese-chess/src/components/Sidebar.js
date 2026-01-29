// 侧边栏组件

import React from 'react';

const Sidebar = ({
  currentPlayer,
  redTime,
  blackTime,
  isThinking,
  winner,
  onResetGame
}) => {
  const sidebarStyle = {
    width: '300px',
    backgroundColor: '#F5DEB3',
    border: '3px solid #8B4513',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
  };

  const playerBoxStyle = (color, isActive) => ({
    backgroundColor: isActive ? '#D2691E' : '#CD853F',
    color: color === 'red' ? '#8B0000' : '#000',
    padding: '15px',
    borderRadius: '8px',
    border: isActive ? '3px solid #FFD700' : '2px solid #8B4513',
    boxShadow: isActive ? '0 0 15px rgba(255, 215, 0, 0.5)' : '0 2px 4px rgba(0,0,0,0.3)',
    transition: 'all 0.3s'
  });

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#8B4513',
    textAlign: 'center',
    borderBottom: '2px solid #8B4513',
    paddingBottom: '10px'
  };

  const timeStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginTop: '10px',
    color: redTime < 30 || blackTime < 30 ? '#FF0000' : '#000'
  };

  const statusStyle = {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px',
    backgroundColor: '#D2691E',
    color: '#FFD700',
    borderRadius: '5px',
    border: '2px solid #8B4513'
  };

  const resetButtonStyle = {
    padding: '15px 30px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#8B4513',
    color: '#FFD700',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={titleStyle}>中国象棋</h2>

      <div style={playerBoxStyle('red', currentPlayer === 'red')}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          红方 (玩家)
        </div>
        <div style={{ fontSize: '14px', marginTop: '5px' }}>
          {currentPlayer === 'red' ? '轮到您' : '等待中'}
        </div>
        <div style={timeStyle}>
          {Math.floor(redTime / 60)
            .toString()
            .padStart(2, '0')}:
          {(redTime % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div style={playerBoxStyle('black', currentPlayer === 'black')}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          黑方 (AI)
        </div>
        <div style={{ fontSize: '14px', marginTop: '5px' }}>
          {isThinking ? '思考中...' : currentPlayer === 'black' ? '轮到AI' : '等待中'}
        </div>
        <div style={timeStyle}>
          {Math.floor(blackTime / 60)
            .toString()
            .padStart(2, '0')}:
          {(blackTime % 60).toString().padStart(2, '0')}
        </div>
      </div>

      {winner && (
        <div style={statusStyle}>
          {winner === 'red' ? '红方获胜！' : '黑方获胜！'}
        </div>
      )}

      <button
        style={resetButtonStyle}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#A0522D';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#8B4513';
          e.target.style.transform = 'scale(1)';
        }}
        onClick={onResetGame}
      >
        重新开始
      </button>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#CD853F', borderRadius: '8px', fontSize: '14px', color: '#333' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#8B4513' }}>游戏说明：</h3>
        <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>红方为先手，由玩家控制</li>
          <li>黑方为后手，由AI控制</li>
          <li>每方限时5分钟</li>
          <li>将死对方即可获胜</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;