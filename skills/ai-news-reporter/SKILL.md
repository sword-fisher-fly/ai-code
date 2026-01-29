---
name: AI News Reporter
description: This skill should be used when the user asks to "看新闻", "generate AI news report", "create daily AI briefing", "fetch AI news", "get AI updates", "generate visual AI news", or needs to generate a comprehensive daily AI news report with visual HTML output.
version: 0.1.0
---

# AI News Reporter Skill

Generate a comprehensive daily AI news report with visual HTML output, automatic news gathering from multiple sources, Chinese summarization, and keyword extraction.

## Purpose

This skill automates the process of creating daily AI news reports by:
- Fetching recent AI-related news from multiple tech news sources
- Summarizing each news item in 50-100 Chinese characters
- Extracting relevant keywords for each news item
- Generating a visual HTML report with interactive elements

## When to Use

Use this skill when you need to:
- Create a daily AI news briefing
- Aggregate AI news from multiple sources automatically
- Generate visual, shareable news reports
- Get quick summaries of recent AI developments
- Present AI news in an HTML format with clickable links

## Core Workflow

### Step 1: Understand News Requirements

Determine the scope of news gathering:
- **Time Range**: Last 24 hours (default)
- **Sources**: Multiple tech news sources (TechCrunch, VentureBeat, MIT Tech Review, etc.)
- **Topics**: AI, machine learning, artificial intelligence, deep learning
- **Language**: Automatic Chinese summarization of English sources

### Step 2: Execute News Collection

Use the news collection script to fetch recent articles:
```bash
./scripts/fetch_ai_news.sh
```

This script will:
- Search for AI-related news in the last 24 hours
- Filter relevant articles from trusted tech news sources
- Extract article titles, URLs, and content
- Save raw data for processing

### Step 3: Process and Summarize

Execute the summarization and keyword extraction:
```bash
./scripts/process_news.py
```

This script will:
- Read raw news data
- Generate 50-100 character Chinese summaries
- Extract 3-5 relevant keywords per article
- Structure data for HTML generation
- Save processed data as JSON

### Step 4: Generate Visual HTML Report

Create the final HTML report:
```bash
./scripts/generate_html.py
```

This script will:
- Read processed news data
- Generate responsive HTML with modern CSS
- Create news cards for each article
- Add clickable "Read Original" buttons
- Include styled layout with title and branding
- Output to news_report.html

## Available Resources

### Scripts
- **`scripts/fetch_ai_news.sh`** - Bash script for news collection
- **`scripts/process_news.py`** - Python script for summarization and keyword extraction
- **`scripts/generate_html.py`** - Python script for HTML report generation

### References
- **`references/news_sources.md`** - List of trusted AI news sources
- **`references/processing_guide.md`** - Detailed guide on news processing pipeline
- **`references/html_templates.md`** - HTML template examples and customization options

### Examples
- **`examples/sample_news_data.json`** - Example of processed news data
- **`examples/sample_report.html`** - Example output HTML report
- **`examples/test_fetch.sh`** - Test script for news fetching

## Trigger Phrases

Use any of these phrases to activate this skill:
- "看新闻" - Primary Chinese trigger
- "Generate AI news report"
- "Create daily AI briefing"
- "Fetch AI news"
- "Get AI updates"
- "Generate visual AI news"
- "Show me AI news"
- "AI新闻"

## Output Format

The generated report includes:
- **Page Title**: "今日AI简报" (Today's AI Briefing)
- **Timestamp**: Report generation time
- **News Cards**: Each card contains:
  - News title (truncated if >100 chars)
  - Chinese summary (50-100 characters)
  - Keywords (as tags)
  - "查看原文" button (links to original article)
  - Publication time and source

## Customization Options

### Modifying News Sources
Edit `references/news_sources.md` to add or remove news sources:
```markdown
- TechCrunch: https://techcrunch.com/category/artificial-intelligence/feed/
- VentureBeat: https://venturebeat.com/category/ai/feed/
- MIT Technology Review: https://www.technologyreview.com/topic/artificial-intelligence/feed/
```

### Customizing HTML Template
Modify `scripts/generate_html.py` to adjust:
- Color scheme and styling
- Card layout and spacing
- Font choices and typography
- Header and footer content

### Adjusting Summary Length
Update `scripts/process_news.py`:
```python
summary_length = 50  # Change to desired character count
```

## Best Practices

### News Quality
- Use only trusted tech news sources
- Filter out duplicate articles
- Prioritize recent articles (within 24 hours)
- Include diverse AI topics (research, industry, products)

### Summarization Quality
- Maintain factual accuracy
- Use neutral tone in Chinese
- Extract key technical terms
- Keep summaries concise but informative

### HTML Generation
- Use semantic HTML5 elements
- Ensure mobile-responsive design
- Test links before generation
- Validate HTML output

## Validation

Before using the generated report:
- Check all links are functional
- Verify summaries are accurate
- Ensure HTML is properly formatted
- Test on multiple devices/browsers

## Troubleshooting

### No News Found
- Check internet connectivity
- Verify news source URLs are accessible
- Ensure news sources have recent AI content
- Try expanding time range to 48 hours

### Summarization Issues
- Check Python dependencies are installed
- Verify news data is properly formatted
- Ensure text encoding is UTF-8
- Review processing script logs

### HTML Generation Problems
- Validate processed data format
- Check CSS for syntax errors
- Ensure all required fields are present
- Test HTML in multiple browsers

## Additional Resources

### Reference Files
- **`references/news_sources.md`** - Comprehensive list of AI news sources
- **`references/processing_guide.md`** - Detailed pipeline documentation
- **`references/html_templates.md`** - Customization and styling guide

### Example Files
- **`examples/sample_news_data.json`** - Data structure reference
- **`examples/sample_report.html`** - Final output example
- **`examples/test_fetch.sh`** - Testing utilities

Refer to these files for detailed information, advanced configuration options, and troubleshooting guidance.
