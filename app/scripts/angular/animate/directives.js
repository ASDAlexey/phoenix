'use strict';
var directive;
directive=angular.module('App.animate.directives',[]);
directive.directive('fadein3d',[
    "$timeout","$window","$document",function($timeout,$window,$document){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                if(!$document[0].documentElement.classList.contains('ua-mobile')){
                    var scrollBlock,wh,windowScroll,animationParameters,tl;
                    tl=new TimelineMax({
                        paused:true
                    });
                    tl.staggerFrom(element[0].children,0.8,{
                        opacity:0,
                        scale:0,
                        y:80,
                        rotationX:180,
                        transformOrigin:"0% 50% -50",
                        ease:Back.easeOut
                    },0.1,"+=0");
                    windowScroll=function(){
                        var offsetTop,scrollTop,wh;
                        offsetTop=element[0].closest('section').offsetTop;
                        scrollTop=($document[0].querySelector('body').scrollTop)?$document[0].querySelector('body'):$document[0].querySelector('html');
                        wh=$window.innerHeight;
                        if((offsetTop-scrollTop.scrollTop)<=wh/2){
                            tl.play();
                        }else{
                            tl.reverse();
                        }
                    };
                    windowScroll();
                    $window.addEventListener("scroll",windowScroll,false);
                }
            }
        };
    }
]);
directive.directive('fadein3dfooter',[
    "$timeout","$window","$document",function($timeout,$window,$document){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                if(!$document[0].documentElement.classList.contains('ua-mobile')){
                    var scrollBlock,wh,windowScroll,animationParameters,tl;
                    tl=new TimelineMax({
                        paused:true
                    });
                    tl.staggerFrom(element[0].children,0.8,{
                        opacity:0,
                        scale:0,
                        y:80,
                        rotationX:180,
                        transformOrigin:"0% 50% -50",
                        ease:Back.easeOut
                    },0.1,"+=0");
                    windowScroll=function(){
                        var offsetTop,scrollTop,wh,dh;
                        offsetTop=element[0].closest('section,article,footer').offsetTop;
                        scrollTop=($document[0].querySelector('body').scrollTop)?$document[0].querySelector('body'):$document[0].querySelector('html');
                        if((offsetTop-scrollTop.scrollTop)<=105){
                            tl.play();
                        }else{
                            tl.reverse();
                        }
                    };
                    windowScroll();
                    $window.addEventListener("scroll",windowScroll,false);
                }
            }
        };
    }
]);
directive.directive('fadeinfly',[
    "$timeout","$window","$document",function($timeout,$window,$document){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                if(!$document[0].documentElement.classList.contains('ua-mobile')){
                    var scrollBlock,wh,windowScroll,animationParameters,tl;
                    tl=new TimelineMax({
                        paused:true
                    });
                    tl.staggerFrom(element[0].children,0.8,{
                        opacity:0,scale:0,y:80,rotationX:180,transformOrigin:"0% 50% -50",ease:Linear.easeNone
                    },0.1,"+=0");
                    windowScroll=function(){
                        var offsetTop,scrollTop,wh;
                        offsetTop=element[0].closest('section').offsetTop;
                        scrollTop=($document[0].querySelector('body').scrollTop)?$document[0].querySelector('body'):$document[0].querySelector('html');
                        wh=$window.innerHeight;
                        if((offsetTop-scrollTop.scrollTop)<=wh/2){
                            tl.play();
                        }else{
                            tl.reverse();
                        }
                    };
                    windowScroll();
                    $window.addEventListener("scroll",windowScroll,false);
                }
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
directive.directive('pointerEventsScroll',[
    "$window",function($window){
        return {
            restrict:"A",
            link:function(scope,element,attr){
                return angular.element(document).ready(function(){
                    var body,timer;
                    body=document.body;
                    timer= void 0;
                    return $window.addEventListener('scroll',(function(){
                        clearTimeout(timer);
                        if(!body.classList.contains('disable-hover')){
                            body.classList.add('disable-hover');
                        }
                        return timer=setTimeout((function(){
                            return body.classList.remove('disable-hover');
                        }),500);
                    }),false);
                });
            }
        };
    }
]);