# HTML Templates and Customization Guide

This guide provides detailed information about HTML templates, styling options, and customization techniques for the AI News Reporter.

## Template Structure

### Base Template Components

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- Meta tags and CSS styles -->
</head>
<body>
    <div class="container">
        <div class="header">           <!-- Title and timestamp -->
        <div class="stats">             <!-- Statistics dashboard -->
        <div class="news-list">         <!-- News grid container -->
        <div class="footer">             <!-- Footer information -->
    </div>
</body>
</html>
```

## Color Schemes

### Default Theme (Purple-Blue Gradient)
```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Accent color */
color: #667eea;

/* Hover effects */
box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
```

### Alternative Color Schemes

#### 1. Ocean Blue Theme
```css
/* Header gradient */
background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);

/* Accent color */
color: #2193b0;

/* Hover effects */
box-shadow: 0 5px 15px rgba(33, 147, 176, 0.4);
```

#### 2. Sunset Theme
```css
/* Header gradient */
background: linear-gradient(135deg, #f83600 0%, #f9d423 100%);

/* Accent color */
color: #f83600;

/* Hover effects */
box-shadow: 0 5px 15px rgba(248, 54, 0, 0.4);
```

#### 3. Forest Theme
```css
/* Header gradient */
background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);

/* Accent color */
color: #11998e;

/* Hover effects */
box-shadow: 0 5px 15px rgba(17, 153, 142, 0.4);
```

#### 4. Dark Mode Theme
```css
/* Body background */
background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);

/* Card background */
background: #34495e;

/* Text color */
color: #ecf0f1;

/* Accent color */
color: #3498db;
```

### Applying Color Schemes

To change the color scheme:

1. **Modify generate_html.py**:
```python
# In generate_html_header() function
color_scheme = {
    'primary': '#2193b0',
    'secondary': '#6dd5ed',
    'gradient': 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)'
}
```

2. **Update CSS variables**:
```css
:root {
    --primary-color: #2193b0;
    --secondary-color: #6dd5ed;
    --gradient-bg: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
}
```

## Layout Variations

### 1. List Layout (Alternative to Grid)

```html
<div class="news-list">
    <div class="news-list-item">
        <div class="news-header">
            <h3 class="news-title">Title</h3>
            <span class="source-badge">Source</span>
        </div>
        <div class="news-summary">Summary</div>
        <div class="news-meta">
            <div class="keywords">...</div>
            <a href="..." class="read-btn">Read More</a>
        </div>
    </div>
</div>
```

**CSS for List Layout**:
```css
.news-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.news-list-item {
    background: white;
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.news-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 15px;
}

.news-title {
    flex: 1;
    margin-right: 15px;
}
```

### 2. Magazine Layout (3 Columns)

```html
<div class="news-grid">
    <div class="news-card featured">    <!-- Main story -->
    <div class="news-card">             <!-- Regular story -->
    <div class="news-card">             <!-- Regular story -->
    ...
</div>
```

**CSS for Magazine Layout**:
```css
.news-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;  /* Featured column wider */
    gap: 20px;
}

.news-card.featured {
    grid-row: span 2;  /* Take up 2 rows */
}

.news-card.featured .news-title {
    font-size: 1.5em;
}
```

### 3. Card with Sidebar

```html
<div class="container">
    <div class="header">...</div>
    <div class="content-wrapper">
        <div class="main-content">
            <div class="news-grid">...</div>
        </div>
        <div class="sidebar">
            <div class="stat-card">
                <h3>Statistics</h3>
                ...
            </div>
            <div class="trending-card">
                <h3>Trending Topics</h3>
                ...
            </div>
        </div>
    </div>
</div>
```

**CSS for Sidebar Layout**:
```css
.content-wrapper {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 30px;
}

.sidebar {
    position: sticky;
    top: 20px;
    height: fit-content;
}

.stat-card, .trending-card {
    background: white;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}
