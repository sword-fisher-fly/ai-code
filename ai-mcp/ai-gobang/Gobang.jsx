import { useState, useEffect, useCallback } from 'react'
import './Gobang.css'

const BOARD_SIZE = 15
const WIN_TIMEOUT = 5 * 60 // 5分钟

// 检查是否五连珠
function checkWin(board, row, col, player) {
  const directions = [
    [[0, 1], [0, -1]],   // 水平
    [[1, 0], [-1, 0]],   // 垂直
    [[1, 1], [-1, -1]], // 主对角线
    [[1, -1], [-1, 1]]  // 副对角线
  ]

  for (const [dir1, dir2] of directions) {
    let count = 1

    // 正方向
    for (let i = 1; i < 5; i++) {
      const r = row + dir1[0] * i
      const c = col + dir1[1] * i
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) break
      count++
    }

    // 反方向
    for (let i = 1; i < 5; i++) {
      const r = row + dir2[0] * i
      const c = col + dir2[1] * i
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) break
      count++
    }

    if (count >= 5) return true
  }
  return false
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function Gobang() {
  const [board, setBoard] = useState(
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  )
  const [currentPlayer, setCurrentPlayer] = useState('black')
  const [winner, setWinner] = useState(null)
  const [blackTime, setBlackTime] = useState(WIN_TIMEOUT)
  const [whiteTime, setWhiteTime] = useState(WIN_TIMEOUT)
  const [isGameOver, setIsGameOver] = useState(false)

  // 计时器
  useEffect(() => {
    if (isGameOver || winner) return

    const timer = setInterval(() => {
      if (currentPlayer === 'black') {
        setBlackTime(prev => {
          if (prev <= 1) {
            setWinner('white')
            setIsGameOver(true)
            return 0
          }
          return prev - 1
        })
      } else {
        setWhiteTime(prev => {
          if (prev <= 1) {
            setWinner('black')
            setIsGameOver(true)
            return 0
          }
          return prev - 1
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [currentPlayer, isGameOver, winner])

  const handleClick = useCallback((row, col) => {
    if (isGameOver || winner || board[row][col]) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    if (checkWin(newBoard, row, col, currentPlayer)) {
      setWinner(currentPlayer)
      setIsGameOver(true)
    } else {
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black')
    }
  }, [board, currentPlayer, isGameOver, winner])

  const handleRestart = () => {
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)))
    setCurrentPlayer('black')
    setWinner(null)
    setBlackTime(WIN_TIMEOUT)
    setWhiteTime(WIN_TIMEOUT)
    setIsGameOver(false)
  }

  return (
    <div className="gobang-container">
      <div className="left-panel">
        <div className="timer-section">
          <div className={`timer ${currentPlayer === 'black' ? 'active' : ''} ${blackTime <= 30 ? 'warning' : ''}`}>
            <span className="timer-label">黑方</span>
            <span className="timer-value">{formatTime(blackTime)}</span>
          </div>
          <div className={`timer ${currentPlayer === 'white' ? 'active' : ''} ${whiteTime <= 30 ? 'warning' : ''}`}>
            <span className="timer-label">白方</span>
            <span className="timer-value">{formatTime(whiteTime)}</span>
          </div>
        </div>
        <button className="restart-btn" onClick={handleRestart}>重新开始</button>
        <div className="status">
          {winner ? (
            <span className="winner-text">游戏结束</span>
          ) : (
            <span>当前回合: {currentPlayer === 'black' ? '黑方' : '白方'}</span>
          )}
        </div>
      </div>

      <div className="right-panel">
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className="board-cell"
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {cell && <div className={`piece ${cell}`}></div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {winner && (
        <div className="win-dialog">
          <div className="win-dialog-content">
            <div className="lightning">⚡</div>
            <div className="winner-announcement">
              {winner === 'black' ? '黑方' : '白方'}获胜！
            </div>
            <button onClick={handleRestart}>再来一局</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gobang
