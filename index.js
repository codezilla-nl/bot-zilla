const Botkit = require('botkit');
const _ = require('lodash');

const utils = require('./utils');
const babble = require('./babble.json');

const token = process.env.SLACK_TOKEN;

var controller = Botkit.slackbot({
    // reconnect to Slack RTM when connection goes bad
    retry: Infinity,
    debug: false
});

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
    console.log('Starting in single-team mode');
    controller.spawn({
        token: token
    }).startRTM(function (err, bot, payload) {
        if (err) {
            throw new Error(err);
        }

        console.log('Connected to Slack RTM');
    });
// Otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
    console.log('Starting in Beep Boop multi-team mode');
    require('beepboop-botkit').start(controller, {debug: true});
}

controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, "RRRAAAAHHHWWRR!");
});

controller.hears(['hello', 'hi', 'hoi', 'hey'], ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
    bot.reply(message, 'Hoi!');
});

controller.hears('.*', ['mention'], function (bot, message) {
    if (_.endsWith(message.text, '?')) {
        bot.reply(message, _.sample(babble.reaction.confirm));
    } else {
        bot.reply(message, _.sample(babble.reaction.greeting));
    }
});

// controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
//     var help = 'I will respond to the following messages: \n' +
//         '`bot hi` for a simple message.\n' +
//         '`bot attachment` to see a Slack attachment message.\n' +
//         '`@<your bot\'s name>` to demonstrate detecting a mention.\n' +
//         '`bot help` to see this again.';
//     bot.reply(message, help);
// });

controller.hears(['rust[a]+[gh]'], ['ambient', 'direct_message', 'direct_mention'], function (bot, message) {
    var text = 'Rustaaaaaaaaaag!';
    bot.reply(message, {
        attachments: [{
            "fallback": text,
            "text": text,
            "image_url": "http://i.imgur.com/r4jvWI9.jpg"
        }]
    });
});

controller.hears(['(?=.*bijna)(?=.*weekend)'], ['ambient', 'direct_message', 'direct_mention'], function (bot, message) {
    bot.reply(message, utils.isItAlmostWeekend(message.user));
});

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
    bot.reply(message, 'Sorry <@' + message.user + '>, ik heb geen idee waar je het over hebt. \n');
});
