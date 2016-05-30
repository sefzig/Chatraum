'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('[TechnikBot] Nicht so schnell bitte!'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('[TechnikBot] Hallo, ich bin Cynthia, Technik-Bot.')
                .then(() => bot.say('[TechnikBot] _// Node.js funktioniert_'))
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('[TechnikBot] Wie heissen Sie?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say('[TechnikBot] Prima, wir werden Sie von nun an '+name+' nennen.'))
                .then(() => bot.say('[TechnikBot] _// Node.js richtig konfiguriert_'))
                .then(() => 'testBefehl');
        }
    },

    testBefehl: {
        prompt: (bot) => bot.say('[TechnikBot] Bitte sagen Sie diesen --Befehl!'),
        receive: (bot, message) => {
            const befehl = message.text;
            return bot.setProp('befehl', befehl)
                .then(() => bot.say('[TechnikBot] _// Befehle funktionieren_'))
                .then(() => 'testAbgeschlossen');
        }
    },

    testAbgeschlossen: {
        prompt: (bot) => bot.say('[TechnikBot] Bitte sagen Sie nocheinmal etwas!'),
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say('[TechnikBot] Ich erinnere mich an Sie, '+name+'.'))
                .then(() => bot.say('[TechnikBot] _// Props funktionieren_'))
                .then(() => bot.say('[TechnikBot] _// Test abgeschlossen_'))
                .then(() => bot.say('[TechnikBot] @sefzig, alles läuft!'))
                .then(() => bot.say('[AndreasSefzig] Danke Cynthia. Viel Spaß :)'))
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
