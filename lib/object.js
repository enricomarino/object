
/*!
 * object
 * JavaScript object utilities library
 * Copyright (c) 2011 Enrico Marino <enrico.marino@email.com>
 * MIT License
 */

 !(function (exports) {


  var undefined
    , owns = {}.hasOwnProperty
    , toString = {}.toString
    , slice = [].slice
    ;

  exports.object = {};

  /**
   * Library version.
   */
  object.version = '0.0.1';

  /**
   * Apply iterator to each value of object 'self' in context 'context'
   *
   * @param {Object} self object
   * @param {Function} iterator iterator
   * @param {Object} context context
   * @return {Object} object 'self'
   * @api public
   */
  object.each = function (self, iterator, context) {
    for (var key in self) {
        if (owns.call(self, key)) {
            iterator.call(context, self[key], key, self);
        }
    }
    return self;
  };

  /**
   * Apply 'iterator' to each value of object 'self' in context 'context'
   * and return the results
   *
   * @param {Object} self object
   * @param {Function} iterator iterator
   * @param {Object} context context
   * @return {Array} results
   * @api public
   */
  object.map = function (self, iterator, context) {
    var results = []
      , result
      , key
      ;

    for (key in self) {
      if (owns.call(self, key)) {
        result = iterator.call(context, self[key], key, self);
        results.push(result);
      }
    }
    return result;
  };

  /**
   * Reduce values of object 'self' through 'iterator' in context 'context'
   *
   * @param {Object} self object
   * @param {Function} iterator iterator
   * @param memo memo
   * @param {Object} context context
   * @return reduction
   * @api public
   */
  object.reduce = function (self, iterator, memo, context) {
    for (var key in self) {
      if (owns.call(self, key)) {
        memo = (memo === undefined)
          ? self[key]
          : iterator.call(context, memo, self[key], key, self);
      }
    }

    if (memo === undefined) {
      throw new TypeError();
    }

    return memo;
  };

  /**
   * Reduce right values of 'self' through 'iterator' in 'context'
   *
   * @param {Object} self object
   * @param {Function} iterator iterator
   * @param memo memo
   * @param {Object} context context
   * @return reduction
   * @api public
   */
  object.reduceRight = function (self, iterator, memo, context) {
    var values = []
      , value
      , key
      , i
      ;

    for (key in self) {
      if (owns.call(self, key)) {
        values.push({ key: key, value: self[key] });
      }
    }

    i = values.length - 1;

    if (i < 0) {
      return memo;
    }

    if (memo === undefined) {
      memo = values[i].value;
    }

    while (i-- >= 0) {
      value = values[i].value;
      key = values[i].key;
      memo = iterator.call(context, memo, value, key, self);
    }

    return memo;
  };

  /**
   * Find value in 'self' that pass 'iterator' in 'context'
   *
   * @param {Object} self object
   * @param {Function} iterator iterator
   * @param {Object} context context
   * @return first value in 'self' that pass 'iterator' in 'context'
   * @api public
   */
  object.find = function (self, iterator, context) {
    var key;

    if (self === undefined || self === null) {
      return null;
    }

    for (key in self) {
      if (owns.call(self, key)
          && iterator.call(context, self[key], key, self)) {
        return self[key];
      }
    }

    return null;
  };

  /**
   * Filter value in 'self' that pass 'iterator' in 'context'
   *
   * @param {Object} self object
   * @param {Function} iterator iterator
   * @param {Object} context context
   * @return {Array} values in 'self' that pass 'iterator' in 'context'
   * @api public
   */
  object.filter = function (self, iterator, context) {
    var results = []
      , key
      ;

    if (self === undefined || self === null) {
      return results;
    }

    for (key in self) {
      if (owns.call(self, key)
          && iterator.call(context, self[key], key, self)) {
        results.push(self[key]);
      }
    }

    return results;
  };

  /**
   * Filter value in 'self' that don't pass 'iterator' in 'context'
   *
   * @param {Object} self object
   * @param {Function} iterator iterator
   * @param {Object} context context
   * @return {Array} values in 'self' that don't pass 'iterator' in 'context'
   * @api public
   */
  object.reject = function (self, iterator, context) {
    var results = []
      , key
      ;

    if (self === undefined || self === null) {
      return results;
    }

    for (key in self) {
      if (owns.call(self, key)
          && !iterator.call(context, self[key], key, self)) {
        results.push(self[key]);
      }
    }

    return results;
  };

  /**
   * Test if every value in 'self' pass 'iterator' in 'context'
   *
   * @param {Object} self object
   * @param {Function} iterator iterator
   * @param {Object} context context
   * @return {Boolean} true if every value in 'self' pass 'iterator'
   * @api public
   */
  object.every = function (self, iterator, context) {
    var key;

    if (self === undefined || self === null) {
      return true;
    }

    for (key in self) {
      if (owns.call(self, key)
          && !iterator.call(context, self[key], key, self)) {
        return false;
      }
    }

    return true;
  };

 }(this));