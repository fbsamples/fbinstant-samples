/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

window.backendClient = function(backendUrl) {
  this.request = function(url, method, params) {
    return new Promise(function(resolve, reject) {
      const xmlhttp = new window.XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          const json = JSON.parse(xmlhttp.responseText);
          if (json.success) {
            resolve(json);
          } else {
            reject(json.error);
          }
        }
      };
      xmlhttp.onerror = function(err) {
        reject(err);
      };
      xmlhttp.open(method, url, true);
      xmlhttp.setRequestHeader('Content-Type', 'application/json');
      xmlhttp.send(JSON.stringify(params));
    });
  };

  this.save = function(contextId, player, signature) {
    const url = backendUrl + '/save-match';
    const method = 'POST';
    const payload = {
      'contextId': contextId,
      'signature': signature,
      'player': player
    };
    return this.request(url, method, payload);
  };

  this.load = function(signature) {
    const url = backendUrl + '/get-match';
    const method = 'POST';
    const payload = {'signature': signature};
    return this.request(url, method, payload);
  };
};
