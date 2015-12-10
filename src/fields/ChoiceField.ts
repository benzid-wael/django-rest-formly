"use strict";

import base = require('./base');
import utils = require('../utils');


/**
 * Base string field interface.
 */
export interface IChoiceField extends base.IField {

  /**
   * List of accepted values.
   */
  choices: Array<base.IOption>;
}


/**
 * Base ChoiceField class.
 */
class ChoiceField extends base.Field implements IChoiceField {

  protected static templateType: string = null;
  choices: Array<base.IOption>;

  constructor(options: base.IDjangoRestFieldOptions) {
    this.choices = <Array<base.IOption>> options.choices;
    super(options);
  }

  protected getExtraTemplateOptions() {
    var res     = {options: null},
        options = [];
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
