(function() {
    require.config({
        // baseUrl: "/Public/js",
        waitSeconds: 200,
        paths: {
            'angular': 'vendor/angular/angular',
            'app': 'app',
            'bootstrap': 'bootstrap',
            'jQuery': 'vendor/jquery/jquery',
            'ui.router': 'vendor/angular-ui-router/release/angular-ui-router',
            'angular.animate': 'vendor/angular-animate/angular-animate',
            'angular.cookies': 'vendor/angular-cookies/angular-cookies',
            'angular.sanitize': 'vendor/angular-sanitize/angular-sanitize',
            'angular-touch': 'vendor/angular-touch/angular-touch',
            'uiBootstrap': 'vendor/angular-ui-bootstrap-bower/ui-bootstrap',
            'uiBootstrapTpl': 'vendor/angular-ui-bootstrap-bower/ui-bootstrap-tpls',
            'underscore' : 'vendor/underscore/underscore',
        },
        shim: {
            'jQuery': { exports: 'jQuery' },
            'angular': {
                deps: ['jQuery'],
                exports: 'angular'
            },
            'ui.router': {
                deps: ['angular']
            },
            'underscore' : {
                deps: ['angular']
            },
            'angular.animate': ['angular'],
            'angular.cookies': ['angular'],
            'angular.sanitize': ['angular'],
            'angular-touch': ['angular'],
            'uiBootstrap': { deps: ['angular'], exports: 'uiBootstrap' },
            'uiBootstrapTpl': { deps: ['angular', 'uiBootstrap'] }
        },
        urlArgs: "bust=" + (new Date()).getTime()
    });
    require(['bootstrap'], function(bootstrap) {});
}());
