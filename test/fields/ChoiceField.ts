
/// <reference path="../../typings/tsd.d.ts" />

/**
 * Module dependencies.
 */
import chai = require('chai');
import _ = require('underscore');

import fields = require('../../src/fields/ChoiceField');
import {IDjangoRestFieldOptions} from "../../src/interfaces";

/**
 * Globals
 */

var expect = chai.expect;


/**
 * Unit tests
 */
describe("ChoiceField Unit Tests:", () => {

  var rest_meta : IDjangoRestFieldOptions= {
    name: "status",
    type: "choice",
    required: false,
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
    without_choices : IDjangoRestFieldOptions = {
      name: "status",
      type: "choice",
      required: false,
    };

  describe('RadioField construction', () => {
    it('provide choices attribute', (done) => {
      var
        field = new fields.RadioField(rest_meta),
        expected = {
          type: 'radio',
          key: 'status',
          templateOptions: {
            label: 'status',
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

    it('without choices attribute', (done) => {
      var
        field = new fields.RadioField(without_choices),
        expected = {
          type: 'radio',
          key: 'status',
          templateOptions: {
            label: 'status',
            disabled: false,
            required: false
          }
        };
      expect(field.getConfigurationObject()).to.deep.equal(expected);
      done();
    });
  });

  describe('SelectField construction', () => {
    it('provide choices attribute', (done) => {
      var
        field = new fields.SelectField(rest_meta),
        expected = {
          type: 'select',
          key: 'status',
          templateOptions: {
            label: 'status',
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

    it('without choices attribute', (done) => {
      var
        field = new fields.SelectField(without_choices),
        expected = {
          type: 'select',
          key: 'status',
          templateOptions: {
            label: 'status',
            disabled: false,
            required: false
          }
        };
      expect(field.getConfigurationObject()).to.deep.equal(expected);
      done();
    });
  });
});
