define(['./controllers'], function(controllers) {
    // home controller
    controllers.controller('MainCtrl', ['$scope',
        function($scope) {
            console.log('MainCtrl page');

            $scope.showIndex = 1;

        }
    ]);
});