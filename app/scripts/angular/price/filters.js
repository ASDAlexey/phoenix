'use strict';
angular.module("App.price.filters",[])
    .filter("date",()=>{
        return (input)=>{
            input=input.split('-');
            return `${input[2]}.${input[1]}.${input[0]}`;
        };
    })
    .filter("splitSpace",()=>{
        return (input)=>{
            if(input){
                return input.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,'$1 ');
            }
        };
    });