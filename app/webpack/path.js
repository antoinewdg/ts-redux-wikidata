const path = require('path');

const appDir = path.resolve(__dirname, '..');
module.exports = {
  app: appDir,
  src: path.resolve(appDir, 'src'),
  dist: path.resolve(appDir, 'dist'),
  indexJs: path.resolve(appDir, 'src', 'index.tsx'),
  indexHTML: path.resolve(__dirname, 'index.html'),
  tsconfig: path.resolve(appDir, 'tsconfig.json'),
  tslint: path.resolve(appDir, 'tslint.json'),
};
