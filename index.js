import { readFile, writeFile } from 'fs';
import replaceColors from './styles.js';

const filename = process.argv[2];

/**
 * Process content and write new content back to original file
 * @param readErr - Reading error if any
 * @param content - Original file content
 * @returns undefined
 */
const handleFileRead = (readErr, content) => {
  // Catch reading error if any
  if (readErr) {
    console.log('reading error', readErr);
  }

  // split each individual line
  const lines = content.split('\n');
  // replace (any) colors in each line
  for (let i = 0; i < lines.length; i += 1) {
    lines[i] = replaceColors(lines[i]);
  }

  // combine lines to newContent
  const newContent = lines.join('\n');

  // Write processed content back to the file, replacing old content
  writeFile(filename, newContent, (writeErr) => {
    // Catch writing error if any
    if (writeErr) {
      console.log('error writing', newContent, writeErr);
      return;
    }
    console.log('success!');
  });
};

readFile(filename, 'utf-8', handleFileRead);
