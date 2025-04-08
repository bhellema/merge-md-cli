#!/usr/bin/env node

import { program } from 'commander';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { mergeContent } from './merge.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program
  .name('merge-md-cli')
  .description('Merge MD files using JavaScript spread syntax')
  .version(version)
  .requiredOption('-i, --in <path>', 'input file path')
  .requiredOption('-o, --out <path>', 'output file path (use "-" for stdout)')
  .action(async (options) => {
    try {
      const inputPath = resolve(process.cwd(), options.in);
      const outputPath = options.out === '-' ? null : resolve(process.cwd(), options.out);

      const inputContent = await readFile(inputPath, 'utf8');
      const mergedContent = await mergeContent(inputContent, dirname(inputPath));

      const outputJson = JSON.stringify(mergedContent, null, 2);

      if (outputPath) {
        await writeFile(outputPath, outputJson);
        console.error(`Successfully merged content into ${outputPath}`);
      } else {
        console.log(outputJson);
      }
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse(); 