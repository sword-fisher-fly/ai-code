#!/usr/bin/env python3
"""
AI News Processing Script
Processes raw news data, generates Chinese summaries, and extracts keywords
"""

import json
import sys
import os
from datetime import datetime
import re
from typing import List, Dict

def generate_chinese_summary(title: str, description: str, max_chars: int = 100) -> str:
    """
    Generate a Chinese summary of an English news article

    Args:
        title: Article title
        description: Article description/summary
        max_chars: Maximum character count for summary

    Returns:
        Chinese summary string
    """
    # Simple keyword-based summarization
    # In a production environment, you would use a translation and summarization API

    # Common AI terms mapping
    ai_terms = {
        'AI': '人工智能',
        'artificial intelligence': '人工智能',
        'machine learning': '机器学习',
        'deep learning': '深度学习',
        'neural network': '神经网络',
        'ChatGPT': 'ChatGPT',
        'GPT': 'GPT',
        'OpenAI': 'OpenAI',
        'LLM': '大语言模型',
        'language model': '语言模型',
        'algorithm': '算法',
        'automation': '自动化',
        'robot': '机器人',
        'computer vision': '计算机视觉',
        'NLP': '自然语言处理',
        'generative AI': '生成式AI',
        'transformer': 'Transformer',
        'anthropic': 'Anthropic',
        'claude': 'Claude',
        'Gemini': 'Gemini',
        'Google': '谷歌',
        'Microsoft': '微软',
        'Apple': '苹果',
        'Amazon': '亚马逊',
        'Meta': 'Meta',
        'Tesla': '特斯拉',
        'NVIDIA': '英伟达',
        'startup': '初创公司',
        'funding': '融资',
        'acquisition': '收购',
        'partnership': '合作',
        'research': '研究',
        'breakthrough': '突破',
        'launch': '发布',
        'release': '发布',
        'update': '更新',
        'announce': '宣布',
        'unveil': '推出',
        'introduce': '介绍',
        'develop': '开发',
        'create': '创建',
        'build': '构建',
        'design': '设计',
        'train': '训练',
        'deploy': '部署',
        'implement': '实施',
        'optimize': '优化',
        'improve': '改进',
        'enhance': '增强',
        'advance': '推进',
        'innovation': '创新',
        'technology': '技术',
        'platform': '平台',
        'system': '系统',
        'model': '模型',
        'application': '应用',
        'tool': '工具',
        'service': '服务',
        'product': '产品',
        'solution': '解决方案',
        'framework': '框架',
        'API': 'API',
        'cloud': '云',
        'data': '数据',
        'performance': '性能',
        'efficiency': '效率',
        'accuracy': '准确性'
    }

    # Clean up description
    description = re.sub(r'<[^>]+>', '', description)  # Remove HTML tags
    description = description.replace('&nbsp;', ' ').replace('&amp;', '&')
    description = description.strip()

    # Combine title and description for context
    full_text = f"{title} {description}".lower()

    # Translate AI terms to Chinese
    summary_parts = []

    # Check for key concepts
    if any(term in full_text for term in ['chatgpt', 'openai']):
        summary_parts.append("OpenAI")
    if any(term in full_text for term in ['anthropic', 'claude']):
        summary_parts.append("Anthropic")
    if any(term in full_text for term in ['google', 'gemini']):
        summary_parts.append("谷歌")
    if any(term in full_text for term in ['microsoft', 'copilot']):
        summary_parts.append("微软")
    if any(term in full_text for term in ['apple']):
        summary_parts.append("苹果")
    if any(term in full_text for term in ['meta']):
        summary_parts.append("Meta")
    if any(term in full_text for term in ['nvidia']):
        summary_parts.append("英伟达")

    # Determine topic category
    topic_category = ""
    if any(term in full_text for term in ['research', 'study', 'paper', 'paper']):
        topic_category = "研究进展"
    elif any(term in full_text for term in ['funding', 'investment', 'valuation']):
        topic_category = "投资动态"
    elif any(term in full_text for term in ['launch', 'release', 'update', 'product']):
        topic_category = "产品发布"
    elif any(term in full_text for term in ['partnership', 'collaboration', 'acquisition']):
        topic_category = "商业合作"
    elif any(term in full_text for term in ['regulation', 'policy', 'ethics']):
        topic_category = "政策监管"
    else:
        topic_category = "行业动态"

    # Build summary
    if topic_category:
        summary = f"{topic_category}："

    # Add main subject
    if "OpenAI" in summary_parts:
        summary += "OpenAI"
    elif "Anthropic" in summary_parts:
        summary += "Anthropic"
    elif "谷歌" in summary_parts:
        summary += "谷歌"
    elif "微软" in summary_parts:
        summary += "微软"
    else:
        # Try to extract company name from title
        title_words = title.split()
        if len(title_words) > 0 and len(title_words[0]) < 20:
            summary += title_words[0]
        else:
            summary += "相关企业"

    # Add action
    action = ""
    if any(term in full_text for term in ['launch', 'release']):
        action = "发布"
    elif any(term in full_text for term in ['announce', 'unveil']):
        action = "宣布"
    elif any(term in full_text for term in ['develop', 'create', 'build']):
        action = "开发"
    elif any(term in full_text for term in ['partner', 'collaborate']):
        action = "合作"
    elif any(term in full_text for term in ['acquire']):
        action = "收购"
    elif any(term in full_text for term in ['fund', 'invest']):
        action = "融资"
    elif any(term in full_text for term in ['research', 'study']):
        action = "研究"
    else:
        action = "推出"

    if action:
        summary += f"{action}"

    # Add topic
    if any(term in full_text for term in ['chatgpt', 'llm', 'language model']):
        summary += "大语言模型"
    elif any(term in full_text for term in ['image', 'visual', 'vision']):
        summary += "视觉AI"
    elif any(term in full_text for term in ['robot', 'automation']):
        summary += "机器人技术"
    elif any(term in full_text for term in ['algorithm', 'model']):
        summary += "AI技术"
    else:
        summary += "AI技术"

    # Add context if space permits
    if len(summary) < max_chars - 20:
        if "产品" in summary:
            summary += "，为用户提供"
        elif "合作" in summary:
            summary += "，共同推进"
        elif "研究" in summary:
            summary += "，推动技术"
        else:
            summary += "，关注"

        # Add a brief note about significance
        if any(term in full_text for term in ['first', 'new', 'breakthrough']):
            summary += "技术突破"
        elif any(term in full_text for term in ['improve', 'better', 'enhance']):
            summary += "性能提升"
        else:
            summary += "行业发展"

    # Ensure summary is within character limit
    if len(summary) > max_chars:
        summary = summary[:max_chars-3] + "..."

    return summary

