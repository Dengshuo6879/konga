(function () {
  'use strict';

  angular.module('frontend.services')
    .controller('ServiceSwaggerController', [
      '$scope', '$rootScope', '$log', '$state',
      function controller($scope, $rootScope, $log, $state) {

        function _initSwaggerUI() {
          SwaggerUIBundle({
            url: "https://petstore.swagger.io/v2/swagger.json",
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            plugins: [
              SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
          })
        }

        // Init
        _initSwaggerUI();

      }
    ]);
}());
