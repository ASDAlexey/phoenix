'use strict';
var controller;
controller=angular.module("App.form.controllers",[]);
controller.controller("FormCtrl",[
    "$scope","$http","$rootScope","$timeout","$window","$document",function($scope,$http,$rootScope,$timeout){
        $scope.isCalcForm=true;
        $scope.dataForm={};
        $scope.back=function(){
            $scope.isCalcForm=true;
        };
        $scope.form_set_pristine=function(form){
            if(form.$setPristine){
                return form.$setPristine();
            }
        };
        $scope.form_set_dirty=function(form){
            if(form.$setDirty){
                form.$setDirty();
                return angular.forEach(form,function(input,key){
                    if(typeof input==='object'&&input.$name!==undefined){
                        return form[input.$name].$setViewValue((form[input.$name].$viewValue!==undefined?form[input.$name].$viewValue:""));
                    }
                });
            }
        };
        $scope.send=function(dataForm,formValidate,action){
            var sendOptions;
            if(formValidate.$valid){
                $scope.thanksShowTime();
                sendOptions={
                    action:action,
                    method:"POST",
                    data:angular.copy(dataForm)
                };
                $scope.sendData(sendOptions);
                $scope.clear(formValidate);
            }else{
                $scope.form_set_dirty(formValidate);
            }
        };
        $scope.clear=function(formValidate){
            $scope.dataForm.data={};
            $scope.form_set_pristine(formValidate);
        };
        $rootScope.hideThank=function(){
            return $rootScope.formIsValide=false;
        };
        $scope.thanksShowTime=function(){
            $rootScope.formIsValide=true;
            $timeout(function(){
                return $rootScope.hideThank();
            },2000);
        };
        $scope.sendData=function(sendOptions){
            $scope.isCalcForm=false;
            $http({
                url:sendOptions.action,
                method:sendOptions.method,
                data:sendOptions.data
            }).then(function(){
                $scope.clear(formValidate);
            });
        };
    }
]);
