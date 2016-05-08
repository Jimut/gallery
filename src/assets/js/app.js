(function(){
  var app = angular.module('Gallery', ['ngMaterial']);

  app.controller('GalleryController', function($scope){
    $scope.images = [
      'assets/img/img-1.jpg',
      'assets/img/img-2.jpg',
      'assets/img/img-3.jpg',
      'assets/img/img-4.jpg',
      'assets/img/img-5.jpg',
      'assets/img/img-6.jpg',
      'assets/img/img-7.jpg',
      'assets/img/img-8.jpg',
      'assets/img/img-9.jpg',
      'assets/img/img-10.jpg'
    ];

    $scope.imageShow = {
      state : false,
      image : $scope.images[0],
      imageIndex: 0
    }

    $scope.displayImage = function(imageIndex){
      $scope.imageShow.state = true;
      $scope.imageShow.image = $scope.images[imageIndex];
      $scope.imageShow.imageIndex = imageIndex;
    }

    $scope.displayGrid = function(){
      $scope.imageShow.state = false;
    }

    $scope.deleteImage= function(imageIndex){
      $scope.imageShow.state = false;
      $scope.images.splice(imageIndex, 1);
    }
  });
})();
