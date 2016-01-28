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
        type: "email"
      },
      expected: {
        fieldType: "input",
        "class": fields.EmailField,
        templateType: "email"
      }
    },
    {
      src: {
        type: "boolean"
      },
      expected: {
        fieldType: "checkbox",
        "class": fields.BooleanField,
        templateType: null
      }
    },
    {
      src: {
        type: "hidden"
      },
      expected: {
        fieldType: "input",
        "class": fields.HiddenField,
        templateType: "hidden"
      }
    },
    {
      src: {
        type: "password"
      },
      expected: {
        fieldType: "input",
        "class": fields.PasswordField,
        templateType: "password"
      }
    },
    {
      src: {
        type: "string",
        max_length: 10
      },
      expected: {
        fieldType: "input",
        "class": fields.CharField,
        templateType: null
      }
    },
    {
      src: {
        type: "string"
      },
      expected: {
        fieldType: "textarea",
        "class": fields.TextField,
        templateType: null
      }
    },
    {
      src: {
        type: "select"
      },
      expected: {
        fieldType: "select",
        "class": fields.SelectField,
        templateType: null
      }
    },
    {
      src: {
        type: "radio"
      },
      expected: {
        fieldType: "radio",
        "class": fields.RadioField,
        templateType: null
      }
    },
    {
      src: {
        type: "choice"
      },
      expected: {
        fieldType: "select",
        "class": fields.SelectField,
        templateType: null
      }
    },
    {
      src: {
        type: "integer"
      },
      expected: {
        fieldType: "input",
        "class": fields.NumericField,
        templateType: null
      }
    },
    {
      src: {
        type: "regex",
        pattern: '\d{2}'
      },
      expected: {
        fieldType: "input",
        "class": fields.RegexField,
        templateType: "text"
      }
    },
    {
      src: {
        type: "regex"
      },
      expected: {
        fieldType: "input",
        "class": fields.CharField,
        templateType: "text"
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

    it('should returns the appropriate template type', (done) => {
      factoryTestCases.forEach(function(testCase) {
        let extendedField : IDjangoRestFieldOptions = <IDjangoRestFieldOptions> extend({}, fieldMeta, testCase.src),
            res = DjangoRestConfig.factory(extendedField);
        if (testCase.expected.templateType) {
            chai.assert.propertyVal(res.constructor, "fieldType", testCase.expected.fieldType);
        }
      });
        done();
    });

    it('regex field should define pattern', (done) => {
      var withPattern = {
        type: "regex",
        pattern: "^a"
      }, withoutPattern = {
        type: "regex"
      };
      let extendedField : IDjangoRestFieldOptions = <IDjangoRestFieldOptions> extend({}, fieldMeta, withPattern),
          res = DjangoRestConfig.factory(extendedField);

      expect(res).to.be.an.instanceOf(fields.RegexField);
      chai.assert.propertyVal(res.constructor, "fieldType", "input");

      extendedField = <IDjangoRestFieldOptions> extend({}, fieldMeta, withoutPattern),

      expect(res).to.be.not.an.instanceOf(fields.RegexField);
        done();
    });

  });

  describe(".getType()", () => {});

  describe(".setType()", () => {});
});
