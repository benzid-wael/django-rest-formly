/// <reference path="../_all.d.ts" />
"use strict";

import base = require('./base');
import utils = require('../utils');
import interfaces = require('../interfaces');


export interface INumericField extends base.IField {

  /**
   * The minimum value.
   */
  minValue?: number;

  /**
   * The maximum value.
   */
  maxValue?: number;
}


export class NumericField extends base.Field implements INumericField {

  protected static fieldType: string = 'input';
  protected static templateType: string = 'number';
  minValue: number;
  maxValue: number;

  constructor(options: interfaces.IDjangoRestFieldOptions) {
    this.minValue = options.min_value;
    this.maxValue = options.max_value;
    super(options);
  }

  protected getExtraTemplateOptions() {
    return utils.smartExtend({}, {
      min: this.minValue,
      max: this.maxValue
    });
  }
}
