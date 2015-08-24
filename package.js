Package.describe({
  name: 'dispatch:beanstalk-worker',
  version: '0.0.1',
  summary: 'Router for other package functions for use in AWS Elastic Beanstalk worker tier'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    // core
    'check',
    'underscore',
    'mongo',

    // community
    'simple:rest@0.2.2',
    'simple:json-routes@1.0.3',


  ], 'server');

  api.addFiles([
    'main.js',
  ], 'server');

  api.export('Beanstalk', 'server');
});

Package.onTest(function(api) {
  api.use('sanjo:jasmine@0.16.4', ['client', 'server']);
  api.use([
    'dispatch:beanstalk-worker',
    'underscore',

  ], 'server');

  api.addFiles([
    'test.js'
  ], 'server');
});
