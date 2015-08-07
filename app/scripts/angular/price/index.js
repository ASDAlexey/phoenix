'use strict';
import './controllers';
import './filters';
import './directives';
import './services';
angular.module('App.price',[
    "App.price.controllers",
    "App.price.filters",
    "App.price.directives",
    "App.price.services"
]);