(function() {
  'use strict';

  angular.module('public')
  .config(routeConfig);

  /**
   * Configures the routes and views
   */
  routeConfig.$inject = ['$stateProvider'];
  function routeConfig ($stateProvider) {
    // Routes
    $stateProvider
      .state('home', {
        url:"/",
        templateUrl: 'src/public/home.html'
      })
      .state("calcs" , {
        url:"/calc",
        templateUrl:"src/public/calc.template.html"
      })
      .state('calcs.gaussianSurface' , {
        url:"/gauss",
        templateUrl: "src/public/Gaussian Surface/gaussian-surface.html"
      })
  }
})();
