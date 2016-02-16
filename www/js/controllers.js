angular.module('starter.controllers', [])

  .controller('TabsCtrl', function($scope, $ionicPlatform,$rootScope,$http,$websocket,$cordovaMedia) {

    $scope.recording = false;
    // Chrome or Firefox or IE User media

    //$scope.recordEntry = function(){
    //  if (ionic.Platform.isWebView() === true) {
    //  $ionicPlatform.ready(function() {
    //    var src = "/src/" + new Date + "audio.mp3"
    //    $scope.new_recording = $cordovaMedia.newMedia(src);
    //    var iOSPlayOptions = {
    //      numberOfLoops: 2,
    //      playAudioWhenScreenIsLocked : false
    //    }
    //    $scope.new_recording.startRecord();
    //    $scope.recording = true;
    //  });
    //  } else if(ionic.Platform.isWebView() === false) {
    //    navigator.getUserMedia
    //  }
    //};
    //
    //
    //
    //$scope.saveRecording = function(ri){
    //  console.log($rootScope)
    //}
  })

  .controller('DashCtrl', function($scope) {})

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
