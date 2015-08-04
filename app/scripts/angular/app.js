let app;
import './map';
import './animate';
import './form';
import './popup';
app=angular.module("App",[
    'ngAnimate',
    'ui.mask',
    'validation.match',
    'uiGmapgoogle-maps',
    'App.map',
    'App.animate',
    'App.form',
    'App.popup'
]);
app.run(function($timeout,$rootScope){
    $timeout(function(){
        $rootScope.load=true;
    },1500);
});
angular.bootstrap(document.getElementsByTagName("html"),["App"]);