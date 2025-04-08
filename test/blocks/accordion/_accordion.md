# Accordion
This block is used to organize content within collapsible sections, allowing users to expand or collapse each section to reveal or hide its contents.

## Implementation
This block’s table has 2 columns and multiple rows, with the first row containing only the block name and optional variants.

Each subsequent row represents an accordion item as 2 cells:
Title cell (mandatory) – the clickable title or label for the accordion item.
Content cell (mandatory) – the body text, media, or any additional elements that will appear when this accordion item is expanded.
When rendered, CSS and JavaScript transform each row into an accordion panel, where clicking the panel toggles the display of its content.

## When to use

When you need to present multiple related topics in a compact format.
For FAQ sections or other question-and-answer style content.
To help users quickly scan headings and selectively view details.
When to consider another block

If your content is short and doesn’t require toggling.
When you want all details to be visible at once without user interaction.
If there are many complex elements that need a more flexible layout.