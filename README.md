# merge-md-cli

A command line tool to merge MD files using JavaScript spread syntax.

## Installation

```bash
# Clone the repository
git clone https://github.com/bhellema/merge-md-cli.git
cd merge-md-cli

# Install dependencies
npm install

# Make the CLI executable
chmod +x src/index.js
```

## Usage

```bash
# Basic usage
node src/index.js -i <input-file> -o <output-file>

# Output to stdout
node src/index.js -i <input-file> -o -

# Using npx (if published to npm)
npx merge-md-cli -i <input-file> -o <output-file>
```

## Features

- Merge MD files using JavaScript spread syntax
- Support for nested object references
- Array merging with glob patterns
- JSONPath support for accessing specific parts of files
- Output to file or stdout

## Examples

### Merging Objects

Input file (`input.json`):
```json
{
    "title": "My Document",
    "sections": [
        { "...": "./sections/intro.md" },
        { "...": "./sections/*.md" }
    ],
    "metadata": {
        "...": "./metadata.md",
        "version": "1.0.0"
    }
}
```

Other file (`sections/intro.md`):
```markdown
# Introduction

This is the introduction section of the document.
```

Result:
```json
{
    "title": "My Document",
    "sections": [
        {
            "block": "Introduction",
            "description": "This is the introduction section of the document."
        }
    ],
    "metadata": {
        "author": "John Doe",
        "date": "2024-04-08",
        "tags": ["documentation", "test"],
        "version": "1.0.0"
    }
}
```

### Nested Object References

```json
{
    "...": "./other.md#/some/key"
}
```

### Merging Arrays

```json
[
    { "...": "../*/component.md" }
]
```

## Testing

Run the test script to verify functionality:

```bash
./test/test.sh
```

## License

MIT
