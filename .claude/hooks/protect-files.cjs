#!/usr/bin/env node

/**
 * Pre-tool hook: Blocks editing of protected files
 *
 * Protected files:
 * - .env files (secrets)
 * - Lock files (should be generated)
 * - .git directory
 * - node_modules
 * - .next build output
 */

const fs = require('fs');

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

    // Protected file patterns
    const protectedPatterns = [
      /^\.env$/,
      /^\.env\./,
      /\.env\.local$/,
      /\.env\.production$/,
      /\.env\.development$/,
      /package-lock\.json$/,
      /pnpm-lock\.yaml$/,
      /yarn\.lock$/,
      /^\.git\//,
      /^\.git$/,
      /settings\.local\.json$/,
      /^node_modules\//,
      /^\.next\//,
      /^out\//,
    ];

    const isProtected = protectedPatterns.some((pattern) =>
      pattern.test(filePath)
    );

    if (isProtected) {
      // Output JSON to block the operation
      console.log(
        JSON.stringify({
          decision: 'block',
          reason: `Protected file: ${filePath} - This file should not be edited directly.`,
        })
      );
    } else {
      // Allow the operation
      console.log(JSON.stringify({ decision: 'allow' }));
    }
  } catch (error) {
    // On error, allow (fail open)
    console.log(JSON.stringify({ decision: 'allow' }));
  }
});
