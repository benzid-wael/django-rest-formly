"use strict";

import {IDjangoRestFieldOptions} from "./interfaces"

import * as fields from "./fields"


export default DjangoRestConfig


export interface IFieldFactory {
  (djangoRestMeta:IDjangoRestFieldOptions): fields.Field | string;
}

var djnagoRestFieldLookup = [
  (djangoRestMeta:IDjangoRestFieldOptions) => {
    if (djangoRestMeta.choices && djangoRestMeta.choices.length > 0) {
      // FIXME What about a choice list with only one item ? should be readOnly field?
      return "choice";
    }
  },
  (djangoRestMeta:IDjangoRestFieldOptions) => {
    if (djangoRestMeta.type == "regex") {
      if (djangoRestMeta.pattern == undefined) {
        return "string";
      }
      return "regex";
    }
  },
  (djangoRestMeta:IDjangoRestFieldOptions) => {
    if (djangoRestMeta.type == "string" && djangoRestMeta.max_length == undefined) {
      return "text";
    } else if (djangoRestMeta.type == "string") {
      return "string";
    }
  }
];


/**
 *
 */
export class DjangoRestConfig {

    // DjangoRest field types list:
    // "field":
    // "boolean": "boolean",
    // "null boolean":
    // "string": "string",  // if there is no max_length property, so we had to returns "text" aka. TextField
    // "url":
    // "email": "email",
    // "regex": "regex",
    // "slug":
    // "integer": "integer",
    // "float":
    // "decimal":
    // "date":
    // "datetime":
    // "time":
    // "choice": "choice",
    // "multiple choice":
    // "file upload":
    // "image upload":
    // "list":
    // "nested object": DictField or Serializer

  private static _fieldMapping: any = {
    "boolean"   : fields.BooleanField,

    "integer"   : fields.NumericField,

    "string"    : fields.CharField,
    "text"      : fields.TextField,
    "hidden"    : fields.HiddenField,
    "password"  : fields.PasswordField,

    "select"    : fields.SelectField,
    "choice"    : fields.SelectField,  // By default, returns a SelectField for choice fields
    "radio"     : fields.RadioField,
    "regex"     : fields.RegexField,
    "email"     : fields.EmailField,
  };

  /**
   * Instantiate the appropriate Field from the given configuration.
   *
   * @param djangoRestMeta
   * @param factoryFn
   * @returns {any}
     */
  static factory(djangoRestMeta:IDjangoRestFieldOptions,
          factoryFn?:IFieldFactory): fields.Field {
    var field_class_string: fields.Field|string = null,
        // FIXME if we define fieldClass with Field type, we got: TS2351 error
        //       Cannot use 'new' with an expression whose type lacks a call or construct signature.
        fieldClass: any;
    if (factoryFn) {
      field_class_string = factoryFn(djangoRestMeta);
    }
    if (!field_class_string) {
      for(let i in djnagoRestFieldLookup) {
        let ret: string|fields.Field, lookupFn: IFieldFactory;
        lookupFn = djnagoRestFieldLookup[i];
        ret = lookupFn(djangoRestMeta);
        if (ret !== null && ret !== undefined) {
          field_class_string = ret;
          break;
        }
      }
    }

    if (!field_class_string) {
      field_class_string = djangoRestMeta.type;
    }

    if (typeof field_class_string === "string") {
      field_class_string = DjangoRestConfig._fieldMapping[<string>field_class_string];
    }

    if(!field_class_string) {
      throw TypeError("Can not find an appropriate field for '" + djangoRestMeta.type + "' field");
    }
    // force type
    fieldClass = <fields.Field> field_class_string;
    return new fieldClass(djangoRestMeta);
  }

  setType(type:string, fieldClass:fields.Field) {
    DjangoRestConfig._fieldMapping[type] = fieldClass;
  }

  getType(type:string): fields.Field {
    return DjangoRestConfig._fieldMapping[type];
  }
}
