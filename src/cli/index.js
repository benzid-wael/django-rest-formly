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
  .option('-S, --no-suffix', "Turn off appending '.json' to endpoints URIs")
  .option('-c, --color', "Colorize the command output")
  .option('-s, --indent-size <n>', "Specify indentation size.")
  .option('-o, --output <FILE>', "Specify output file.")
  .parse(process.argv);

program
  .command('list')
  .description('list endpoints.')
  //.option('--no-urls', "Don't display URIs")
  .action(function() {
    new command.DjangoRestFormlyCommand({
      host     : program.host,
      port     : program.port,
      path     : program.root,
      noColor  : !program.color,
      noSuffix : !program.suffix,
      indent   : program.indentSize,
      output   : program.output,
    }).listEndpoints();
  });

program
  .command('form <name>')
  .description('generate form configuration for endpoint NAME.')
  .option('--prettify', "Prettify command output")

  .action(function(name, options) {
    new command.DjangoRestFormlyCommand({
      host     : program.host,
      port     : program.port,
      path     : program.root,
      noColor  : !program.color,
      noSuffix : !program.suffix,
      json     : !options.prettify,
      indent   : program.indentSize,
      output   : program.output,
    }).generateFormScheme(name);
  });

program.parse(process.argv);
