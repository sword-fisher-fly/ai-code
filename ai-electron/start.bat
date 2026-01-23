@echo off
echo 启动 2024 合并游戏...
echo.

if exist "merge2048.exe" (
    echo 使用已编译的二进制文件启动...
    merge2048.exe
) else if exist "build\merge2048-windows.exe" (
    echo 使用已编译的二进制文件启动...
    build\merge2048-windows.exe
) else (
    echo 错误: 找不到 merge2048.exe
    echo 请先运行 make build-windows 或确保已安装 Go
    pause
    exit /b 1
)
