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
    'uiGmapgoogle-maps',
    'isteven-multi-select',
    'materialDatePicker',
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
angular.bootstrap(document.getElementsByTagName("html"),["App"]);