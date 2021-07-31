import { readFile, writeFile } from 'fs';
import replaceColors from './styles.js';

const COLOR_CHANGE_TYPE = process.argv[2];
const FILE_NAME = process.argv[3];

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
  if (COLOR_CHANGE_TYPE === 'rgbtohex' || COLOR_CHANGE_TYPE === 'hextorgb') {
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
  } else {
    console.log('Please enter a valid value for how you would like the colors in the stylesheet to change.');
  }
};

const init = () => {
  readFile(FILE_NAME, 'utf-8', handleFileRead);
};

init();
