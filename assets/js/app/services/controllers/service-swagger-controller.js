(function () {
  'use strict';

  angular.module('frontend.services')
    .controller('ServiceSwaggerController', [
      '$scope', '$rootScope', '$log', 'ServiceService',
      function controller($scope, $rootScope, $log, ServiceService) {

        $scope.saveJson = function () {
          const saveAsJsonNode = document.getElementsByClassName('save-as-json');
          if (saveAsJsonNode && saveAsJsonNode[0]) {
            saveAsJsonNode[0].click();
            const prettyJsonContent = localStorage.getItem('prettyJsonContent');   // prettyJsonContent 是在SwaggerEditorBundle组件中定义的
            localStorage.removeItem('prettyJsonContent');

            const params = {
              key: $scope.service.name,
              oas_json: prettyJsonContent
            }

            ServiceService.swaggerGens(params);
          }
        }

        function _SwaggerEditorBundle() {
          SwaggerEditorBundle({
            // url: 'https://petstore.swagger.io/v2/swagger.json', // 可配置url
            dom_id: '#swagger-editor',
            layout: 'StandaloneLayout',
            presets: [
              SwaggerEditorStandalonePreset
            ]
          })
        }

        function _initSwaggerUI() {
          ServiceService.getSwaggerJson($scope.service.name).then((res) => {
            localStorage.setItem('oas_json', res.data.oas_json);
            _SwaggerEditorBundle();
          }).catch(err => {
            _SwaggerEditorBundle();
          })
        }

        // Init
        _initSwaggerUI();
      }
    ]);
}());
