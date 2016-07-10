angular.module('starter.controllers', ['ngCordova'])

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

    $scope.update = function() {
        $scope.bank = $scope.myData.bank.name

    }
        $scope.banks = FaltuList.banks;
    
        $scope.addNewProcessing = false;
        $scope.myData = {
            title: '',
            detail: '',
            bank:''
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

        $scope.addNew = function(data) {

            if (!$scope.addNewProcessing && data.title != "" && data.detail != "" && data.bank != "") {
                $scope.addNewProcessing = true;
                FaltuList.addNew(data);
                $scope.closeAddNew();
                $scope.myData.title = '';
                $scope.myData.detail = '';
                $scope.myData.bank = '';
            };

            $scope.addNewProcessing = false;
        }

        $scope.deleteItem = function (id) {
            for(var i = 0; i < FaltuList.playlists.length; i++ ){
                if (FaltuList.playlists[i].id == id){

                    FaltuList.playlists.splice(i, 1);
                    break;
                }
            }
          localStorage.setItem('playlists', angular.toJson(FaltuList.playlists));
        }


    })
    .controller('PlaylistCtrl', function($scope, $stateParams, FaltuList, $ionicModal, $cordovaSocialSharing) {
 
        $scope.banks = FaltuList.banks;
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
        $scope.openEdit = function(data) {


            $scope.editModal.show();
            $scope.myData = data;
        };

        $scope.save = function(data) {

            $scope.addNewProcessing = true;
            FaltuList.edit(data, $stateParams.playlistId)
            $scope.closeEdit();
            $scope.myData = data;

            $scope.addNewProcessing = false;
        }


        var playlistName = function() {
            for (var i = 0; i < FaltuList.playlists.length; i++) {
                if (FaltuList.playlists[i].id == ($stateParams.playlistId)) {

                    $scope.myData = FaltuList.playlists[i];

                    break;
                };
            };
        }
        var init = function() {

            playlistName()

        }

        init();

        var message = "Name: " +$scope.title + " Details: " + $scope.detail;

        $scope.socialShare = function () {

            window.plugins.socialsharing.share(message, null, null, null);
        }


    }).service('FaltuList', ['$stateParams', function($stateParams) {
        var self = this;
        var data = angular.fromJson(localStorage.getItem('playlists'));
        self.playlists = data == null ? [] : data;

        self.banks = [{
            name: 'HDFC',
            img: 'img/hdfc.png',
            bid: 01
        },{
            name: 'YES BANK',
            img: 'img/yes.png',
            bid:02
        },{
            name: 'PUNJAB NATIONAL BANK',
            img: 'img/pnb.png',
            bid:03
        }];

        var uid = function (){
            var uniqueId
            if(localStorage.getItem('uid')== null){
                localStorage.setItem('uid', 0)
                uniqueId = localStorage.getItem('uid')
            }else{

                uniqueId = parseInt(localStorage.getItem('uid')) + 1
                localStorage.setItem('uid', uniqueId)
            }

            return uniqueId
        }

        self.addNew = function(data) {


            self.playlists.push({ title: data.title, detail: data.detail, bank: data.bank, id: uid() });

            localStorage.setItem('playlists', angular.toJson(self.playlists));


        }

        self.remove = function(id, pageId) {
            for (var i = 0; i < self.playlists.length; i++) {
                if (self.playlists[i].id = pageId) {
                    self.playlists.splice(self.playlists[i],1)
                    break;
                }
            }
            localStorage.setItem('playlists', angular.toJson(self.playlists));
        }
        self.edit = function (data) {

             for(var i = 0; i < self.playlists.length; i++){
                 if(self.playlists[i].id = data.id){
                     self.playlists[i] = data;
                     break;
                 }
             }
            localStorage.setItem('playlists', angular.toJson(self.playlists));
        }

    }]);
