// {
//   "name": "mynode",
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "scripts": {
//     "clean": "rm -rf dist",
//     "start": "node ./bin/dev",
//     "build": "npm run clean && mkdir dist && babel src -s -d dist",
//     "production": "npm run build && node bin/pro",
//     "test": "jest"
//   },
//   "author": "",
//   "license": "ISC",
//   "dependencies": {
//     "axios": "^0.18.0",
//     "body-parser": "^1.18.3",
//     "express": "^4.16.4",
//     "http-status-codes": "^1.3.0",
//     "nodemon": "^1.18.9",
//     "pg": "^7.8.0",
//     "reflect-metadata": "^0.1.13",
//     "tv4": "^1.3.0",
//     "typeorm": "^0.2.11",
//     "uuid": "^3.3.2"
//   },
//   "devDependencies": {
//     "@babel/core": "^7.2.2",
//     "@babel/preset-env": "^7.3.1",
//     "babel-plugin-transform-runtime": "^6.23.0",
//     "babel-polyfill": "^6.26.0",
//     "babel-preset-env": "^1.7.0",
//     "babel-register": "^6.26.0",
//     "jest": "^24.0.0"
//   },
//   "babel": {
//     "presets": [
//       "@babel/preset-env"
//     ]
//   }
// }