import { readFile, writeFile } from 'fs';
import replaceColors from './styles.js';

const FIRST_ARG = process.argv[2];
const SECOND_ARG = process.argv[3];

let FILE_NAME = '';
let COLOR_CHANGE_TYPE = '';

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
    lines[i] = replaceColors(lines[i], COLOR_CHANGE_TYPE);
  }

  // combine lines to newContent
  const newContent = lines.join('\n');

  // Write processed content back to the file, replacing old content
  writeFile(`new_${FILE_NAME}`, newContent, (writeErr) => {
    // Catch writing error if any
    if (writeErr) {
      console.log('error writing', newContent, writeErr);
      return;
    }
    console.log('success!');
  });
};

/**
 * Checks if it's a valid path to a CSS file
 * @param {string} path - CSS file, or its path
 * @returns {boolean} - true if it's a valid CSS file / path
 */
const isCssFile = (path) => path.indexOf('.css') === path.length - 4;

const init = () => {
  if (isCssFile(FIRST_ARG)) {
    FILE_NAME = FIRST_ARG;
    readFile(FILE_NAME, 'utf-8', handleFileRead);
  }
  else if ((FIRST_ARG === 'rgbtohex' || FIRST_ARG === 'hextorgb') && isCssFile(SECOND_ARG)) {
    FILE_NAME = SECOND_ARG;
    COLOR_CHANGE_TYPE = FIRST_ARG;
    readFile(FILE_NAME, 'utf-8', handleFileRead);
  }
  else {
    console.log('Please enter a valid input.');
    console.log('To simply convert all hex values to RGB, and vice versa, please enter: node index.js \'yourFileName.css\'.');
    console.log('To convert specifically all hex values to RGB, or all RGB values to hex, please enter: node index.js \'[rgbtohex|hextorgb]\' \'yourFileName.css\'');
  }
};

init();
