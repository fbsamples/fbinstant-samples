/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = function (gulp, config, commandLineArguments) {
  /*
    * `gulp common`
    *  Copies the assets common to all examples into the output folder
    */
  gulp.task('common', ['clean'], function () {
    return gulp.src('common/**/*', { base: 'common' })
      .pipe(gulp.dest(config.outputFolder));
  });
};
