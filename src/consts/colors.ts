/*
  import * as colors
  colors.purple === '#8c46ff'
 */

export const purple100 = '#f1e9ff';
export const purple200 = '#ebdfff';
export const purple300 = '#ccafff';
export const purple400 = '#a168ff';
export const purple500 = '#8c46ff';
export const purple600 = '#7e3ff1';
export const purple700 = '#7038e4';
export const purple800 = '#6231d6';
export const purple900 = '#542ac8';
export const purple1000 = '#5C28EE';

export const independence100 = '#f6f5fa';
export const independence200 = '#eceaf4';
export const independence300 = '#dfdce9';
export const independence400 = '#bcb9c8';
export const independence500 = '#84849b';
export const independence600 = '#71718c';
export const independence700 = '#535366';
export const independence800 = '#3d3d50';
export const independence900 = '#1e1e25';

export const space100 = '#f8f8fb';
export const space200 = '#f6f5fa';
export const space300 = '#e4e4ec';
export const space400 = '#cbcad6';
export const space500 = '#353742';
export const space600 = '#353742';
export const space700 = '#2b2c35';
export const space800 = '#272831';
export const space900 = '#22232d';

export const azure = '#0683f7';
export const oceanGreen = '#5dbc96';
export const orangeYellow = '#fece63';
export const fieryRose = '#f55365';
export const white = '#ffffff';
export const transparent = 'transparent';

export const feedbackColor = '#F93C52';

export const shadowColor = '#7A7F8A';

export const hexToRgb = (hex: string): number[] => {
  const m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);

  if (m === null) throw new Error('hexToRgb: bad hex');

  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
};

export const iconColors = {
  btc: '#f39830',
  eth: '#ECEFF0',
  usdt: '#50af95',
  sol: '#E4F3FF',
  plain: independence900,
  blocked: independence400,
};
