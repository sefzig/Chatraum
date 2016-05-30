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
            .then(() => bot.say('[TechnikBot] // Node.js funktioniert'))
            .then(() => 'askName');
            
        }
        
    },

    askName: {
        
        prompt: (bot) => bot.say('[TechnikBot] Wie heissen Sie?'),
        
        receive: (bot, message) => {
            
            const name = message.text;
            
            return bot.setProp('name', name)
            .then(() => bot.say('[TechnikBot] Prima, wir werden Sie von nun an '+name+' nennen.'))
            .then(() => bot.say('[TechnikBot] // Node.js richtig konfiguriert'))
            .then(() => 'testBefehl');
            
        }
        
    },

    testBefehl: {
        
        prompt: (bot) => bot.say('[TechnikBot] Bitte sagen Sie diesen --Befehl!'),
        
        receive: (bot, message) => {
            
            const befehl = message.text;
            
            if (befehl == "--Befehl") {
               
               return bot.setProp('befehl', befehl)
               .then(() => bot.say('[TechnikBot] Danke.'))
               .then(() => bot.say('[TechnikBot] // Befehle funktionieren'))
               .then(() => 'testMenu');
            	
            }
            
            else {
               
               return bot.setProp('befehl', befehl)
               .then(() => bot.say('[TechnikBot] Nicht der --Befehl, aber egal.'))
               .then(() => bot.say('[TechnikBot] // Befehle funktionieren'))
               .then(() => 'testMenu');
            	
            }
            
        }
        
    },

    testMenu: {
        
        prompt: (bot) => bot.say('[TechnikBot] Bitte sagen Sie --Menü!'),
        
        receive: (bot, message) => {
            
            const menu = message.text;
            
            return bot.setProp('menu', menu)
            .then(() => bot.say('[TechnikBot] [Javascript:menu(an)] Menü umgeschaltet.'))
            .then(() => bot.say('[TechnikBot] // Menü funktioniert'))
            .then(() => 'testStil');
            
        }
        
    },

    testStil: {
        
        prompt: (bot) => bot.say('[TechnikBot] Welchen Stil wollen Sie? --Tag oder --Nacht?'),
        
        receive: (bot, message) => {
            
            const stil = message.text;
            stil = stil.replace("--", "");
            
            return bot.setProp('stil', stil)
            .then(() => bot.say('[TechnikBot] [Javascript:stil('+stil+')] Stil: %'+stil+'%.'))
            .then(() => bot.say('[TechnikBot] // Stile funktionieren'))
            .then(() => 'testAbgeschlossen');
            
        }
        
    },

    testAbgeschlossen: {
    	
        prompt: (bot) => bot.say('[TechnikBot] Bitte sagen Sie nocheinmal etwas!'),
        
        receive: (bot, message) => {
            
            return bot.getProp('name')
            .then((name) => bot.say('[TechnikBot] Ich erinnere mich an Sie, '+name+'.'))
            .then(() => bot.say('[TechnikBot] // Props funktionieren'))
            .then(() => bot.say('[TechnikBot] @sefzig, alles läuft!'))
            .then(() => bot.say('[AndreasSefzig] Danke Cynthia.'))
            .then(() => bot.say('[AndreasSefzig] '+name+', viel Spaß :)'))
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
