'use strict';
import custom_select from './templates/custom-select.jade';
let directive;
directive=angular.module('App.price.directives',[]);
directive.directive('customSelect',[
    "$timeout",
    ($timeout)=>{
        return {
            restrict:"E",
            replace:true,
            scope:{
                inputModel:"=name",
                "outputModel":"="
            },
            transclude:true,
            template:custom_select,
            link:(scope,element,attrs)=>{
                if(!scope.inputModel)
                    scope.inputModel=[];
                element[0].querySelectorAll('.options-block options').forEach((el,index)=>{
                    scope.inputModel.push({
                        "maker":el.innerHTML,
                        "ticked":el.hasAttribute('selected'),
                        "value":el.getAttribute('value')
                    })
                });
                element[0].querySelector('.options-block').remove();
            }
        };
    }
]);