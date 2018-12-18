/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const webserver = require('gulp-webserver');

module.exports = function (gulp, config, commandLineArguments) {
  /*
    * `gulp run-dist`
    * Runs an SSL webserver with the game on https://localhost:8080
    * Replaces the reference from the mock SDK with the production SDK
    * Opens the browser in the embedded player
    * (developers.facebook.com/docs/games/instant-games/test-publish-share)
    * This means all FBInstant functions will be
    * actually executed by Facebook's services.
    * This also means that the game's initialization depends
    * on responses from the live SDK, so use this to test social hooks,
    * context updates, leaderboards, etc.
    *
    * Not recommended for rapid prototyping and iteration on the features.
    * For this, see `run-mock`
    *
    */
  gulp.task(
    'run-dist',
    ['clean', 'common', 'make', 'replace-sdk'],
    function () {
      const openUrl =
        'https://www.facebook.com/embed/instantgames/' +
        config.FB_appId +
        '/player?game_url=https://localhost:8000';

      gulp.src(config.outputFolder)
        .pipe(webserver({
          https: true,
          port: 8000,
          open: openUrl
        }));
  });
};
