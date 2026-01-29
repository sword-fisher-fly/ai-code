# AI News Reporter Skill

一个用于生成可视化AI每日简报的Claude Code技能。

## 功能特点

✨ **自动新闻获取** - 从多个主流科技新闻源自动抓取最新AI资讯

🌏 **中文智能摘要** - 将英文新闻自动转换为50-100字的中文概要

🏷️ **关键词提取** - 自动识别和提取每篇新闻的关键术语

📊 **可视化报告** - 生成美观的HTML报告，包含统计信息和交互元素

🔗 **原文链接** - 每条新闻都包含可点击的"查看原文"按钮

## 快速开始

### 方法一：使用运行脚本（推荐）

```bash
# 进入技能目录
cd /home/chery-alert/workspace/ai-code/demo/skills/ai-news-reporter

# 运行新闻报告生成器
./run_news_report.sh
```

### 方法二：手动执行步骤

```bash
# 1. 获取新闻
./scripts/fetch_ai_news.sh

# 2. 处理新闻
python3 scripts/process_news.py raw_data/latest.json processed_news.json

# 3. 生成HTML报告
python3 scripts/generate_html.py processed_news.json ai_news_report.html
```

## 技能目录结构

```
ai-news-reporter/
├── SKILL.md                          # 技能说明文档
├── README.md                          # 使用说明（本文件）
├── run_news_report.sh                 # 一键运行脚本
├── scripts/                           # 执行脚本
│   ├── fetch_ai_news.sh              # 新闻抓取脚本
│   ├── process_news.py               # 新闻处理脚本
│   └── generate_html.py              # HTML生成脚本
├── references/                        # 参考文档
│   ├── news_sources.md               # 新闻源列表
│   ├── processing_guide.md           # 处理流程指南
│   └── html_templates.md             # HTML模板指南
└── examples/                         # 示例文件
    ├── sample_news_data.json         # 示例新闻数据
    ├── sample_report.html            # 示例HTML报告
    └── test_fetch.sh                 # 测试脚本
```

## 触发方式

当你说以下短语时，此技能会自动激活：

- **"看新闻"** - 主要中文触发词
- "Generate AI news report"
- "Create daily AI briefing"
- "Fetch AI news"
- "Get AI updates"
- "Generate visual AI news"

## 新闻来源

技能会自动从以下新闻源获取AI相关新闻：

- **TechCrunch** - AI分类
- **VentureBeat** - AI新闻
- **MIT Technology Review** - 人工智能专题
- **The Verge** - AI与科技
- **Ars Technica** - 技术深度分析
- **Wired** - AI专题报道
- **OpenAI Blog** - OpenAI官方博客
- **DeepMind Blog** - DeepMind研究博客
- **AI News** - 专门的AI新闻平台

## 输出示例

生成的HTML报告包含：

### 📰 页面头部
- 标题："今日AI简报"
- 生成时间戳
- 渐变背景设计

### 📊 统计面板
- 文章总数
- 新闻来源数量
- 关键词总数

### 📋 新闻卡片
每个新闻卡片包含：
- **来源标签** - 显示新闻来源
- **新闻标题** - 截断显示（最多2行）
- **中文摘要** - 50-100字中文概要
- **关键词标签** - 相关技术术语
- **发布时间** - 文章发布时间
- **查看原文按钮** - 可点击跳转到原文

### 🎨 设计特色
- 响应式布局（支持手机和桌面）
- 渐变色彩方案
- 悬停动画效果
- 现代化卡片设计

## 自定义选项

### 修改新闻源

编辑 `references/news_sources.md` 添加或移除新闻源。

### 调整摘要长度

在 `scripts/process_news.py` 中修改：
```python
summary = generate_chinese_summary(..., max_chars=150)  # 修改为150字符
```

### 自定义HTML样式

在 `scripts/generate_html.py` 中修改CSS样式或创建自定义模板。

## 测试

运行测试脚本验证功能：

```bash
bash examples/test_fetch.sh
```

测试包括：
- ✅ 脚本存在性检查
- ✅ 权限检查
- ✅ 依赖项检查
- ✅ 示例数据处理测试
- ✅ HTML生成测试
- ✅ 网络连接测试
- ✅ 目录结构验证

## 故障排除

### 问题：无法获取新闻

**解决方案：**
```bash
# 检查网络连接
curl -I https://techcrunch.com

# 使用示例数据（离线模式）
python3 scripts/process_news.py examples/sample_news_data.json output.json
```

### 问题：Python模块缺失

**解决方案：**
```bash
# 安装Python依赖（通常已预装）
python3 -m pip install --user json sys os re datetime
```

### 问题：权限错误

**解决方案：**
```bash
chmod +x scripts/*.sh scripts/*.py examples/*.sh
```

## 性能优化

- 新闻数据自动去重
- 限制最多20篇高质量文章
- 24小时内新闻优先
- 智能关键词过滤

## 最佳实践

1. **定期运行** - 建议每天运行一次获取最新新闻
2. **检查输出** - 查看生成的HTML报告确保质量
3. **保存备份** - 重要报告及时保存到安全位置
4. **网络检查** - 确保网络连接正常

## 技术栈

- **Bash** - 新闻抓取脚本
- **Python 3** - 数据处理和HTML生成
- **curl** - HTTP请求
- **RSS/XML** - 新闻源格式
- **HTML5 + CSS3** - 响应式报告界面

## 许可证

MIT License - 详见LICENSE文件

## 贡献

欢迎提交Issue和Pull Request！

## 更新日志

### v0.1.0
- 初始版本发布
- 支持多新闻源获取
- 中文摘要生成
- HTML可视化报告
- 关键词提取

---

**作者：** Claude Code
**版本：** 0.1.0
**最后更新：** 2026年1月26日
