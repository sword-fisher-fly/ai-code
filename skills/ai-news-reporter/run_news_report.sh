#!/bin/bash

# AI News Reporter - Run Script
# This script runs the complete news fetching and report generation pipeline

set -e

# Configuration
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$SKILL_DIR/output"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "========================================="
echo "  AI News Reporter - 生成今日AI简报"
echo "========================================="
echo ""
echo "开始时间: $(date)"
echo ""

# Step 1: Fetch news from sources
echo "步骤 1: 从新闻源获取最新AI资讯..."
echo "-----------------------------------------"
USE_SAMPLE=false

if [ -f "$SKILL_DIR/scripts/fetch_ai_news.sh" ]; then
    echo "正在从新闻源获取数据..."
    if bash "$SKILL_DIR/scripts/fetch_ai_news.sh" 2>/dev/null; then
        RAW_DATA=$(ls -t "$SKILL_DIR"/raw_data/news_raw_*.json 2>/dev/null | head -1)

        if [ -z "$RAW_DATA" ] || [ ! -f "$RAW_DATA" ]; then
            echo "⚠️  未能获取到新闻数据，使用示例数据..."
            USE_SAMPLE=true
        fi
    else
        echo "⚠️  新闻获取失败，使用示例数据..."
        USE_SAMPLE=true
    fi
else
    echo "⚠️  fetch_ai_news.sh 未找到，使用示例数据..."
    USE_SAMPLE=true
fi

if [ "$USE_SAMPLE" = true ]; then
    RAW_DATA="$SKILL_DIR/examples/sample_news_data.json"
    echo "✓ 使用示例数据进行演示"
fi

echo ""
echo "✓ 新闻获取完成"
echo ""

# Step 2: Process and summarize news
echo "步骤 2: 处理新闻并生成中文摘要..."
echo "-----------------------------------------"
PROCESSED_DATA="$OUTPUT_DIR/processed_news_$TIMESTAMP.json"
python3 "$SKILL_DIR/scripts/process_news.py" "$RAW_DATA" "$PROCESSED_DATA"

if [ -f "$PROCESSED_DATA" ]; then
    ARTICLE_COUNT=$(python3 -c "import json; print(len(json.load(open('$PROCESSED_DATA'))))")
    echo "✓ 成功处理 $ARTICLE_COUNT 篇文章"
else
    echo "✗ 新闻处理失败"
    exit 1
fi

echo ""

# Step 3: Generate HTML report
echo "步骤 3: 生成可视化HTML报告..."
echo "-----------------------------------------"
HTML_OUTPUT="$OUTPUT_DIR/ai_news_report_$TIMESTAMP.html"
python3 "$SKILL_DIR/scripts/generate_html.py" "$PROCESSED_DATA" "$HTML_OUTPUT"

if [ -f "$HTML_OUTPUT" ]; then
    echo "✓ HTML报告生成成功"
    echo ""
    echo "📄 报告已保存到:"
    echo "   $HTML_OUTPUT"
else
    echo "✗ HTML报告生成失败"
    exit 1
fi

echo ""
echo "========================================="
echo "✓ AI新闻简报生成完成！"
echo "========================================="
echo ""
echo "📊 报告统计:"
ARTICLE_COUNT=$(python3 -c "import json; print(len(json.load(open('$PROCESSED_DATA'))))")
SOURCE_COUNT=$(python3 -c "import json; data=json.load(open('$PROCESSED_DATA')); print(len(set(item['source'] for item in data)))")
KEYWORD_COUNT=$(python3 -c "import json; data=json.load(open('$PROCESSED_DATA')); print(sum(len(item['keywords']) for item in data))")

echo "   • 文章数量: $ARTICLE_COUNT 篇"
echo "   • 新闻来源: $SOURCE_COUNT 个"
echo "   • 关键词总数: $KEYWORD_COUNT 个"
echo ""
echo "📅 完成时间: $(date)"
echo ""
echo "💡 要查看报告，请在浏览器中打开:"
echo "   file://$HTML_OUTPUT"
echo ""
echo "========================================="
