import reduce from 'lodash/reduce';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';

export const _deepDiff = (obj1, obj2, path) => {
    obj1 = obj1 || {};
    obj2 = obj2 || {};

    return reduce(obj1, (result, value, key) => {
        var p = path ? path + '.' + key : key;
        if (isObject(value)) {
            var d = deepDiff(value, obj2[key], p);
            return d.length ? result.concat(d) : result;
        }
        return isEqual(value, obj2[key]) ? result : result.concat(p);
    }, []);
}

export const _isObject = (obj) => {
  return (obj === Object(obj))
}

export const _isEmptyObject = (obj) => {
    return ( (Object.keys(obj).length > 0) ? false : true)
}
