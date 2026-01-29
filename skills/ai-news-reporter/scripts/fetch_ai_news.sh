#!/bin/bash

# AI News Fetcher Script
# Fetches recent AI news from multiple tech news sources

set -e

# Configuration
OUTPUT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RAW_DATA_DIR="$OUTPUT_DIR/raw_data"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RAW_DATA_FILE="$RAW_DATA_DIR/news_raw_$TIMESTAMP.json"

# Create raw data directory
mkdir -p "$RAW_DATA_DIR"

# News sources (RSS feeds or websites)
SOURCES=(
    "TechCrunch:https://techcrunch.com/category/artificial-intelligence/feed/"
    "VentureBeat:https://venturebeat.com/category/ai/feed/"
    "MIT_Tech_Review:https://www.technologyreview.com/topic/artificial-intelligence/feed/"
    "The_Verge:https://www.theverge.com/ai-artificial-intelligence/rss/index.xml"
    "Ars_Technica:https://feeds.arstechnica.com/arstechnica/technology-lab"
    "Wired:https://www.wired.com/feed/tag/ai/latest/rss"
    "OpenAI_Blog:https://openai.com/blog/rss/"
    "DeepMind_Blog:https://deepmind.com/blog/feed/basic/"
    "AI_News:https://artificialintelligence-news.com/feed/"
    "AI_Research:https://www.ailab.cn/rss"
)

echo "Fetching AI news from ${#SOURCES[@]} sources..."

# Initialize JSON array
echo "[" > "$RAW_DATA_FILE"

FIRST=true

# Fetch from each source
for SOURCE in "${SOURCES[@]}"; do
    # Parse source name and URL
    IFS=':' read -r NAME URL <<< "$SOURCE"

    echo "Fetching from $NAME..."

    # Fetch using curl (with timeout and user agent)
    RESPONSE=$(curl -s -L \
        -H "User-Agent: Mozilla/5.0 (compatible; AI-News-Reporter/1.0)" \
        --max-time 30 \
        "$URL" 2>/dev/null || echo "")

    if [ -z "$RESPONSE" ]; then
        echo "Warning: Failed to fetch from $NAME"
        continue
    fi

    # Process XML RSS feed and extract articles
    # Look for title, link, pubDate, description
    echo "$RESPONSE" | grep -E '<item>|<entry>' | while read -r item; do
        # Extract title (decode HTML entities)
        title=$(echo "$RESPONSE" | \
            sed -n "/<title>/{p; :a; N; /<\/\(title\|item\|entry\)>/!ba; s/.*<title>\(.*\)<\/title>.*/\1/; s/&amp;/\&/g; s/&lt;/</g; s/&gt;/>/g; s/&quot;/\"/g; s/&#39;/'\"/g; p}")

        # Extract link
        link=$(echo "$RESPONSE" | \
            sed -n "/<link>/{p; :a; N; /<\/\(link\|item\|entry\)>/!ba; s/.*<link>\(.*\)<\/link>.*/\1/; p}")

        # Extract publication date
        pubDate=$(echo "$RESPONSE" | \
            sed -n "/<pubDate>/{p; :a; N; /<\/\(pubDate\|item\|entry\)>/!ba; s/.*<pubDate>\(.*\)<\/pubDate>.*/\1/; p}")

        # Extract description/summary
        description=$(echo "$RESPONSE" | \
            sed -n "/<description>/{p; :a; N; /<\/\(description\|item\|entry\)>/!ba; s/.*<description>\(.*\)<\/description>.*/\1/; s/&lt;/</g; s/&gt;/>/g; s/&amp;/\&/g; s/<[^>]*>//g; p}")

        # Skip if missing essential fields
        if [ -z "$title" ] || [ -z "$link" ]; then
            continue
        fi

        # Add comma separator (not for first entry)
        if [ "$FIRST" = false ]; then
            echo "," >> "$RAW_DATA_FILE"
        fi
        FIRST=false

        # Create JSON entry
        cat >> "$RAW_DATA_FILE" << EOF
  {
    "source": "$NAME",
    "title": "$(echo "$title" | sed 's/"/\\"/g')",
    "link": "$link",
    "pubDate": "$(echo "$pubDate" | sed 's/"/\\"/g')",
    "description": "$(echo "$description" | sed 's/"/\\"/g' | head -c 500)"
  }
EOF

    done || true

done

# Close JSON array
echo "" >> "$RAW_DATA_FILE"
echo "]" >> "$RAW_DATA_FILE"

# Filter for last 24 hours and AI-related content
echo "Filtering for recent AI-related news..."

python3 << 'PYTHON_SCRIPT'
import json
import sys
from datetime import datetime, timedelta
import re

# Read raw data
with open(sys.argv[1], 'r', encoding='utf-8') as f:
    news_data = json.load(f)

# AI-related keywords
AI_KEYWORDS = [
    'ai', 'artificial intelligence', 'machine learning', 'deep learning',
    'neural network', 'chatgpt', 'openai', 'gpt', 'llm', 'language model',
    'computer vision', 'nlp', 'natural language', 'robot', 'automation',
    'autonomous', 'algorithm', 'tensorflow', 'pytorch', 'hugging face',
    'midjourney', 'stable diffusion', 'generative ai', 'transformer',
    'anthropic', 'claude', 'gemini', 'bard', 'copilot'
]

# Filter news
filtered_news = []
cutoff_time = datetime.now() - timedelta(hours=24)

for article in news_data:
    title_lower = article['title'].lower()
    desc_lower = article['description'].lower()

    # Check if AI-related
    is_ai_related = any(keyword in title_lower or keyword in desc_lower
                       for keyword in AI_KEYWORDS)

    # Try to parse publication date (best effort)
    try:
        # Various date formats
        pub_date_str = article['pubDate']
        if pub_date_str:
            # RSS date format
            pub_date = datetime.strptime(pub_date_str.split('+')[0].strip(),
                                        '%a, %d %b %Y %H:%M:%S')
            is_recent = pub_date >= cutoff_time
        else:
            # If no date, include it
            is_recent = True
    except:
        # If date parsing fails, include the article
        is_recent = True

    if is_ai_related and is_recent:
        filtered_news.append(article)

# Remove duplicates based on title similarity
unique_news = []
titles_seen = set()

for article in news_data:
    title_normalized = re.sub(r'[^\w\s]', '', article['title'].lower())
    if title_normalized not in titles_seen:
        titles_seen.add(title_normalized)
        unique_news.append(article)

# Limit to top 20 articles
final_news = unique_news[:20]

print(f"Filtered to {len(final_news)} unique AI-related articles")

# Save filtered data
with open(sys.argv[1], 'w', encoding='utf-8') as f:
    json.dump(final_news, f, ensure_ascii=False, indent=2)

PYTHON_SCRIPT

"$RAW_DATA_FILE"

echo "News fetching complete!"
echo "Raw data saved to: $RAW_DATA_FILE"
