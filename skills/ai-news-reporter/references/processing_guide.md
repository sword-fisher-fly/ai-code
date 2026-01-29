# AI News Processing Pipeline Guide

This guide provides detailed information about the news processing pipeline, from raw data collection to final HTML generation.

## Pipeline Overview

```
Raw News → Filtering → Summarization → Keyword Extraction → HTML Generation
    ↓           ↓            ↓               ↓                ↓
  RSS/XML    Time/AI      Chinese         Tech Terms       Visual
  Feeds      Keywords    Translation     Identification    Report
```

## Stage 1: Raw Data Collection

### Input
- RSS/XML feeds from multiple sources
- HTML web pages (when RSS unavailable)

### Process (fetch_ai_news.sh)

#### Step 1: Source Parsing
```bash
for SOURCE in "${SOURCES[@]}"; do
    IFS=':' read -r NAME URL <<< "$SOURCE"
    # Fetch and parse each source
done
```

#### Step 2: Feed Extraction
The script extracts from RSS feeds:
- `<item>` or `<entry>` tags (feed entries)
- `<title>` - Article title
- `<link>` - Article URL
- `<pubDate>` - Publication timestamp
- `<description>` - Article summary

#### Step 3: Content Filtering

**Time Filter (24 hours)**:
```python
cutoff_time = datetime.now() - timedelta(hours=24)
if pub_date >= cutoff_time:
    include_article()
```

**AI Keyword Filter**:
```python
AI_KEYWORDS = [
    'ai', 'artificial intelligence', 'machine learning',
    'deep learning', 'neural network', 'chatgpt',
    'openai', 'gpt', 'llm', 'language model',
    # ... (see full list in script)
]

is_ai_related = any(keyword in text.lower()
                   for keyword in AI_KEYWORDS)
```

**Duplicate Removal**:
```python
title_normalized = re.sub(r'[^\w\s]', '', title.lower())
if title_normalized not in titles_seen:
    add_to_final_list()
```

#### Step 4: Output
- JSON array with filtered articles
- Maximum 20 articles (top quality)
- Raw data saved with timestamp

### Quality Checks
- ✅ Minimum 5 articles collected
- ✅ No more than 20 articles (maintains quality)
- ✅ All articles from last 24 hours
- ✅ All articles AI-related
- ✅ No duplicate titles

## Stage 2: News Summarization

### Input
- Filtered news articles
- Title + description text
- Source metadata

### Process (process_news.py)

#### Step 1: Text Preprocessing
```python
# Remove HTML tags
description = re.sub(r'<[^>]+>', '', description)
description = description.replace('&nbsp;', ' ')
description = description.replace('&amp;', '&')
```

#### Step 2: Translation and Summarization

**Keyword-Based Approach**:
1. Detect key entities (companies, products)
2. Identify action verbs (launch, partner, research)
3. Determine category (research, funding, product)
4. Construct Chinese summary

**Entity Detection**:
```python
# Company detection
if any(term in text for term in ['openai', 'chatgpt']):
    subject = "OpenAI"
elif any(term in text for term in in ['anthropic', 'claude']):
    subject = "Anthropic"
# ... (see full mapping)
```

**Action Classification**:
```python
if any(term in text for term in ['launch', 'release']):
    action = "发布"
elif any(term in text for term in ['announce', 'unveil']):
    action = "宣布"
# ... (see full mapping)
```

**Category Assignment**:
```python
if any(term in text for term in ['research', 'study', 'paper']):
    category = "研究进展"
elif any(term in text for term in ['funding', 'investment']):
    category = "投资动态"
# ... (see full mapping)
```

#### Step 3: Summary Construction

**Template-Based Generation**:
```python
summary = f"{category}：{subject}{action}AI技术"

# Add context if space permits
if len(summary) < max_chars - 20:
    summary += "，关注行业发展"
```

**Character Limit**:
- Maximum 100 characters
- Ensures concise, scannable summaries
- Provides key information efficiently

#### Step 4: Quality Assurance
- ✅ Summary within 50-100 characters
- ✅ Contains key information
- ✅ Neutral Chinese tone
- ✅ Factual accuracy maintained

## Stage 3: Keyword Extraction

### Input
- Article title and description
- Domain knowledge base

### Process

#### Step 1: Pattern Matching
```python
KEYWORD_PATTERNS = [
    'AI', 'artificial intelligence', 'machine learning',
    'deep learning', 'neural network', 'ChatGPT',
    # ... (full list)
]
```

#### Step 2: Entity Extraction
```python
# Technology companies
if 'google' in text_lower:
    add_keyword('Google')
if 'microsoft' in text_lower:
    add_keyword('Microsoft')
# ... (see full list)
```

#### Step 3: Topic Classification
```python
if 'research' in text_lower:
    add_keyword('research')
if 'funding' in text_lower:
    add_keyword('funding')
# ... (see full list)
```

#### Step 4: Keyword Prioritization
- Maximum 5 keywords per article
- Prioritize technical terms over generic terms
- Include company names when relevant
- Sort by relevance score

### Output
```json
{
    "keywords": ["AI", "machine learning", "OpenAI", "research"]
}
```

## Stage 4: HTML Generation

### Input
- Processed news data (JSON)
- Summary + keywords + metadata

### Process (generate_html.py)

#### Step 1: HTML Structure
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>今日AI简报</title>
    <style>...</style>
