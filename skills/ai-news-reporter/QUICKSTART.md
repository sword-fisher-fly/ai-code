# AI News Reporter - 快速开始指南

## 🎯 一键生成AI新闻简报

### 最快方式

```bash
cd /home/chery-alert/workspace/ai-code/demo/skills/ai-news-reporter
./run_news_report.sh
```

完成！报告将保存在 `output/` 目录中。

## 📋 手动步骤（可选）

如果你想自定义流程：

### 步骤1：获取新闻
```bash
./scripts/fetch_ai_news.sh
```

### 步骤2：处理数据
```bash
python3 scripts/process_news.py raw_data/latest.json processed_news.json
```

### 步骤3：生成HTML
```bash
python3 scripts/generate_html.py processed_news.json my_report.html
```

## 🔍 查看报告

报告是HTML格式，可以用以下方式查看：

### 方法1：浏览器打开
```bash
# 在浏览器中打开（需要图形界面）
open output/ai_news_report_*.html

# 或者查看文件路径
ls output/*.html
```

### 方法2：命令行查看
```bash
# 查看JSON数据
cat output/processed_news_*.json | python3 -m json.tool

# 查看HTML源码
head -50 output/ai_news_report_*.html
```

## 📁 输出文件

运行后会生成：

- **processed_news_YYYYMMDD_HHMMSS.json** - 处理后的新闻数据
- **ai_news_report_YYYYMMDD_HHMMSS.html** - 可视化HTML报告

## ⚙️ 触发技能

在Claude Code中，说以下任意短语即可触发此技能：

- "看新闻"
- "Generate AI news report"
- "Create daily AI briefing"
- "Get AI updates"

## 🛠️ 自定义选项

### 修改新闻源
编辑：`references/news_sources.md`

### 调整摘要长度
编辑：`scripts/process_news.py`
查找：`max_chars=100` → 改为你想要的长度

### 修改样式
编辑：`scripts/generate_html.py`
修改CSS样式

## 🧪 测试

运行测试脚本：
```bash
bash examples/test_fetch.sh
```

## ❓ 常见问题

**Q: 无法获取新闻？**
A: 检查网络连接，或使用示例数据：
```bash
python3 scripts/process_news.py examples/sample_news_data.json output.json
```

**Q: Python模块缺失？**
A: 所需模块通常已预装。运行测试：
```bash
python3 -c "import json, sys, os, re, datetime; print('OK')"
```

**Q: 权限错误？**
A: 设置执行权限：
```bash
chmod +x scripts/*.sh scripts/*.py
```

## 📚 更多信息

- 📖 完整文档：`README.md`
- 🔧 技术指南：`references/`
- 💡 示例文件：`examples/`

---

💡 **提示**：每天运行一次以获取最新AI资讯！

🎉 **开始使用**：现在就说 "看新闻" 吧！
