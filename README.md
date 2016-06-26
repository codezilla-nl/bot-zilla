# Botzilla

## Overview
[CODEZILLA](http://www.codezilla.nl)'s slackbot

Based on [starter-node-bot](https://github.com/BeepBoopHQ/starter-node-bot)

## Usage

### Run locally
	npm install
	SLACK_TOKEN=<YOUR_SLACK_TOKEN> npm start

Things are looking good if the console prints something like:

    ** API CALL: https://slack.com/api/rtm.start
    ** BOT ID:  witty  ...attempting to connect to RTM!
    ** API CALL: https://slack.com/api/chat.postMessage

### Run locally in Docker
	docker build -t starter-node .`
	docker run --rm -it -e SLACK_TOKEN=<YOUR SLACK API TOKEN> starter-node

## Acknowledgements

This code uses the awesome [Botkit](https://github.com/howdyai/botkit) npm module by the fine folks at Howdy.ai.

## License

See the [LICENSE](LICENSE.md) file (MIT).

