/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

window.Display = {
  message: function(message) {
    $('#display-message').html(message);
    $('#display-success').empty();
    $('#display-error').empty();
  },

  success: function(message) {
    $('#display-message').empty();
    $('#display-success').html(message);
    $('#display-error').empty();
  },

  error: function(message) {
    $('#display-message').empty();
    $('#display-success').empty();
    $('#display-error').html(message);
  },

  clear: function() {
    $('#display-message').empty();
    $('#display-success').empty();
    $('#display-error').empty();
  }
};
