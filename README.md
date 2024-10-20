# Tailwind CSS Class Generator

This project provides a set of scripts to generate, analyze, and convert all Tailwind CSS classes into a compact JSON format.

## Features

- Generates a CSS file containing all Tailwind CSS classes
- Counts the total and unique CSS classes in the generated file
- Converts the CSS file into a compact JSON format for easy consumption in other projects

## Prerequisites

- Node.js (version 12 or higher)
- npm (comes with Node.js)

## Installation

1. Clone this repository:

   ```
   git clone [https://github.com/actopas/tailwind-classes-generator.git]
   cd [tailwind-classes-generator]
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

This project provides several npm scripts to perform different tasks:

1. Generate the CSS file:

   ```
   npm run build:css
   ```

   This will create an `output.css` file containing all Tailwind CSS classes.

2. Count the CSS classes:

   ```
   npm run count
   ```

   This will display the total number of classes and unique classes in the console.

3. Convert CSS to JSON:

   ```
   npm run css-to-json
   ```

   This will create an `output.min.json` file containing the CSS classes in a compact JSON format.

4. Run the full process (generate CSS, count classes, and convert to JSON):
   ```
   npm run full-process
   ```

## Configuration

The Tailwind CSS configuration is in `tailwind.config.js`. By default, it's set to include all possible classes. You can modify this file to customize the output.

## Files

- `input.css`: The input file for Tailwind CSS directives
- `output.css`: The generated CSS file containing all Tailwind classes
- `output.min.json`: The JSON file containing the converted CSS classes
- `countClasses.mjs`: Script to count CSS classes
- `css2ObjectArray.mjs`: Script to convert CSS to JSON

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
