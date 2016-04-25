/**
 * AngularFormlyRest main module.
 * @preferred
 */

import AngularFormly = require('angular-formly');

import {IDjangoRestFieldOptions} from "./interfaces";
import {Field} from "./fields/base";
import {DjangoRestConfig, IFieldFactory} from "./DjangoRestConfig";


export class Converter {
  fields: Array<Field>;

  constructor (djangoRestMeta: any, fieldFactoryFn: IFieldFactory) {
    this.fields = [];
    for (var fieldName in djangoRestMeta) {
      var fieldConfig = djangoRestMeta[fieldName];
      fieldConfig.name = fieldName;
      this.fields.push(DjangoRestConfig.factory(<IDjangoRestFieldOptions>fieldConfig, fieldFactoryFn));
    };
  }

  public convert() {
    var configObjects: Array<AngularFormly.IFieldConfigurationObject> = [];
    this.fields.forEach(function(field) {
      configObjects.push(field.getConfigurationObject());
    });
    return configObjects;
  }
}


export var toFormlyFields = function toFormlyFieldsF(djangoRestMeta: Array<IDjangoRestFieldOptions>, fieldFactoryFn?: IFieldFactory) {
  console.log("toFormlyFields is deprecated, please use toFormly instead")
  var converter = new Converter(djangoRestMeta, fieldFactoryFn);
  return converter.convert();
};

export var toFormly = function toFormlyF(djangoRestMeta: Array<IDjangoRestFieldOptions>, fieldFactoryFn?: IFieldFactory) {
  var converter = new Converter(djangoRestMeta, fieldFactoryFn);
  return converter.convert();
};
