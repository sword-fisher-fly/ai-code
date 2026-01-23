@echo off
chcp 65001 >nul

echo ======================================
echo   2048 Game - 10x10 网格版
echo ======================================
echo.

:: 检查Go是否安装
go version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未检测到 Go 语言
    echo 请访问 https://golang.org/dl/ 安装 Go 1.21+
    pause
    exit /b 1
)

echo ✅ Go 已安装
echo.

:: 检查依赖
echo 📦 正在检查依赖...
if not exist go.mod (
    echo ❌ 错误: 未找到 go.mod 文件
    echo 请确保在项目根目录运行此脚本
    pause
    exit /b 1
)

:: 下载依赖
echo 📥 正在下载 Go 依赖...
go mod tidy
if errorlevel 1 (
    echo ❌ 依赖下载失败
    pause
    exit /b 1
)

echo ✅ 依赖下载完成
echo.

:: 启动游戏
echo 🎮 启动游戏...
echo.
echo 游戏控制:
echo   ← ↑ → ↓ 或 WASD  - 移动方块
echo   R                  - 重新开始
echo.
echo 按 Ctrl+C 退出游戏
echo.

:: 运行游戏
go run .

:: 检查退出状态
if errorlevel 1 (
    echo.
    echo ❌ 游戏运行失败
    echo 请检查错误信息并确保所有依赖已正确安装
    pause
    exit /b 1
)

echo.
echo 👋 感谢游戏！
pause