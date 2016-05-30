'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('[TechnikBot] Nicht so schnell bitte!'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('[TechnikBot] Hallo, ich bin Cynthia, der Technik-Bot.')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('[TechnikBot] Wie heissen Sie?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say('[TechnikBot] Prima, wir nennen Sie von nun an '+name+'.'))
                .then(() => bot.say('[TechnikBot] Andreas, alles läuft!'))
                .then(() => bot.say('[AndreasSefzig] Viel Spaß :)'))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say('[TechnikBot] '+name+', mehr hat mir Andreas nicht beigebracht...'))
                .then(() => 'finish');
        }
    }
});
