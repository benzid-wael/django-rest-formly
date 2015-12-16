"use strict";

import base = require('./base');
import utils = require('../utils')
import interfaces = require('../interfaces');


/**
 * Base string field interface.
 */
export interface IChoiceField extends base.IField {

  /**
   * List of accepted values.
   */
  choices: Array<interfaces.IDjangoRestOption>;
}


/**
 * Base ChoiceField class.
 */
export abstract class ChoiceField extends base.Field implements IChoiceField, base.IField {

  protected static templateType: string = null;
  choices: Array<interfaces.IDjangoRestOption>;

  constructor(options: interfaces.IDjangoRestFieldOptions) {
    this.choices = <Array<interfaces.IDjangoRestOption>> options.choices;
    super(options);
  }

  protected getExtraTemplateOptions() {
    var res: {options?: Array<interfaces.IOption>} = {},
        options: Array<interfaces.IOption>  = [];
    if (!this.readOnly && this.choices) {
      this.choices.forEach(function (choice) {
        options.push({
          name : choice['display_name'],
          value: choice['value']
        });
      });
      res.options = options;
    }
    // FIXME write functional tests for this
    return res;
  }
}


export class RadioField extends ChoiceField {
  protected static fieldType: string = 'radio';
}

export class SelectField extends ChoiceField {
  protected static fieldType: string = 'select';
}
