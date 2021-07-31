import { hexToRgb } from './conversions.js';

/**
 * A function that returns the styles in the stylesheet in an array, with colors replaced
 * @param  text {string} a CSS line, preferably with a property-value pair
 * @return {string}  the CSS line, with color values (if any) replaced
 */
const replaceColors = (text) => {
  let line = text;
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

  return line;
};

export default replaceColors;
