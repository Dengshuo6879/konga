(function () {
  'use strict';

  angular.module('frontend.services')
    .controller('ServiceSwaggerController', [
      '$scope', '$rootScope', '$log', 'ServiceService', 'MessageService',
      function controller($scope, $rootScope, $log, ServiceService, MessageService) {

        $scope.saveJson = function () {
          const saveAsJsonNode = document.getElementsByClassName('save-as-json');
          if (saveAsJsonNode && saveAsJsonNode[0]) {
            saveAsJsonNode[0].click();
            const prettyJsonContent = localStorage.getItem('prettyJsonContent');   // prettyJsonContent 是在SwaggerEditorBundle组件中定义的
            localStorage.removeItem('prettyJsonContent');

            if (prettyJsonContent === 'hasErr') {
              MessageService.error('Swagger Json存在错误');
            } else {
              const params = {
                key: $scope.service.name,
                oas_json: prettyJsonContent
              }
              ServiceService.swaggerGens(params).then(() => {
                MessageService.success('Swagger Json保存成功');
              }, () => {
                MessageService.error('Swagger Json保存失败');
              });
            }
          }
        }

        function _SwaggerEditorBundle() {
          SwaggerEditorBundle({
            // url: 'https://petstore.swagger.io/v2/swagger.json', // 可配置url，此处不做配置，在Swagger Editor组件中通过localStorage获取json内容
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
