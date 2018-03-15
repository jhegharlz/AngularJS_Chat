'use strict';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Chat App Module
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var basicChat = angular.module( 'BasicChat', ['chat', 'ui.router'] ).filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);

angular.module('chat').constant( 'config', {
    rltm: {
        service: 'pubnub', 
        config: {
            publishKey: 'pub-c-1fc5ffb2-88c0-43cf-b368-d8ced614ec72',
            subscribeKey: 'sub-c-b19244be-ba5b-11e7-a150-5e56acef67bd'
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

setTimeout(function() {

$('.sent-message').hover(
function() {
$(this).find('.closeSign').show();
}, function() {
$(this).find('.closeSign').hide();
}
);

$('.closeSign').on('click', function() {
$(this).parent().hide();
// or any other stuff as you want
});
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
        }, 1200);

    };

} ] );

  basicChat.run(function($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          console.log('Changed state to: ' + toState);
      });
    
      if(!LoginService.isAuthenticated()) {
        $state.transitionTo('login');
      }
  });
  
  basicChat.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'login.html',
        controller : 'LoginController'
      })
      .state('home', {
        url : '/home',
        templateUrl : 'home.html',
        controller : 'HomeController'
      });
  }]);

  basicChat.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "AngularJS Login Sample";
    
    $scope.formSubmit = function() {
      if(LoginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('home');
      } else {
        $scope.error = "Incorrect username/password !";
      }   
    };
    
  });
  
  basicChat.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "AngularJS Login Sample";
    
  });
  
  basicChat.factory('LoginService', function() {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        isAuthenticated = username === admin && password === pass;
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };
    
  });
$( ".sent-indicator" ).on("focusout" , function () {
$('input[ng-model="chat.textbox"]').val("");
});
