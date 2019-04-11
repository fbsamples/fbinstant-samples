/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const MockConfig = {
  verbose: true
};

var FBInstant = {
  __mockState: {
    initialized: false,
    isMocked: true
  },
  player: {
    getName: function () {
      return FBInstant.__utils.returnUserData('Player 1');
    },
    getPhoto: function () {
      return FBInstant.__utils.returnUserData('./img/mock/profile.png');
    },
    getID: function () {
      return FBInstant.__utils.returnUserData('123456789');
    },
    getDataAsync: function (keys) {
      FBInstant.__utils.log('player.getDataAsync');
      return FBInstant.__utils.getFromLocalStorage('playerData', keys);
    },
    setDataAsync: function (obj) {
      FBInstant.__utils.log('player.setDataAsync');
      return FBInstant.__utils.writeToLocalStorage('playerData', obj);
    },
    getStatsAsync: function (keys) {
      FBInstant.__utils.log('player.getStatsAsync');
      return FBInstant.__utils.getFromLocalStorage('playerStats', keys);
    },
    setStatsAsync: function (obj) {
      FBInstant.__utils.log('player.setStatsAsync');
      return FBInstant.__utils.writeToLocalStorage('playerStats', obj);
    },
    incrementStatsAsync: function (obj) {
      return new Promise(function (resolve, reject) {
        FBInstant.__utils.getFromLocalStorage('playerStats', Object.keys(obj))
          .then(function (storedObject) {
            for (var key in storedObject) {
              storedObject[key] += obj[key];
            }
            FBInstant.__utils.writeToLocalStorage('playerStats', storedObject)
              .then(function () {
                resolve();
              });
          });
      });
    },
    flushDataAsync: function (obj) {
      return new Promise(function (resolve, reject) {
        FBInstant.__utils.log('player.flushDataAsync');
        resolve();
      });
    },
    getConnectedPlayersAsync: function () {
      return new Promise(function (resolve, reject) {
        var players = [];
        var initialized = FBInstant.__mockState.initialized;
        if (initialized) {
          players = [
            {
              getID: function () { return '42'; },
              getName: function () { return 'Friend 1'; },
              getPhoto: function () { return './img/mock/friend1.png'; }
            },
            {
              getID: function () { return '43'; },
              getName: function () { return 'Friend 2'; },
              getPhoto: function () { return './img/mock/friend2.png'; }
            },
            {
              getID: function () { return '44'; },
              getName: function () { return 'Friend 3'; },
              getPhoto: function () { return './img/mock/friend3.png'; }
            }
          ];
        } else {
          FBInstant.__utils.log(
            'getConnectedPlayersAsync',
            'Connected players not available before startGameAsync resolves');
        }
        FBInstant.__utils.log('getConnectedPlayersAsync', 'players: ', players);
        resolve(players);
      });
    },
    getSignedPlayerInfoAsync: function () {
      return new Promise(function (resolve, reject) {
        var signedPlayerInfo = {
          getSignature: function () {
            return 'this_is_not_a_real_signature.'+
            'signed_player_info_not_supported_in_mock_sdk';
          },
          getPlayerID: function () { return 123456789; }
        };
        resolve(signedPlayerInfo);
      });
    }
  },
  context: {
    getID: function () {
      // return 1234;
      return null;
    },
    chooseAsync: function () {
      return new Promise(function (resolve, reject) {
        FBInstant.__utils.log('context.chooseAsync');
        FBInstant.__utils.createAlert(
          {
            message: 'Choosing a new context',
            cta: 'Play!'
          },
          resolve
        );
      });
    },
    switchAsync: function (contextId) {
      return new Promise(function (resolve, reject) {
        FBInstant.__utils.log('context.switchAsync');
        FBInstant.__utils.createAlert(
          {
            message: 'Switching to a new context (' + contextId + ')',
            cta: 'Play!'
          },
          resolve
        );
      });
    },
    createAsync: function (userId) {
      return new Promise(function (resolve, reject) {
        FBInstant.__utils.log('context.createAsync');
        FBInstant.__utils.createAlert(
          {
            message: 'Switching to a conversation with player ' + userId,
            cta: 'Play!'
          },
          resolve
        );
      });
    },
    getType: function () {
      return FBInstant.__utils.returnAndLog('SOLO');
    },
    isSizeBetween: function (minSize, maxSize) {
      return FBInstant.__utils.returnAndLog(true);
    },
    getPlayersAsync: function () {
      return new Promise(function (resolve, reject) {
        var players = [];
        var initialized = FBInstant.__mockState.initialized;
        if (initialized) {
          players = [
            {
              getID: function () { return '42'; },
              getName: function () { return 'Friend 1'; },
              getPhoto: function () { return './img/mock/friend1.png'; }
            },
            {
              getID: function () { return '43'; },
              getName: function () { return 'Friend 2'; },
              getPhoto: function () { return './img/mock/friend2.png'; }
            },
            {
              getID: function () { return '44'; },
              getName: function () { return 'Friend 3'; },
              getPhoto: function () { return './img/mock/friend3.png'; }
            }
          ];
        } else {
          FBInstant.__utils.log(
            'context.getPlayersAsync',
            'Connected players not available before startGameAsync resolves'
          );
        }
        FBInstant.__utils.log('context.getPlayersAsync', 'players: ', players);
        resolve(players);
      });
    }
  },

  getLocale: function () {
    return 'pt_BR';
  },

  initializeAsync: function () {
    return new Promise(function (resolve, reject) {
      // Inject mock css
      var stylesheet = document.createElement('link');
      stylesheet.href = 'css/mock/mock.css';
      stylesheet.rel = 'stylesheet';
      stylesheet.type = 'text/css';
      document.head.appendChild(stylesheet);

      FBInstant.__utils.log('initializeAsync');
      resolve();
    });
  },

  setLoadingProgress: function (progress) {
    return new Promise(function (resolve, reject) {
      FBInstant.__utils.log('progress', progress, '%');
      resolve();
    });
  },

  startGameAsync: function () {
    return new Promise(function (resolve, reject) {
      FBInstant.__utils.log('startGameAsync', 'Showing game start dialog');
      FBInstant.__utils.createAlert(
        {
          message: 'Game has finished loading. <br /> Play now?',
          cta: 'Play!'
        },
        function () {
          FBInstant.__mockState.initialized = true;
          resolve();
        });
    });
  },

  quit: function () {
    FBInstant.__utils.log('QUIT was called. At this point the game will exit');
  },

  updateAsync: function (config) {
    return new Promise(function (resolve, reject) {
      FBInstant.__utils.log('updateAsync');
      if (config.image) {
        resolve();
      } else {
        reject(new Error('updateAsync failed: no image'));
      }
    });
  },

  getEntryPointData: function () {
    var queryString = FBInstant.__utils.getQueryString();
    FBInstant.__utils.log('getEntryPointData',
      'query string: ', queryString,
      'entry point data: ', queryString.entryPointData);

    if (queryString.entryPointData) {
      return JSON.parse(queryString.entryPointData[0]);
    } else {
      FBInstant.__utils.log(
        'While using the mock SDK, set your entryPointData in the URL',
        'example: http://localhost:8080/?entryPointData={a:1,b:2,c:3}');
    }
  },

  getEntryPointAsync: function () {
    return new Promise(function (resolve, reject) {
      resolve('admin_message');
    });
  },

  setSessionData: function (object) {
    FBInstant.log(
      'setSessionData',
      'Object to be persisted',
      object,
      '(Please note, while using the mock SDK, '+
      'setSessionData will have no effect.)'
    );
  },

  getPlatform: function () {
    return 'WEB';
  },

  getSDKVersion: function () {
    return '5.0';
  },

  getSupportedAPIs: function () {
    var supportedAPIs = [];
    for (var prop in FBInstant) {
      supportedAPIs.push(prop);
    }
    for (var playerProp in FBInstant.player) {
      supportedAPIs.push('player.' + playerProp);
    }
    for (var contextProp in FBInstant.context) {
      supportedAPIs.push('context.' + contextProp);
    }
    for (var paymentsProp in FBInstant.payments) {
      supportedAPIs.push('payments.' + paymentsProp);
    }
    return supportedAPIs;
  },

  shareAsync: function (options) {
    var message = 'Share Intent: ' + options.intent;
    message += '<br />';
    message += 'Share text: ' + options.text;
    message += '<br />';
    message += 'Share payload: ' + JSON.stringify(options.data);

    return new Promise(function (resolve, reject) {
      FBInstant.__utils.createAlert(
        {
          title: 'Shared content',
          message: message,
          image: options.image,
          cta: 'Close'
        },
        resolve
      );
    });
  },

  getLeaderboardAsync: function (name) {
    var leaderboard = {
      getName: function () {
        return name;
      },
      getContextID: function () {
        return 1234;
      },
      getEntryCountAsync: function () {
        return Promise.resolve(3);
      },
      setScoreAsync: function (score, extraData) {
        var leaderboardEntry = FBInstant.__utils.createLeaderboardEntry(
          score,
          3,
          {name: 'Player 1', photo: './img/mock/profile.png', id: 123456789},
          extraData
        );
        return Promise.resolve(leaderboardEntry);
      },
      getPlayerEntryAsync: function () {
        var leaderboardEntry = FBInstant.__utils.createLeaderboardEntry(
          42,
          3,
          {name: 'Player 1', photo: './img/mock/profile.png', id: 123456789}
        );
        return Promise.resolve(leaderboardEntry);
      },
      getEntriesAsync: function () {
        var entries = [
          FBInstant.__utils.createLeaderboardEntry(
            42,
            3,
            {
              name: 'Connected Player 1',
              photo: './img/mock/friend1.png',
              id: 123456789
            },
            null
          ),
          FBInstant.__utils.createLeaderboardEntry(
            43,
            2,
            {
              name: 'Unconneced Player 1',
              photo: './img/mock/profile.png',
              id: 43
            },
            null
          ),
          FBInstant.__utils.createLeaderboardEntry(
            44,
            1,
            {
              name: 'Connected Player 2',
              photo: './img/mock/friend2.png',
              id: 44
            },
            null
          ),
          FBInstant.__utils.createLeaderboardEntry(
            44,
            4,
            {
              name: 'Unconneced Player 2',
              photo: './img/mock/profile.png',
              id: 44
            },
            null
          )
        ];
        return Promise.resolve(entries);
      },
      getConnectedPlayerEntriesAsync: function () {
        var entries = [
          FBInstant.__utils.createLeaderboardEntry(
            42,
            3,
            {
              name: 'Connected Player 1',
              photo: './img/mock/friend1.png',
              id: 123456789
            },
            null
          ),
          FBInstant.__utils.createLeaderboardEntry(
            43,
            2,
            {
              name: 'Connected Player 2',
              photo: './img/mock/friend2.png',
              id: 43
            },
            null
          )
        ];
        return Promise.resolve(entries);
      }
    };

    return Promise.resolve(leaderboard);
  },

  switchGameAsync: function (appId) {
    return Promise.reject(
      new Error('FBInstant.switchAsync is not available in the Mocked SDK.')
    );
  },

  logEvent: function (eventName, value, parameters) {
    FBInstant.__utils.log('logEvent', eventName, value, parameters);
    return null;
  },

  onPause: function (callback) {
    window.onblur = function () {
      FBInstant.__utils.log('onPause', 'Interruption event triggered');
      callback();
    };
  },

  payments: {
    getCatalogAsync: function () {
      return Promise.resolve([
        {
          title: 'Dummy Product 1',
          productID: 'sku-dummy-1',
          description: 'This is a Dummy Product',
          imageURI: '',
          price: '0.99',
          priceCurrencyCode: 'USD'
        },
        {
          title: 'Dummy Product 2',
          productID: 'sku-dummy-2',
          description: 'This is a Dummy Product',
          imageURI: '',
          price: '1.99',
          priceCurrencyCode: 'USD'
        },
        {
          title: 'Dummy Product 3',
          productID: 'sku-dummy-3',
          description: 'This is a Dummy Product',
          imageURI: '',
          price: '2.99',
          priceCurrencyCode: 'USD'
        }
      ]);
    },
    purchaseAsync: function (options) {
      return Promise.resolve(
        {
          productID: options.productID,
          purchaseToken: 'dummy_token',
          developerPayload: options.developerPayload
        }
      );
    }
  },
  __utils: {
    createAlert: function (options, callback) {
      var alertDiv = document.createElement('div');
      alertDiv.className = 'mockDialog';

      var title = document.createElement('h3');
      title.innerHTML = '[FBinstant Mock SDK]';
      title.innerHTML += ' ' + (options.title || '');
      alertDiv.appendChild(title);

      if (options.message) {
        var paragraph = document.createElement('p');
        paragraph.innerHTML = options.message;
        alertDiv.appendChild(paragraph);
      }

      if (options.image) {
        var image = document.createElement('img');
        image.src = options.image;
        alertDiv.appendChild(image);
      }

      var button = document.createElement('input');
      button.type = 'button';
      button.value = options.cta || 'Close';
      alertDiv.appendChild(button);

      button.onclick = function () {
        document.body.removeChild(alertDiv);
        callback();
      };

      document.body.appendChild(alertDiv);
    },

    log: function () {
      if (MockConfig.verbose) {
        var args = [];
        args.push('[FBInstant Mock]:');
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        console.log.apply(console, args);
      }
    },

    getQueryString: function () {
      var qd = {};
      if (window.location.search) {
        window.location.search.substr(1).split('&').forEach(function (item) {
          var s = item.split('=');
          var k = s[0];
          var v = s[1] && decodeURIComponent(s[1]);
          (qd[k] = qd[k] || []).push(v);
        });
      }
      return qd;
    },

    returnAndLog: function (value) {
      var caller = FBInstant.__utils.returnAndLog.caller;
      if (caller) {
        FBInstant.__utils.log(caller.name, value);
      } else {
        FBInstant.__utils.log(value);
      }
      return value;
    },

    returnUserData: function (value) {
      var initialized = FBInstant.__mockState.initialized;
      if (initialized) {
        return FBInstant.__utils.returnAndLog(value);
      } else {
        FBInstant.__utils.log(
          'User Data is not available until startGameAsync has resolved'
        );
        return null;
      }
    },

    getFromLocalStorage: function (store, keys) {
      return new Promise(function (resolve, reject) {
        var data = window.localStorage.getItem(store);
        var response = {};
        if (data) {
          data = JSON.parse(data);
          keys.forEach(function (key) {
            if (data[key] !== 'undefined') {
              response[key] = data[key];
            }
          });
        }
        FBInstant.__utils.log(response);
        resolve(response);
      });
    },

    writeToLocalStorage: function (store, obj) {
      return new Promise(function (resolve, reject) {
        FBInstant.__utils.log(JSON.stringify(obj));
        window.localStorage.setItem(store, JSON.stringify(obj));
        resolve();
      });
    },

    createLeaderboardEntry: function (score, rank, player, extraData) {
      return {
        getScore: function () { return score; },
        getFormattedScore: function () { return score; },
        getTimeStamp: function () { return Date.now(); },
        getRank: function () { return rank; },
        getExtraData: function () { return extraData; },
        getPlayer: function () {
          return {
            getName: function () { return player.name; },
            getPhoto: function () { return player.photo; },
            getID: function () { return player.id; }
          };
        }
      };
    }
  }
};
