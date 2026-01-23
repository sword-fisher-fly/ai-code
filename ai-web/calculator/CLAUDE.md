# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple **Calculator** (计算器) application implemented as a single standalone HTML file with embedded CSS and JavaScript. The calculator runs directly in a web browser without requiring any build system or dependencies.

## Running the Calculator

**To use the calculator:**
```bash
# Simply open the HTML file in any web browser
open calculator.html
# or
firefox calculator.html
# or
google-chrome calculator.html
```

## Project Structure

- **calculator.html** - Single self-contained file containing:
  - HTML structure for calculator display and buttons
  - CSS styling for calculator appearance
  - JavaScript logic for calculation operations

## Calculator Features

The calculator supports basic arithmetic operations:
- **Numbers** - 0-9 digits
- **Operators** - Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Equals** (=) - Calculate and display result
- **Clear** (C) - Clear current input
- **Clear All** (AC) - Clear all inputs and reset
- **Decimal** (.) - Decimal point for floating point numbers

## Architecture

The calculator is implemented in vanilla JavaScript with the following key functions:

- **handleNumber(num)** - Handles number button clicks and builds the current number
- **handleOperator(op)** - Handles operator button clicks
- **handleEquals()** - Performs calculation and displays result
- **handleClear()** - Clears current input
- **handleClearAll()** - Resets entire calculator state
- **updateDisplay()** - Updates the calculator display

The calculator uses:
- DOM manipulation for UI updates
- Event listeners for button interactions
- State management for tracking current input and operations
- Error handling for edge cases (division by zero, etc.)

## Common Development Tasks

Since this is a simple single-file project, there are no build, test, or lint commands. All modifications should be made directly to `calculator.html`.

**No existing commands for:**
- Building
- Linting
- Testing
- Development server

## Language

The calculator interface and comments are in **Chinese** (Simplified).
