.PHONY: build build-linux build-mac build-windows clean test deps help

APP_NAME := merge2048
MAIN_FILE := main.go
BUILD_DIR := build
FRONTEND_DIR := frontend

all: deps build

help:
	@echo "可用命令:"
	@echo "  build         - 构建当前平台的应用"
	@echo "  build-linux   - 构建Linux版本"
	@echo "  build-mac     - 构建macOS版本"
	@echo "  build-windows - 构建Windows版本"
	@echo "  clean         - 清理构建文件"
	@echo "  deps          - 安装依赖"
	@echo "  test          - 运行测试"

deps:
	@echo "安装Go依赖..."
	go mod download
	go mod verify
	@echo "安装Node.js依赖..."
	cd $(FRONTEND_DIR) && npm install

build: build-current

build-current:
	@echo "构建当前平台应用..."
	@mkdir -p $(BUILD_DIR)
	go build -ldflags="-w -s" -o $(BUILD_DIR)/$(APP_NAME) $(MAIN_FILE)
	@echo "构建完成: $(BUILD_DIR)/$(APP_NAME)"

build-linux:
	@echo "构建Linux版本..."
	@mkdir -p $(BUILD_DIR)
	GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o $(BUILD_DIR)/$(APP_NAME)-linux $(MAIN_FILE)
	@echo "Linux构建完成: $(BUILD_DIR)/$(APP_NAME)-linux"

build-mac:
	@echo "构建macOS版本..."
	@mkdir -p $(BUILD_DIR)
	GOOS=darwin GOARCH=amd64 go build -ldflags="-w -s" -o $(BUILD_DIR)/$(APP_NAME)-macos $(MAIN_FILE)
	GOOS=darwin GOARCH=arm64 go build -ldflags="-w -s" -o $(BUILD_DIR)/$(APP_NAME)-macos-arm64 $(MAIN_FILE)
	@echo "macOS构建完成: $(BUILD_DIR)/$(APP_NAME)-macos"

build-windows:
	@echo "构建Windows版本..."
	@mkdir -p $(BUILD_DIR)
	GOOS=windows GOARCH=amd64 go build -ldflags="-w -s" -o $(BUILD_DIR)/$(APP_NAME)-windows.exe $(MAIN_FILE)
	@echo "Windows构建完成: $(BUILD_DIR)/$(APP_NAME)-windows.exe"

build-all: build-linux build-mac build-windows
	@echo "所有平台构建完成!"

package-linux: build-linux
	@echo "打包Linux应用..."
	cd $(FRONTEND_DIR) && npm run build:linux
	@echo "Linux打包完成"

package-mac: build-mac
	@echo "打包macOS应用..."
	cd $(FRONTEND_DIR) && npm run build:mac
	@echo "macOS打包完成"

package-windows: build-windows
	@echo "打包Windows应用..."
	cd $(FRONTEND_DIR) && npm run build:win
	@echo "Windows打包完成"

package-all: package-linux package-mac package-windows
	@echo "所有平台打包完成!"

clean:
	@echo "清理构建文件..."
	rm -rf $(BUILD_DIR)
	rm -rf $(FRONTEND_DIR)/node_modules
	rm -rf $(FRONTEND_DIR)/build
	go clean
	@echo "清理完成"

test:
	@echo "运行测试..."
	go test ./...
	@echo "测试完成"

run: deps
	@echo "运行应用..."
	go run $(MAIN_FILE)

run-electron: deps
	@echo "以Electron模式运行..."
	cd $(FRONTEND_DIR) && npm start

dev: deps
	@echo "开发模式启动..."
	@echo "请在另一个终端中运行 'make run-electron' 来启动Electron"

install:
	@echo "安装应用..."
	go install $(MAIN_FILE)
	@echo "安装完成"

version:
	@echo "Go版本: $$(go version)"
	@echo "Node.js版本: $$(node --version 2>/dev/null || echo '未安装')"
	@echo "NPM版本: $$(npm --version 2>/dev/null || echo '未安装')"
