/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const htmlreplace = require('gulp-html-replace');

module.exports = function (gulp, config, commandLineArguments) {
  /*
    * `gulp replace-sdk`
    *  By default the demos reference the Mock version of the FBInsatnt SDK
    *  This task replaces it with the URL to the production SDK
    *  configured in config.sdkPath
    */

  gulp.task('replace-sdk', ['make'], function () {
    var sdkPath = config.sdkPath;
    if (commandLineArguments['_'].includes('run-mock')) {
      sdkPath = config.mockSdkPath;
    }
    return gulp.src(config.outputFolder + '/index.html')
      .pipe(htmlreplace({'js': sdkPath}))
      .pipe(gulp.dest(config.outputFolder));
  });
};
