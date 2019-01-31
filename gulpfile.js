/**
Copyright (c) Facebook, Inc. and its affiliates.
All rights reserved.

This source code is licensed under the license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const gulp = require('gulp');
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');
const TASKS_FOLDER = 'tasks';
const config = require('./config.json');
const commandLineOptions = {
  string: ['project', 'zip'],
  default: {project: 'hello-world', 'zip': uuid() + '.zip'},
  alias: {'project': 'p', 'zip': 'z'}
};
var providedArguments = minimist(process.argv.slice(2), commandLineOptions);

function importAllTasks () {
  const taskNames = fs.readdirSync(TASKS_FOLDER).map(f => path.parse(f).name);
  taskNames.forEach(taskName =>
    require('./' + TASKS_FOLDER + '/' + taskName)(gulp, config, providedArguments)
  );
}

importAllTasks();
