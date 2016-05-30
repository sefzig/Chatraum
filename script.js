
'use strict'; 

   const Script = require('smooch-bot').Script; 

// Bots
   const EmpfangsBot = "[EmpfangsBot] "; 
   const VerkaufsBot = "[VerkaufsBot] "; 
   const MarketingBot = "[MarketingBot] "; 
   const LinkBot = "[LinkBot] "; 
   const TextBot = "[TextBot] "; 
   const SlackBot = "[SlackBot] "; 

// Variablen 
   var versuche_max = 3; 
   var versuche = 0; 
   var zuletzt = ""; 
   var bekannt = false;

// Daten 
   var vorname = "Unbekannter";
   var nachname = "Besucher";
   var email = "test@chatraum.de";
   var emailkorrekt = true;
   
// Konversationen 
   module.exports = new Script({ 
   
   // ---------------
   // GESPRÄCH ANFANG
   // ---------------
     
    processing: {
        
        prompt: (bot) => bot.say(MarketingBot+'Nicht so schnell bitte...'),
        receive: () => 'processing'
        
    },
   
    start: {
    
    // prompt: (bot) => bot.say(EmpfangsBot+'Starte...'),
       receive: (bot, message) => {
            
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim());
          
       // Nächster Schritt default
          var dann = "empfang";
          
          if (~befehl.indexOf("Weiterleiten zu:")) {
             
          // bot.say(EmpfangsBot+'Ich leite Sie weiter.');
             
          }
          else {
             
             if (bekannt == false) {
                
                                return bot.say(EmpfangsBot+' Willkommen in der Vorlage des --Chatraums. ').then(() => bot.say(EmpfangsBot+' Wir sind 3 Bots: Ich bin Alice, Barbara ist im --Verkauf und Cynthia macht unser --Marketing. ')).then(() => bot.say(EmpfangsBot+' Unterhalten Sie sich mit uns, indem Sie die farbig hinterlegten Wörter schreiben, klicken oder berühren! ')).then(() => bot.say(EmpfangsBot+' Ich habe rechts das Menü für Sie geöffnet. Sie können es mit dem Button oben rechts bedienen - oder indem Sie --Menü schreiben. [Javascript:menu(an)] ')).then(() => 'empfang');                
             }
             else {
                
                                return bot.say(EmpfangsBot+' Willkommen zurück! Sprechen Sie mit mir über --Chatraum! ').then(() => bot.say(EmpfangsBot+' Oder mit den anderen Bots über --Verkauf oder --Marketing. ')).then(() => 'empfang');                
             }
             
          }
          
          return bot.setProp('empfangen', 'ja')
          .then(() => dann);
          
       }
    },
   
 // -------------------------
 // Onboarding
 // -------------------------
    
    name: {
    	
        receive: (bot, message) => {
            
            var antwort = befehlWort(message.text.trim().toUpperCase());
            var dann = "name";
            
            if ((antwort == "--JA") ||
                (antwort == "--NAME") ||
                (antwort == "--ÄNDERN")) { 
               
               bot.say(EmpfangsBot+'Wir werden sorgsam mit Ihren Daten umgehen.');
               dann = "vorname";
               
            }
            if ((antwort == "--NEIN") ||
                (antwort == "--EMPFANG") ||
                (antwort == "--ABBRECHEN")) {
               
               bot.say(EmpfangsBot+'Gehen wir zurück zum --Empfang.');
               dann = "empfang";
               
            }
            if ((antwort == "--EMAIL")) {
               
               bot.say(EmpfangsBot+'Wir geben Ihre Adresse nicht weiter.');
               dann = "emailadresse";
               
            }
            
            return bot.setProp('name_eingabe', 'tmp')
                .then(() => dann);
        }
    },

    vorname: {
    	
        prompt: (bot) => bot.say(EmpfangsBot+'Wie heissen Sie mit Vornamen?'),
        receive: (bot, message) => {
            
            vorname = message.text;
            vorname = vorname.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
            
            return bot.setProp('vorname', vorname)
                .then(() => bot.say(EmpfangsBot+`${vorname}, prima. Und wie heissen Sie mit Nachnamen? [Javascript:cookies(vorname,`+vorname+`)] `))
                .then(() => 'nachname');
        }
    },

    nachname: {
    	
        receive: (bot, message) => {
            
            nachname = message.text; 
            nachname = nachname.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
            
            bot.setProp('nachname', nachname);
            return bot.getProp('vorname')
                .then((vorname) => bot.say(EmpfangsBot+'Sie heissen also '+vorname+' '+nachname+'. Mögen Sie Ihre --Email -Adresse hinterlassen? Ansonsten lassen Sie uns zum --Empfang zurückkehren. [Javascript:cookies(nachname,'+nachname+')] '))
                .then(() => 'name');
            
        }
    },

    emailadresse: {
    	
        prompt: (bot) => bot.say(EmpfangsBot+'Wie lautet Ihre E-Mail-Adresse?'),
        receive: (bot, message) => {
            
            email = message.text;
            
         // emailkorrekt = email.test(emailregex);
            emailkorrekt = true;
            
            if (emailkorrekt == true) {
            	
               return bot.setProp('email', email)
                  .then(() => bot.say(EmpfangsBot+''+email+' ist eine valide E-Mail-Adresse. [Javascript:cookies(email,'+email+')] '))
                  .then(() => bot.say(EmpfangsBot+'Schreiben Sie --Email, um sie zu ändern. Oder lassen Sie uns zurück zum --Empfang gehen.'))
                  .then(() => 'empfang');
               
            }
            else {
            	
               return bot.say(EmpfangsBot+''+email+' wird nicht als E-Mail-Adresse erkannt. ')
                  .then(() => bot.say(EmpfangsBot+'Bitte geben Sie Ihre E-Mail-Adresse nochmal ein - oder lassen Sie uns zum --Empfang zurückkehren.'))
                  .then(() => 'emailadresse');
               
            }
        }
    },
   
 // ---------------------------
 // Empfang (Alice)
 // ---------------------------
 // - name_klein: empfang
 // - name_kamel: Empfang
 // - name_gross: EMPFANG
 // - frau_klein: alice
 // - frau_kamel: Alice
 // - frau_gross: ALICE
 // - bot_name:   EmpfangsBot
 // - bot_klein:  empfangsbot
 // - bot_kamel:  Empfangsbot
 // - bot_gross:  EMPFANGSBOT
 // ---------------------------
 
    empfang: {
  	
       receive: (bot, message) => {
          
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim().toUpperCase());
          
       // Nächster Schritt default
          var dann = "empfang";
          
       // Nicht-Befehl-Eingaben mitzählen
          var versuch = false;
          
       // Default-Zurück
          var zuruck = "Empfang";
          
       // Zuletzt Varianten
          var zuletzt_dann =  dann;
          var zuletzt_klein = zuletzt_dann.toLowerCase();
          var zuletzt_gross = zuletzt_dann.toUpperCase();
          var zuletzt_kamel = zuletzt_dann.charAt(0).toUpperCase() + zuletzt_dann.slice(1);
          
       // -----------------
       // Befehle
       // -----------------
          
          if ("empfang" != "empfang") {
          	 
             if (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es im --Empfang? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang');}if (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es im --Empfang? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang');}if (~befehl.indexOf("--ABBRECHEN")) { versuch = true; return bot.say(EmpfangsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es im --Empfang? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang');}             
          }
          
          if (zuletzt_kamel != "Empfang") { 
             
             if (~befehl.indexOf("--ZURÜCK")) { versuch = true; }             
          } 
          else {
             
             if (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(EmpfangsBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'empfang');}             
          }
          
          if (~befehl.indexOf("--MENÜAN")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'empfang');}if (~befehl.indexOf("--MENUAN")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'empfang');}          if (~befehl.indexOf("--MENÜAUS")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'empfang');}if (~befehl.indexOf("--MENUAUS")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'empfang');}          if (~befehl.indexOf("--MENÜ")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'empfang');}if (~befehl.indexOf("--MENU")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'empfang');}if (~befehl.indexOf("--MENUE")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'empfang');}          
       // -----------------
       // Onboarding
       // -----------------
          
       	 if ((vorname) && (vorname != "") && (vorname != "Unbekannter") && (nachname) && (nachname != "") && (nachname != "Besucher")) {
       	    
             if (~befehl.indexOf("--NAME")) { versuch = true; }             
          }
          else if ((vorname) && (vorname != "") && (vorname != "Unbekannter")) {
       	    
             if (~befehl.indexOf("--NAME")) { versuch = true; }             
          }
          else if ((nachname) && (nachname != "") && (nachname != "Besucher")) {
       	    
             if (~befehl.indexOf("--NAME")) { versuch = true; }             
          }
          else {
       	    
             if (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(EmpfangsBot+' Wir kennen Ihren Namen noch nicht. ').then(() => 'vorname');}             
          }
          
       // -----------------
       // Kontakt
       // -----------------
          
          if (~befehl.indexOf("--KONTAKT")) { versuch = true; return bot.say(EmpfangsBot+'  Wollen Sie --telefonieren, eine --Email schreiben oder --twittern? ').then(() => bot.say(EmpfangsBot+' Alle unsere Kontaktwege: [Text:Kontakt,RobogeddonKontakt] ')).then(() => 'empfang');}          
          if (~befehl.indexOf("--TELEFON")) { versuch = true; return bot.say(EmpfangsBot+' Rufen Sie Andreas Sefzig an: [Telefon:+49 151 15920082] ').then(() => 'empfang');}          
          if (~befehl.indexOf("--EMAIL")) { versuch = true; return bot.say(EmpfangsBot+' Schreiben Sie uns eine Email: [Email:andreas.sefzig@robogeddon.de] ').then(() => 'empfang');}          
          if (~befehl.indexOf("--TWITTER")) { versuch = true; return bot.say(EmpfangsBot+' Senden Sie uns einen Tweet: [Link:PM in Twitter öffnen,RobogeddonTweet] ').then(() => 'empfang');}          
       // -----------------
       // Über uns
       // -----------------
          
          if (~befehl.indexOf("--CHATRAUM")) { versuch = true; return bot.say(EmpfangsBot+' Der Chatraum ist ein Produkt der Chatbot-Agentur #Robogeddon. ').then(() => bot.say(EmpfangsBot+' Robogeddon sind Andreas Sefzig und eine lose Gruppe freier Kreativer - und natürlich wir, die Bots! Sie realisieren Chat-Lösungen für die interne und externe Unternehmens-Kommunikation. [Text:Agenturprofil,RobogeddonAgentur] ')).then(() => bot.say(EmpfangsBot+' Lassen Sie uns über unsere --Produkte sprechen. Oder wollen Sie eine --Beratung? ')).then(() => 'empfang');}          
       // Produkte
          if ("empfang" != "beratung") {
          	 
             if (~befehl.indexOf("--PRODUKT")) { versuch = true; return bot.say(EmpfangsBot+' Die Produkte lassen Sie sich besser von Barbara erklären. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(VerkaufsBot+' Hallo! Unsere Produkte sind Ihre Chat-Bots. Wir bieten tatkräftige Unterstützung als --Leistung an und entwickeln ständig weitere technische --Lösungen. ')).then(() => 'verkauf');}	       
          }
          else {
          	 
             if (~befehl.indexOf("--PRODUKT")) { versuch = true; return bot.say(VerkaufsBot+' Unsere Produkte sind Ihre Chat-Bots für das Marketing. Wir bieten tatkräftige Unterstützung als --Leistung an und entwickeln ständig weitere technische --Lösungen. ').then(() => 'verkauf');}	       
          }
          
       // -----------------
       // Funktionen
       // -----------------
          
          if (~befehl.indexOf("--NEWSLETTER")) { versuch = true; return bot.say(EmpfangsBot+' Ja, bestellen Sie unseren Newsletter! Wie heißen Sie mit Vornamen? ').then(() => 'vorname');}          
          if (~befehl.indexOf("--MOBIL")) { versuch = true; return bot.say(EmpfangsBot+' Diesen Chat mobil öffnen: [Qr:http://chatraum.herokuapp.com/] ').then(() => bot.say(EmpfangsBot+' Oder öffnen Sie [Textlink:Chatraum.herokuapp.com,http://chatraum.herokuapp.com] in Ihrem mobilen Browser. ')).then(() => 'empfang');}          
       // Stile
          if (~befehl.indexOf("--TAG")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:stil(tag)] Stil: Tag. ').then(() => 'empfang');}          if (~befehl.indexOf("--NACHT")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:stil(nacht)] Stil: Nacht. ').then(() => 'empfang');}          if (~befehl.indexOf("--ROBOS")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:stil(robogeddon)] Stil: Robogeddon. ').then(() => 'empfang');}          if (~befehl.indexOf("--HX")) { versuch = true; return bot.say(EmpfangsBot+' [Javascript:stil(hacks)] Stil: Hx. ').then(() => 'empfang');}          
       // -----------------
       // Bots
       // -----------------
          
          if (zuletzt_klein != "empfang") { 
             if (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Alice. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(EmpfangsBot+' Hallo, ich bin Alice, der Empfangs-Bot von --Robogeddon. Darf ich Ihnen die Bots aus --Strategie, --Konzeption, --Kreation, --Technik und --Beratung vorstellen? ')).then(() => 'empfang');}if (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Alice. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(EmpfangsBot+' Hallo, ich bin Alice, der Empfangs-Bot von --Robogeddon. Darf ich Ihnen die Bots aus --Strategie, --Konzeption, --Kreation, --Technik und --Beratung vorstellen? ')).then(() => 'empfang');} } else { 
             if (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Sprechen Sie mit mir über --Robogeddon - oder mit den anderen Bots aus der --Beratung, --Kreation, --Konzeption, --Strategie oder --Technik! ').then(() => 'empfang');}if (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Sprechen Sie mit mir über --Robogeddon - oder mit den anderen Bots aus der --Beratung, --Kreation, --Konzeption, --Strategie oder --Technik! ').then(() => 'empfang');}          }
       // -----------------
       // System
       // -----------------
       
          if (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(EmpfangsBot+' Sprechen Sie mit meinen Kolleginnen in --Verkauf und --Marketing. ').then(() => bot.say(EmpfangsBot+' Weitere Funktionen: --Kontakt, --Newsletter, --Mobil und --Über. ')).then(() => 'empfang');}          
          if (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(EmpfangsBot+' Ich bin Alice, der Empfangs-Bot. ').then(() => bot.say(VerkaufsBot+' Alice ist eine offene Person, die Besucher auf ihre hilfsbereite Art in Empfang nimmt. ')).then(() => bot.say(EmpfangsBot+' Ich leite weiter zu unseren Gewerken und übernehme einfache Aufgaben, wie z.B. Ihren --Namen zu erfassen. ')).then(() => 'empfang');}if (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(EmpfangsBot+' Ich bin Alice, der Empfangs-Bot. ').then(() => bot.say(VerkaufsBot+' Alice ist eine offene Person, die Besucher auf ihre hilfsbereite Art in Empfang nimmt. ')).then(() => bot.say(EmpfangsBot+' Ich leite weiter zu unseren Gewerken und übernehme einfache Aufgaben, wie z.B. Ihren --Namen zu erfassen. ')).then(() => 'empfang');}if (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Ich bin Alice, der Empfangs-Bot. ').then(() => bot.say(VerkaufsBot+' Alice ist eine offene Person, die Besucher auf ihre hilfsbereite Art in Empfang nimmt. ')).then(() => bot.say(EmpfangsBot+' Ich leite weiter zu unseren Gewerken und übernehme einfache Aufgaben, wie z.B. Ihren --Namen zu erfassen. ')).then(() => 'empfang');}if (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Ich bin Alice, der Empfangs-Bot. ').then(() => bot.say(VerkaufsBot+' Alice ist eine offene Person, die Besucher auf ihre hilfsbereite Art in Empfang nimmt. ')).then(() => bot.say(EmpfangsBot+' Ich leite weiter zu unseren Gewerken und übernehme einfache Aufgaben, wie z.B. Ihren --Namen zu erfassen. ')).then(() => 'empfang');}          
       // -----------------
       // Inhalte
       // -----------------
          
       // -----------------
       // Vorlage
       // -----------------
       
          if (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(EmpfangsBot+' Text Vorlage 1. ').then(() => 'empfang');}          

       // -----------------
       // Bot aus
       // -----------------
       
       // Zurück merken
          zuletzt = zuruck;
          
       // Irrläufer
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(EmpfangsBot+'Suchen Sie meine --Befehle?'); versuche = 0; }
          }
          
       // Weiterleiten
          return bot.setProp('empfang', 'gesprochen')
              .then(() => dann);
          
       }
        
    },
   
    finish: {
       receive: (bot, message) => {
          return bot.getProp('name')
             .then(() => 'finish');
       }
    }
    
   // --------------
   // GESPRÄCH AUS 
   // -------------- 

   });
   