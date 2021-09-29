const { describe, expect, test } = require('@jest/globals');
const log = require('./index')();
const logWithNamespace = require('./index')('pepe');
const logWithGlobalNamespace = require('./index')('pepe', 'pepa');

describe('logger', () => {
  test('correct namespace properties', () => {
    expect(log).toHaveProperty('namespace');
    expect(log).toHaveProperty('globalNamespace');
    expect(logWithNamespace).toHaveProperty('namespace', 'pepe');
    expect(logWithGlobalNamespace).toHaveProperty('namespace', 'pepe');
    expect(logWithGlobalNamespace).toHaveProperty('globalNamespace', 'pepa');
  });

  test('has all log functions', () => {
    expect(log).toHaveProperty('error');
    expect(log).toHaveProperty('warn');
    expect(log).toHaveProperty('warning');
    expect(log).toHaveProperty('info');
    expect(log).toHaveProperty('debug');
    expect(log).toHaveProperty('log');
    expect(log).toHaveProperty('silly');
    expect(log).toHaveProperty('verbose');
  });
});
