angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'PG 7',
    lastText: 'Total availability',
    face: 'img/pg7.png'
  }, {
    id: 1,
    name: 'PG 10',
    lastText: 'Total availability',
    face: 'img/pg10.png'
  }, {
    id: 2,
    name: 'PG 12',
    lastText: 'Total availability',
    face: 'img/pg12.jpg'
  }, {
    id: 3,
    name: 'PG 9',
    lastText: 'Total availability',
    face: 'img/pg9.png'
  }, {
    id: 4,
    name: 'PG 5.2',
    lastText: 'Total availability',
    face: 'img/pg5.2.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

angular.module('starter.sessions', [])
.factory('SessionScopes', function ($rootScope) {
    var mem = {};
    return {
        store: function (key, value) {
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
});

angular.module('starter.firebaseservice', [])
.factory('fireBaseData', function ($firebase) {
    var ref = new Firebase("https://carparkingdb.firebaseio.com/CarDashBoardDetails");
    var refhistory = new Firebase("https://carparkingdb.firebaseio.com/CustomerParkDetails");
    return {
        ref: function () {
            return ref;
        },
        removestatus: function (statusid) {
            ref.splice(ref.indexOf(statusid), 1);
        },
        getstatus: function (statusid) {
            for (var i = 0; i < ref.length; i++) {
                if (ref[i].id === statusid) {
                    return ref[i];
                }
            }
            return null;
        },
        refhistory: function () {
        return refhistory;
    }
    };

   
});









