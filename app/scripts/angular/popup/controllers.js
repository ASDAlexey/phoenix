'use strict';
var controller;
controller=angular.module("App.popup.controllers",[]);
controller.controller("PopupCtrl",[
    "$scope","$rootScope","$timeout",function($scope,$rootScope,$timeout){
        $scope.openPopup=function(msg,data){
            return $rootScope.$broadcast('popup',{
                data:data,
                msg:msg,
                isOpened:true
            });
        };
        $scope.animated=false;
        $scope.enterEffect=function(){
            $scope.animated=true;
        };
        $scope.leaveEffect=function(){
            $scope.animated=false;
        };
    }
]);