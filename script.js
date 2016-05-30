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
                .then(() => bot.say('[TechnikBot] // Node.js funktioniert.'))
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('[TechnikBot] Wie heissen Sie?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say('[TechnikBot] Prima, wir werden Sie von nun an '+name+' nennen.'))
                .then(() => bot.say('[TechnikBot] // Node.js richtig konfiguriert.'))
                .then(() => 'testBefehl');
        }
    },

    testBefehl: {
        prompt: (bot) => bot.say('[TechnikBot] Bitte klicken Sie diesen --Befehl!'),
        receive: (bot, message) => {
            const befehl = message.text;
            return bot.setProp('befehl', befehl)
                .then(() => bot.say('[TechnikBot] // --Befehle funktionieren.'))
                .then(() => 'testAbgeschlossen');
        }
    },

    testAbgeschlossen: {
        prompt: (bot) => bot.say('[TechnikBot] Bitte sagen Sie nocheinmal etwas!'),
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say('[TechnikBot] // '+name+', Props funktionieren.'))
                .then(() => bot.say('[TechnikBot] // Test abgeschlossen.'))
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