```

## Typography Options

### Font Families

#### 1. System Default
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
```

#### 2. Serif Font
```css
font-family: 'Georgia', 'Times New Roman', serif;
```

#### 3. Monospace Font (Tech Theme)
```css
font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
```

#### 4. Chinese Font Optimization
```css
font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
```

### Text Styles

#### Headlines
```css
.header h1 {
    font-size: 2.5em;
    font-weight: 700;
    letter-spacing: -0.02em;
}
```

#### News Titles
```css
.news-title {
    font-size: 1.1em;
    font-weight: 600;
    line-height: 1.5;
}
```

#### Summaries
```css
.news-summary {
    font-size: 0.95em;
    line-height: 1.8;
    color: #495057;
}
```

#### Keywords
```css
.keyword-tag {
    font-size: 0.85em;
    font-weight: 500;
}
```

## Interactive Elements

### Hover Animations

#### 1. Lift Effect (Default)
```css
.news-card {
    transition: transform 0.3s, box-shadow 0.3s;
}

.news-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}
```

#### 2. Scale Effect
```css
.news-card:hover {
    transform: scale(1.02);
}
```

#### 3. Glow Effect
```css
.news-card:hover {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
}
```

#### 4. Border Highlight
```css
.news-card {
    border: 2px solid transparent;
    transition: border-color 0.3s;
}

.news-card:hover {
    border-color: #667eea;
}
```

### Button Styles

#### 1. Gradient Button
```css
.read-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    transition: transform 0.2s;
}

.read-btn:hover {
    transform: scale(1.05);
}
```

#### 2. Outline Button
```css
.read-btn {
    background: transparent;
    border: 2px solid #667eea;
    color: #667eea;
    padding: 8px 18px;
    border-radius: 25px;
}

.read-btn:hover {
    background: #667eea;
    color: white;
}
```

#### 3. Icon Button
```css
.read-btn::after {
    content: " →";
    transition: transform 0.2s;
}

.read-btn:hover::after {
    transform: translateX(5px);
}
```

## Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
    .news-grid {
        grid-template-columns: 1fr;
    }

    .header h1 {
        font-size: 1.8em;
    }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
    .news-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop */
@media (min-width: 1025px) {
    .news-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

### Mobile Optimizations

```css
/* Larger touch targets */
.read-btn {
    padding: 12px 24px;
    font-size: 1em;
}

/* Readable text */
.news-summary {
    font-size: 1em;
    line-height: 1.6;
}

/* Stack elements vertically */
.card-footer {
    flex-direction: column;
    gap: 10px;
}
```

## Animation Effects

### Fade In Animation

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.news-card {
    animation: fadeIn 0.5s ease-out;
}
```

### Staggered Animation

```css
.news-card:nth-child(1) { animation-delay: 0.1s; }
.news-card:nth-child(2) { animation-delay: 0.2s; }
.news-card:nth-child(3) { animation-delay: 0.3s; }
/* ... */
```

### Loading Skeleton

```html
<div class="news-card skeleton">
    <div class="skeleton-text"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-button"></div>
</div>
```

```css
.skeleton {
    background: #f0f0f0;
    position: relative;
    overflow: hidden;
}

.skeleton::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.5),
        transparent
    );
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}
```

## Accessibility Features

### ARIA Labels

```html
<div class="news-card" role="article" aria-labelledby="title-1">
    <h3 id="title-1" class="news-title">Article Title</h3>
    <p class="news-summary" aria-describedby="summary-1">
        <span id="summary-1">Article summary...</span>
    </p>
    <a href="..." class="read-btn" aria-label="Read full article">
        查看原文
    </a>
