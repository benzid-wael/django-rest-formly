/**
 * Created by wael on 14/12/15.
 */
// console.clear(); // <-- keep the console clean on refresh

/* global angular */
(function() {
  'use strict';

  var app = angular.module('djangoRestFormlyExample', ['formly', 'formlyBootstrap']);


  app.controller('MainCtrl', function MainCtrl(formlyVersion) {
    var vm = this;
    // function assignment
    vm.onSubmit = onSubmit;

    // variable assignment
    vm.author = { // optionally fill in your info below :-)
      name: 'Wael BEN ZID EL GUEBSI',
      url: 'https://twitter.com/benzid_wael'  // my twitter account
    };
    vm.exampleTitle = 'Introduction';
    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };

    vm.model = {
      note: "",
      score: 0
    };
    vm.options = {
      formState: {
        awesomeIsForced: false
      }
    };

    vm.fields = DjangoRestFormly.DjangoRestFrameworkAdapter({
      "first_name": {
          "type": "string",
          label: "First Name",
          "required": true,
          "read_only": false,
          max_length: 10
      },
      "last_name": {
          "type": "string",
          "required": true,
          "read_only": false,
          "label": "Family Name (Max: 10)",
          "max_length": 10
      },
      "age": {
          "type": "integer",
          "required": true,
          "read_only": false
      }
    });

    // function definition
    function onSubmit() {
      alert("You clicked on 'Submit' button");
    }
  });

})();
