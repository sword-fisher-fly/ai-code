#!/usr/bin/env python3
"""
AI News HTML Generator
Generates a visual HTML report from processed news data
"""

import json
import sys
import os
from datetime import datetime
from typing import List, Dict

def generate_html_header(title: str, timestamp: str) -> str:
    """Generate HTML header with CSS styles"""
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }}

        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }}

        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }}

        .header h1 {{
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 700;
        }}

        .header .timestamp {{
            font-size: 1em;
            opacity: 0.9;
            margin-top: 10px;
        }}

        .stats {{
            background: #f8f9fa;
            padding: 20px 40px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-around;
            text-align: center;
        }}

        .stat-item {{
            flex: 1;
        }}

        .stat-value {{
            font-size: 2em;
            font-weight: 700;
            color: #667eea;
        }}

        .stat-label {{
            font-size: 0.9em;
            color: #6c757d;
            margin-top: 5px;
        }}

        .news-list {{
            padding: 40px;
        }}

        .news-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
        }}

        .news-card {{
            background: white;
            border-radius: 15px;
            border: 1px solid #e9ecef;
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
            display: flex;
            flex-direction: column;
        }}

        .news-card:hover {{
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }}

        .card-header {{
            background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
            padding: 15px 20px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}

        .source-badge {{
            background: #667eea;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 600;
        }}

        .card-body {{
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
        }}

        .news-title {{
            font-size: 1.1em;
            font-weight: 600;
            color: #212529;
            margin-bottom: 15px;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }}

        .news-summary {{
            color: #495057;
            line-height: 1.8;
            margin-bottom: 15px;
            flex: 1;
        }}

        .keywords {{
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
        }}

        .keyword-tag {{
            background: #f1f3f5;
            color: #495057;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.85em;
            font-weight: 500;
        }}

        .card-footer {{
            padding: 15px 20px;
            border-top: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}

        .pub-date {{
            color: #6c757d;
            font-size: 0.9em;
        }}

        .read-btn {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 0.9em;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            text-decoration: none;
            display: inline-block;
        }}

        .read-btn:hover {{
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }}

        .read-btn.sample-link {{
            background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
            cursor: help;
        }}

        .read-btn.sample-link:hover {{
            transform: none;
            box-shadow: 0 5px 15px rgba(156, 163, 175, 0.4);
        }}

        .footer {{
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #6c757d;
            border-top: 1px solid #e9ecef;
        }}

        .footer a {{
            color: #667eea;
            text-decoration: none;
        }}

        .footer a:hover {{
            text-decoration: underline;
        }}

        @media (max-width: 768px) {{
            .header h1 {{
                font-size: 1.8em;
            }}

            .stats {{
                flex-direction: column;
                gap: 15px;
            }}

            .news-grid {{
                grid-template-columns: 1fr;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📰 {title}</h1>
            <div class="timestamp">生成时间：{timestamp}</div>
        </div>
"""

def generate_news_card(article: Dict, index: int) -> str:
    """Generate HTML for a single news card"""
    source = article.get('source', 'Unknown')
    title = article.get('title', 'No title')
    summary = article.get('summary', 'No summary available')
    keywords = article.get('keywords', [])
    link = article.get('link', '#')
    pub_date = article.get('pubDate', 'Unknown date')

    # Format publication date
    formatted_date = pub_date
    if pub_date and pub_date != 'Unknown date':
        try:
            # Try to parse and reformat the date
            from email.utils import parsedate_to_datetime
            dt = parsedate_to_datetime(pub_date)
            formatted_date = dt.strftime('%Y-%m-%d %H:%M')
        except:
            pass

    keywords_html = ''.join([f'<span class="keyword-tag">{k}</span>' for k in keywords])

    # Determine if link is valid (simple check for example data)
    is_sample_data = '/category/' in link or '/topic/' in link or '/tag/' in link
    button_text = "查看源站 →" if is_sample_data else "查看原文 →"
    button_class = "read-btn" if not is_sample_data else "read-btn sample-link"

    return f"""
        <div class="news-card">
            <div class="card-header">
                <span class="source-badge">{source}</span>
            </div>
            <div class="card-body">
                <div class="news-title">{title}</div>
                <div class="news-summary">{summary}</div>
                <div class="keywords">{keywords_html}</div>
            </div>
            <div class="card-footer">
                <span class="pub-date">{formatted_date}</span>
                <a href="{link}" class="{button_class}" target="_blank" rel="noopener">{button_text}</a>
            </div>
        </div>
    """

def generate_html_footer() -> str:
    """Generate HTML footer"""
    return """
        <div class="footer">
            <p>由 <strong>AI News Reporter</strong> 自动生成</p>
            <p>数据来源：多个主流科技新闻网站</p>
            <p style="margin-top: 15px; font-size: 0.9em; color: #6c757d;">
                ℹ️ 注意：示例数据中的链接指向新闻源主页，实际新闻请重新获取最新数据
            </p>
        </div>
    </div>
</body>
</html>
"""

def generate_html(processed_data_file: str, output_file: str):
    """
    Generate HTML report from processed news data

    Args:
        processed_data_file: Path to processed news JSON file
        output_file: Path to output HTML file
    """
    print(f"Generating HTML report from {processed_data_file}...")

    # Read processed data
    with open(processed_data_file, 'r', encoding='utf-8') as f:
        news_data = json.load(f)

    print(f"Generating HTML for {len(news_data)} articles...")

    # Generate HTML
    timestamp = datetime.now().strftime('%Y年%m月%d日 %H:%M')
    title = "今日AI简报"

    html_content = generate_html_header(title, timestamp)

    # Add statistics
    total_articles = len(news_data)
    sources = len(set(article.get('source', 'Unknown') for article in news_data))
    total_keywords = sum(len(article.get('keywords', [])) for article in news_data)

    html_content += f"""
        <div class="stats">
            <div class="stat-item">
                <div class="stat-value">{total_articles}</div>
                <div class="stat-label">篇文章</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">{sources}</div>
                <div class="stat-label">个来源</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">{total_keywords}</div>
                <div class="stat-label">个关键词</div>
            </div>
        </div>
    """

    # Add news list
    html_content += '<div class="news-list">\n'
    html_content += '<div class="news-grid">\n'

    for article in news_data:
        html_content += generate_news_card(article, news_data.index(article))

    html_content += '</div>\n'
    html_content += '</div>\n'

    # Add footer
    html_content += generate_html_footer()

    # Save HTML file
    print(f"Saving HTML report to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"HTML generation complete!")
    print(f"Report saved to: {output_file}")

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 generate_html.py <processed_data_file> <output_file>")
        sys.exit(1)

    processed_data_file = sys.argv[1]
    output_file = sys.argv[2]

    if not os.path.exists(processed_data_file):
        print(f"Error: Processed data file not found: {processed_data_file}")
        sys.exit(1)

    generate_html(processed_data_file, output_file)

if __name__ == "__main__":
    main()
