/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var request = require('request');

module.exports = function (app) {
  //
  // GET /bot
  //
  app.get('/bot', function (request, response) {
    if (request.query['hub.mode'] === 'subscribe' &&
        request.query['hub.verify_token'] === process.env.BOT_VERIFY_TOKEN) {
      console.log('Validating webhook');
      response.status(200).send(request.query['hub.challenge']);
    } else {
      console.error('Failed validation. Make sure the tokens match.');
      response.sendStatus(403);
    }
  });

  //
  // POST /bot
  //
  app.post('/bot', function (request, response) {
    var data = request.body;
    console.log('received bot webhook');
    // Make sure this is a page subscription
    if (data.object === 'page') {
      // Iterate over each entry - there may be multiple if batched
      data.entry.forEach(function (entry) {
        // Here you can obtain values about the webhook, such as:
        // var pageID = entry.id
        // var timeOfEvent = entry.time
        entry.messaging.forEach(function (event) {
          if (event.message) {
            receivedMessage(event);
          } else if (event.game_play) {
            receivedGameplay(event);
          } else {
            console.log('Webhook received unknown event: ', event);
          }
        });
      });
    }
    response.sendStatus(200);
  });

  //
  // Handle messages sent by player directly to the game bot here
  //
  function receivedMessage (event) {

  }

  //
  // Handle game_play (when player closes game) events here.
  //
  function receivedGameplay (event) {
    // Page-scoped ID of the bot user
    var senderId = event.sender.id;

    // FBInstant player ID:  event.game_play.player_id
    // FBInstant context ID: event.game_play.context_id
    // User's Page-scoped ID: event.sender.id

    // Check for payload
    if (event.game_play.payload) {
      //
      // The variable payload here contains data set by
      // FBInstant.setSessionData()
      //
      var payload = JSON.parse(event.game_play.payload);

      // In this example, the bot is just "echoing" the message received
      // immediately. In your game, you'll want to delay the bot messages
      // to remind the user to play 1, 3, 7 days after game play, for example.
      sendMessage(senderId, null, 'Want to play again?', 'Play now!', payload);
    }
  }

  //
  // Send bot message
  //
  // player (string) : Page-scoped ID of the message recipient
  // context (string): FBInstant context ID. Opens message in a specific context
  // message (string): Message text
  // cta (string): Button text
  // payload (object): Custom data that will be sent to game session
  //
  function sendMessage (player, context, message, cta, payload) {
    var button = {
      type: 'game_play',
      title: cta
    };

    if (context) {
      button.context = context;
    }
    if (payload) {
      button.payload = JSON.stringify(payload);
    }
    var messageData = {
      recipient: {
        id: player
      },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [
              {
                title: message,
                buttons: [button]
              }
            ]
          }
        }
      }
    };

    callSendAPI(messageData);
  }

  function callSendAPI (messageData) {
    var graphApiUrl = 'https://graph.facebook.com/me/messages?access_token=' + process.env.PAGE_ACCESS_TOKEN;
    request({
      url: graphApiUrl,
      method: 'POST',
      json: true,
      body: messageData
    }, function (error, response, body) {
      console.error(
        'Send api returned error', error,
        'Status code', response.statusCode,
        'Body', body
      );
    });
  }
};
