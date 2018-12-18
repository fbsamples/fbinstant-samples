/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(cors());

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

require('dotenv').config();
require('./db.js')(app);
require('./matches.js')(app);
