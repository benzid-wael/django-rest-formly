/// <reference path="../typings/tsd.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import _ = require('underscore');

import utils = require('../src/utils');

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe("Module Utils' Unit Tests:", () => {

    describe('extend', () => {
        it('should be empty', (done) => {
          var res = utils.extend({}, {});
          chai.assert.ok(_.isEmpty(res), "extending empty objects results on an empty object");
            done();
        });
        it('should not change', (done) => {
          var src, res;
          src = {a: 4};
          res = utils.extend(src, {});
          chai.assert(src == res, "extending with empty object don't change the destination");
            done();
        });
        it('should not change', (done) => {
          var src, res;
          src = {a: 4};
          res = utils.extend(src, {}, {}, {});
          chai.assert(src == res, "extending with empty objects don't change the destination");
            done();
        });
        it('should be overridden by last source object', (done) => {
          var res = utils.extend({a: 1}, {a: 4, b: 6}, {a: 5});
          chai.assert(res.a === 5, "last source object wins!");
          chai.assert(res.b === 6, "nothing is lost!");
            done();
        });
        it('should include null properties', (done) => {
          var res = utils.extend({a: 1}, {b: null});
          chai.assert.property(res, 'b', "null property included");
          chai.assert.isNull(res.b);
            done();
        });
        it('should update destination', (done) => {
          var dest = {a: 1};
          var res = utils.extend(dest, {a: 4, b: 6}, {a: 5});
          chai.assert(dest.a === 5, "dest properties updated");
          chai.assert(dest.b === 6, "property 'b' added to dest object");
            done();
        });
        it('should return destination', (done) => {
          var dest = {a: 1};
          var res = utils.extend(dest, {a: 4, b: 6}, {a: 5});
          chai.assert(dest === res, "returns destination object");
            done();
        });

        it('should not fails if we don\'t specifies sources', (done) => {
            chai.assert.doesNotThrow(function() {
              utils.extend({});
            });
            done();
        });
    });
});




