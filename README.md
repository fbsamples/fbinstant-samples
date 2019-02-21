# Instant Games Examples

This repository contains a collection of examples that show how to use the Facebook Instant Games SDK (FBInstant).
There is also an excellent page here (https://www.facebook.com/fbgaminghome/developers/get-started) that can help you get started with the Facebook Instant Games.

## Pre-requisites

1. [Install Node JS](https://nodejs.org/en/download/)
1. [Install Yarn](https://yarnpkg.com/en/docs/install)
1. Download or clone this repository

## Setup
1. Make sure that your Instant Game app is setup. For more information see [our Setup Guide](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup)
1. In the root folder of this repo, run
	```bash
	$ yarn install
	```
1. Copy or rename the file `config.template.json` to `config.json` and replace the information needed from your app.
	```json
	{
		"FB_appId":"<YOUR_APP_ID_HERE>",
		"FB_uploadAccessToken": "<YOUR_UPLOAD_TOKEN_HERE>",
		...
	}
	```
Your app ID can be found at the landing page of your app's dashboard.

Your upload access token can be found on the Instant Games -> Web Hosting tab of your app's dashboard.

## Client-side examples:
Client-side examples are contained in the **`examples/`** folder:
* **`ads`**: Shows how to display Rewarded Videos and Interstitial Ads
* **`bots`**: Shows how to send data from the game client to a bot and vice-versa
* **`cross-promo`**: Shows how to prompt the player to switch to another one of your Instant Games
* **`hello-world`**: An empty project with the boilerplate in place to get you up and running quickly
* **`in-app-purchases`**: Shows how to use payments inside of your Instant Game
* **`leaderboards`**: Shows how to use leaderboards (global and context-specific) in your Instant Game
* **`secure-backend`**: Shows how to validate data in your backend to make sure they are authentically coming from your Instant Game, to prevent cheating
* **`sending-messages`**: Shows how to show messages from your game to the current context (conversation)
* **`shortcuts`**: Shows how to create a mobile home shortcut to the game

### Running Client-Side examples:

In order to run these examples you will need to use one of these tasks:
* **`run-mock`**: Runs on localhost against a mocked version of the SDK
* **`mock`**: It is the same as **`run-mock`**. Runs on localhost against a mocked version of the SDK
* **`run-dist`**: Runs on localhost against the production SDK
* **`dist`**: It is the same as **`run-dist`**. Runs on localhost against the production SDK
* **`upload`**: Package and upload your game in order to test on mobile

Below are some examples of how to execute these tasks:

```bash
$ yarn run-mock --project hello-world
```
Will run the **`hello-world`** project from localhost against a mocked version of the SDK (returns dummy data for every call). This way of running projects is especially useful for quickly iterating on local changes done to any of the projects.

```bash
$ yarn run-dist --project sending-messages
```
This will run the **`sending-messages`** project with HTTPS from localhost and embed it into [our embedded player](https://developers.facebook.com/docs/games/instant-games/test-publish-share) which allows you to connect to the latest version of the SDK. All data returned from the SDK will be authentic an updated. In order to use this option, you need to correctly set the `FB_appId` property on `config.json`.  If the app shows stuck in 0% loading, make sure to visit `https://localhost:8000` and follow the instructions on your browser trust the development certificates.

```bash
$ yarn upload --project ads
```
This will package and upload the **`ads`** example to Web Hosting. After that you can set the game to production mode in order to test it from the uploaded build - and not localhost. This option is especially useful since it allows you to test on mobile devices ([More information here](https://developers.facebook.com/docs/games/instant-games/test-publish-share))

## Server-side examples
Server-side examples are contained in the **`servers-examples/`** folder:
* **`nodejs-backend`**: It's a working backend for the `secure-backend` client demo, that shows how to perform server-side validations for client-signed calls from Instant Games.
* **`nodejs-bot`**: It's a working backend for the `bots` client demo, that shows how to send and receive structured data from a game client.

### Running server-side examples
Before running any of the server side examples, make sure to copy or rename the `template.env` into `.env` and provide the necessary information.


You can run any of the server-side examples above by running the following commands on terminal:
```
$ cd /server-examples/nodejs-backend
$ yarn install
 yarn install v1.7.0
 [1/4] Resolving packages...
 [2/4] Fetching packages...
 [3/4] Linking dependencies...
 [4/4] Building fresh packages...
 Done in 6.86s.
$ node index
 Node app is running on port 5000
```
From that moment on, your server-side code is running on `http://localhost:5000`. By changing the client-side code to point to that endpoint, you can test the full end-to-end flow locally.

Alternatively, you can host your backend code in a service such as [Glitch](https://glitch.com/) or [Heroku](https://www.heroku.com/)
> Note: for the **`nodejs-bot`** server-side demo, you will need to host your backend in an external server.([More information here](https://developers.facebook.com/docs/games/instant-games/getting-started/bot-setup))


## License

Copyright (c) Facebook, Inc. and its affiliates. All rights reserved.

The examples provided by Facebook are for non-commercial testing and evaluation
purposes only. Facebook reserves all rights not expressly granted.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
