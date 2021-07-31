import { hexToRgb, rgbToHex } from './conversions.js';

/**
 * A function that returns the styles in the stylesheet in an array, with colors replaced
 * @param  text {string} a CSS line, preferably with a property-value pair
 * @return {string}  the CSS line, with color values (if any) replaced
 */
const replaceColors = (text, type) => {
  let line = text;

  if (type === 'hextorgb') {
    // hex color matching
    // matches "#[any value from 0 - f, 3 characters to 6 characters]"
    const hexColorArr = line.match(/#[a-f0-9]{3,6}/g);
    // using .match, hexColorArr will be an array if there is length > 0
    // otherwise, it will be null. thus, no need for a length check
    if (Array.isArray(hexColorArr)) {
      for (let i = 0; i < hexColorArr.length; i += 1) {
        line = line.replace(hexColorArr[i], hexToRgb(hexColorArr[i]));
      }
    }
  }
  // input validation already handled in index.js
  // thus, we assume else-case refers to rgbtohex
  else {
    // rgb color matching
    // matches "rgb([1 to 3 digit number], [1 to 3 digit number], [1 to 3 digit number])",
    // including any spaces between the characters
    const rgbColorArr = line.match(/(rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/g);
    // using .match, rgbColorArr will be an array if there is length > 0
    // otherwise, it will be null. thus, no need for a length check
    if (Array.isArray(rgbColorArr)) {
      for (let i = 0; i < rgbColorArr.length; i += 1) {
        line = line.replace(rgbColorArr[i], rgbToHex(rgbColorArr[i]));
      }
    }
  }

  return line;
};

export default replaceColors;
