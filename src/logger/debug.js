/* eslint-disable func-names */

module.exports = (namespace, globalNamespace) => {
  const name = namespace ? `${globalNamespace}:${namespace}` : globalNamespace;

  const debug = require('debug')(name);

  return function (...args) {
    debug.apply(this, args);
  };
};
