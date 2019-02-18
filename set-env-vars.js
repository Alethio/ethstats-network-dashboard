#!/usr/bin/env node

const fs = require('fs');

let config = fs.readFileSync('config.js.example', 'utf8');
config = config.toString().replace('const config = ', '').replace(';', '');

// Replace ":" with "@colon@" if it's between double-quotes
config = config.replace(/:\s*"([^"]*)"/g, function(match, p1) {
  return ': "' + p1.replace(/:/g, '@colon@') + '"';
});

// Replace ":" with "@colon@" if it's between single-quotes
config = config.replace(/:\s*'([^']*)'/g, function(match, p1) {
  return ': "' + p1.replace(/:/g, '@colon@') + '"';
});

// Add double-quotes around any tokens before the remaining ":"
config = config.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ');

// Turn "@colon@" back into ":"
config = config.replace(/@colon@/g, ':');

config = JSON.parse(config);

Object.keys(config).forEach(item => {
  if (process.env[item]) {
    if (item === 'PRIVACY_POLICY' || item === 'AVG_GAS_PRICE_ENABLED') {
      config[item] = process.env[item] === 'true';
    } else {
      config[item] = process.env[item];
    }
  }
});

console.log('const config = ' + JSON.stringify(config, null, 2) + ';');
