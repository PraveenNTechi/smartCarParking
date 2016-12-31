angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

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
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('DashCtrl', function ($scope, beacon, $ionicPopup, $timeout, $firebaseArray, fireBaseData, $rootScope) {
    $scope.events = [];
    $scope.divVisibility = false;

    var CarParkingStatusTime = {
        startDateTime: null,
        CarParkingStatus: false,
        endDateTime: null
    }
    $rootScope.CarParkingStatusDetails = CarParkingStatusTime;
    // beacon.initialise();
    //Emits when any beacons are found in near by region

    $scope.$on('beaconEventRecieved', function (event, args) {
        $scope.events.push(args.event);
        // $scope.beaconEnter = event
        if (args.event.eventType === "Enter") {
            $scope.divVisibility = true;

           

            // ADDED NEW 

            $rootScope.CarParkingStatusDetails = CarParkingStatusTime;

            //$scope.beaconId = args.event.beaconName;
            if (args.event.beaconName === "Second beacon") {
                // A confirm dialog
                // $scope.showConfirm = function (opts) {
             
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Car Parking slot',
                    template: 'Would you like to lock car parking slot?'
                });
                confirmPopup.then(function (res) {
                    if (res) {

                        //$rootScope.CarParkingStatus = true;

                        // $rootScope.endDate = enddatetime.getDate();
                        CarParkingStatusTime.startDateTime = new Date();
                        CarParkingStatusTime.CarParkingStatus = true;
                        CarParkingStatusTime.endDateTime = null;

                        
                        //}
                        //tEST uncomment
                        $rootScope.CarParkingStatusDetails = CarParkingStatusTime;

                        
                    } else {
                        console.log('You are not sure');
                    }
                });
                // };
            }
            else if (args.event.beaconName === "Third beacon") {
               
                var alertPopup = $ionicPopup.alert({
                    title: 'Exit- Car Parking Area',
                    template: 'Have a great day see you soon'

                });

                alertPopup.then(function (res) {
                    console.log('Have a great day');
                    CarParkingStatusTime.CarParkingStatus = false;
                    //$rootScope.CarParkingStatus = false;
                    CarParkingStatusTime.endDateTime = new Date();
                });
                //};
            }
            else if (args.event.beaconName === "First beacon") {
                // An alert dialog
                // $scope.showAlert = function (opts) {


                var alertPopup = $ionicPopup.alert({
                    title: 'Enter- Car parking Area',
                    template: 'Welcome !!'
                });
                alertPopup.then(function (res) {
                    console.log('Have a great day');

                    CarParkingStatusTime.CarParkingStatus = false;
                    CarParkingStatusTime.startDateTime = null;
                    CarParkingStatusTime.endDateTime = null;

                });
                // };
            }

        }
        else {
            $scope.divVisibility = false;
        }

        //Functionality to add once we are away from beacon
        // if ((args.event.eventType === "Exit" && args.event.beaconName === "Second beacon") ||
        if (args.event.eventType === "Enter" && args.event.beaconName === "Third beacon") {
            // CarParkingStatusTime.endDateTime = new Date();
            // $rootScope.CarParkingStatus = false;

            CarParkingStatusTime.CarParkingStatus = false;
            CarParkingStatusTime.endDateTime = new Date();

            //HERE WE CUSTOMER DETAILS TO FIREBASE ONCE THE CUSTOMER/CAR EXIT
            $scope.startDateTime = CarParkingStatusTime.startDateTime;
          

            CarParkingStatusTime.startDateTime = null;




        }



        //$scope.divVisibility = true;

        //document.getElementById('eleBeaconVisible').style.display = 'block';
        $scope.$apply();
    });
    $scope.query = {}
    $scope.queryBy = '$'
    $scope.dashboarddetails = $firebaseArray(fireBaseData.ref());



})


.controller('DashlistCtrl', function ($scope, $stateParams, $firebaseArray, fireBaseData, $rootScope) {
    //$scope.dashboarddetail = $firebaseArray(fireBaseData.ref());
    $scope.dashitemid = $stateParams.dashlistId;

    var TotalTime = {
        HH: null,
        MM: null,
        SS: null
    }
    $rootScope.TotalTime = TotalTime;
    // $scope.ValuesCheck = $rootScope.CarParkingStatus;
    //$scope.Isparked = $rootScope.CarParkingStatus;
    //$scope.dashitemvalue = function () {
    //console.log('test');
    //Scope.$on('lock-carparking', function (event, argsObj) {
    //    $scope.dashitemid = argsObj.dashlistId;
    //    // profileObj contains; name, country and email from emitted event
    //});

    $scope.dashitemValue = $stateParams.dashlistId == 'd01' ? 'Car Parking status'
             : $stateParams.dashlistId == 'd02' ? 'History'
            : $stateParams.dashlistId == 'd03' ? 'Profile Details'
            : $stateParams.dashlistId == 'd04' ? 'Offers'
            : $stateParams.dashlistId == 'd05' ? 'About Us' : 'Contact Us';
    // $scope.dashitemValue = "hello";
    // };
    $scope.dashitemid = $stateParams.dashlistId;

    $scope.divCurrentParking = true;
    $scope.divDashBoard = false;
    $scope.HH = 'HH';
    $scope.MM = 'MM';
    $scope.SS = 'SS';


    // $scope.parkingTime = new Date(); 
    $scope.parkingTime = $rootScope.CarParkingStatusDetails.startDateTime;
    var dateNow = new Date();
    //$scope.parkingTime = $rootScope.CarParkingStatus ? new Date() : 

    var countdownTimer = setInterval(function () {
        var pt = $scope.parkingTime;
        var dateNow = new Date();

        TotalTime.HH = $scope.HH;
        TotalTime.MM = $scope.MM;
        TotalTime.SS = $scope.SS;

        $rootScope.TotalTime = TotalTime;



        $scope.$apply();
    }, 1000);

     //$scope.dashitemid = fireBaseData.getstatus($stateParams.dashlistId);
});


