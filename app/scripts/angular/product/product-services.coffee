module.exports = (angular)->
  'use strict'
  services = angular.module("App.product.product-services",["ngResource"])
  services.factory 'Product',($resource) ->
    $resource 'controller.php/:Id',{Id : '@Id'},'update' :method : 'PUT'