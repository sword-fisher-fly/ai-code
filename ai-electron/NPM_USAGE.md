# npm 使用说明

## frontend 目录 npm 配置

已成功在 `frontend/` 目录下配置 npm，支持多平台构建。

### 安装的依赖

```json
{
  "devDependencies": {
    "electron": "^28.0.0",
    "electron-builder": "^24.6.4"
  },
  "dependencies": {
    "electron-is-dev": "^2.0.0"
  }
}
```

### 可用脚本

在 `frontend/` 目录下运行以下命令：

#### 1. 启动开发服务器
```bash
cd frontend
npm start
```

#### 2. 构建应用包

**Linux 版本：**
```bash
cd frontend
npm run build:linux
```

**macOS 版本：**
```bash
cd frontend
npm run build:mac
```

**Windows 版本：**
```bash
cd frontend
npm run build:win
```

#### 3. 其他脚本

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 打包（不创建安装程序）
npm run pack

# 完整构建
npm run dist
```

### 构建输出

构建完成后，文件将保存在 `frontend/build/` 目录下：

- **Linux**: `frontend/build/Merge2048.AppImage`
- **macOS**: `frontend/build/Merge2048.dmg`
- **Windows**: `frontend/build/Merge2048 Setup.exe`

### 构建配置

`package.json` 中已配置 `build` 字段：

```json
{
  "build": {
    "appId": "com.merge2048.app",
    "productName": "Merge2048",
    "directories": {
      "output": "build"
    },
    "files": [
      "main.js",
      "renderer/**/*"
    ],
    "linux": {
      "target": "AppImage",
      "category": "Game"
    },
    "mac": {
      "target": "dmg",
      "category": "public.app-category.games"
    },
    "win": {
      "target": "nsis",
      "publisherName": "Merge2048"
    }
  }
}
```

### 验证安装

检查 npm 包是否正确安装：

```bash
cd frontend
npm list --depth=0
```

应该显示：
```
merge2048-frontend@1.0.0 /path/to/ai-electron/frontend
├── electron-builder@24.13.3
├── electron-is-dev@2.0.0
└── electron@28.3.3
```

### 与 Makefile 集成

项目根目录的 Makefile 已集成 npm 命令：

```bash
# 安装依赖（包括 npm 依赖）
make deps

# 运行 Electron
make run-electron

# 构建 Go 应用
make build

# 构建所有平台
make build-all
```

### 注意事项

1. **Node.js 版本**: 需要 Node.js 16+ 才能正常运行
2. **平台限制**: 某些构建命令只能在对应平台上运行（如 macOS 构建只能在 macOS 上运行）
3. **代码签名**: 如需发布到应用商店，需要配置代码签名证书

### 故障排除

如果遇到问题：

1. 清理 node_modules 并重新安装：
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

2. 检查 electron-builder 版本：
```bash
npx electron-builder --version
```

3. 查看详细错误：
```bash
npm run build:linux -- --verbose
```
