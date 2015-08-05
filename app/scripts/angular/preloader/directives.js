'use strict';
import progress_circle from "./templates/progress-circle.jade";
let directive;
directive=angular.module('App.preloader.directives',[]);
directive.directive('preloader',[
    "$timeout","$window","$rootScope","$document",function($timeout,$window,$rootScope,$document){
        return {
            restrict:"A",
            scope:{
                preloader:"="
            },
            link:function(scope,element,attrs){
                var allElements,handleComplete,handleProgress,hidePreloader,isUnique,manifest,persent,persentLast,preload,searchContainers,time;
                $rootScope.persentLoaded=0;
                manifest=[];
                isUnique=function(el,array){
                    var isFound;
                    if(!array.length){
                        return true;
                    }
                    isFound=0;
                    array.forEach((function(value,index){
                        if(value&&el===value.src){
                            return isFound=1;
                        }
                    }));
                    if(isFound){
                        return false;
                    }else{
                        return true;
                    }
                };
                searchContainers=scope.preloader;
                allElements=$document[0].querySelectorAll("body "+searchContainers[0]+" *");
                //allElements=$document[0].querySelectorAll("body *");
                angular.forEach(allElements,function(value,index){
                    var newSrc,url,urlString;
                    urlString=$window.getComputedStyle(value).getPropertyValue('background-image');
                    if(urlString!=="none"){
                        if(urlString.indexOf('url')+1){
                            url=urlString;
                            url=url.replace(/url\(\"/g,"");
                            url=url.replace(/url\(/g,"");
                            url=url.replace(/\"\)/g,"");
                            url=url.replace(/\)/g,"");
                        }
                    }else{
                        if(typeof (angular.element(value).attr("src"))!=="undefined"&&value.nodeName.toLowerCase()==="img"){
                            url=angular.element(value).attr("src");
                        }
                    }
                    if(url&&isUnique(url,manifest)){
                        newSrc={};
                        newSrc.src=url;
                        return manifest.push(newSrc);
                    }
                });
                persentLast=0;
                persent=0;
                if($document[0].documentElement.classList.contains('ua-ie')){
                    time=2000;
                }else{
                    time=1000;
                }
                $timeout(function(){
                    return $document[0].documentElement.style.opacity=1;
                },time);
                handleProgress=function(event){
                    if(persent){
                        persentLast=persent;
                    }
                    persent=parseInt(event.loaded*100);
                    $rootScope.$broadcast('preloader:progress',{
                        persent:persent
                    });
                    return $timeout(function(){
                        return TweenLite.to({
                            d:persentLast
                        },.5,{
                            d:persent,
                            roundProps:'d',
                            ease:Linear.easeNone,
                            onUpdate:function(){
                                return $document[0].getElementById("persent-loaded").innerHTML=this.target.d;
                            }
                        });
                    },500);
                };
                hidePreloader=function(){
                    angular.element($document[0].querySelector('.svg-container-block')).addClass('page-is-loaded');
                    return $timeout(function(){
                        return angular.element($document[0].querySelector('.svg-container-block')).remove();
                    },1200);
                };
                handleComplete=function(event){
                    $timeout(function(){
                        return TweenLite.to({
                            d:persentLast
                        },.5,{
                            d:100,
                            roundProps:'d',
                            ease:Linear.easeNone,
                            onUpdate:function(){
                                return $document[0].getElementById("persent-loaded").innerHTML=this.target.d;
                            }
                        });
                    },500);
                    $rootScope.$broadcast('preloader:progress',{
                        persent:100
                    });
                    return $timeout(function(){
                        $rootScope.$broadcast('preloader:loaded',{
                            loaded:true
                        });
                        return hidePreloader();
                    },1000);
                };
                preload=new createjs.LoadQueue(true);
                preload.on("progress",handleProgress);
                preload.on("complete",handleComplete);
                return preload.loadManifest(manifest,true);
            }
        };
    }
]);
directive.directive('animatePreloader',[
    "$timeout","$window",function($timeout,$window){
        return {
            restrict:"A",
            link:function(scope,element,attrs){
                var base,box,boxContainer,boxLoader,tl;
                boxLoader=document.getElementById('boxLoader');
                boxContainer=document.getElementById('boxContainer');
                box=document.getElementById('box');
                base=document.getElementById('base');
                document.getElementById('boxContainer').style.opacity=1
                TweenMax.set([boxLoader,base],{
                    position:'absolute',
                    top:'50%',
                    left:'50%',
                    xPercent:-50,
                    yPercent:-50
                });
                TweenMax.set([boxContainer],{
                    position:'absolute',
                    top:'50%',
                    left:'50%',
                    xPercent:-50,
                    yPercent:-50
                });
                tl=new TimelineMax({
                    repeat:-1
                });
                tl.timeScale(1.2);
                tl.set(boxLoader,{
                    transformOrigin:'0% 100%',
                    left:'+=70',
                    top:'-='+70/2
                }).to(boxLoader,1,{
                    rotation:'-=90',
                    ease:Power4.easeInOut
                }).set(boxLoader,{
                    transformOrigin:'0% 100%',
                    left:'-=70',
                    rotation:0
                }).to(boxLoader,1,{
                    rotation:'-=90',
                    ease:Power4.easeInOut
                }).set(boxLoader,{
                    transformOrigin:'0% 100%',
                    left:'-=70',
                    rotation:0
                }).to(boxLoader,1,{
                    rotation:'-=270',
                    ease:Power4.easeInOut
                }).to(boxContainer,1,{
                    rotation:'+=180',
                    ease:Back.easeInOut
                },'-=1').set(boxLoader,{
                    transformOrigin:'100% 0%',
                    top:'+=70',
                    rotation:0
                }).to(boxLoader,1,{
                    rotation:'-=90',
                    ease:Power4.easeInOut
                }).set(boxLoader,{
                    transformOrigin:'100% 0%',
                    left:'+=70',
                    rotation:0
                }).to(boxLoader,1,{
                    rotation:'-=90',
                    ease:Power4.easeInOut
                }).set(boxLoader,{
                    transformOrigin:'100% 0%',
                    left:'+=70',
                    rotation:0
                }).to(boxLoader,1,{
                    rotation:'-=270',
                    ease:Power4.easeInOut
                }).to(boxContainer,1,{
                    rotation:'+=180',
                    ease:Back.easeInOut
                },'-=1');
            }
        };
    }
]);
directive.directive('progressCircle',[
    "$timeout","$window",function($timeout,$window){
        return {
            restrict:"E",
            replace:true,
            template:progress_circle,
            link:function(scope,element,attrs){
                TweenMax.set(element[0].querySelector('.circle'),{
                    drawSVG:'0% 0%'
                });
                scope.$on('preloader:progress',function(event,data){
                    return TweenMax.to(element[0].querySelector('.circle'),.7,{
                        drawSVG:data.persent+"%"
                    });
                });
            }
        };
    }
]);