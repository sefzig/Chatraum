'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I am Smooch Bot! Mach einen --Test.')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What is your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say('Great! I will --call you '+name+' Is that OK? %[That is fine](postback:yes) %[Please dont](postback:no)'))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say('Sorry '+name+', my --creator did not teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
