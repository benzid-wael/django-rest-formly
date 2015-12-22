// Type definitions for JSON2
// Project: https://github.com/ddopson/JSON-js
// Definitions by: Wael BEN ZID EL GUEBSI <https://github.com/benzid-wael/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare module JSON2 {

  /**
   * Render a JSON text from a JavaScript value.
   *
   * @param value {any} data to stringify.
   * @param replacer {(key: string, value: any) => string | Array<string>} optional parameter that determines how object values will be stringified.
   * @param space {number | string} optional parameter that specifies the indentation of nested structures.
   *
   * @return {string} JSON serialized value
     */
  export function stringify(value: any, replacer ?: (key: string, value: any) => string | Array<string>, space ?: number | string) : string;

  /**
   * Parse a stringified JSON object and return the corresponding JavaScript object.
   *
   * @param text {string} text to parse.
   * @param reviver {(key: string, value: string) => any} optional parameter that filter and transform results.
   *
   * @throws {SyntaxError}
   *
   * @return {any} JavaScript object.
     */
  export function parse(text: string, reviver ?: (key: string, value: string) => any) : any;
}
