/**
 * angular-formly-rest utilities.
 */

export interface IObject {
    [key:string]:any;
}
/**
 * Copy all of the properties in the source objects over to the destination
 * object, and return the destination object.
 *
 * @param destination
 * @param sources
 * @returns {Object}
 */
export function extend(destination: IObject, ...sources: Array<IObject>): Object {
  sources.forEach(function(source) {
    for (var p in source) {
      destination[p] = source[p];
    }
  });
  return destination;
}

/**
 * Copy all non null properties in the source objects over to the destination
 * object, and return the destination object.
 *
 * @param destination
 * @param sources
 * @returns {Object}
 */
export function smartExtend(destination: IObject, ...sources: Array<IObject>): Object {
  sources.forEach(function(source) {
    for (var p in source) {
      if (source[p] !== null && source[p] !== undefined) {
        destination[p] = source[p];
      }
    }
  });
  return destination;
}
