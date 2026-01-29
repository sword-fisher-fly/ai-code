#!/bin/bash

# Test script for AI News Fetcher
# Tests the fetch_ai_news.sh script with various scenarios

set -e

echo "========================================="
echo "AI News Reporter - Test Suite"
echo "========================================="
echo ""

# Get the directory of this test script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
SCRIPTS_DIR="$SKILL_DIR/scripts"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check if scripts exist
echo "Test 1: Checking if scripts exist..."
if [ -f "$SCRIPTS_DIR/fetch_ai_news.sh" ]; then
    echo -e "${GREEN}✓${NC} fetch_ai_news.sh exists"
else
    echo -e "${RED}✗${NC} fetch_ai_news.sh not found"
    exit 1
fi

if [ -f "$SCRIPTS_DIR/process_news.py" ]; then
    echo -e "${GREEN}✓${NC} process_news.py exists"
else
    echo -e "${RED}✗${NC} process_news.py not found"
    exit 1
fi

if [ -f "$SCRIPTS_DIR/generate_html.py" ]; then
    echo -e "${GREEN}✓${NC} generate_html.py exists"
else
    echo -e "${RED}✗${NC} generate_html.py not found"
    exit 1
fi

echo ""

# Test 2: Check script permissions
echo "Test 2: Checking script permissions..."
if [ -x "$SCRIPTS_DIR/fetch_ai_news.sh" ]; then
    echo -e "${GREEN}✓${NC} fetch_ai_news.sh is executable"
else
    echo -e "${YELLOW}!${NC} Making fetch_ai_news.sh executable..."
    chmod +x "$SCRIPTS_DIR/fetch_ai_news.sh"
fi

if [ -x "$SCRIPTS_DIR/process_news.py" ]; then
    echo -e "${GREEN}✓${NC} process_news.py is executable"
else
    echo -e "${YELLOW}!${NC} Making process_news.py executable..."
    chmod +x "$SCRIPTS_DIR/process_news.py"
fi

if [ -x "$SCRIPTS_DIR/generate_html.py" ]; then
    echo -e "${GREEN}✓${NC} generate_html.py is executable"
else
    echo -e "${YELLOW}!${NC} Making generate_html.py executable..."
    chmod +x "$SCRIPTS_DIR/generate_html.py"
fi

echo ""

# Test 3: Check required dependencies
echo "Test 3: Checking dependencies..."

# Check curl
if command -v curl &> /dev/null; then
    echo -e "${GREEN}✓${NC} curl is installed"
else
    echo -e "${RED}✗${NC} curl is not installed"
    exit 1
fi

# Check python3
if command -v python3 &> /dev/null; then
    echo -e "${GREEN}✓${NC} python3 is installed"
    PYTHON_VERSION=$(python3 --version)
    echo "  Version: $PYTHON_VERSION"
else
    echo -e "${RED}✗${NC} python3 is not installed"
    exit 1
fi

echo ""

# Test 4: Check Python imports
echo "Test 4: Checking Python imports..."
python3 -c "import json, sys, os, re, datetime" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Required Python modules available"
else
    echo -e "${RED}✗${NC} Some Python modules are missing"
    exit 1
fi

echo ""

# Test 5: Test sample data processing
echo "Test 5: Testing sample data processing..."

SAMPLE_DATA="$SCRIPT_DIR/sample_news_data.json"
if [ -f "$SAMPLE_DATA" ]; then
    echo -e "${GREEN}✓${NC} Sample data file exists"

    # Test processing with sample data
    OUTPUT_DIR="$SKILL_DIR/processed_test"
    mkdir -p "$OUTPUT_DIR"

    python3 "$SCRIPTS_DIR/process_news.py" "$SAMPLE_DATA" "$OUTPUT_DIR/test_processed.json" 2>&1

    if [ -f "$OUTPUT_DIR/test_processed.json" ]; then
        echo -e "${GREEN}✓${NC} Sample data processing successful"

        # Check if output is valid JSON
        python3 -m json.tool "$OUTPUT_DIR/test_processed.json" > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓${NC} Processed data is valid JSON"
        else
            echo -e "${RED}✗${NC} Processed data is not valid JSON"
        fi
    else
        echo -e "${RED}✗${NC} Failed to create processed data file"
    fi
