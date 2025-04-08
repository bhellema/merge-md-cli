import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { glob } from 'glob';
import { marked } from 'marked';

export async function mergeContent(content, baseDir) {
  const data = JSON.parse(content);
  return await mergeObject(data, baseDir);
}

async function mergeObject(obj, baseDir) {
  if (Array.isArray(obj)) {
    return await mergeArray(obj, baseDir);
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key === '...') {
      const spreadContent = await handleSpread(value, baseDir);
      Object.assign(result, spreadContent);
    } else if (typeof value === 'object' && value !== null) {
      result[key] = await mergeObject(value, baseDir);
    } else {
      result[key] = value;
    }
  }

  return result;
}

async function mergeArray(arr, baseDir) {
  const result = [];

  for (const item of arr) {
    if (typeof item === 'object' && item !== null && '...' in item) {
      const spreadContent = await handleSpread(item['...'], baseDir);
      if (Object.keys(item).length === 1) {
        // If spread is the only key, add all items to the result array
        if (Array.isArray(spreadContent)) {
          result.push(...spreadContent);
        } else {
          result.push(spreadContent);
        }
      } else {
        // If there are other keys, merge them with the spread content
        const mergedItem = { ...item };
        delete mergedItem['...'];
        if (Array.isArray(spreadContent)) {
          result.push(...spreadContent.map(content => ({ ...mergedItem, ...content })));
        } else {
          result.push({ ...mergedItem, ...spreadContent });
        }
      }
    } else if (typeof item === 'object' && item !== null) {
      result.push(await mergeObject(item, baseDir));
    } else {
      result.push(item);
    }
  }

  return result;
}

async function handleSpread(path, baseDir) {
  const [filePath, jsonPath] = path.split('#');
  const absolutePath = resolve(baseDir, filePath);

  if (filePath.includes('*')) {
    // Handle glob patterns
    const files = await glob(absolutePath);
    const results = await Promise.all(
      files.map(async file => {
        const content = await readFile(file, 'utf8');
        if (file.endsWith('.md')) {
          return processMarkdown(content, file);
        }
        return JSON.parse(content);
      })
    );
    return results;
  }

  const content = await readFile(absolutePath, 'utf8');
  if (absolutePath.endsWith('.md')) {
    return processMarkdown(content, absolutePath);
  }

  const data = JSON.parse(content);
  if (jsonPath) {
    return getValueByPath(data, jsonPath);
  }

  return data;
}

function processMarkdown(content, filePath) {
  const tokens = marked.lexer(content);
  const title = tokens.find(token => token.type === 'heading' && token.depth === 1)?.text || '';
  const description = tokens
    .filter(token => token.type !== 'heading' || token.depth !== 1)
    .map(token => {
      if (token.type === 'paragraph') {
        return token.text;
      }
      if (token.type === 'heading') {
        return `${'#'.repeat(token.depth)} ${token.text}`;
      }
      if (token.type === 'list') {
        return token.items.map(item => `- ${item.text}`).join('\n');
      }
      return token.raw || '';
    })
    .join('\n\n');

  return {
    block: title,
    description: description.trim()
  };
}

function getValueByPath(obj, path) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Split the path into segments
  const segments = cleanPath.split('/');

  // Traverse the object
  let current = obj;
  for (const segment of segments) {
    if (current === undefined || current === null) {
      return undefined;
    }
    current = current[segment];
  }

  return current;
} 