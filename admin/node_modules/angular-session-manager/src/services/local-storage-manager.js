/**
 *
 * @license The Unlicense, http://unlicense.org/
 * @author  Helder Burato Berto <helder.burato@gmail.com>, https://github.com/helderburato/angular-session.git
 *
 */

'use strict';

angular
  .module('session')
  .service('session.localStorageManager', localStorageManager);

localStorageManager.$inject = [
  '$localStorage',
  'session.prefix'
];

function localStorageManager($localStorage, prefix) {

  var output = {};

  output.getPrefixStorage = function() {
    return prefix.storage;
  };

  output.getStorage = function(key) {
    if ($localStorage[prefix.storage+key]) { 
      return JSON.parse($localStorage[prefix.storage+key]); 
    } else { 
      return null;
    }
  };

  output.setStorage = function(obj, key) {
    if (!key) { 
      throw new Error('Informe a key para setar a localStorage'); 
    }

    $localStorage[prefix.storage+key] = JSON.stringify(obj);
    return true;
  };

  output.clearStorage = function(key) {
    if (!key) { 
      throw new Error('Informe a key que deve ser deletada o índice da localStorage'); 
    }

    delete $localStorage[prefix.storage+key];
    return true;
  };

  return output;

}