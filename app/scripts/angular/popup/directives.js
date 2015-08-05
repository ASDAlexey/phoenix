'use strict';
import popup_svg from './templates/popup-svg.jade';
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
directive.directive('popupSvg',[
    '$timeout',function($timeout){
        return {
            restrict:'E',
            replace:true,
            transclude:true,
            template:popup_svg,
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
                            transformOrigin:'0% 50% -50%',
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