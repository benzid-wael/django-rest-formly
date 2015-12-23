(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DjangoRestFormly = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var base_1 = require("./fields/base");
var CharField_1 = require("./fields/CharField");
var ChoiceField_1 = require("./fields/ChoiceField");
var NumericField_1 = require("./fields/NumericField");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DjangoRestConfig;
var djnagoRestFieldLookup = [
    function (djangoRestMeta) {
        if (djangoRestMeta.choices && djangoRestMeta.choices.length > 0) {
            return "choice";
        }
    },
    function (djangoRestMeta) {
        if (djangoRestMeta.type == "string" && djangoRestMeta.max_length == undefined) {
            return "text";
        }
        else if (djangoRestMeta.type == "string") {
            return "string";
        }
    }
];
var DjangoRestConfig = (function () {
    function DjangoRestConfig() {
    }
    DjangoRestConfig.factory = function (djangoRestMeta, factoryFn) {
        var field_class_string = null, fieldClass;
        if (factoryFn) {
            field_class_string = factoryFn(djangoRestMeta);
        }
        if (!field_class_string) {
            for (var i in djnagoRestFieldLookup) {
                var ret = void 0, lookupFn = void 0;
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
            field_class_string = DjangoRestConfig._fieldMapping[field_class_string];
        }
        if (!field_class_string) {
            throw TypeError("Can not find an appropriate field for '" + djangoRestMeta.type + "' field");
        }
        fieldClass = field_class_string;
        return new fieldClass(djangoRestMeta);
    };
    DjangoRestConfig.prototype.setType = function (type, fieldClass) {
        DjangoRestConfig._fieldMapping[type] = fieldClass;
    };
    DjangoRestConfig.prototype.getType = function (type) {
        return DjangoRestConfig._fieldMapping[type];
    };
    DjangoRestConfig._fieldMapping = {
        "boolean": base_1.BooleanField,
        "email": base_1.EmailField,
        "hidden": base_1.HiddenField,
        "password": base_1.PasswordField,
        "string": CharField_1.CharField,
        "text": CharField_1.TextField,
        "select": ChoiceField_1.SelectField,
        "radio": ChoiceField_1.RadioField,
        "choice": ChoiceField_1.SelectField,
        "integer": NumericField_1.NumericField
    };
    return DjangoRestConfig;
})();
exports.DjangoRestConfig = DjangoRestConfig;

},{"./fields/CharField":2,"./fields/ChoiceField":3,"./fields/NumericField":4,"./fields/base":5}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base = require('./base');
var utils = require('../utils');
var CharField = (function (_super) {
    __extends(CharField, _super);
    function CharField(options) {
        this.minLength = options.min_length;
        this.maxLength = options.max_length;
        _super.call(this, options);
    }
    CharField.prototype.getExtraTemplateOptions = function () {
        return utils.smartExtend({}, {
            minlength: this.minLength,
            maxlength: this.maxLength
        });
    };
    CharField.fieldType = 'input';
    CharField.templateType = 'text';
    return CharField;
})(base.Field);
exports.CharField = CharField;
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField(options) {
        this.rows = 2;
        _super.call(this, options);
    }
    TextField.prototype.getExtraTemplateOptions = function () {
        return utils.extend(_super.prototype.getExtraTemplateOptions.call(this), {
            rows: this.rows
        });
    };
    TextField.fieldType = 'textarea';
    TextField.templateType = null;
    return TextField;
})(CharField);
exports.TextField = TextField;

},{"../utils":7,"./base":5}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base = require('./base');
var ChoiceField = (function (_super) {
    __extends(ChoiceField, _super);
    function ChoiceField(options) {
        this.choices = options.choices;
        _super.call(this, options);
    }
    ChoiceField.prototype.getExtraTemplateOptions = function () {
        var res = {}, options = [];
        if (!this.readOnly && this.choices) {
            this.choices.forEach(function (choice) {
                options.push({
                    name: choice['display_name'],
                    value: choice['value']
                });
            });
            res.options = options;
        }
        return res;
    };
    ChoiceField.templateType = null;
    return ChoiceField;
})(base.Field);
exports.ChoiceField = ChoiceField;
var RadioField = (function (_super) {
    __extends(RadioField, _super);
    function RadioField() {
        _super.apply(this, arguments);
    }
    RadioField.fieldType = 'radio';
    return RadioField;
})(ChoiceField);
exports.RadioField = RadioField;
var SelectField = (function (_super) {
    __extends(SelectField, _super);
    function SelectField() {
        _super.apply(this, arguments);
    }
    SelectField.fieldType = 'select';
    return SelectField;
})(ChoiceField);
exports.SelectField = SelectField;

},{"./base":5}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base = require('./base');
var utils = require('../utils');
var NumericField = (function (_super) {
    __extends(NumericField, _super);
    function NumericField(options) {
        this.minValue = options.min_value;
        this.minValue = options.max_value;
        _super.call(this, options);
    }
    NumericField.prototype.getExtraTemplateOptions = function () {
        return utils.smartExtend({}, {
            min: this.minValue,
            max: this.maxValue
        });
    };
    NumericField.fieldType = 'input';
    NumericField.templateType = 'number';
    return NumericField;
})(base.Field);
exports.NumericField = NumericField;

},{"../utils":7,"./base":5}],5:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils = require('../utils');
var Field = (function () {
    function Field(options) {
        this.name = options.name;
        this.required = options.required || false;
        this.readOnly = options.read_only || false;
        this.label = options.label || this.name;
        this.helpText = options.help_text;
        this.choices = options.choices;
    }
    Field.prototype.getExtraTemplateOptions = function () {
        return {};
    };
    Field.prototype.getTemplateOptions = function () {
        var tplOptions = {
            label: this.label,
            type: this.constructor.templateType,
            required: this.required,
            disabled: this.readOnly
        };
        return utils.smartExtend({}, tplOptions, this.getExtraTemplateOptions());
    };
    Field.prototype.getConfigurationObject = function () {
        var configurationObject = {
            type: this.constructor.fieldType,
            key: this.name,
            templateOptions: this.getTemplateOptions()
        };
        return configurationObject;
    };
    return Field;
})();
exports.Field = Field;
var BooleanField = (function (_super) {
    __extends(BooleanField, _super);
    function BooleanField() {
        _super.apply(this, arguments);
    }
    BooleanField.fieldType = 'checkbox';
    BooleanField.templateType = null;
    return BooleanField;
})(Field);
exports.BooleanField = BooleanField;
var EmailField = (function (_super) {
    __extends(EmailField, _super);
    function EmailField() {
        _super.apply(this, arguments);
    }
    EmailField.fieldType = 'email';
    EmailField.templateType = null;
    return EmailField;
})(Field);
exports.EmailField = EmailField;
var PasswordField = (function (_super) {
    __extends(PasswordField, _super);
    function PasswordField() {
        _super.apply(this, arguments);
    }
    PasswordField.fieldType = 'password';
    PasswordField.templateType = null;
    return PasswordField;
})(Field);
exports.PasswordField = PasswordField;
var HiddenField = (function (_super) {
    __extends(HiddenField, _super);
    function HiddenField() {
        _super.apply(this, arguments);
    }
    HiddenField.fieldType = 'hidden';
    HiddenField.templateType = null;
    return HiddenField;
})(Field);
exports.HiddenField = HiddenField;

},{"../utils":7}],6:[function(require,module,exports){
var DjangoRestConfig_1 = require("./DjangoRestConfig");
var Converter = (function () {
    function Converter(djangoRestMeta, fieldFactoryFn) {
        this.fields = [];
        for (var fieldName in djangoRestMeta) {
            var fieldConfig = djangoRestMeta[fieldName];
            fieldConfig.name = fieldName;
            this.fields.push(DjangoRestConfig_1.DjangoRestConfig.factory(fieldConfig, fieldFactoryFn));
        }
        ;
    }
    Converter.prototype.convert = function () {
        var configObjects = [];
        this.fields.forEach(function (field) {
            configObjects.push(field.getConfigurationObject());
        });
        return configObjects;
    };
    ;
    return Converter;
})();
exports.Converter = Converter;
exports.DjangoRestFrameworkAdapter = function DjangoRestFrameworkAdapterF(djangoRestMeta, fieldFactoryFn) {
    var converter = new Converter(djangoRestMeta, fieldFactoryFn);
    return converter.convert();
};

},{"./DjangoRestConfig":1}],7:[function(require,module,exports){
function extend(destination) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        for (var p in source) {
            destination[p] = source[p];
        }
    });
    return destination;
}
exports.extend = extend;
function smartExtend(destination) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        for (var p in source) {
            if (source[p] !== null && source[p] !== undefined) {
                destination[p] = source[p];
            }
        }
    });
    return destination;
}
exports.smartExtend = smartExtend;

},{}]},{},[6])(6)
});