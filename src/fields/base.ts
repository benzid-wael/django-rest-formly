/// <reference path="../_all.d.ts" />

import AngularFormly = require('angular-formly');

import utils = require('../utils');
import interfaces  = require('../interfaces');


// WONTFIX Missing field in ITemplateOptions
// SEE https://github.com/DefinitelyTyped/DefinitelyTyped/issues/7088
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
  protected static fieldType: string = 'input';
  /**
   * Specifies the type of field to be rendered, e.g: password, email, etc.
   */
  protected static templateType: string;
  protected templateOptions:ITemplateOptions;

  name:string;
  required:boolean;
  readOnly:boolean;
  defaultValue:any;
  allow_null:boolean;
  label:string;
  helpText:string;
  choices:Array<Object>;

  /**
   * Create a new Field instance.
   * @param options  The field metadata.
   */
  constructor(options:interfaces.IDjangoRestFieldOptions) {
    this.name         = options.name;
    this.required     = options.required || false;
    this.readOnly     = options.read_only || false;
    this.defaultValue = options.default;
    this.allow_null   = options.allow_null || false;
    this.label        = options.label || this.name;
    this.helpText     = options.help_text;
    this.choices      = options.choices;
  }

  public isBoolean() : boolean {
    if (this.constructor.fieldType === 'checkbox') {
      return true;
    }
    return false;
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
    // angular-formly don't support 'allow_null' by default,
    // but we can admit that a field, except boolean field,
    // that allows null values is not required.
    if (!this.isBoolean() && this.allow_null) {
      tplOptions.required = false;
    }
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
    // handle defaultValue
    if (this.defaultValue !== undefined) {
      configurationObject.defaultValue = this.defaultValue;
    }
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
