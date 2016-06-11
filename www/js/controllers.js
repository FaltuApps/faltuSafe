angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope, FaltuList) {
        $scope.playlists = FaltuList.playlists;
    })
    .controller('PlaylistCtrl', function($scope, $stateParams, FaltuList, $ionicModal) {

        $ionicModal.fromTemplateUrl('templates/addNew.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.addNewModal = modal;
        });

        // Triggered in the add new modal to close it
        $scope.closeAddNew = function() {
            $scope.addNewModal.hide();
        };

        // Open the add new modal
        $scope.openAddNew = function() {
            $scope.addNewModal.show();
        };



        var playlistName = function() {
            for (var i = 0; i < FaltuList.playlists.length; i++) {
                if (FaltuList.playlists[i].id == ($stateParams.playlistId)) {

                    $scope.title = FaltuList.playlists[i].title;
                    break;
                };
            };
        }

        var init = function() {

            playlistName()

        }

        init();

    }).service('FaltuList', ['$stateParams', function($stateParams) {
        var self = this;
        self.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];



    }]);
