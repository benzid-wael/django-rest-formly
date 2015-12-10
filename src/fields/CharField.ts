"use strict";

import base = require('./base');
import utils = require('../utils');


/**
 * Base string field interface.
 */
export interface ICharField extends base.IField {

  /**
  * The minimum length (in characters) of the field.
  */
  minLength?: number;

  /**
  * The maximum length (in characters) of the field.
  */
  maxLength?: number;
}

export interface ITextField extends ICharField {

  /**
  * Specifies the rows attribute for the textarea element.
  */
  rows?: number;
}


/**
 * Base string field class. The default form widget for this type is "input".
 * CharField has two extra optional arguments: `minLength` and `maxLength`.
 */
export class CharField extends base.Field implements ICharField {

  protected static fieldType: string = 'input';
  protected static templateType: string = 'text';
  minLength: number;
  maxLength: number;

  constructor(options: base.IDjangoRestFieldOptions) {
    this.minLength = options.min_length;
    this.maxLength = options.max_length;
    super(options);
  }

  protected getExtraTemplateOptions() {
    return utils.smartExtend({}, {
      minlength: this.minLength,
      maxlength: this.maxLength
    });
  }
}


export class TextField extends CharField implements ITextField {

  protected static fieldType: string = 'textarea';
  protected static templateType: string = null;
  rows: number;

  constructor(options: base.IDjangoRestFieldOptions) {
    this.rows = 2;  // default angular-formly value
    super(options);
  }

  protected getExtraTemplateOptions() {
    return utils.extend(
      super.getExtraTemplateOptions(),
      {
        rows: this.rows
      }
    );
  }
}
