# 2024 合并游戏

一个使用 Go 语言和 Electron 框架构建的 2024 数字合并游戏。

## 游戏规则

- 游戏面板大小为 8x8
- 初始面板有 8 个数字（均为 2）
- 使用方向键或 WASD 键移动方块
- 当两个相同数字的方块碰撞时，它们会合并为它们的和
- 目标是创建数字 2024
- 游戏结束条件：无法进行任何移动

## 项目结构

```
/
├── main.go                    # Go 主程序
├── game/                      # 游戏逻辑包
│   └── game.go               # 游戏核心逻辑
├── frontend/                  # 前端文件
│   ├── main.js              # Electron 主进程
│   └── renderer/            # 渲染进程
│       ├── index.html       # HTML 界面
│       ├── style.css        # 样式文件
│       └── renderer.js      # JavaScript 逻辑
├── package.json              # Node.js 依赖配置
├── go.mod                    # Go 模块配置
└── Makefile                  # 构建脚本
```

## 构建要求

- Go 1.21+
- Node.js 16+
- npm 或 yarn

## 构建和运行

### 使用 Makefile（推荐）

#### 构建应用

```bash
# 构建当前平台
make build

# 构建所有平台
make build-all

# 单独构建特定平台
make build-linux
make build-mac
make build-windows
```

#### 运行应用

```bash
# 直接运行（使用 Go 的 WebView）
make run

# 使用 Electron 运行
make run-electron
```

#### 其他命令

```bash
# 安装依赖
make deps

# 清理构建文件
make clean

# 运行测试
make test

# 查看版本信息
make version
```

### 手动构建

#### 1. 安装 Go 依赖

```bash
go mod download
```

#### 2. 安装 Node.js 依赖

```bash
cd frontend
npm install
cd ..
```

#### 3. 构建应用

```bash
# 使用 Go 构建
go build -o merge2048 main.go

# 使用 Electron 构建
cd frontend
npm run build
```

#### 4. 运行应用

```bash
# 直接运行 Go 应用
./merge2048

# 或使用 Electron
cd frontend
npm start
```

## 平台支持

- Linux (AppImage, deb, rpm)
- macOS (dmg, zip)
- Windows (exe, nsis)

## 控制说明

- **上移**: ↑ 或 W 键
- **下移**: ↓ 或 S 键
- **左移**: ← 或 A 键
- **右移**: → 或 D 键
- **新游戏**: 点击"新游戏"按钮

## 开发

本项目使用 Go + Electron 架构：

- **后端**: Go 语言实现游戏逻辑和 Web 服务器
- **前端**: HTML/CSS/JavaScript + Electron 提供 GUI

## 许可证

MIT License