</div>
```

### Keyboard Navigation

```css
.read-btn:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}
```

### High Contrast Mode

```css
@media (prefers-contrast: high) {
    .news-card {
        border: 2px solid #000;
    }

    .keyword-tag {
        border: 1px solid #000;
    }
}
```

## Custom Components

### Statistics Dashboard

```html
<div class="stats">
    <div class="stat-item">
        <div class="stat-icon">📰</div>
        <div class="stat-value">15</div>
        <div class="stat-label">篇文章</div>
    </div>
    <div class="stat-item">
        <div class="stat-icon">🔗</div>
        <div class="stat-value">8</div>
        <div class="stat-label">个来源</div>
    </div>
    <div class="stat-item">
        <div class="stat-icon">🏷️</div>
        <div class="stat-value">42</div>
        <div class="stat-label">个关键词</div>
    </div>
</div>
```

### Trending Topics Sidebar

```html
<div class="trending-card">
    <h3>🔥 热门话题</h3>
    <ul class="trending-list">
        <li>
            <span class="trend-keyword">ChatGPT</span>
            <span class="trend-count">↑ 5</span>
        </li>
        <li>
            <span class="trend-keyword">AI Safety</span>
            <span class="trend-count">↑ 3</span>
        </li>
    </ul>
</div>
```

### Timeline View

```html
<div class="timeline">
    <div class="timeline-item">
        <div class="timeline-time">09:30</div>
        <div class="timeline-content">
            <h4>Article Title</h4>
            <p>Summary...</p>
        </div>
    </div>
</div>
```

## Template Customization Workflow

### Step 1: Choose Base Template
```python
# In generate_html.py
TEMPLATES = {
    'grid': generate_grid_layout,
    'list': generate_list_layout,
    'magazine': generate_magazine_layout,
    'sidebar': generate_sidebar_layout
}

# Select template
template = 'grid'  # or 'list', 'magazine', 'sidebar'
html_content = TEMPLATES[template](news_data)
```

### Step 2: Apply Color Scheme
```python
# Define color scheme
COLORS = {
    'primary': '#667eea',
    'secondary': '#764ba2',
    'accent': '#667eea',
    'text': '#212529',
    'background': '#f8f9fa'
}

# Update CSS variables
css_vars = '\n'.join([f'--{k}: {v};' for k, v in COLORS.items()])
```

### Step 3: Configure Layout
```python
# Layout options
LAYOUT_CONFIG = {
    'columns': 3,
    'gap': '25px',
    'card_style': 'elevated',  # 'flat', 'elevated', 'outlined'
    'animations': True,
    'responsive': True
}
```

### Step 4: Customize Typography
```python
# Typography settings
TYPOGRAPHY = {
    'font_family': 'system',  # 'system', 'serif', 'monospace', 'chinese'
    'font_size_base': '16px',
    'line_height': '1.6'
}
```

## Best Practices

### Performance
- ✅ Use CSS Grid for layouts (better performance than Flexbox for grids)
- ✅ Minimize animations on mobile devices
- ✅ Use `transform` instead of changing `left/top` for animations
- ✅ Optimize images (add lazy loading for future image support)

### Maintainability
- ✅ Use CSS custom properties (variables)
- ✅ Modularize CSS into components
- ✅ Comment complex CSS rules
- ✅ Use semantic HTML elements

### User Experience
- ✅ Ensure 44px minimum touch target size
- ✅ Provide visual feedback on interactions
- ✅ Test with keyboard navigation
- ✅ Check color contrast ratios

### Browser Support
- ✅ Test on Chrome, Firefox, Safari, Edge
- ✅ Provide fallbacks for older browsers
- ✅ Use Autoprefixer for CSS vendor prefixes

## Examples

### Minimal Template
See: `examples/sample_report.html`

### Full Featured Template
See: `examples/sample_report_full.html`

### Dark Mode Template
See: `examples/sample_report_dark.html`

## Resources

- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Color Gradient Tools](https://uigradients.com/)
- [Responsive Design Patterns](https://responsivedesign.is/patterns/)
- [Web Safe Fonts](https://www.w3schools.com/cssref/css_websafe_fonts.asp)
- [Animation Libraries](https://github.com/animate-css/animate.css)
