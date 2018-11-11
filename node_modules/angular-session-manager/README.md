# Angular Session

Angular Session Manager

## How to Install

```
$ npm install --save-dev angular-session-manager
$ bower install angular-session-manager
```

## How to Use

This module is an way to manage session storages.

Load module in your `app.js`, and set the configurations:

```
  angular
    .module('yourApp', ['session']);
    .controller('mainController', ['session.localStorageManager', function($scope, LocalStorageService) {

      var objFromkey = LocalStorageService.getStorage('key');

      var testObj = {
        test: 'test'
      };

      LocalStorageService.setStorage(testObj, 'testKey');
    }]);
```
