/// <reference path="../_all.d.ts" />

import http = require("http");
import path = require("path");
import chalk = require("chalk");
import fs = require("fs");
import prettyjson = require("prettyjson");
import AngularFormly = require("angular-formly");

var JSON2 = require('JSON2');

import {toFormlyFields} from "../main";


//interface StringConstructor {
//  startsWith(prefix:string) : boolean;
//  endsWith(suffix:string) : boolean;
//}
//
//String.prototype.startsWith = function(prefix:string) : boolean {
//    return this.indexOf(prefix) === 0;
//}
//
//String.prototype.endsWith = function(suffix:string) : boolean {
//    return this.match(suffix+"$") == suffix;
//}


function startsWith(str:string, prefix:string) : boolean {
  return str.indexOf(prefix) === 0;
}

function endsWith(str:string, suffix:string) : boolean {
  if (!str) {
    return null;
  }
  var res = str.match(suffix+"$");
  if (res) {
    return res[0] === suffix;
  }
  return false;
}


export interface ICommandOptions {
  host        ?: string;
  path         : string;
  port        ?: number;
  suffix      ?: string;
  outputFile  ?: string;
  indent      ?: string;
  noColor     ?: boolean;
  noSuffix    ?: boolean;
  endpoint    ?: string;
  json        ?: boolean;
  output      ?: string;
}


export class DjangoRestFormlyCommand {

  host         : string;
  path         : string;
  port         : number;
  suffix       : string;
  outputFile   : string;
  indent       : number;
  noColor      : boolean;
  noSuffix     : boolean;
  endpoint     : string;
  json         : boolean;
  output       : string;

  constructor (options: ICommandOptions) {
    this.host       = options.host || "127.0.0.1";
    if(endsWith(this.host, "/")) {
      let str = this.host;
      this.host = str.substring(0, str.length-1);
    }
    this.path       = path.normalize(options.path || '/');
    if(!startsWith(this.path, "/")) {
      this.path = '/' + this.path;
    }
    this.port       = options.port || 8000;
    this.suffix     = '.json';
    this.outputFile = options.outputFile;
    if (options.indent) {
      this.indent = parseInt(options.indent, 10);
    } else {
      this.indent = 2;
    }
    this.noColor    = options.noColor;
    this.noSuffix   = options.noSuffix;
    this.endpoint   = options.endpoint;
    this.json       = options.json;
    this.output     = options.output || null;
  }

  log(data: any, debug: boolean = false) {
    if (this.output) {
      if (debug) {
        return ;
      }
      var output = JSON2.stringify(data, null, this.indent);
      fs.writeFile(this.output, output, function(err) {
        if (err) {
          return console.error(chalk.red(err.toString()));
        } else {
          console.info(chalk.green("Finished"));
        }
      });
    } else if (!this.json && data instanceof Object) {
      var options : any;
      if (!this.noColor) {
        options = {
          keysColor: 'green',
          stringColor: 'grey',
          numberColor: 'blue',
          inlineArrays: true,
          noColor: this.noColor
        }
      }
      console.log(prettyjson.render(data, options || {noColor: true}, this.indent)
      );
    } else if (this.json) {
      console.log(JSON2.stringify(data, null, this.indent));
    } else {
      console.log(data);
    }
  }

  request(options : http.RequestOptions, callback : (data:any) => void) {
    var handler: (response: any) => void,
        req: http.ClientRequest;

    options.headers = {
      'Accept': 'application/json; indent=' + this.indent
    }
    if (!this.noSuffix){
      options.path = options.path + this.suffix;
    }

    handler = function(response) {
      var str = '';
      response.on('data', function (chunk : string) {
        str += chunk;
      });

      response.on('end', function () {
        var errorMessage : string;
        if (response.statusCode === 401) {
          errorMessage = response.statusMessage;
        } else if (response.statusCode >= 500) {
          errorMessage = "Authentication failed!"
        } else if (response.statusCode === 404 ) {
          errorMessage = "Resource not found.";
        } else if(200 <= response.statusCode && response.statusCode < 400) {
          try {
            JSON.parse(str);
          } catch (e) {
            errorMessage = "Server does not return valid JSON data";
          }
          if (!errorMessage) {
            callback(str);
            return ;
          }
        } else {
          errorMessage = response.statusMessage;
        }
        console.error(chalk.red(errorMessage));
      });
    };
    req = http.request(options, handler);

    // adding an 'error' event handler to a stream:
    req.on('error', function(err : string) {
      // if any sort of error encountered by
      // the request, the error will be sent here.
      console.error(chalk.red(err));
      //console.error(err);
    });

    req.end();
  }

  listEndpoints () {
    var options : http.RequestOptions = {
      host: this.host,
      port: this.port,
      path: this.path,
      method: 'GET'
    },
      callback: (data:string) => void,
      vm = this;

    callback = function(raw) {
      var data = JSON.parse(raw);
      vm.log("Available endpoints:", true);  // don't redirect it to output file
      vm.log(data);
    };

    // Send request to server
    this.request(options, callback)
  }

  generateFormScheme(endpointName:string) {
    var options : http.RequestOptions = {
      host: this.host,
      port: this.port,
      path: path.join(this.path, endpointName),
      method: 'OPTIONS'
    },
      callback: (data:string) => void,
      jsonOptions : prettyjson.IOptions,
      vm = this;

    callback = function(raw) {
      var res : AngularFormly.IFieldConfigurationObject,
          errMessage = " this endpoint does not accept POST request or you don't have enough permission to perform this action.",
          data = JSON.parse(raw);
      if (data.actions && data.actions.POST) {
        res = toFormlyFields(data.actions.POST);
        vm.log(res);
      } else {
        console.log(chalk.bold.bgRed("WARNING:").toString() +
          chalk.bold(errMessage)
        );
      }
    };

    // Send request to server
    this.request(options, callback)
  }
}
