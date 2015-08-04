'use strict';
angular.module("App.form.filters",[]).filter("splitSpace",function(){
    return function(input){
        if(input){
            return input.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,'$1 ');
        }
    };
}).filter("persent",function(){
    return function(input){
        if(input){
            return input*100;
        }
    };
}).filter("toMb",function(){
    return function(input){
        if(input){
            return Math.round(input*100/1048576)/100;
        }
    };
}).filter("toArr0",function(){
    return function(input){
        if(input){
            return input.split(';')[0];
        }
    };
}).filter("toArr1",function(){
    return function(input){
        if(input){
            return input.split(';')[1];
        }
    };
});