'use strict';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Chat App Module
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var basicChat = angular.module( 'BasicChat', ['chat'] ).filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);

angular.module('chat').constant( 'config', {
    rltm: {
        service: 'pubnub', 
        config: {
            publishKey: 'demo',
            subscribeKey: 'demo'
        }
    }
});

// or use socket.io
// make sure to run socket.io-server from rltm.js
// angular.module('chat').constant( 'config', {
//     rltm: {
//         service: 'socketio', 
//         config: {
//             endpoint: 'http://localhost:9000'
//         }
//     }
// });


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Chat App Controller
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
basicChat.controller( 'BasicController', ['$scope', 'Messages', function($scope, Messages) {

    // Sent Indicator
    $scope.status = "";

    // Keep an Array of Messages
    $scope.messages = [];

    $scope.color = "red";

    //$scope.me = {name: sillyname()};
    console.log($scope);

    $scope.add = function() {
        $('#whoami').text($scope.username === '' ? "Anonymous" : $scope.username);

        console.log($scope.username);
        if($scope.username === ''){
           $scope.me = {name: "Anonymous"};
           $scope.color = {color: randcolor()};
        } else {
            $scope.me = {name: $scope.username};
            $scope.color = {color: randcolor()};
        }



        console.log($scope);
        // Set User Data
        Messages.user($scope.me);
        Messages.user($scope.color);

    }

    // Set User Data
    //Messages.user($scope.me);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Get Received Messages and Add it to Messages Array.
    // This will automatically update the view.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var chatmessages = document.querySelector(".chat-messages");

    Messages.receive(function(msg) {
        
        $scope.messages.push(msg);
    
        setTimeout(function() {
            chatmessages.scrollTop = chatmessages.scrollHeight;
        }, 10);

    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Send Messages
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $scope.send = function() {

        Messages.send({data: $scope.textbox});
        
        $scope.status = "sending";
        $scope.textbox = "";

        setTimeout(function() { 
            $scope.status = "" 
        }, 1200 );

    };

} ] );
