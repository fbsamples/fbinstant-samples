/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const request = require('request');
const fs = require('fs');
const open = require('open');

module.exports = function (gulp, config, commandLineArguments) {
  /*
    * `gulp upload`
    * Compresses the game into a .zip archive and uploads it to the Developer
    * website
    *
    */
  gulp.task(
    'upload',
    ['clean', 'common', 'make', 'replace-sdk', 'archive'],
    function () {
      upload(config.archivesFolder, commandLineArguments.zip)
        .then(function () {
          console.log('Success');
        })
        .catch(function (error) {
          console.log('Failure. ' + error);
        });
  });

  /*
    * Attempts to upload archive to the Application's web hosting
    */
  const upload = function (archivesFolder, filename) {
    return new Promise(function (resolve, reject) {
      console.log('Uploading archive: ' + archivesFolder + '/' + filename);
      request.post({
        url: 'https://graph-video.facebook.com/' + config.FB_appId + '/assets',
        formData: {
          'access_token': config.FB_uploadAccessToken,
          'type': 'BUNDLE',
          'comment': 'Uploaded via gulp task',
          'asset': {
            value: fs.createReadStream(config.archivesFolder + '/' + filename),
            options: {
              filename: filename,
              contentType: 'application/octet-stream'
            }
          }
        }
      }, function (error, response, body) {
        if (error || !body) reject(error);
        try {
          var jsonResponse = JSON.parse(response.body);
          if (jsonResponse.success) {
            const openUrl =
              'https://developers.facebook.com/apps/' +
              config.FB_appId +
              '/instant-games/hosting/';

            console.log('Bundle uploaded via the graph API');
            console.log('Don\'t forget you need to publish the build');
            console.log('Opening developer dashboard...');
            open(openUrl);
            resolve();
          } else {
            reject(new Error('Unexpected API response: ' + response.body));
          }
        } catch (e) {
          reject(new Error('Upload failed. ' + e.message));
        }
      });
    });
  };
};
