const { version, name } = require('../../package.json');

const defaultGlobalNamespace = `${name}@${version}`;

module.exports = (namespace, globalNamespace = defaultGlobalNamespace) => {
  const fn = {
    error: require('./debug')(namespace, `error ⇢ ${globalNamespace}`),
    warn: require('./debug')(namespace, `warn ⇢ ${globalNamespace}`),
    debug: require('./debug')(namespace, `debug ⇢ ${globalNamespace}`),
    info: require('./debug')(namespace, `info ⇢ ${globalNamespace}`),
    verbose: require('./debug')(namespace, `verbose ⇢ ${globalNamespace}`),
    silly: require('./debug')(namespace, `silly ⇢ ${globalNamespace}`),
  };

  return Object.create({
    error: fn.error,
    warn: fn.warn,
    warning: fn.warn, // alias,
    info: fn.info,
    debug: fn.debug,
    log: fn.debug, // alias
    silly: fn.silly,
    verbose: fn.verbose,
    namespace,
    globalNamespace, // enable/disable logs
  });
};