</head>
<body>
    <div class="container">
        <div class="header">...</div>
        <div class="stats">...</div>
        <div class="news-list">...</div>
        <div class="footer">...</div>
    </div>
</body>
</html>
```

#### Step 2: CSS Styling
- **Gradient Header**: Purple-blue gradient background
- **Card Layout**: CSS Grid for responsive design
- **Hover Effects**: Smooth transitions on interaction
- **Mobile Responsive**: Breakpoints for mobile devices
- **Typography**: Modern system font stack

#### Step 3: News Card Generation
```python
def generate_news_card(article):
    return f'''
    <div class="news-card">
        <div class="card-header">
            <span class="source-badge">{source}</span>
        </div>
        <div class="card-body">
            <div class="news-title">{title}</div>
            <div class="news-summary">{summary}</div>
            <div class="keywords">{keyword_tags}</div>
        </div>
        <div class="card-footer">
            <span class="pub-date">{date}</span>
            <a href="{link}" class="read-btn">查看原文</a>
        </div>
    </div>
    '''
```

#### Step 4: Statistics Generation
```python
stats = {
    'total_articles': len(news_data),
    'unique_sources': len(set(article['source'] for article in news_data)),
    'total_keywords': sum(len(article['keywords']) for article in news_data)
}
```

### Output Features
- ✅ Responsive design (mobile + desktop)
- ✅ Clickable links to original articles
- ✅ Visual statistics dashboard
- ✅ Keyword tags for quick scanning
- ✅ Source attribution
- ✅ Publication timestamps

## Error Handling

### Network Errors
```bash
RESPONSE=$(curl -s -L --max-time 30 "$URL" 2>/dev/null || echo "")
if [ -z "$RESPONSE" ]; then
    echo "Warning: Failed to fetch from $NAME"
    continue
fi
```

### Date Parsing Errors
```python
try:
    pub_date = datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S')
except:
    # Include article if date parsing fails
    is_recent = True
```

### Missing Fields
```python
title = article.get('title', 'No title')
summary = article.get('summary', 'No summary available')
link = article.get('link', '#')
```

## Performance Optimization

### Caching
- Raw data cached with timestamps
- Processed data can be reused (same day)
- HTML output cached until news refreshes

### Parallel Processing
```bash
# Fetch from multiple sources in parallel (future enhancement)
for source in "${SOURCES[@]}"; do
    curl -s "$URL" > "/tmp/$NAME.xml" &
done
wait
```

### Rate Limiting
```bash
# Add delays between requests (to be polite to servers)
for source in "${SOURCES[@]}"; do
    fetch_source "$source"
    sleep 2  # 2-second delay
done
```

## Customization Options

### Adjust Time Window
```python
# In fetch_ai_news.sh
cutoff_time = datetime.now() - timedelta(hours=48)  # 48 hours instead of 24
```

### Modify AI Keywords
```python
# In process_news.py
AI_KEYWORDS = [
    # Add your own keywords
    'custom term', 'domain-specific word'
]
```

### Change Summary Length
```python
# In process_news.py
def generate_chinese_summary(..., max_chars=150):  # Increase to 150
```

### Customize HTML Style
```css
/* In generate_html.py */
background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR2 100%);
```

## Testing the Pipeline

### Test Individual Stages
```bash
# Test raw data collection
./scripts/fetch_ai_news.sh
ls -lh raw_data/

# Test processing
python3 scripts/process_news.py raw_data/latest.json processed_data.json

# Test HTML generation
python3 scripts/generate_html.py processed_data.json report.html
```

### Test Full Pipeline
```bash
# Run complete workflow
./scripts/fetch_ai_news.sh && \
python3 scripts/process_news.py raw_data/latest.json processed_data.json && \
python3 scripts/generate_html.py processed_data.json report.html
```

### Validate Output
```bash
# Check JSON validity
python3 -m json.tool processed_data.json

# Check HTML validity
html-validator report.html  # Requires html-validator CLI

# Check links
curl -I <article_url> | grep "HTTP"
```

## Monitoring and Maintenance

### Log Files
```bash
# Add logging to scripts
exec > >(tee -a logs/pipeline.log)
exec 2> >(tee -a logs/error.log)
```

### Success Metrics
- Articles collected per run
- Processing success rate
- HTML generation success
- Link validity rate

### Alert Conditions
- Fewer than 5 articles collected
- Processing errors
- HTML generation failures
- All sources unavailable

## Advanced Features

### Multi-Language Support
Extend summarization for multiple languages:
```python
def summarize_in_language(text, language='zh'):
    if language == 'zh':
        # Chinese summarization
    elif language == 'es':
        # Spanish summarization
    # ...
```

### Sentiment Analysis
Add sentiment scoring:
```python
from textblob import TextBlob

def analyze_sentiment(text):
    blob = TextBlob(text)
    return blob.sentiment.polarity  # -1 to 1
```

### Trend Detection
Track trending topics:
```python
from collections import Counter

def detect_trends(articles):
    all_keywords = [kw for article in articles for kw in article['keywords']]
    return Counter(all_keywords).most_common(10)
```

## References

- [RSS Specification](https://www.rssboard.org/rss-specification)
- [HTML5 Specification](https://html.spec.whatwg.org/)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Python datetime](https://docs.python.org/3/library/datetime.html)
