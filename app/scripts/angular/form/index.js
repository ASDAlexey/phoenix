'use strict';
import './controllers';
import './filters';
import './services';
import './directives';
angular.module('App.form',[
    "App.form.controllers",
    "App.form.filters",
    "App.form.services",
    "App.form.directives"
]);