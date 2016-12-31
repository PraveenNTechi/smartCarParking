angular
  .module('starter.beaconServices', [])
  .factory('beacon', function ($rootScope) {

      var eventTypes = {
          'CLRegionStateInside': 'Enter',
          'CLRegionStateOutside': 'Exit'
      };

      return {

          initialise: function () {
              // Request permission from user to access location info.
              window.cordova.plugins.locationManager.requestAlwaysAuthorization();

              var delegate = new window.cordova.plugins.locationManager.Delegate();
              delegate.didDetermineStateForRegion = onDidDetermineStateForRegion;
              delegate.didStartMonitoringForRegion = onDidStartMonitoringForRegion;
              delegate.didRangeBeaconsInRegion = onDidRangeBeaconsInRegion;
              cordova.plugins.locationManager.setDelegate(delegate);

              initialiseBeaconRegions();
          }
      }

      /* PRIVATE METHODS */

      function onDidStartMonitoringForRegion(pluginResult) {
          console.log("Monitoring for Region");
      };

      function onDidRangeBeaconsInRegion(pluginResult) {
          console.log("Ranging region");
      };

      function onDidDetermineStateForRegion(pluginResult) {
          var event = pluginResult;
          switch (pluginResult.state) {
              case "CLRegionStateInside":
                  processEvent(event);
                  break;
              case "CLRegionStateOutside":
                  processEvent(event);
                  break;
          }
      };

      function processEvent(event) {
          var beaconEvent = {
              eventType: eventTypes[event.state],
              beaconName: event.region.identifier
          }
          $rootScope.$broadcast("beaconEventRecieved", { event: beaconEvent });
      }


      /*
      {
              identifier: "Praveen's beacon",
              uuid: "2f234454-cf6d-4a0f-adf2-f4911b000000",
              minor: "1",
              major: "1",
          },
          {
              identifier: "Deepak's beacon",
              uuid: "de9f43d6-9eb5-4f30-967c-930779e8c111",
              minor: "1",
              major: "1",
          }
      */
      function initialiseBeaconRegions() {
          var beacons = [{
              identifier: "Praveen's beacon",
              uuid: "2f234454-cf6d-4a0f-adf2-f4911b000000",
              minor: "1",
              major: "1",
          },
          {
              identifier: "Deepak's beacon",
              uuid: "de9f43d6-9eb5-4f30-967c-930779e8c111",
              minor: "1",
              major: "1",
          },
          {
              identifier: "First beacon",
              uuid: "b9407f30-f5f8-466e-aff9-25556b57fe6d",
              minor: "49940",
              major: "13952",
          },
          {
              identifier: "Second beacon",
              uuid: "b9407f30-f5f8-466e-aff9-25556b57fe6d",
              minor: "55010",
              major: "17733",
          },
          {
              identifier: "Third beacon",
              uuid: "b9407f30-f5f8-466e-aff9-25556b57fe6d",
              minor: "561",
              major: "29877",
          }];
          setupBeaconRegions(beacons);
      }

      function setupBeaconRegions(beaconRegions) {
          for (var i = 0; i < beaconRegions.length; i++) {
              var beacon = beaconRegions[i];
              var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
                  beacon.identifier,
                  beacon.uuid
                  , beacon.major
                  , beacon.minor
                  );
              //
              startMonitoringBeaconRegion(beaconRegion);
          }
      }

      function startMonitoringBeaconRegion(beaconRegion) {
          cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
            .fail(console.error)
            .done();
      }

  });
