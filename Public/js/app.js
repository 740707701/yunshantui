define([ 
    'angular',
    'ui.router',
    'controllers/_base',
    'services/_base',
    'filters/filters',
    'directives/directives',
    'services/services',
    'states/_base',
    'angular.animate',
    'angular.cookies',
    'angular.sanitize',
    'angular-touch',
    'uiBootstrapTpl',
    'uiBootstrap',
   ], function(angular) {
    return angular.module('LingMall', [
        'ui.router', 
        'LingMall.controllers',
        'filters',
        'directives',
        'services',
        'LingMall.states',
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
   ]);
});