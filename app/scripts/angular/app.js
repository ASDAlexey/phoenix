let app;
import './preloader';
import './map';
import './animate';
import './form';
import './popup';
import './price';
app=angular.module("App",[
    'ngAnimate',
    'ui.mask',
    'validation.match',
    'uiGmapgoogle-maps',
    'isteven-multi-select',
    //'ngSanitize',
    //'ui.select',
    'App.preloader',
    'App.map',
    'App.animate',
    'App.form',
    'App.popup',
    'App.price'
]);
app.run(function($timeout,$rootScope){
    $timeout(function(){
        $rootScope.load=true;
    },1500);
});
//app.config(function(uiSelectConfig){
//    uiSelectConfig.theme='selectize';
//});
angular.bootstrap(document.getElementsByTagName("html"),["App"]);