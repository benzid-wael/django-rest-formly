/// <reference path="../_all.d.ts" />

import http = require("http");
import path = require("path");
import chalk = require("chalk");

import {DjangoRestFrameworkAdapter} from "../main";


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
  indent      ?: number;
}


export class DjangoRestFormlyCommand {

  host         : string;
  path         : string;
  port         : number;
  suffix       : string;
  outputFile   : string;
  indent       : number;

  constructor (options: ICommandOptions) {
    this.host       = options.host || "127.0.0.1";
    if(endsWith(this.host, "/")) {
      let str = this.host;
      this.host = str.substring(0, str.length-1);
    }
    this.path       = path.normalize(options.path || '/');
    if(startsWith(this.host, "/")) {
      this.path = '/' + this.path;
    }
    this.port       = options.port || 8000;
    this.suffix     = options.suffix || '';
    this.outputFile = options.outputFile;
    this.indent     = options.indent || 4;
  }

  request(options, callback) {
    var handler: (response: any) => void,
        req: http.ClientRequest;

    options.headers = {
      'Accept': 'application/json; indent=' + this.indent
    }
    options.path = options.path + this.suffix;

    handler = function(response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        var errorMessage;
        if (response.statusCode === 401) {
          errorMessage = response.statusMessage;
        }
        if (response.statusCode >= 500) {
          errorMessage = "Authentication failed!"
        }
        if(200 <= response.statusCode < 400) {
          try {
            JSON.parse(str);
          } catch (e) {
            errorMessage = "Server does not return valid JSON";
          }
          if (errorMessage) {
            console.error(chalk.red(errorMessage));
          } else {
            callback(str);
          }
        }
      });
    };
    req = http.request(options, handler);

    // adding an 'error' event handler to a stream:
    req.on('error', function(err) {
      // if any sort of error encountered by
      // the request, the error will be sent here.
      console.error(chalk.red("Can not proceed your request"));
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
      callback: (data:string) => void;

    callback = function(raw) {
      var data = JSON.parse(raw);
      console.log("Available endpoints:");
      for (var name in data) {
        console.log("  * " + name)
      }
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
      callback: (data:string) => void;

    callback = function(raw) {
      var res,
          data = JSON.parse(raw);
      if (data.actions && data.actions.POST) {
        res = DjangoRestFrameworkAdapter(data.actions.POST);
        console.log(res);
      } else {
        console.log(chalk.bold.bgRed("WARNING:") + chalk.bold(" this endpoint does not accept POST request or you don't have enough permission to see it."));
      }
    };

    // Send request to server
    this.request(options, callback)
  }
}
