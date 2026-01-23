# 2048 Game - 跨平台构建系统
# 支持 Windows, macOS, Linux

# Go 参数
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
GOMOD=$(GOCMD) mod
BINARY_NAME=game2048
BINARY_UNIX=$(BINARY_NAME)_unix

# 构建标志
LDFLAGS=-ldflags "-X main.version=$(shell git rev-parse --short HEAD)"

.PHONY: all build clean test deps install help

# 默认目标
all: clean deps build

# 下载依赖
deps:
	@echo "正在下载依赖..."
	$(GOMOD) tidy
	$(GOMOD) download

# Linux构建
build-linux:
	@echo "正在构建Linux版本..."
	CGO_ENABLED=1 GOOS=linux GOARCH=amd64 $(GOBUILD) $(LDFLAGS) -o $(BINARY_UNIX) .

# Windows构建
build-windows:
	@echo "正在构建Windows版本..."
	CGO_ENABLED=1 GOOS=windows GOARCH=amd64 $(GOBUILD) $(LDFLAGS) -o $(BINARY_NAME).exe .

# macOS构建
build-macos:
	@echo "正在构建macOS版本..."
	CGO_ENABLED=1 GOOS=darwin GOARCH=amd64 $(GOBUILD) $(LDFLAGS) -o $(BINARY_NAME)_macos .

# 本地构建（当前平台）
build:
	@echo "正在构建当前平台版本..."
	CGO_ENABLED=1 $(GOBUILD) $(LDFLAGS) -o $(BINARY_NAME) .

# 运行游戏
run: deps
	@echo "正在启动游戏..."
	$(GOCMD) run .

# 跨平台构建
build-all: clean deps
	@echo "正在构建所有平台版本..."
	$(MAKE) build-linux
	$(MAKE) build-windows
	$(MAKE) build-macos
	@echo "所有平台构建完成！"

# 安装依赖（Linux）
install-deps-linux:
	@echo "正在安装Linux依赖..."
	@if command -v apt-get > /dev/null; then \
		sudo apt-get update && sudo apt-get install -y libx11-dev libxrandr-dev libxcursor-dev libxi-dev libxinerama-dev libgl1-mesa-dev; \
	elif command -v yum > /dev/null; then \
		sudo yum install -y libX11-devel libXrandr-devel libXcursor-devel libXi-devel libXinerama-devel mesa-libGL-devel; \
	elif command -v dnf > /dev/null; then \
		sudo dnf install -y libX11-devel libXrandr-devel libXcursor-devel libXi-devel libXinerama-devel mesa-libGL-devel; \
	else \
		echo "无法检测包管理器，请手动安装X11开发库"; \
	fi

# 安装依赖（macOS）
install-deps-macos:
	@echo "正在安装macOS依赖..."
	@if command -v brew > /dev/null; then \
		brew install pkg-config; \
	else \
		echo "请先安装Homebrew: https://brew.sh/"; \
	fi

# 安装依赖（Windows）
install-deps-windows:
	@echo "Windows平台通常不需要额外依赖"
	@echo "确保已安装MinGW或TDM-GCC"

# 安装所有依赖
install-deps:
	@echo "检测操作系统并安装依赖..."
	@if [ "$$(uname)" = "Darwin" ]; then \
		$(MAKE) install-deps-macos; \
	elif [ "$$(uname -s)" = "Linux" ]; then \
		$(MAKE) install-deps-linux; \
	elif [ "$$(uname -s)" = "MINGW" -o "$$(uname -s)" = "MSYS" -o "$$(uname -s)" = "CYGWIN" ]; then \
		$(MAKE) install-deps-windows; \
	else \
		echo "不支持的操作系统"; \
	fi

# 测试
test:
	@echo "正在运行测试..."
	$(GOTEST) -v ./...

# 清理
clean:
	@echo "正在清理..."
	$(GOCLEAN)
	rm -f $(BINARY_NAME)
	rm -f $(BINARY_UNIX)
	rm -f $(BINARY_NAME).exe
	rm -f $(BINARY_NAME)_macos

# 检查代码
fmt:
	@echo "正在格式化代码..."
	$(GOCMD) fmt ./...

vet:
	@echo "正在检查代码..."
	$(GOCMD) vet ./...

# 打包发布
package: build-all
	@echo "正在创建发布包..."
	mkdir -p release
	cp $(BINARY_NAME) release/
	cp $(BINARY_UNIX) release/
	cp $(BINARY_NAME).exe release/
	cp $(BINARY_NAME)_macos release/
	cp README.md release/
	tar -czf release/game2048.tar.gz -C release game2048 game2048_unix game2048.exe game2048_macos README.md
	@echo "发布包创建完成：release/game2048.tar.gz"

# 帮助信息
help:
	@echo "2048 Game - 构建系统"
	@echo ""
	@echo "可用命令："
	@echo "  make deps              - 下载Go依赖"
	@echo "  make build             - 构建当前平台版本"
	@echo "  make build-all         - 构建所有平台版本"
	@echo "  make run               - 运行游戏"
	@echo "  make install-deps      - 安装系统依赖"
	@echo "  make test              - 运行测试"
	@echo "  make clean             - 清理构建文件"
	@echo "  make fmt               - 格式化代码"
	@echo "  make vet               - 检查代码"
	@echo "  make package           - 创建发布包"
	@echo ""
	@echo "平台特定构建："
	@echo "  make build-linux       - 构建Linux版本"
	@echo "  make build-windows     - 构建Windows版本"
	@echo "  make build-macos       - 构建macOS版本"
	@echo ""
	@echo "示例用法："
	@echo "  make deps && make install-deps && make build && make run"