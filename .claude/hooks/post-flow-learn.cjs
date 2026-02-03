#!/usr/bin/env node

/**
 * Stop/SubagentStop hook: Suggests /learn if code was changed
 *
 * Checks if there are uncommitted changes and suggests
 * running /learn to capture any lessons from the work.
 */

const { execSync } = require('child_process');

function hasUncommittedChanges() {
  try {
    const status = execSync('git status --porcelain', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return status.trim().length > 0;
  } catch (error) {
    // Not a git repo or git not available
    return false;
  }
}

function getChangedFiles() {
  try {
    const status = execSync('git status --porcelain', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const files = status
      .trim()
      .split('\n')
      .filter((line) => line.length > 0)
      .map((line) => line.substring(3))
      .filter((file) => {
        // Only care about code files
        return (
          file.endsWith('.ts') ||
          file.endsWith('.tsx') ||
          file.endsWith('.js') ||
          file.endsWith('.jsx') ||
          file.endsWith('.css') ||
          file.endsWith('.md')
        );
      });

    return files;
  } catch (error) {
    return [];
  }
}

// Main
try {
  if (hasUncommittedChanges()) {
    const files = getChangedFiles();

    if (files.length > 0) {
      console.log('');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('  Code changed! Consider running /learn to');
      console.log('  capture any lessons from this work.');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
    }
  }
} catch (error) {
  // Silent fail - don't disrupt the workflow
}

process.exit(0);
