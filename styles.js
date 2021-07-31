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
  else if (type === 'rgbtohex') {
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
  // unknown type, we flip the types
  else {
    let substr = line;
    let newline = '';

    while (substr.length > 0) {
      const rgbColorIndex = substr.search(/(rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/g);
      const hexColorIndex = substr.search(/#[a-f0-9]{3,6}/g);

      // no colors found
      if (rgbColorIndex === -1 && hexColorIndex === -1) {
        newline += substr;
        substr = '';
      }
      // rgb found next
      else if (rgbColorIndex > hexColorIndex) {
        const rgbColorArr = substr.match(/(rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/g);
        const color = rgbColorArr[0];
        const replacedColor = rgbToHex(color);
        // get length of existing substring up to end of first instance of rgb color;
        const substrToColorLength = substr.substring(0, rgbColorIndex).concat(color).length;
        // manual replacement: get string up to index of color to be replaced
        // then, add replaced color directly
        newline += substr.substring(0, rgbColorIndex) + replacedColor;
        // update substr, to begin searching after end of first instance of rgb color
        substr = substr.substring(substrToColorLength);
      }
      // hex found next
      else {
        const hexColorArr = substr.match(/#[a-f0-9]{3,6}/g);
        const color = hexColorArr[0];
        const replacedColor = hexToRgb(color);
        // get length of existing substring up to end of first instance of rgb color;
        const substrToColorLength = substr.substring(0, hexColorIndex).concat(color).length;
        // manual replacement: get string up to index of color to be replaced
        // then, add replaced color directly
        newline += substr.substring(0, hexColorIndex) + replacedColor;
        // update substr, to begin searching after end of first instance of rgb color
        substr = substr.substring(substrToColorLength);
      }
    }

    line = newline;
  }

  return line;
};

export default replaceColors;