def extract_keywords(title: str, description: str, max_keywords: int = 5) -> List[str]:
    """
    Extract keywords from news article

    Args:
        title: Article title
        description: Article description
        max_keywords: Maximum number of keywords

    Returns:
        List of keywords
    """
    # Common AI-related keywords
    keyword_patterns = [
        'AI', 'artificial intelligence', 'machine learning', 'deep learning',
        'neural network', 'neural networks', 'ChatGPT', 'OpenAI', 'GPT',
        'LLM', 'large language model', 'language model', 'NLP',
        'computer vision', 'image recognition', 'robotics',
        'automation', 'autonomous', 'algorithm', 'data science',
        'generative AI', 'generative', 'transformer', 'attention',
        'anthropic', 'claude', 'gemini', 'bard', 'copilot',
        'tensorflow', 'pytorch', 'hugging face', 'midjourney',
        'stable diffusion', 'diffusion model', 'reinforcement learning',
        'supervised learning', 'unsupervised learning', 'self-supervised'
    ]

    # Technology companies
    tech_companies = [
        'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Tesla',
        'NVIDIA', 'IBM', 'Intel', 'AMD', 'OpenAI', 'Anthropic',
        'Stability AI', 'Midjourney', 'Cohere', 'AI21 Labs'
    ]

    # Research institutions
    research_institutions = [
        'MIT', 'Stanford', 'Berkeley', 'Carnegie Mellon', 'Oxford',
        'Cambridge', 'DeepMind', 'FAIR', 'Google AI', 'Microsoft Research'
    ]

    # Extract patterns from text
    text_lower = (title + " " + description).lower()
    found_keywords = []

    # Check for keyword patterns
    for pattern in keyword_patterns:
        if pattern.lower() in text_lower:
            # Clean up keyword (capitalize appropriately)
            keyword = pattern if pattern in tech_companies else pattern.lower()
            if keyword not in found_keywords:
                found_keywords.append(keyword)

    # Check for company names
    for company in tech_companies:
        if company.lower() in text_lower:
            if company not in found_keywords:
                found_keywords.append(company)

    # Add specific terms based on content
    if any(term in text_lower for term in ['research', 'study', 'paper']):
        found_keywords.append('research')
    if any(term in text_lower for term in ['funding', 'investment', 'valuation']):
        found_keywords.append('funding')
    if any(term in text_lower for term in ['partnership', 'collaboration']):
        found_keywords.append('partnership')
    if any(term in text_lower for term in ['product', 'launch', 'release']):
        found_keywords.append('product')

    # Return top keywords
    return found_keywords[:max_keywords]

def process_news(raw_data_file: str, output_file: str):
    """
    Process raw news data and generate summaries and keywords

    Args:
        raw_data_file: Path to raw news JSON file
        output_file: Path to output processed JSON file
    """
    print(f"Processing news data from {raw_data_file}...")

    # Read raw data
    with open(raw_data_file, 'r', encoding='utf-8') as f:
        raw_news = json.load(f)

    print(f"Processing {len(raw_news)} articles...")

    processed_news = []

    for i, article in enumerate(raw_news):
        print(f"Processing article {i+1}/{len(raw_news)}: {article['title'][:50]}...")

        # Get description, with fallback
        description = article.get('description', '')
        if not description and 'summary' in article:
            description = article.get('summary', '')

        # Generate Chinese summary
        summary = generate_chinese_summary(
            article['title'],
            description,
            max_chars=100
        )

        # Extract keywords
        keywords = extract_keywords(
            article['title'],
            description,
            max_keywords=5
        )

        # Create processed article
        processed_article = {
            'source': article['source'],
            'title': article['title'],
            'link': article['link'],
            'pubDate': article['pubDate'],
            'summary': summary,
            'keywords': keywords,
            'timestamp': datetime.now().isoformat()
        }

        processed_news.append(processed_article)

    # Save processed data
    print(f"Saving processed data to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(processed_news, f, ensure_ascii=False, indent=2)

    print(f"Processing complete! {len(processed_news)} articles processed.")
    print(f"Output saved to: {output_file}")

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 process_news.py <raw_data_file> <output_file>")
        sys.exit(1)

    raw_data_file = sys.argv[1]
    output_file = sys.argv[2]

    if not os.path.exists(raw_data_file):
        print(f"Error: Raw data file not found: {raw_data_file}")
        sys.exit(1)

    process_news(raw_data_file, output_file)

if __name__ == "__main__":
    main()
