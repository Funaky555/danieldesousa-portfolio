#!/usr/bin/env node

/**
 * Post-tool hook: Auto-format TypeScript/JavaScript files after editing
 *
 * Uses Prettier if available, otherwise skips silently.
 */

const { execSync } = require('child_process');
const path = require('path');

// Read hook input from stdin
let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    const filePath = hookData.tool_input?.file_path || '';

    // Only format TypeScript and JavaScript files
    const formattableExtensions = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];
    const ext = path.extname(filePath).toLowerCase();

    if (!formattableExtensions.includes(ext)) {
      process.exit(0);
    }

    // Try to format with Prettier
    try {
      execSync(`npx prettier --write "${filePath}"`, {
        stdio: 'pipe',
        timeout: 10000, // 10 second timeout
      });
    } catch (error) {
      // Prettier not available or failed - that's OK
      // Silent fail, don't block the workflow
    }

    process.exit(0);
  } catch (error) {
    // On error, exit cleanly
    process.exit(0);
  }
});
