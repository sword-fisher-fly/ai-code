#!/bin/bash

# 2048 Game 快速启动脚本

echo "======================================"
echo "  2048 Game - 10x10 网格版"
echo "======================================"
echo ""

# 检查Go是否安装
if ! command -v go &> /dev/null; then
    echo "❌ 错误: 未检测到 Go 语言"
    echo "请访问 https://golang.org/dl/ 安装 Go 1.21+"
    exit 1
fi

echo "✅ Go 版本: $(go version)"
echo ""

# 检查并安装依赖
echo "📦 正在检查依赖..."
if [ ! -f go.mod ]; then
    echo "❌ 错误: 未找到 go.mod 文件"
    echo "请确保在项目根目录运行此脚本"
    exit 1
fi

# 下载依赖
echo "📥 正在下载 Go 依赖..."
go mod tidy
if [ $? -ne 0 ]; then
    echo "❌ 依赖下载失败"
    exit 1
fi

echo "✅ 依赖下载完成"
echo ""

# 检查系统依赖
echo "🔍 检查系统依赖..."
UNAME=$(uname -s)

if [ "$UNAME" = "Linux" ]; then
    echo "检测到 Linux 系统"
    if ! pkg-config --exists x11; then
        echo "⚠️  警告: 缺少 X11 库"
        echo "请运行以下命令安装依赖:"
        echo "  Ubuntu/Debian: sudo apt-get install libx11-dev libxrandr-dev libxcursor-dev libxi-dev libxinerama-dev libgl1-mesa-dev"
        echo "  CentOS/RHEL:   sudo yum install libX11-devel libXrandr-devel libXcursor-devel libXi-devel libXinerama-devel mesa-libGL-devel"
        echo ""
        read -p "是否继续尝试运行？(y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        echo "✅ X11 库已安装"
    fi
elif [ "$UNAME" = "Darwin" ]; then
    echo "检测到 macOS 系统"
    if ! command -v pkg-config &> /dev/null; then
        echo "⚠️  警告: 未安装 pkg-config"
        echo "请运行: brew install pkg-config"
        echo ""
        read -p "是否继续尝试运行？(y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        echo "✅ pkg-config 已安装"
    fi
elif [[ "$UNAME" == MINGW* ]] || [[ "$UNAME" == MSYS* ]] || [[ "$UNAME" == CYGWIN* ]]; then
    echo "检测到 Windows 系统"
    echo "✅ Windows 系统支持"
else
    echo "⚠️  警告: 未知的操作系统"
fi

echo ""
echo "🎮 启动游戏..."
echo ""
echo "游戏控制:"
echo "  ← ↑ → ↓ 或 WASD  - 移动方块"
echo "  R                  - 重新开始"
echo ""
echo "按 Ctrl+C 退出游戏"
echo ""

# 运行游戏
go run .

# 检查退出状态
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 游戏运行失败"
    echo "请检查错误信息并确保所有依赖已正确安装"
    exit 1
fi

echo ""
echo "👋 感谢游戏！"