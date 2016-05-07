(function(){
  var app = angular.module('Gallery', ['ngMaterial']);

  app.controller('GalleryController', function($scope){
    $scope.images = [
      'assets/img/img-1.jpg',
      'assets/img/img-2.jpg',
      'assets/img/img-3.jpg',
      'assets/img/img-4.jpg'
    ];
  });
})();
