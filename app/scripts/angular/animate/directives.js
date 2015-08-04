'use strict';
var directive;
directive=angular.module('App.animate.directives',[]);
directive.directive('flipperX',[
    "$timeout",function($timeout){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                return angular.element(document).ready(function(){
                    var backCard,frontCard,tl;
                    CSSPlugin.defaultTransformPerspective=1000;
                    TweenMax.set($(element).find('.back'),{
                        rotationY:-180
                    });
                    frontCard=$(element).children(".front");
                    backCard=$(element).children(".back");
                    tl=new TimelineMax({
                        paused:true
                    });
                    tl.to(frontCard,.7,{
                        rotationY:180
                    }).to(backCard,.7,{
                        rotationY:0
                    },0);
                    $(element).on('mouseenter',function(){
                        return tl.play();
                    });
                    return $(element).on('mouseleave',function(){
                        return tl.reverse();
                    });
                });
            }
        };
    }
]);

directive.directive('flip3d',[
    "$timeout",function($timeout){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                return angular.element(document).ready(function(){
                    var frontCard,tl;
                    CSSPlugin.defaultTransformPerspective=1000;
                    TweenMax.set($(element).find(".specs"),{
                        rotationX:-90,
                        transformOrigin:"0 0 0"
                    });
                    frontCard=$(element).find(".specs");
                    tl=new TimelineMax({
                        paused:true
                    });
                    tl.to(frontCard,.7,{
                        rotationX:0,
                        transformOrigin:"0 0 0",
                        ease:Bounce.easeOut
                    });
                    $(element).on('mouseenter',function(){
                        return tl.play();
                    });
                    return $(element).on('mouseleave',function(){
                        return tl.reverse();
                    });
                });
            }
        };
    }
]);

directive.directive('menuFlip3d',[
    "$timeout",function($timeout){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                return angular.element(document).ready(function(){
                    var listMenu,tl;
                    CSSPlugin.defaultTransformPerspective=1000;
                    TweenMax.set($(element).find(".sub-menu"),{
                        rotationX:-90,
                        transformOrigin:"0 0 0"
                    });
                    listMenu=$(element).find(".sub-menu");
                    tl=new TimelineMax({
                        paused:true
                    });
                    tl.to(listMenu,.7,{
                        rotationX:0,
                        transformOrigin:"0 0 0",
                        ease:Back.easeOut
                    });
                    $(element).on('mouseenter',function(){
                        return tl.play();
                    });
                    return $(element).on('mouseleave',function(){
                        return tl.reverse();
                    });
                });
            }
        };
    }
]);

directive.directive('fadein3d',[
    "$timeout","$window",function($timeout,$window){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                return angular.element(document).ready(function(){
                    var animationParameters,tl;
                    tl=new TimelineMax({
                        paused:true
                    });
                    tl.staggerFrom($(element).find('>*'),0.8,{
                        opacity:0,
                        scale:0,
                        y:80,
                        rotationX:180,
                        transformOrigin:"0% 50% -50",
                        ease:Back.easeOut
                    },0.1,"+=0");
                    animationParameters=function(){
                        var offsetTop,scrollTop,wh;
                        offsetTop=$(element).closest('section,article').offset().top;
                        scrollTop=$($window).scrollTop();
                        wh=$($window).height();
                        if((offsetTop-scrollTop)<=wh/2){
                            return tl.play();
                        }else{
                            return tl.reverse();
                        }
                    };
                    animationParameters();
                    return $($window).scroll(function(){
                        return animationParameters();
                    });
                });
            }
        };
    }
]);

directive.directive('rotateY',[
    "$timeout","$window",function($timeout,$window){
        return {
            restrict:"A",
            scope:{
                rotateY:"@"
            },
            link:function(scope,element,attrs){
                return angular.element(document).ready(function(){
                    var tl;
                    tl=new TimelineMax({
                        paused:true
                    });
                    tl.to($(element),3,{
                        rotationY:scope.rotateY,
                        transformOrigin:"50% 50% 0",
                        ease:Back.easeOut
                    });
                    $(element).on('mouseenter',function(){
                        return $timeout(function(){
                            return tl.play();
                        },50);
                    });
                    return $(element).on('mouseleave',function(){
                        return tl.reverse();
                    });
                });
            }
        };
    }
]);

directive.directive('moveUp',[
    "$timeout","$window","$document",function($timeout,$window,$document){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                return angular.element(document).ready(function(){
                    var scrollBlock,wh,windowScroll;
                    wh=$window.innerHeight;
                    windowScroll=function(){
                        scrollBlock=($document[0].querySelector('body').scrollTop)?$document[0].querySelector('body'):$document[0].querySelector('html');
                        if(scrollBlock.scrollTop<=wh){
                            element[0].classList.add('no-visible');
                        }else{
                            element[0].classList.remove('no-visible');
                        }
                    };
                    windowScroll();
                    $window.addEventListener("scroll",windowScroll,false);
                    angular.element(element).bind('click',function(){
                        TweenMax.to(scrollBlock,.7,{
                            scrollTop:0
                        });
                    });
                });
            }
        };
    }
]);