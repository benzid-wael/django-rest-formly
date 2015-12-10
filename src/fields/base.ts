/// <reference path="../_all.d.ts" />

import AngularFormly = require('angular-formly');

import utils = require('../utils');


// WONTFIX Missing field in ITemplateOptions, see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/7088
export interface ITemplateOptions extends AngularFormly.ITemplateOptions {
  options?: Array<Object>;
}

export interface IDjangoRestFieldOptions {
  /**
   * Field's name.
   */
  name: string;

  /**
   * Django REST field type.
   */
  type: string; // FIXME this is too generic

  /**
   * Is this field required?
   */
  required: boolean;

  /**
   * Specifies if the field is read only.
   */
  read_only?: boolean;

  /**
   * Field's label.
   */
  label?: string;

  /**
   * Extra "help" text to be displayed in the form.
   */
  help_text?: string;

  /**
   * List of accepted values.
   */
  choices?: Array<Object>;

  /**
   * The minimum length (in characters) of the field.
   */
  min_length?: number;

  /**
   * The maximum length (in characters) of the field.
   */
  max_length?: number;

  /**
   * The minimum value.
   */
  min_value?: number;

  /**
   * The maximum value.
   */
  max_value?: number;
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

  /**
   * List of accepted values.
   */
  choices?: Array<Object>; // FIXME this is too generic
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
  constructor(options:IDjangoRestFieldOptions) {
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
    // FIXME maybe it's better to move this code to SelectField
    if (!this.readOnly && this.choices) {
      tplOptions.type    = 'select';
      tplOptions.options = [];
      this.choices.forEach(function (choice) {
        tplOptions.options.push({
          name : choice['display_name'],
          value: choice['value']
        });
      });
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
    // TODO handle defaultValue
    return configurationObject;
  }
}
