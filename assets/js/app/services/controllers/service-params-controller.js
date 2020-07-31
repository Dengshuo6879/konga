(function () {
  'use strict';

  angular.module('frontend.services')
    .controller('ServiceParamsController', [
      '$scope', '$rootScope', '$log', 'ServiceService',
      function controller($scope, $rootScope, $log, ServiceService) {

        $scope.handleSaveParamsCheck = function () {
          if ($scope.paramsCheck) {
            const params = {
              key: $scope.service.name + '_check',
              oas_json: $scope.paramsCheck
            }
            ServiceService.swaggerGens(params);
          }
        }
      }
    ]);
}());
