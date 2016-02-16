angular.module('starter').directive("ngAudioRecorder", ['$http','$websocket','$cordovaMedia',
  function ($http,$websocket,$cordovaMedia) {
    return {
      link: function ($scope) {
        $scope.uploadToWatson = function() {
          $http({
            method: 'GET',
            url: 'http://localhost:1337/token'
          }).then(function successCallback(response) {
            var token = response.data.token;
            var wsURI = "wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=" + token + "&model=en-US_BroadbandModel";
            var websocket = $websocket(wsURI);
            var open_message = {
              'action': 'start',
              'content-type': 'audio/wav',
              'profanity_filter': false,
              'word_confidence':true
            };
            var close_message = {
              'action': 'stop'
            };
            websocket.onOpen(function (evt) {
              console.log(evt);
              websocket.socket.send(JSON.stringify(open_message));
              websocket.socket.send($scope.recordedAudioBlob);
              websocket.socket.send(JSON.stringify(close_message));
            });
            websocket.onError(function (evt) {console.log(evt)});
            websocket.onMessage(function (evt) {
              console.log(evt)
              var message = JSON.parse(evt.data)
              if (message.results && message.results.length > 0) {
                console.log(message.results[0].alternatives[0])
                $scope.$parent.diary = message.results[0].alternatives[0].transcript;
              }
            });
            websocket.onClose(function(evt) { console.log(evt)});
            // websocket.send(close_message);
          }, function errorCallback(response) {
            console.log(response)
          });
        };
      }
    }
  }]);
