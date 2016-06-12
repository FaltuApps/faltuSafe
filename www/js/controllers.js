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

.controller('PlaylistsCtrl', function($scope, FaltuList, $ionicModal) {

        $scope.playlists = FaltuList.playlists;

        $scope.addNewProcessing = false;
        $scope.myData = {
            title: '',
            detail: ''
        }

        // $ionicModal.fromTemplateUrl('templates/addNew.html', {
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope
        }).then(function(popup) {
            $scope.addNewModal = popup;
        });

        // Triggered in the add new modal to close it
        $scope.closeAddNew = function() {
            $scope.addNewModal.hide();
        };

        // Open the add new modal
        $scope.openAddNew = function() {
            $scope.addNewModal.show();
        };

        $scope.addNew = function(title, detail) {

            if (!$scope.addNewProcessing && title != "" && detail != "") {
                $scope.addNewProcessing = true;
                FaltuList.addNew(title, detail)
                $scope.closeAddNew();
                $scope.myData.title = '';
                $scope.myData.detail = '';
            };

            $scope.addNewProcessing = false;
        }

        $scope.deleteItem = function (id) {
          FaltuList.playlists.splice(id, 1);
          localStorage.setItem('playlists', angular.toJson(FaltuList.playlists));
        }


    })
    .controller('PlaylistCtrl', function($scope, $stateParams, FaltuList, $ionicModal) {
        $scope.myData = {
            title: '',
            detail: ''
        }

        /*==================================
        =            Edit modal            =
        ==================================*/
        /*=====  End of Edit modal  ======*/
        // $ionicModal.fromTemplateUrl('templates/addNew.html', {
        $ionicModal.fromTemplateUrl('edit-modal.html', {
            scope: $scope
        }).then(function(editPopup) {
            $scope.editModal = editPopup;
        });

        // Triggered in the add new modal to close it
        $scope.closeEdit = function() {
            $scope.editModal.hide();
        };

        // Open the add new modal
        $scope.openEdit = function(title, detail) {


            $scope.editModal.show();
            $scope.myData.title = title;
            $scope.myData.detail = detail;
        };

        $scope.save = function(title, detail) {

            $scope.addNewProcessing = true;
            FaltuList.edit(title, detail, $scope.id, $stateParams.playlistId)
            $scope.closeEdit();
            $scope.title = title;
            $scope.detail = detail;
            $scope.addNewProcessing = false;
        }


        var playlistName = function() {
            for (var i = 0; i < FaltuList.playlists.length; i++) {
                if (FaltuList.playlists[i].id == ($stateParams.playlistId)) {

                    $scope.title = FaltuList.playlists[i].title;
                    $scope.detail = FaltuList.playlists[i].detail;
                    $scope.id = FaltuList.playlists[i].id;
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
        var data = angular.fromJson(localStorage.getItem('playlists'));
        self.playlists = data == null ? [] : data;

        self.addNew = function(title, detail) {

            self.playlists.push({ title: title, detail: detail, id: self.playlists.length + 1 });

            localStorage.setItem('playlists', angular.toJson(self.playlists))
        }

        self.remove = function(id, pageId) {
            for (var i = 0; i < self.playlists.length; i++) {
                if (self.playlists[i].id = pageId) {
                    self.playlists.splice(self.playlists[i],1)
                    break;
                };
            };
            localStorage.setItem('playlists', angular.toJson(self.playlists));
        }
        self.edit = function (title, detail, id, pageId) {
            
            self.remove(id, pageId);
            self.addNew(title,detail);

        }

    }]);
