/// <reference path="../typings/tsd.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import _ = require('underscore');

import * as utils from '../src/utils';

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe("Module Utils' Unit Tests:", () => {

    var src  : {a ?: any, b ?: any, c ?: any},
        res  : {a ?: any, b ?: any, c ?: any},
        dest : {a ?: any, b ?: any, c ?: any};

    describe('extend', () => {
        it('should be empty', (done) => {
          res = utils.extend({}, {});
          chai.assert.ok(_.isEmpty(res), "extending empty objects results on an empty object");
            done();
        });
        it('should not change', (done) => {
          src = {a: 4};
          res = utils.extend(src, {});
          chai.assert(src == res, "extending with empty object don't change the destination");
            done();
        });
        it('should not change', (done) => {
          src = {a: 4};
          res = utils.extend(src, {}, {}, {});
          chai.assert(src == res, "extending with empty objects don't change the destination");
            done();
        });
        it('should be overridden by last source object', (done) => {
          res = utils.extend({a: 1}, {a: 4, b: 6}, {a: 5});
          chai.assert(res.a === 5, "last source object wins!");
          chai.assert(res.b === 6, "nothing is lost!");
            done();
        });
        it('should include null values', (done) => {
          res = utils.extend({a: 1}, {b: null});
          chai.assert.property(res, 'b', "property with null value included");
          chai.assert.isNull(res.b);
            done();
        });
        it('should update destination', (done) => {
          dest = {a: 1};
          res = utils.extend(dest, {a: 4, b: 6}, {a: 5});
          chai.assert(dest.a === 5, "dest properties updated");
          chai.assert(dest.b === 6, "property 'b' added to dest object");
            done();
        });
        it('should return destination', (done) => {
          dest = {a: 1};
          res = utils.extend(dest, {a: 4, b: 6}, {a: 5});
          chai.assert(dest === res, "returns destination object");
            done();
        });

        it('should not fail if we didn\'t specify sources', (done) => {
            chai.assert.doesNotThrow(function() {
              utils.extend({});
            });
            done();
        });
    });

    describe('smartExtend', () => {
        it('should be empty', (done) => {
          res = utils.smartExtend({}, {});
          chai.assert.ok(_.isEmpty(res), "extending empty objects results on an empty object");
            done();
        });
        it('should not change', (done) => {
          src = {a: 4};
          res = utils.smartExtend(src, {});
          chai.assert(src == res, "extending with empty object don't change the destination");
            done();
        });
        it('should not change', (done) => {
          src = {a: 4};
          res = utils.smartExtend(src, {}, {}, {});
          chai.assert(src == res, "extending with empty objects don't change the destination");
            done();
        });
        it('should be overridden by last source object', (done) => {
          res = utils.smartExtend({a: 1}, {a: 4, b: 6}, {a: 5});
          chai.assert(res.a === 5, "last source object wins!");
          chai.assert(res.b === 6, "nothing is lost!");
            done();
        });
        it('should not include null values', (done) => {
          res = utils.smartExtend({a: 1}, {b: null});
          chai.assert.notProperty(res, 'b', "property with null value not included");
          chai.assert.isUndefined(res.b);
            done();
        });
        it('should not include undefined values', (done) => {
          res = utils.smartExtend({a: 1}, {b: null});
          chai.assert.notProperty(res, 'b', "property with undefined value not included");
          chai.assert.isUndefined(res.b);
            done();
        });
        it('should update destination', (done) => {
          dest = {a: 1};
          res = utils.smartExtend(dest, {a: 4, b: 6}, {a: 5});
          chai.assert(dest.a === 5, "dest properties updated");
          chai.assert(dest.b === 6, "property 'b' added to dest object");
            done();
        });
        it('should return destination', (done) => {
          dest = {a: 1};
          res = utils.smartExtend(dest, {a: 4, b: 6}, {a: 5});
          chai.assert(dest === res, "returns destination object");
            done();
        });

        it('should not fails if we don\'t specifies sources', (done) => {
            chai.assert.doesNotThrow(function() {
              utils.smartExtend({});
            });
            done();
        });
    });
});




