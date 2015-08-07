'use strict';
var controller;
controller=angular.module("App.price.controllers",[]);
controller.controller("PriceCtrl",[
    "$scope","Price",($scope,Price)=>{
        $scope.filters=[];
        $scope.ordering=new Array(5);
        $scope.ordering=_.fill($scope.ordering,false);
        $scope.reverse=false;
        $scope.orderBy=(name,index)=>{
            if($scope.predicate==name){
                $scope.reverse= !$scope.reverse;
            }else{
                $scope.predicate=name;
                $scope.reverse=false;
            }
            $scope.ordering[index]=$scope.reverse;
        };
        /*custom-select*/
        $scope.dataForm={};
        $scope.send=()=>{
            console.log($scope.dataForm);
            Price.update({task:'price'},$scope.dataForm);
        };
    }
]);
