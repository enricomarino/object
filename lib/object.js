
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
   * Apply iterator to each value of object 'self' in context 'context'
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



 }(this));