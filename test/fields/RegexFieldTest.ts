/// <reference path="../../typings/tsd.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import _ = require('underscore');
import AngularFormly = require("angular-formly");

import * as fields from '../../src/fields/';
import {IDjangoRestFieldOptions} from "../../src/interfaces";

/**
 * Globals
 */

var expect = chai.expect;


class Field extends fields.Field {
  protected static fieldType: string = 'input';
  protected static templateType: string = 'text';
}

class CharField extends fields.Field {
  protected static fieldType: string = 'input';
  protected static templateType: string = 'text';

  protected getExtraTemplateOptions() {
    return {
      minlength: 3,
      maxlength: 30
    }
  }
}


/**
 * Unit tests
 */
describe("RegexField Unit Tests:", () => {
  var rest_meta : IDjangoRestFieldOptions = {
      name: "tel",
      type: "regex",
      required: false,
      pattern: "\d{8}"
    };

  describe('RegexField creation', () => {

    it('expected input', (done) => {
      var result,
        expected = {
          type: 'input',
          key: 'tel',
          templateOptions: {
            label: 'tel',
            type: 'text',
            disabled: false,
            required: false,
            pattern: "\d{8}"
          }
        };

      result = new fields.RegexField(rest_meta);

      expect(result.getConfigurationObject()).to.deep.equal(expected);
        done();
    });

    it('missing pattern attribute', (done) => {
      var result,
        expected = {
          type: 'input',
          key: 'tel',
          templateOptions: {
            label: 'tel',
            type: 'text',
            disabled: false,
            required: false
          }
        };

      rest_meta.pattern = undefined;
      result = new fields.RegexField(rest_meta);

      expect(result.getConfigurationObject()).to.deep.equal(expected);
        done();
    });

  });
});
