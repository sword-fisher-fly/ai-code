#!/bin/bash

echo "==================================="
echo "测试 npm 脚本和依赖"
echo "==================================="
echo ""

echo "1. 检查当前目录："
pwd
echo ""

echo "2. 检查 frontend 目录结构："
ls -la frontend/
echo ""

echo "3. 检查 frontend/package.json："
cat frontend/package.json
echo ""

echo "4. 检查已安装的 npm 包："
cd frontend && npm list --depth=0
cd ..
echo ""

echo "5. 测试 npm run-script："
cd frontend && npm run
cd ..
echo ""

echo "==================================="
echo "所有 npm 测试完成！"
echo "==================================="
