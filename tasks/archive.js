/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const zip = require('gulp-zip');

module.exports = function (gulp, config, commandLineArguments) {
  /*
    * `gulp archive`
    * Compresses the game into a .zip archive and stores it
    * on config.archivesFolder
    *
    */
  gulp.task('archive', ['clean', 'common', 'make', 'replace-sdk'], function () {
    const filename = commandLineArguments.zip;

    return gulp.src([
      config.outputFolder + '/**',
      '!' + config.outputFolder + '/archives/**',
      '!**.zip'
    ])
      .pipe(zip(filename))
      .pipe(gulp.dest(config.archivesFolder))
      .on('end', function () {
        console.log('ZIP archive created');
      });
  });
};
