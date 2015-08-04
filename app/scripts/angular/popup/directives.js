'use strict';
var directive;
directive=angular.module('App.popup.directives',[]);
directive.directive('rotate',[
    "$timeout",function($timeout){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                return angular.element(document).ready(function(){
                    var tl;
                    tl=new TimelineMax({
                        repeat:-1
                    });
                    tl.to(element[0].getElementsByTagName('span')[0],2,{
                        rotation:360,
                        ease:Linear.easeNone
                    });
                    tl.pause();
                    element[0].addEventListener('mouseenter',function(){
                        return tl.play();
                    });
                    return element[0].addEventListener('mouseleave',function(){
                        return tl.pause();
                    });
                });
            }
        };
    }
]);
//console.log('sss');
console.log(require("./templates/popup-svg.html"));
//console.log(require('./templates/popup-svg.jade'));
directive.directive('popupSvg',[
    '$timeout',function($timeout){
        return {
            restrict:'E',
            replace:true,
            transclude:true,
            //template:require('./templates/popup-svg.jade'),
            //template:`<div data-path-to="M 0,0 c 0,0 63.5,-16.5 80,0 16.5,16.5 0,60 0,60 L 0,60 Z" class="overlay overlay-cornershape">
            //                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60"
            //                         preserveaspectratio="none">
            //                        <path d="M 0,0 c 0,0 -16.5,43.5 0,60 16.5,16.5 80,0 80,0 L 0,60 Z" class="overlay-path"></path>
            //                    </svg>
            //                    <div ng-if="name=='enter'" class="popup-bg-img"></div>
            //                    <button rotate="rotate" ng-click="closePopup('',{})" class="overlay-close">
            //                        <span></span>
            //                    </button>
            //                    <div ng-transclude="ng-transclude" class="inner-popup"></div>
            //                </div>`,
            controller:[
                "$scope","$rootScope",function($scope,$rootScope){
                    return $scope.closePopup=function(msg,data){
                        return $rootScope.$broadcast('popup',{
                            data:data,
                            msg:msg,
                            isOpened:false
                        });
                    };
                }
            ],
            scope:{
                name:"@"
            },
            link:function(scope,element,attrs){
                return angular.element(document).ready(function(){
                    var closeOverlay,openOverlay,overlay,path,pathConfig,s,tl;
                    element[0].classList.remove('hide-block');
                    scope.$on('popup',function(event,response){
                        if(response.isOpened){
                            if(response.msg===scope.name){
                                return openOverlay();
                            }
                        }else if(!response.isOpened){
                            return closeOverlay();
                        }
                    });
                    overlay=element[0];
                    tl={};
                    tl[scope.name]=new TimelineMax({
                        paused:true
                    });
                    $timeout((function(){
                        var choise;
                        choise=_.union(element[0].getElementsByClassName('inner-popup'),element[0].getElementsByClassName('overlay-close'),element[0].getElementsByClassName('logo'));
                        return tl[scope.name].staggerFrom(choise,0.7,{
                            opacity:0,
                            scale:0,
                            y:80,
                            rotationX:180,
                            transformOrigin:'0% 50% -50',
                            ease:Back.easeOut
                        },0.1,'+=0');
                    }),100);
                    openOverlay=function(){
                        overlay.classList.add('open');
                        path.animate({
                            'path':pathConfig.to
                        },800,mina.easeout);
                        return $timeout((function(){
                            return tl[scope.name].play();
                        }),800);
                    };
                    closeOverlay=function(){
                        tl[scope.name].reverse();
                        return $timeout((function(){
                            path.animate({
                                'path':pathConfig.from
                            },500,mina.easeout);
                            return $timeout((function(){
                                return overlay.classList.remove('open');
                            }),500);
                        }),500);
                    };
                    s=Snap(overlay.querySelector('svg'));
                    path=s.select('path');
                    return pathConfig={
                        from:path.attr('d'),
                        to:overlay.getAttribute('data-path-to')
                    };
                });
            }
        };
    }
]);