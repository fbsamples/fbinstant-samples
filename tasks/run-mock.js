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
    * `gulp run-mock`
    *  Runs the game on http://localhost:8000/ using the Mock SDK
    *  It won't communicate with Facebook's services,
    *  but it speeds up local development.
    *  Use it for rapid prototyping and for developing game features that
    *  are not connected to the SDK.
    *
    */
  gulp.task(
    'run-mock',
    ['clean', 'common', 'make', 'replace-sdk'],
    function () {
      gulp.src(config.outputFolder)
        .pipe(webserver({
          open: true,
          port: 8000,
          liveReload: true
        }));
  });
};
