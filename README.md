# merge-md-cli

A command line tool to merge MD files using JavaScript spread syntax.

## Installation

```bash
npm install -g merge-md-cli
```

## Usage

```bash
merge-md --in <input-file> --out <output-file>
```

## Features

- Merge MD files using JavaScript spread syntax
- Support for nested object references
- Array merging with glob patterns
- JSONPath support for accessing specific parts of files

## Examples

### Merging Objects

Input file (`input.md`):
```json
{
    "key1": "value1",
    "...": "./other.md",
    "key2": "value2"
}
```

Other file (`other.md`):
```json
{
    "other-key1": "other-value1",
    "other-key2": "other-value2"
}
```

Result:
```json
{
    "key1": "value1",
    "other-key1": "other-value1",
    "other-key2": "other-value2",
    "key2": "value2"
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

## License

MIT
