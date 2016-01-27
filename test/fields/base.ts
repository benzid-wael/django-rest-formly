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
describe("Field's Unit Tests:", () => {
  var rest_meta : IDjangoRestFieldOptions = {
      name: "note",
      type: "input",
      required: false,
    };

  describe('Field construction', () => {
    it('provide only name attribute', (done) => {
      var rest_meta_field : IDjangoRestFieldOptions,
          field: Field,
          expected: AngularFormly.ITemplateOptions;

      rest_meta_field = _.extend({}, rest_meta);
      field = new Field(rest_meta_field);
      expected = {
        type: 'input',
        key: 'note',
        templateOptions: {
          label: 'note',
          type: 'text',
          disabled: false,
          required: false
        }
      };
      expect(field.getConfigurationObject()).to.deep.equal(expected);
        done();
    });

    it('provide also label attribute', (done) => {
      var rest_meta_field : IDjangoRestFieldOptions,
          field: Field,
          expected: AngularFormly.ITemplateOptions;

      rest_meta_field = _.extend({}, rest_meta, {label: "Note"});
      field = new Field(rest_meta_field);
      expected = {
        type: 'input',
        key: 'note',
        templateOptions: {
          label: 'Note',
          type: 'text',
          disabled: false,
          required: false
        }
      };
      expect(field.getConfigurationObject()).to.deep.equal(expected);
        done();
    });

    it('provide many attributes', (done) => {
      var rest_meta_field : IDjangoRestFieldOptions,
          field: Field,
          expected: AngularFormly.ITemplateOptions;

      rest_meta_field = _.extend({}, rest_meta, {
        label: "Note",
          type: "string",
          read_only: true,
          required: true
      });
      field = new Field(rest_meta_field);
      expected = {
        type: 'input',
        key: 'note',
        templateOptions: {
          label: 'Note',
          type: 'text',
          disabled: true,
          required: true
        }
      };
      expect(field.getConfigurationObject()).to.deep.equal(expected);
        done();
    });

    it('provide also default attribute', (done) => {
      var rest_meta_field : IDjangoRestFieldOptions,
          field: Field,
          expected: AngularFormly.ITemplateOptions;

      rest_meta_field = _.extend({}, rest_meta, {label: "Note", "default": "some note"});
      field = new Field(rest_meta_field);
      expected = {
        type: 'input',
        key: 'note',
        defaultValue: "some note",
        templateOptions: {
          label: 'Note',
          type: 'text',
          disabled: false,
          required: false
        }
      };
      expect(field.getConfigurationObject()).to.deep.equal(expected);
        done();
    });

    it('provide also allow_null attribute', (done) => {
      var rest_meta_field : IDjangoRestFieldOptions,
          field: Field,
          expected: AngularFormly.ITemplateOptions;

      rest_meta_field = _.extend({}, rest_meta, {allow_null: true});
      field = new Field(rest_meta_field);
      expected = {
        type: 'input',
        key: 'note',
        templateOptions: {
          label: 'note',
          type: 'text',
          disabled: false,
          required: false
        }
      };
      expect(field.getConfigurationObject()).to.deep.equal(expected);
        done();
    });

    it('required field which allow null values', (done) => {
      var rest_meta_field : IDjangoRestFieldOptions,
          field: Field,
          expected: AngularFormly.ITemplateOptions;

      rest_meta_field = _.extend({}, rest_meta, {allow_null: true, required: true});
      field = new Field(rest_meta_field);
      expected = {
        type: 'input',
        key: 'note',
        templateOptions: {
          label: 'note',
          type: 'text',
          disabled: false,
          required: false
        }
      };
      expect(field.getConfigurationObject()).to.deep.equal(expected);
        done();
    });
  });

  describe("Extra template Options", () => {
    it('provide only name attribute', (done) => {
      var rest_meta_field : IDjangoRestFieldOptions,
          field: Field,
          expected: AngularFormly.ITemplateOptions;

      rest_meta_field = _.extend({}, rest_meta, {
        type: "string",
        read_only: true,
        min_length: 3,
        max_length: 30
      });
      field = new CharField(rest_meta_field);
      expected    = {
        type: 'input',
        key: 'note',
        templateOptions: {
          label: 'note',
          type: 'text',
          disabled: true,
          required: false,
          minlength: 3,
          maxlength: 30
        }
      };
      expect(field.getConfigurationObject()).to.deep.equal(expected);
        done();
    });
  });
});
