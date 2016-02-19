"use strict";

import base = require('./base');
import utils = require('../utils');
import interfaces = require('../interfaces');


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


export interface IRegexField extends ICharField {

  /**
  * Specifies the rows attribute for the textarea element.
  */
  pattern: string;
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

  constructor(options: interfaces.IDjangoRestFieldOptions) {
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

  constructor(options: interfaces.IDjangoRestFieldOptions) {
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


export class RegexField extends CharField implements IRegexField {

  pattern: string;

  constructor(options: interfaces.IDjangoRestFieldOptions) {
    this.pattern = options.pattern || this.pattern;
    super(options);
  }

  protected getExtraTemplateOptions() {
    return utils.extend(
      super.getExtraTemplateOptions(),
      {
        pattern: this.pattern
      }
    );
  }
}


export class EmailField extends CharField {

  protected static templateType: string = 'email';

  protected getExtraTemplateOptions() {
    return utils.extend(
      super.getExtraTemplateOptions(),
      {
        pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}$"
      }
    );
  }
}

export class PasswordField extends CharField {

  protected static templateType: string = 'password';
}

export class HiddenField extends CharField {

  protected static templateType: string = 'hidden';
}


export class URLField extends RegexField {

  protected static templateType: string = 'url';
  pattern: string = '(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?';

}


export class IPAddressField extends RegexField {

  pattern: string = '^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$';
}
