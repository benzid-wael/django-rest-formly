#!/usr/bin/env node

require('better-require')('json');


var program = require('commander'),
    chalk   = require('chalk'),
    command = require('./command');


var version = require('../../package').version;


program
  .version(version)
  .option('-h, --host <HOST>', "Specifies host address")
  .option('-p, --port <PORT>', "Specifies address port")
  .option('--root <PATH>', "Specifies root path for the API")
  .option('--no-suffix', "Turn off appending '.json' to endpoints URIs");


program.parse(process.argv);
