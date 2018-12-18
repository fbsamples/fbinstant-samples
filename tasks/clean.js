/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const clean = require('gulp-rimraf');

module.exports = function (gulp, config, commandLineArguments) {
  /*
    * `gulp clean`
    *  Cleans the output folder, deleting all its contents
    */
  gulp.task('clean', function () {
    return gulp.src(config.outputFolder + '/*', {read: false})
      .pipe(clean());
  });
};