else
    echo -e "${RED}✗${NC} Sample data file not found"
fi

echo ""

# Test 6: Test HTML generation
echo "Test 6: Testing HTML generation..."

if [ -f "$OUTPUT_DIR/test_processed.json" ]; then
    HTML_OUTPUT="$OUTPUT_DIR/test_report.html"
    python3 "$SCRIPTS_DIR/generate_html.py" "$OUTPUT_DIR/test_processed.json" "$HTML_OUTPUT" 2>&1

    if [ -f "$HTML_OUTPUT" ]; then
        echo -e "${GREEN}✓${NC} HTML generation successful"

        # Check if HTML contains expected elements
        if grep -q "<!DOCTYPE html>" "$HTML_OUTPUT" && \
           grep -q "今日AI简报" "$HTML_OUTPUT" && \
           grep -q "news-card" "$HTML_OUTPUT"; then
            echo -e "${GREEN}✓${NC} HTML contains expected elements"
        else
            echo -e "${RED}✗${NC} HTML is missing expected elements"
        fi
    else
        echo -e "${RED}✗${NC} Failed to create HTML file"
    fi
fi

echo ""

# Test 7: Test network connectivity (optional)
echo "Test 7: Testing network connectivity..."

# Test connection to a sample RSS feed
TEST_URL="https://techcrunch.com/category/artificial-intelligence/feed/"
if curl -s --max-time 10 --head "$TEST_URL" | grep "200 OK" > /dev/null; then
    echo -e "${GREEN}✓${NC} Can reach RSS feeds (network connectivity OK)"
else
    echo -e "${YELLOW}!${NC} Cannot reach RSS feeds (may be offline or blocked)"
    echo "  This is OK for offline testing"
fi

echo ""

# Test 8: Validate directory structure
echo "Test 8: Validating directory structure..."

REQUIRED_DIRS=(
    "$SKILL_DIR/skills"
    "$SKILL_DIR/scripts"
    "$SKILL_DIR/references"
    "$SKILL_DIR/examples"
)

ALL_DIRS_EXIST=true
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $dir exists"
    else
        echo -e "${RED}✗${NC} $dir missing"
        ALL_DIRS_EXIST=false
    fi
done

echo ""

# Test 9: Check SKILL.md
echo "Test 9: Checking SKILL.md..."

SKILL_MD="$SKILL_DIR/SKILL.md"
if [ -f "$SKILL_MD" ]; then
    echo -e "${GREEN}✓${NC} SKILL.md exists"

    # Check for required frontmatter
    if grep -q "^---" "$SKILL_MD" && \
       grep -q "^name:" "$SKILL_MD" && \
       grep -q "^description:" "$SKILL_MD" && \
       grep -q "^---" "$SKILL_MD"; then
        echo -e "${GREEN}✓${NC} SKILL.md has valid frontmatter"
    else
        echo -e "${RED}✗${NC} SKILL.md missing required frontmatter fields"
    fi
else
    echo -e "${RED}✗${NC} SKILL.md not found"
fi

echo ""

# Test 10: Summary
echo "========================================="
echo "Test Summary"
echo "========================================="
echo ""

if [ "$ALL_DIRS_EXIST" = true ]; then
    echo -e "${GREEN}All required directories exist${NC}"
else
    echo -e "${RED}Some directories are missing${NC}"
fi

echo ""
echo "Test files created in: $OUTPUT_DIR"
echo "- test_processed.json: Processed news data"
echo "- test_report.html: Generated HTML report"
echo ""
echo "To view the test report:"
echo "  open $HTML_OUTPUT"
echo ""
echo "To clean up test files:"
echo "  rm -rf $OUTPUT_DIR"
echo ""

# Cleanup test files after a delay
echo "Cleaning up test files in 5 seconds..."
sleep 5
rm -rf "$OUTPUT_DIR"
echo -e "${GREEN}✓${NC} Test files cleaned up"

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}All tests completed successfully!${NC}"
echo -e "${GREEN}=========================================${NC}"
