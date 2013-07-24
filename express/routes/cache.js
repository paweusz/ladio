var expirationTime = 30 * 60; //Cache expiration time (sec)

var cacheHash = null;
var cacheExpires = new Date();

function cache() {
  if (cacheExpires.getTime() < new Date().getTime()) {
    cacheHash = null;
    console.log('Clearing cache (ts = ' + new Date() + ').');
  }
  if (!cacheHash) {
    cacheHash = {};
    cacheExpires = new Date();
    cacheExpires.setSeconds(cacheExpires.getSeconds() + expirationTime);
  }
  return cacheHash;
}

function put(key, value) {
//  console.log('put cache[' + key + '] = ' + value);
  cache()[key] = value;
}

function get(key) {
//  console.log('get cache[' + key + '] = ' + cache()[key]);
  return cache()[key];
}

exports.put = put;
exports.get = get;

