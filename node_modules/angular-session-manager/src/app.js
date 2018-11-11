/**
 *
 * @license The Unlicense, http://unlicense.org/
 * @author  Helder Burato Berto <helder.burato@gmail.com>, https://github.com/helderburato/angular-session.git
 *
 */

'use strict';

angular
  .module('session', [])
  .constant('session.prefix', {
    storage: 'hb-'
  });