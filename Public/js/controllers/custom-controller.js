define(['./controllers'], function(controllers) {
    controllers.controller('CustomCtrl', ['$scope',
        function($scope) {
            console.log('CustomCtrl page');
        }
    ]);
});