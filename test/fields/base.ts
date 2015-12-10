/// <reference path="../../typings/tsd.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import _ = require('underscore');

import fields = require('../../src/fields/base');

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

  describe('Field construction', () => {
    it('provide only name attribute', (done) => {
      var django_rest_meta = {
          name: "note",
        },
        field       = new Field(django_rest_meta),
        expected    = {
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
      var rest_meta = {
          name: "note",
          label: "Note"
        },
        field       = new Field(rest_meta),
        expected    = {
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
      var rest_meta = {
          name: "note",
          label: "Note",
          type: "string",
          read_only: true,
          required: true
        },
        field       = new Field(rest_meta),
        expected    = {
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

    it('provide choices attribute', (done) => {
      var rest_meta = {
          name: "status",
          choices: [
            {
              display_name: "Active",
              value: "active"
            },
            {
              display_name: "Pending",
              value: "pending"
            }
          ]
        },
        field       = new Field(rest_meta),
        expected    = {
          type: 'input',
          key: 'status',
          templateOptions: {
            label: 'status',
            type: 'select',
            disabled: false,
            required: false,
            options: [
              {
                name: "Active",
                value: "active"
              },
              {
                name: "Pending",
                value: "pending"
              }
            ]
          }
        };
      expect(field.getConfigurationObject()).to.deep.equal(expected);
        done();
    });
  });

  describe("Extra template Options", () => {
    it('provide only name attribute', (done) => {
      var django_rest_meta = {
          name: "note",
        },
        field       = new CharField(django_rest_meta),
        expected    = {
          type: 'input',
          key: 'note',
          templateOptions: {
            label: 'note',
            type: 'text',
            disabled: false,
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
