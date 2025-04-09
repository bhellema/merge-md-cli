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
- Output to file or stdout

## Examples

### Merging Objects

Input file (`test/input.json`):
```json
{
    "title": "Block Library Descriptions",
    "blocks": [
        { "...": "./blocks/accordion/_accordion.md" },
        { "...": "./blocks/*.md" }
    ]
}
```

Example markdown file (`test/blocks/accordion/_accordion.md`):
```markdown
# Accordion

An accordion is a vertically stacked set of interactive headings that reveal or hide associated content.
```

Result:
```json
{
    "title": "Block Library Descriptions",
    "blocks": [
        {
            "block": "Accordion",
            "description": "An accordion is a vertically stacked set of interactive headings that reveal or hide associated content."
        }
    ]
}
```

## Testing

Run the test script to verify functionality:

```bash
./test/test.sh
```

## License

Apache License 2.0
