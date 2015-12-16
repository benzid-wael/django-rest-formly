/// <reference path="../typings/tsd.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');

import {DjangoRestConfig} from '../src/DjangoRestConfig';
import * as fields from "../src/fields";
import {extend} from '../src/utils';
import {IDjangoRestFieldOptions} from "../src/interfaces";

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe("Module DjangoRestConfig' Unit Tests:", () => {

  var factoryTestCases = [
    {
      src: {
        type: "boolean"
      },
      expected: {
        fieldType: "checkbox",
        "class": fields.BooleanField
      }
    },
    {
      src: {
        type: "email"
      },
      expected: {
        fieldType: "email",
        "class": fields.EmailField
      }
    },
    {
      src: {
        type: "hidden"
      },
      expected: {
        fieldType: "hidden",
        "class": fields.HiddenField
      }
    },
    {
      src: {
        type: "password"
      },
      expected: {
        fieldType: "password",
        "class": fields.PasswordField
      }
    },
    {
      src: {
        type: "string",
        max_length: 10
      },
      expected: {
        fieldType: "input",
        "class": fields.CharField
      }
    },
    {
      src: {
        type: "string"
      },
      expected: {
        fieldType: "textarea",
        "class": fields.TextField
      }
    },
    {
      src: {
        type: "select"
      },
      expected: {
        fieldType: "select",
        "class": fields.SelectField
      }
    },
    {
      src: {
        type: "radio"
      },
      expected: {
        fieldType: "radio",
        "class": fields.RadioField
      }
    },
    {
      src: {
        type: "choice"
      },
      expected: {
        fieldType: "select",
        "class": fields.SelectField
      }
    },
    {
      src: {
        type: "integer"
      },
      expected: {
        fieldType: "input",
        "class": fields.NumericField
      }
    },
  ];

  describe("factory", () => {
    var fieldMeta : IDjangoRestFieldOptions = {
      name: "started",
      type: "unknown",
      required: false
    };

    it('should throw TypeError', (done) => {
      chai.assert.throw(function () {
        DjangoRestConfig.factory(fieldMeta)
      }, TypeError);
        done();
    });

    it('works for minimal valid data', (done) => {
      chai.assert.doesNotThrow(function () {
        var knownField : IDjangoRestFieldOptions = <IDjangoRestFieldOptions> extend({}, fieldMeta, {type: 'string'});
        DjangoRestConfig.factory(knownField);
      }, TypeError);
      done();
    });

    it('should returns the appropriate field type', (done) => {
      factoryTestCases.forEach(function(testCase) {
        let extendedField : IDjangoRestFieldOptions = <IDjangoRestFieldOptions> extend({}, fieldMeta, testCase.src),
            res = DjangoRestConfig.factory(extendedField);
        expect(res).to.be.an.instanceOf(testCase.expected.class);
        chai.assert.propertyVal(res.constructor, "fieldType", testCase.expected.fieldType);
      });
        done();
    });
  });

  describe(".getType()", () => {});

  describe(".setType()", () => {});
});
