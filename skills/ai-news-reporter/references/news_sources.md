# AI News Sources Reference

This document provides a comprehensive list of trusted AI news sources and their RSS feeds.

## Primary Sources

### TechCrunch
- **URL**: https://techcrunch.com/category/artificial-intelligence/feed/
- **Description**: Leading technology news with dedicated AI section
- **Update Frequency**: Multiple times daily
- **Topics**: AI startups, funding, product launches, industry analysis

### VentureBeat
- **URL**: https://venturebeat.com/category/ai/feed/
- **Description**: Business-focused AI and tech news
- **Update Frequency**: Daily
- **Topics**: AI in business, enterprise solutions, industry trends

### MIT Technology Review
- **URL**: https://www.technologyreview.com/topic/artificial-intelligence/feed/
- **Description**: In-depth analysis from academic perspective
- **Update Frequency**: Weekly
- **Topics**: Research breakthroughs, ethical considerations, policy implications

### The Verge
- **URL**: https://www.theverge.com/ai-artificial-intelligence/rss/index.xml
- **Description**: Technology news with consumer focus
- **Update Frequency**: Daily
- **Topics**: AI products, consumer applications, industry developments

### Ars Technica
- **URL**: https://feeds.arstechnica.com/arstechnica/technology-lab
- **Description**: Deep technical analysis of AI developments
- **Update Frequency**: Daily
- **Topics**: Technical implementations, research papers, AI safety

### Wired
- **URL**: https://www.wired.com/feed/tag/ai/latest/rss
- **Description**: Technology magazine with cultural perspective
- **Update Frequency**: Weekly
- **Topics**: AI impact on society, future implications, creative applications

## Research and Development Sources

### OpenAI Blog
- **URL**: https://openai.com/blog/rss/
- **Description**: Official OpenAI research and product updates
- **Update Frequency**: Monthly
- **Topics**: GPT models, research papers, product releases

### DeepMind Blog
- **URL**: https://deepmind.com/blog/feed/basic/
- **Description**: Google's AI research division insights
- **Update Frequency**: Monthly
- **Topics**: AI research, breakthroughs, scientific applications

### Anthropic Blog
- **URL**: https://www.anthropic.com/news/rss.xml
- **Description**: AI safety and research from Anthropic
- **Update Frequency**: Monthly
- **Topics**: AI safety, language models, responsible AI

## Industry News Sources

### AI News
- **URL**: https://artificialintelligence-news.com/feed/
- **Description**: Dedicated AI industry news platform
- **Update Frequency**: Daily
- **Topics**: Industry developments, corporate announcements, market analysis

### AI Lab (Chinese)
- **URL**: https://www.ailab.cn/rss
- **Description**: Chinese AI industry news and analysis
- **Update Frequency**: Daily
- **Topics**: AI in China, domestic companies, industry developments

## Adding New Sources

To add a new news source:

1. **Verify the source**:
   - Check if it's a reputable tech news outlet
   - Ensure it regularly publishes AI-related content
   - Verify the RSS feed is active and accessible

2. **Test the feed**:
   ```bash
   curl -s -I <RSS_URL> | grep -i "content-type"
   ```
   Should return `application/rss+xml` or `application/xml`

3. **Update fetch script**:
   - Add the source to the `SOURCES` array in `scripts/fetch_ai_news.sh`
   - Format: `"SourceName:https://example.com/rss"`

4. **Test the integration**:
   ```bash
   ./scripts/fetch_ai_news.sh
   ```

5. **Update this reference**:
   - Add the source to the list above
   - Document the URL, description, and topics covered

## Source Quality Guidelines

### Criteria for Adding Sources

✅ **Good Sources**:
- Reputable technology publications
- Regular AI content (at least weekly)
- Professional editorial standards
- Active RSS feeds
- Diverse perspectives (avoid duplicates)

❌ **Avoid Sources**:
- Low-quality content mills
- Excessive advertising
- Duplicate content from other sources
- Infrequent updates
- Paywalled content without RSS

### Content Filtering

The system filters content based on AI-related keywords:
- Primary: AI, artificial intelligence, machine learning, deep learning
- Secondary: neural networks, NLP, computer vision, automation
- Tools: ChatGPT, OpenAI, GPT, LLM, transformer
- Companies: OpenAI, Anthropic, Google, Microsoft, Meta

## RSS Feed Maintenance

### Regular Checks

Monitor RSS feeds monthly:
```bash
# Check if feeds are accessible
for source in "${SOURCES[@]}"; do
    IFS=':' read -r name url <<< "$source"
    curl -s -I "$url" | grep "HTTP" | head -1
done
```

### Updating Feeds

If a source stops working:
1. Check if the domain is still active
2. Look for alternative RSS URLs
3. Update the `SOURCES` array
4. Test the new configuration

### Feed Health Monitoring

The system includes automatic filtering for:
- Duplicate articles (based on title similarity)
- Non-AI content (keyword filtering)
- Publication date (24-hour window)

## Geographic Diversity

Ensure sources represent:
- **North America**: TechCrunch, VentureBeat, MIT Tech Review
- **Europe**: Ars Technica (US-based but covers global), Wired
- **Asia**: AI Lab (China), other regional sources as available

This diversity ensures comprehensive coverage of global AI developments.

## Content Categories

Each source can be tagged with categories:

- **Research**: Academic papers, breakthrough studies
- **Industry**: Corporate announcements, product launches
- **Policy**: Regulations, ethical discussions
- **Funding**: Investment news, startup announcements
- **Technology**: Technical deep-dives, implementation guides

Use these categories to prioritize sources based on your needs.
