const crypto = require('crypto');

// Anti-time attack
const stringsEqual = (a, b) => {
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0 && a.length === b.length;
};

const hash = (authKey, str) => {
  const hashed = crypto.createHash('sha256');
  hashed.update(str + authKey);
  return hashed.digest('hex');
};

const postFetcher = (url, postData) => fetch(url, {
  method: 'POST',
  cache: 'no-cache',
  body: JSON.stringify(postData),
  headers: {
    'Content-Type': 'application/json',
  },
}).then((response) => {
  if (!response.ok || response.status !== 200) return false;
  return response.json();
});

module.exports = { stringsEqual, hash, postFetcher };
