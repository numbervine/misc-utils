import reduce from 'lodash/reduce';
import reverse from 'lodash/reverse';
import split from 'lodash/split';
import merge from 'lodash/merge';
import isNaN from 'lodash/isNaN';
import * as Internal from './internal';

/**
 * Check if `value` is an empty object {}, empty array [], empty string '', or undefined
 *
 * @since 1.0.0
 * @category Misc
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if `value` is void.
 * @example
 *
 * isVoid(6)
 * // => false
 *
 * isVoid({})
 * // => true
 *
 */
export const isVoid = (value) => {
  let isEmptyObject = (Internal._isObject(value) && Internal._isEmptyObject(value))
  let isUndefined = typeof value == 'undefined'
  let isEmptyArray = (typeof value == 'array') && value.length==0
  let isEmptyString = (typeof value == 'string') && value.length==0
  let isNull = value===null

  return isEmptyObject || isUndefined || isEmptyArray || isEmptyString || isNull
}

/**
 * Compares key value paris between `obj1` and `obj2` recursively, optionally
 * starting from the node specified by `path` and returns an array of paths
 * that are not shared by both objects, or contain different values
 *
 * @since 1.0.0
 * @category Misc
 * @param {Object} obj1 First object for comparison
 * @param {Object} obj2 Second object for comparison
 * @param {String} path optional node specifying point to start object comparison
 * @returns {Array} Paths not common to both objects, or containing different values
 *
 */
export const deepDiff = (obj1, obj2, path) => {
  return merge(Internal._deepDiff(obj1,obj2,path),Internal._deepDiff(obj2,obj1,path))
}


/**
 * Process `payload` container to construct object to be passed to immutable
 * update function containing update value for path specified by key string.
 * The default action is `$set`
 *
 * @since 1.0.0
 * @category Misc
 * @param {Object} payload payload container with input objects
 * @returns {Object} Input for immutable update function
 * @example
 *
 */
export const immutableUpdatePayloadTransform = (payload) => {
  let { objectAutoVivificationCommand='$auto', arrayAutoVivificationCommand='$autoArray', action='$set', updateValue, keyString, delimiter='.' } = payload
  let targetObjectTerminalNode = (action=='$push') ? { [arrayAutoVivificationCommand]: { [action] : updateValue }} : { [action] : updateValue }

  return reduce(reverse(split(keyString,delimiter)), (result, value, key) => {
    return {
      [objectAutoVivificationCommand]: {
        [value] : result
      }
    }
  }, targetObjectTerminalNode)
}

/**
 * Check if `value` is numeric
 *
 * @since 1.0.6
 * @category Misc
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if `value` is void.
 * @example
 *
 * isNumeric(6)
 * // => true
 *
 * isNumeric({a: 'A'})
 * // => false
 *
 * isNumeric('abc')
 * // => false
 *
 * isNumeric(['a','b'])
 * // => false
 *
 * isNumeric('6')
 * // => true
 *
 */
export const isNumeric = value => {
  return ((typeof value === 'number' || typeof value === 'string') && !isNaN(Number(value)));
}
