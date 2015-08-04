'use strict';
var services;
services=angular.module("App.form.services",["ngResource"]);
services.factory('ProductCart',function($resource){
    return $resource((window.location.protocol+"//"+window.location.hostname)+":Id",{
        module:'session',
        option:'com_ajax',
        format:'json',
        Id:'@Id'
    },{
        'update':{
            method:'PUT'
        }
    });
});