/// <reference path="../_all.d.ts" />

import AngularFormly = require('angular-formly');

import utils = require('../utils');
import interfaces  = require('../interfaces');


// WONTFIX Missing field in ITemplateOptions, see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/7088
export interface ITemplateOptions extends AngularFormly.ITemplateOptions {
  options?: Array<Object>;
}


export interface IField {

  /**
   * Field's name.
   */
  name: string;

  /**
   * Is this field required?
   */
  required: boolean;

  /**
   * Specifies if the field is read only.
   */
  readOnly?: boolean;

  /**
   * Field's label.
   */
  label?: string;

  /**
   * Extra "help" text to be displayed in the form.
   */
  helpText?: string;
}

/**
 * Base class for all fields.
 */
export class Field implements IField {
  // TODO check supporting options according to angular-formly documentation
  // See: https://www.omniref.com/js/npm/angular-formly/1.0.0

  "constructor": typeof Field;  // Explicitly declare constructor property
  /**
   * Specifies HTML type, e.g: input, checkbox, etc.
   */
  protected static fieldType: string;
  /**
   * Specifies the type of field to be rendered, e.g: password, email, etc.
   */
  protected static templateType: string;
  protected templateOptions:ITemplateOptions;

  name:string;
  required:boolean;
  readOnly:boolean;
  label:string;
  helpText:string;
  choices:Array<Object>;

  /**
   * Create a new Field instance.
   * @param options  The field metadata.
   */
  constructor(options:interfaces.IDjangoRestFieldOptions) {
    this.name     = options.name;
    this.required = options.required || false;
    this.readOnly = options.read_only || false;
    this.label    = options.label || this.name;
    this.helpText = options.help_text;
    this.choices  = options.choices;
  }

  protected getExtraTemplateOptions() {
    return {};
  }

  private getTemplateOptions() {
    var tplOptions:ITemplateOptions = {
      label   : this.label,
      type    : this.constructor.templateType,
      required: this.required,
      disabled: this.readOnly
    };
    return utils.smartExtend({}, tplOptions, this.getExtraTemplateOptions());
  }

  /*
   * Returns angular-formly configuration object for this field.
   */
  public getConfigurationObject() {
    var configurationObject:AngularFormly.IFieldConfigurationObject = {
      type           : this.constructor.fieldType,
      key            : this.name,
      templateOptions: this.getTemplateOptions()
    };
    // TODO handle template, templateUrl
    // TODO handle defaultValue
    return configurationObject;
  }
}


/**
 * BooleanField class will be represented by a `checkbox` input.
 * It does not have any custom attributes.
 */
export class BooleanField extends Field {

  protected static fieldType: string = 'checkbox';
  protected static templateType: string = null;
}

// FIXME Both EmailField and PasswordField should be subclass of CharField as they accepts min/max length properties
export class EmailField extends Field {

  protected static fieldType: string = 'email';
  protected static templateType: string = null;
}

export class PasswordField extends Field {

  protected static fieldType: string = 'password';
  protected static templateType: string = null;
}

export class HiddenField extends Field {

  protected static fieldType: string = 'hidden';
  protected static templateType: string = null;
}
