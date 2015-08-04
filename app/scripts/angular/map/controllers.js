'use strict';
let controller;
controller=angular.module("App.map.controllers",[]);
controller.controller("GMapCtrl",[
    "$scope",function($scope){
        $scope.map={};
        $scope.options={
            scrollwheel:false
        };
        //$scope.marker={
        //    options:{
        //        icon:'images/baloons/1.png',
        //        icon2:'images/baloons/2.png'
        //    }
        //}
    }
]);