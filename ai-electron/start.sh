#!/bin/bash

echo "启动 2024 合并游戏..."
echo ""

if [ -f "./merge2048" ]; then
    echo "使用已编译的二进制文件启动..."
    ./merge2048
elif command -v go &> /dev/null; then
    echo "使用 Go 源码启动..."
    go run main.go
else
    echo "错误: 找不到 merge2048 二进制文件，且未安装 Go"
    exit 1
fi
