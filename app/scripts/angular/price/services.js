'use strict';
var services;
services=angular.module("App.price.services",["ngResource"]);
//services.factory('Price',function($resource){
//    return $resource((window.location.protocol+"//"+window.location.hostname)+":Id",{
//        Id:'@Id'
//    },{
//        'update':{
//            method:'PUT'
//        }
//    });
//});
services.factory('Price',function($resource){
    return $resource((window.location.protocol+"//"+window.location.hostname+"/controllers/controller.php")+":Id",{
        Id:'@Id'
    },{
        'update':{
            method:'PUT'
        }
    });
});