"use strict";

/*
*
* Most of browsers don't support this inputs properly and as expected.
* For further details, see: http://html5test.com/compare/feature/form-datetime-element/form-date-element/form-time-element/form-datetime-local-element/form-datetime-element.html
*
* It is recommended, that the user take care of this issue: he can use polyfills libraries or
* override the default implementation.
*
* TODO Add --html5 option, so if it's enabled wel'll use this implementation otherwise we will return 'datepicker' / 'datetimepicker' etc
*
 */

import base = require('./base');
import utils = require('../utils')
import interfaces = require('../interfaces');


export class DateField extends base.Field {
  protected static fieldType: string = 'input';
  protected static templateType: string = 'date';
}

export class TimeField extends base.Field {
  protected static fieldType: string = 'input';
  protected static templateType: string = 'time';
}


export class DateTimeField extends base.Field {
  protected static fieldType: string = 'input';
  // HTML datetime input was removed in recent versions of all browsers
  // (chrome 26+, iOS 5.1+, etc)
  // See http://w3c.github.io/html-reference/input.datetime-local.html
  protected static templateType: string = 'datetime-local';
}
