
export interface IOption {
  name: string;
  value?: string;
  group?: string; // TODO handle it properly
}

export interface IDjangoRestOption {
  display_name: string;
  value: string;
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
   * Specifies if the field accept null value.
   */
  allow_null?: boolean;

  /**
   * Specifies if the field has a default value.
   */
  "default"?: any;

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
  choices?: Array<IDjangoRestOption>;

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

  /**
   * Pattern to be verified.
   */
  pattern?: string;

  /**
   * Properties for decimal field
   */
  max_digits?: number;
  decimal_places?: number;
}
