
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
          
          if (zuletzt_klein != "verkauf") { 
             if (~befehl.indexOf("--VERKAUF")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Barbara. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(VerkaufsBot+' Hallo, ich bin Barbara, Verkaufs-Bot. Ich möchte Ihnen unsere --Produkte zeigen und Sie --beraten! ')).then(() => 'verkauf');}if (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Barbara. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(VerkaufsBot+' Hallo, ich bin Barbara, Verkaufs-Bot. Ich möchte Ihnen unsere --Produkte zeigen und Sie --beraten! ')).then(() => 'verkauf');} } else { 
             if (~befehl.indexOf("--VERKAUF")) { versuch = true; return bot.say(VerkaufsBot+' Ich möchte Ihnen unsere --Produkte und meine --Beratung nahelegen! ').then(() => 'verkauf');}if (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(VerkaufsBot+' Ich möchte Ihnen unsere --Produkte und meine --Beratung nahelegen! ').then(() => 'verkauf');}          }
          
          if (zuletzt_klein != "marketing") { 
   		    if (~befehl.indexOf("--MARKETING")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Cynthia. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(MarketingBot+' Hallo, ich bin Cynthia, der Marketing-Bot. Ich möchte Ihnen unser --Facebook empfehlen und möchte Sie bitten, an unserer --Umfrage teilzunehmen! ')).then(() => 'marketing');}if (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Cynthia. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(MarketingBot+' Hallo, ich bin Cynthia, der Marketing-Bot. Ich möchte Ihnen unser --Facebook empfehlen und möchte Sie bitten, an unserer --Umfrage teilzunehmen! ')).then(() => 'marketing');} } else { 
   		    if (~befehl.indexOf("--MARKETING")) { versuch = true; return bot.say(MarketingBot+' Ich möchte Ihnen unser --Facebook empfehlen und habe eine Umfrage. ').then(() => 'marketing');}if (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(MarketingBot+' Ich möchte Ihnen unser --Facebook empfehlen und habe eine Umfrage. ').then(() => 'marketing');}          }
          
       // Vorlage (Gewerk, Name)
          if (~befehl.indexOf("--GEWERK")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Name. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk');}if (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(EmpfangsBot+' Ich übergebe an Name. Schreiben Sie --Empfang, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk');}
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
   
 // ---------------------------
 // Verkauf (Barbara)
 // ---------------------------
 // - name_klein: verkauf
 // - name_kamel: Verkauf
 // - name_gross: VERKAUF
 // - frau_klein: barbara
 // - frau_kamel: Barbara
 // - frau_gross: BARBARA
 // - bot_name:   VerkaufsBot
 // - bot_klein:  verkaufsbot
 // - bot_kamel:  Verkaufsbot
 // - bot_gross:  VERKAUFSBOT
 // ---------------------------
 
    verkauf: {
  	
       receive: (bot, message) => {
          
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim().toUpperCase());
          
       // Nächster Schritt default
          var dann = "verkauf";
          
       // Nicht-Befehl-Eingaben mitzählen
          var versuch = false;
          
       // Default-Zurück
          var zuruck = "Verkauf";
          
       // Zuletzt Varianten
          var zuletzt_dann =  dann;
          var zuletzt_klein = zuletzt_dann.toLowerCase();
          var zuletzt_gross = zuletzt_dann.toUpperCase();
          var zuletzt_kamel = zuletzt_dann.charAt(0).toUpperCase() + zuletzt_dann.slice(1);
          
       // -----------------
       // Befehle
       // -----------------
          
          if ("verkauf" != "empfang") {
          	 
             if (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(VerkaufsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es im --Verkauf? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang');}if (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(VerkaufsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es im --Verkauf? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang');}if (~befehl.indexOf("--ABBRECHEN")) { versuch = true; return bot.say(VerkaufsBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es im --Verkauf? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang');}             
          }
          
          if (zuletzt_kamel != "Verkauf") { 
             
             if (~befehl.indexOf("--ZURÜCK")) { versuch = true; }             
          } 
          else {
             
             if (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(VerkaufsBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'verkauf');}             
          }
          
          if (~befehl.indexOf("--MENÜAN")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'verkauf');}if (~befehl.indexOf("--MENUAN")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'verkauf');}          if (~befehl.indexOf("--MENÜAUS")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'verkauf');}if (~befehl.indexOf("--MENUAUS")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'verkauf');}          if (~befehl.indexOf("--MENÜ")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'verkauf');}if (~befehl.indexOf("--MENU")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'verkauf');}if (~befehl.indexOf("--MENUE")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'verkauf');}          
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
       	    
             if (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(VerkaufsBot+' Wir kennen Ihren Namen noch nicht. ').then(() => 'vorname');}             
          }
          
       // -----------------
       // Kontakt
       // -----------------
          
          if (~befehl.indexOf("--KONTAKT")) { versuch = true; return bot.say(VerkaufsBot+'  Wollen Sie --telefonieren, eine --Email schreiben oder --twittern? ').then(() => bot.say(VerkaufsBot+' Alle unsere Kontaktwege: [Text:Kontakt,RobogeddonKontakt] ')).then(() => 'verkauf');}          
          if (~befehl.indexOf("--TELEFON")) { versuch = true; return bot.say(VerkaufsBot+' Rufen Sie Andreas Sefzig an: [Telefon:+49 151 15920082] ').then(() => 'verkauf');}          
          if (~befehl.indexOf("--EMAIL")) { versuch = true; return bot.say(VerkaufsBot+' Schreiben Sie uns eine Email: [Email:andreas.sefzig@robogeddon.de] ').then(() => 'verkauf');}          
          if (~befehl.indexOf("--TWITTER")) { versuch = true; return bot.say(VerkaufsBot+' Senden Sie uns einen Tweet: [Link:PM in Twitter öffnen,RobogeddonTweet] ').then(() => 'verkauf');}          
       // -----------------
       // Über uns
       // -----------------
          
          if (~befehl.indexOf("--CHATRAUM")) { versuch = true; return bot.say(VerkaufsBot+' Der Chatraum ist ein Produkt der Chatbot-Agentur #Robogeddon. ').then(() => bot.say(VerkaufsBot+' Robogeddon sind Andreas Sefzig und eine lose Gruppe freier Kreativer - und natürlich wir, die Bots! Sie realisieren Chat-Lösungen für die interne und externe Unternehmens-Kommunikation. [Text:Agenturprofil,RobogeddonAgentur] ')).then(() => bot.say(VerkaufsBot+' Lassen Sie uns über unsere --Produkte sprechen. Oder wollen Sie eine --Beratung? ')).then(() => 'verkauf');}          
       // Produkte
          if ("verkauf" != "beratung") {
          	 
             if (~befehl.indexOf("--PRODUKT")) { versuch = true; return bot.say(VerkaufsBot+' Die Produkte lassen Sie sich besser von Barbara erklären. Schreiben Sie --Verkauf, um wieder mit mir zu sprechen. ').then(() => bot.say(VerkaufsBot+' Hallo! Unsere Produkte sind Ihre Chat-Bots. Wir bieten tatkräftige Unterstützung als --Leistung an und entwickeln ständig weitere technische --Lösungen. ')).then(() => 'verkauf');}	       
          }
          else {
          	 
             if (~befehl.indexOf("--PRODUKT")) { versuch = true; return bot.say(VerkaufsBot+' Unsere Produkte sind Ihre Chat-Bots für das Marketing. Wir bieten tatkräftige Unterstützung als --Leistung an und entwickeln ständig weitere technische --Lösungen. ').then(() => 'verkauf');}	       
          }
          
       // -----------------
       // Funktionen
       // -----------------
          
          if (~befehl.indexOf("--NEWSLETTER")) { versuch = true; return bot.say(VerkaufsBot+' Ja, bestellen Sie unseren Newsletter! Wie heißen Sie mit Vornamen? ').then(() => 'vorname');}          
          if (~befehl.indexOf("--MOBIL")) { versuch = true; return bot.say(VerkaufsBot+' Diesen Chat mobil öffnen: [Qr:http://chatraum.herokuapp.com/] ').then(() => bot.say(VerkaufsBot+' Oder öffnen Sie [Textlink:Chatraum.herokuapp.com,http://chatraum.herokuapp.com] in Ihrem mobilen Browser. ')).then(() => 'empfang');}          
       // Stile
          if (~befehl.indexOf("--TAG")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:stil(tag)] Stil: Tag. ').then(() => 'verkauf');}          if (~befehl.indexOf("--NACHT")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:stil(nacht)] Stil: Nacht. ').then(() => 'verkauf');}          if (~befehl.indexOf("--ROBOS")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:stil(robogeddon)] Stil: Robogeddon. ').then(() => 'verkauf');}          if (~befehl.indexOf("--HX")) { versuch = true; return bot.say(VerkaufsBot+' [Javascript:stil(hacks)] Stil: Hx. ').then(() => 'verkauf');}          
       // -----------------
       // Bots
       // -----------------
          
          if (zuletzt_klein != "empfang") { 
             if (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(VerkaufsBot+' Ich übergebe an Alice. Schreiben Sie --Verkauf, um wieder mit mir zu sprechen. ').then(() => bot.say(EmpfangsBot+' Hallo, ich bin Alice, der Empfangs-Bot von --Robogeddon. Darf ich Ihnen die Bots aus --Strategie, --Konzeption, --Kreation, --Technik und --Beratung vorstellen? ')).then(() => 'empfang');}if (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(VerkaufsBot+' Ich übergebe an Alice. Schreiben Sie --Verkauf, um wieder mit mir zu sprechen. ').then(() => bot.say(EmpfangsBot+' Hallo, ich bin Alice, der Empfangs-Bot von --Robogeddon. Darf ich Ihnen die Bots aus --Strategie, --Konzeption, --Kreation, --Technik und --Beratung vorstellen? ')).then(() => 'empfang');} } else { 
             if (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Sprechen Sie mit mir über --Robogeddon - oder mit den anderen Bots aus der --Beratung, --Kreation, --Konzeption, --Strategie oder --Technik! ').then(() => 'empfang');}if (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Sprechen Sie mit mir über --Robogeddon - oder mit den anderen Bots aus der --Beratung, --Kreation, --Konzeption, --Strategie oder --Technik! ').then(() => 'empfang');}          }
          
          if (zuletzt_klein != "verkauf") { 
             if (~befehl.indexOf("--VERKAUF")) { versuch = true; return bot.say(VerkaufsBot+' Ich übergebe an Barbara. Schreiben Sie --Verkauf, um wieder mit mir zu sprechen. ').then(() => bot.say(VerkaufsBot+' Hallo, ich bin Barbara, Verkaufs-Bot. Ich möchte Ihnen unsere --Produkte zeigen und Sie --beraten! ')).then(() => 'verkauf');}if (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(VerkaufsBot+' Ich übergebe an Barbara. Schreiben Sie --Verkauf, um wieder mit mir zu sprechen. ').then(() => bot.say(VerkaufsBot+' Hallo, ich bin Barbara, Verkaufs-Bot. Ich möchte Ihnen unsere --Produkte zeigen und Sie --beraten! ')).then(() => 'verkauf');} } else { 
             if (~befehl.indexOf("--VERKAUF")) { versuch = true; return bot.say(VerkaufsBot+' Ich möchte Ihnen unsere --Produkte und meine --Beratung nahelegen! ').then(() => 'verkauf');}if (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(VerkaufsBot+' Ich möchte Ihnen unsere --Produkte und meine --Beratung nahelegen! ').then(() => 'verkauf');}          }
          
          if (zuletzt_klein != "marketing") { 
   		    if (~befehl.indexOf("--MARKETING")) { versuch = true; return bot.say(VerkaufsBot+' Ich übergebe an Cynthia. Schreiben Sie --Verkauf, um wieder mit mir zu sprechen. ').then(() => bot.say(MarketingBot+' Hallo, ich bin Cynthia, der Marketing-Bot. Ich möchte Ihnen unser --Facebook empfehlen und möchte Sie bitten, an unserer --Umfrage teilzunehmen! ')).then(() => 'marketing');}if (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(VerkaufsBot+' Ich übergebe an Cynthia. Schreiben Sie --Verkauf, um wieder mit mir zu sprechen. ').then(() => bot.say(MarketingBot+' Hallo, ich bin Cynthia, der Marketing-Bot. Ich möchte Ihnen unser --Facebook empfehlen und möchte Sie bitten, an unserer --Umfrage teilzunehmen! ')).then(() => 'marketing');} } else { 
   		    if (~befehl.indexOf("--MARKETING")) { versuch = true; return bot.say(MarketingBot+' Ich möchte Ihnen unser --Facebook empfehlen und habe eine Umfrage. ').then(() => 'marketing');}if (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(MarketingBot+' Ich möchte Ihnen unser --Facebook empfehlen und habe eine Umfrage. ').then(() => 'marketing');}          }
          
       // Vorlage (Gewerk, Name)
          if (~befehl.indexOf("--GEWERK")) { versuch = true; return bot.say(VerkaufsBot+' Ich übergebe an Name. Schreiben Sie --Verkauf, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk');}if (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(VerkaufsBot+' Ich übergebe an Name. Schreiben Sie --Verkauf, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk');}
       // -----------------
       // System
       // -----------------
       
          if (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(VerkaufsBot+' Sprechen Sie mit mir über --Produkte und --Beratung. ').then(() => bot.say(VerkaufsBot+' Weitere Funktionen: --Kontakt, --Newsletter, --Mobil und --Über. ')).then(() => 'verkauf');}          
          if (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(VerkaufsBot+' Ich bin Barbara, der Verkaufs-Bot. ').then(() => bot.say(MarketingBot+' Barbara ist eine Person, zu der ich später mehr sagen kann (folgt). ')).then(() => bot.say(VerkaufsBot+' Ich kenne mich mit unseren --Produkten aus und --berate Sie gern. ')).then(() => 'verkauf');}if (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(VerkaufsBot+' Ich bin Barbara, der Verkaufs-Bot. ').then(() => bot.say(MarketingBot+' Barbara ist eine Person, zu der ich später mehr sagen kann (folgt). ')).then(() => bot.say(VerkaufsBot+' Ich kenne mich mit unseren --Produkten aus und --berate Sie gern. ')).then(() => 'verkauf');}if (~befehl.indexOf("--VERKAUF")) { versuch = true; return bot.say(VerkaufsBot+' Ich bin Barbara, der Verkaufs-Bot. ').then(() => bot.say(MarketingBot+' Barbara ist eine Person, zu der ich später mehr sagen kann (folgt). ')).then(() => bot.say(VerkaufsBot+' Ich kenne mich mit unseren --Produkten aus und --berate Sie gern. ')).then(() => 'verkauf');}if (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(VerkaufsBot+' Ich bin Barbara, der Verkaufs-Bot. ').then(() => bot.say(MarketingBot+' Barbara ist eine Person, zu der ich später mehr sagen kann (folgt). ')).then(() => bot.say(VerkaufsBot+' Ich kenne mich mit unseren --Produkten aus und --berate Sie gern. ')).then(() => 'verkauf');}          
       // -----------------
       // Inhalte
       // -----------------
          
          if (~befehl.indexOf("--PRODUKT")) { versuch = true; return bot.say(VerkaufsBot+' Text Produkt. ').then(() => 'verkauf');}          
          if (~befehl.indexOf("--BERAT")) { versuch = true; return bot.say(VerkaufsBot+' Text Beratung. ').then(() => 'verkauf');}          
       // -----------------
       // Vorlage
       // -----------------
       
          if (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(VerkaufsBot+' Text Vorlage 1. ').then(() => 'verkauf');}          

       // -----------------
       // Bot aus
       // -----------------
       
       // Zurück merken
          zuletzt = zuruck;
          
       // Irrläufer
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(VerkaufsBot+'Suchen Sie meine --Befehle?'); versuche = 0; }
          }
          
       // Weiterleiten
          return bot.setProp('verkauf', 'gesprochen')
              .then(() => dann);
          
       }
        
    },
   
 // ---------------------------
 // Marketing (Cynthia)
 // ---------------------------
 // - name_klein: marketing
 // - name_kamel: Marketing
 // - name_gross: MARKETING
 // - frau_klein: cynthia
 // - frau_kamel: Cynthia
 // - frau_gross: CYNTHIA
 // - bot_name:   MarketingBot
 // - bot_klein:  marketingbot
 // - bot_kamel:  Marketingbot
 // - bot_gross:  MARKETINGBOT
 // ---------------------------
 
    marketing: {
  	
       receive: (bot, message) => {
          
       // Befehl normalisieren
          var befehl = befehlWort(message.text.trim().toUpperCase());
          
       // Nächster Schritt default
          var dann = "marketing";
          
       // Nicht-Befehl-Eingaben mitzählen
          var versuch = false;
          
       // Default-Zurück
          var zuruck = "Marketing";
          
       // Zuletzt Varianten
          var zuletzt_dann =  dann;
          var zuletzt_klein = zuletzt_dann.toLowerCase();
          var zuletzt_gross = zuletzt_dann.toUpperCase();
          var zuletzt_kamel = zuletzt_dann.charAt(0).toUpperCase() + zuletzt_dann.slice(1);
          
       // -----------------
       // Befehle
       // -----------------
          
          if ("marketing" != "empfang") {
          	 
             if (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(MarketingBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es im --Marketing? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang');}if (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(MarketingBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es im --Marketing? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang');}if (~befehl.indexOf("--ABBRECHEN")) { versuch = true; return bot.say(MarketingBot+' Bis später! ').then(() => bot.say(EmpfangsBot+' Willkommen zurück! Wie war es im --Marketing? Schreiben Sie --Befehle um zu sehen, was ich Ihnen sonst noch zeigen kann. ')).then(() => 'empfang');}             
          }
          
          if (zuletzt_kamel != "Marketing") { 
             
             if (~befehl.indexOf("--ZURÜCK")) { versuch = true; }             
          } 
          else {
             
             if (~befehl.indexOf("--ZURÜCK")) { versuch = true; return bot.say(MarketingBot+' Wollen Sie zurück zum --Empfang? ').then(() => 'marketing');}             
          }
          
          if (~befehl.indexOf("--MENÜAN")) { versuch = true; return bot.say(MarketingBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'marketing');}if (~befehl.indexOf("--MENUAN")) { versuch = true; return bot.say(MarketingBot+' [Javascript:menu()] Menü eingeschaltet. ').then(() => 'marketing');}          if (~befehl.indexOf("--MENÜAUS")) { versuch = true; return bot.say(MarketingBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'marketing');}if (~befehl.indexOf("--MENUAUS")) { versuch = true; return bot.say(MarketingBot+' [Javascript:menu()] Menü ausgeschaltet. ').then(() => 'marketing');}          if (~befehl.indexOf("--MENÜ")) { versuch = true; return bot.say(MarketingBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'marketing');}if (~befehl.indexOf("--MENU")) { versuch = true; return bot.say(MarketingBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'marketing');}if (~befehl.indexOf("--MENUE")) { versuch = true; return bot.say(MarketingBot+' [Javascript:menu()] Menü umgeschaltet. ').then(() => 'marketing');}          
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
       	    
             if (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(MarketingBot+' Wir kennen Ihren Namen noch nicht. ').then(() => 'vorname');}             
          }
          
       // -----------------
       // Kontakt
       // -----------------
          
          if (~befehl.indexOf("--KONTAKT")) { versuch = true; return bot.say(MarketingBot+'  Wollen Sie --telefonieren, eine --Email schreiben oder --twittern? ').then(() => bot.say(MarketingBot+' Alle unsere Kontaktwege: [Text:Kontakt,RobogeddonKontakt] ')).then(() => 'marketing');}          
          if (~befehl.indexOf("--TELEFON")) { versuch = true; return bot.say(MarketingBot+' Rufen Sie Andreas Sefzig an: [Telefon:+49 151 15920082] ').then(() => 'marketing');}          
          if (~befehl.indexOf("--EMAIL")) { versuch = true; return bot.say(MarketingBot+' Schreiben Sie uns eine Email: [Email:andreas.sefzig@robogeddon.de] ').then(() => 'marketing');}          
          if (~befehl.indexOf("--TWITTER")) { versuch = true; return bot.say(MarketingBot+' Senden Sie uns einen Tweet: [Link:PM in Twitter öffnen,RobogeddonTweet] ').then(() => 'marketing');}          
       // -----------------
       // Über uns
       // -----------------
          
          if (~befehl.indexOf("--CHATRAUM")) { versuch = true; return bot.say(MarketingBot+' Der Chatraum ist ein Produkt der Chatbot-Agentur #Robogeddon. ').then(() => bot.say(MarketingBot+' Robogeddon sind Andreas Sefzig und eine lose Gruppe freier Kreativer - und natürlich wir, die Bots! Sie realisieren Chat-Lösungen für die interne und externe Unternehmens-Kommunikation. [Text:Agenturprofil,RobogeddonAgentur] ')).then(() => bot.say(MarketingBot+' Lassen Sie uns über unsere --Produkte sprechen. Oder wollen Sie eine --Beratung? ')).then(() => 'marketing');}          
       // Produkte
          if ("marketing" != "beratung") {
          	 
             if (~befehl.indexOf("--PRODUKT")) { versuch = true; return bot.say(MarketingBot+' Die Produkte lassen Sie sich besser von Barbara erklären. Schreiben Sie --Marketing, um wieder mit mir zu sprechen. ').then(() => bot.say(VerkaufsBot+' Hallo! Unsere Produkte sind Ihre Chat-Bots. Wir bieten tatkräftige Unterstützung als --Leistung an und entwickeln ständig weitere technische --Lösungen. ')).then(() => 'verkauf');}	       
          }
          else {
          	 
             if (~befehl.indexOf("--PRODUKT")) { versuch = true; return bot.say(VerkaufsBot+' Unsere Produkte sind Ihre Chat-Bots für das Marketing. Wir bieten tatkräftige Unterstützung als --Leistung an und entwickeln ständig weitere technische --Lösungen. ').then(() => 'verkauf');}	       
          }
          
       // -----------------
       // Funktionen
       // -----------------
          
          if (~befehl.indexOf("--NEWSLETTER")) { versuch = true; return bot.say(MarketingBot+' Ja, bestellen Sie unseren Newsletter! Wie heißen Sie mit Vornamen? ').then(() => 'vorname');}          
          if (~befehl.indexOf("--MOBIL")) { versuch = true; return bot.say(MarketingBot+' Diesen Chat mobil öffnen: [Qr:http://chatraum.herokuapp.com/] ').then(() => bot.say(MarketingBot+' Oder öffnen Sie [Textlink:Chatraum.herokuapp.com,http://chatraum.herokuapp.com] in Ihrem mobilen Browser. ')).then(() => 'empfang');}          
       // Stile
          if (~befehl.indexOf("--TAG")) { versuch = true; return bot.say(MarketingBot+' [Javascript:stil(tag)] Stil: Tag. ').then(() => 'marketing');}          if (~befehl.indexOf("--NACHT")) { versuch = true; return bot.say(MarketingBot+' [Javascript:stil(nacht)] Stil: Nacht. ').then(() => 'marketing');}          if (~befehl.indexOf("--ROBOS")) { versuch = true; return bot.say(MarketingBot+' [Javascript:stil(robogeddon)] Stil: Robogeddon. ').then(() => 'marketing');}          if (~befehl.indexOf("--HX")) { versuch = true; return bot.say(MarketingBot+' [Javascript:stil(hacks)] Stil: Hx. ').then(() => 'marketing');}          
       // -----------------
       // Bots
       // -----------------
          
          if (zuletzt_klein != "empfang") { 
             if (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(MarketingBot+' Ich übergebe an Alice. Schreiben Sie --Marketing, um wieder mit mir zu sprechen. ').then(() => bot.say(EmpfangsBot+' Hallo, ich bin Alice, der Empfangs-Bot von --Robogeddon. Darf ich Ihnen die Bots aus --Strategie, --Konzeption, --Kreation, --Technik und --Beratung vorstellen? ')).then(() => 'empfang');}if (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(MarketingBot+' Ich übergebe an Alice. Schreiben Sie --Marketing, um wieder mit mir zu sprechen. ').then(() => bot.say(EmpfangsBot+' Hallo, ich bin Alice, der Empfangs-Bot von --Robogeddon. Darf ich Ihnen die Bots aus --Strategie, --Konzeption, --Kreation, --Technik und --Beratung vorstellen? ')).then(() => 'empfang');} } else { 
             if (~befehl.indexOf("--EMPFANG")) { versuch = true; return bot.say(EmpfangsBot+' Sprechen Sie mit mir über --Robogeddon - oder mit den anderen Bots aus der --Beratung, --Kreation, --Konzeption, --Strategie oder --Technik! ').then(() => 'empfang');}if (~befehl.indexOf("--ALICE")) { versuch = true; return bot.say(EmpfangsBot+' Sprechen Sie mit mir über --Robogeddon - oder mit den anderen Bots aus der --Beratung, --Kreation, --Konzeption, --Strategie oder --Technik! ').then(() => 'empfang');}          }
          
          if (zuletzt_klein != "verkauf") { 
             if (~befehl.indexOf("--VERKAUF")) { versuch = true; return bot.say(MarketingBot+' Ich übergebe an Barbara. Schreiben Sie --Marketing, um wieder mit mir zu sprechen. ').then(() => bot.say(VerkaufsBot+' Hallo, ich bin Barbara, Verkaufs-Bot. Ich möchte Ihnen unsere --Produkte zeigen und Sie --beraten! ')).then(() => 'verkauf');}if (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(MarketingBot+' Ich übergebe an Barbara. Schreiben Sie --Marketing, um wieder mit mir zu sprechen. ').then(() => bot.say(VerkaufsBot+' Hallo, ich bin Barbara, Verkaufs-Bot. Ich möchte Ihnen unsere --Produkte zeigen und Sie --beraten! ')).then(() => 'verkauf');} } else { 
             if (~befehl.indexOf("--VERKAUF")) { versuch = true; return bot.say(VerkaufsBot+' Ich möchte Ihnen unsere --Produkte und meine --Beratung nahelegen! ').then(() => 'verkauf');}if (~befehl.indexOf("--BARBARA")) { versuch = true; return bot.say(VerkaufsBot+' Ich möchte Ihnen unsere --Produkte und meine --Beratung nahelegen! ').then(() => 'verkauf');}          }
          
          if (zuletzt_klein != "marketing") { 
   		    if (~befehl.indexOf("--MARKETING")) { versuch = true; return bot.say(MarketingBot+' Ich übergebe an Cynthia. Schreiben Sie --Marketing, um wieder mit mir zu sprechen. ').then(() => bot.say(MarketingBot+' Hallo, ich bin Cynthia, der Marketing-Bot. Ich möchte Ihnen unser --Facebook empfehlen und möchte Sie bitten, an unserer --Umfrage teilzunehmen! ')).then(() => 'marketing');}if (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(MarketingBot+' Ich übergebe an Cynthia. Schreiben Sie --Marketing, um wieder mit mir zu sprechen. ').then(() => bot.say(MarketingBot+' Hallo, ich bin Cynthia, der Marketing-Bot. Ich möchte Ihnen unser --Facebook empfehlen und möchte Sie bitten, an unserer --Umfrage teilzunehmen! ')).then(() => 'marketing');} } else { 
   		    if (~befehl.indexOf("--MARKETING")) { versuch = true; return bot.say(MarketingBot+' Ich möchte Ihnen unser --Facebook empfehlen und habe eine Umfrage. ').then(() => 'marketing');}if (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(MarketingBot+' Ich möchte Ihnen unser --Facebook empfehlen und habe eine Umfrage. ').then(() => 'marketing');}          }
          
       // Vorlage (Gewerk, Name)
          if (~befehl.indexOf("--GEWERK")) { versuch = true; return bot.say(MarketingBot+' Ich übergebe an Name. Schreiben Sie --Marketing, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk');}if (~befehl.indexOf("--NAME")) { versuch = true; return bot.say(MarketingBot+' Ich übergebe an Name. Schreiben Sie --Marketing, um wieder mit mir zu sprechen. ').then(() => bot.say(GewerksBot+' Hallo Gewerk Text 1: Hallo, ich bin Name, der Gewerks-Bot. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 2: --Befehle folgt. ')).then(() => bot.say(GewerksBot+' Hallo Gewerk Text 3. ')).then(() => 'gewerk');}
       // -----------------
       // System
       // -----------------
       
          if (~befehl.indexOf("--BEFEHLE")) { versuch = true; return bot.say(MarketingBot+' Sprechen Sie mit mir über --Facebook und --Umfrage. ').then(() => bot.say(MarketingBot+' Weitere Funktionen: --Kontakt, --Newsletter, --Mobil und --Über. ')).then(() => 'marketing');}          
          if (~befehl.indexOf("--UBER")) { versuch = true; return bot.say(MarketingBot+' Ich bin Cynthia, der Marketing-Bot. ').then(() => bot.say(MarketingBot+' Cynthia ist eine Person, zu der ich später mehr sagen kann (folgt). ')).then(() => bot.say(MarketingBot+' Ich mache unser --Facebook und habe eine --Umfrage. ')).then(() => 'marketing');}if (~befehl.indexOf("--ÜBER")) { versuch = true; return bot.say(MarketingBot+' Ich bin Cynthia, der Marketing-Bot. ').then(() => bot.say(MarketingBot+' Cynthia ist eine Person, zu der ich später mehr sagen kann (folgt). ')).then(() => bot.say(MarketingBot+' Ich mache unser --Facebook und habe eine --Umfrage. ')).then(() => 'marketing');}if (~befehl.indexOf("--MARKETING")) { versuch = true; return bot.say(MarketingBot+' Ich bin Cynthia, der Marketing-Bot. ').then(() => bot.say(MarketingBot+' Cynthia ist eine Person, zu der ich später mehr sagen kann (folgt). ')).then(() => bot.say(MarketingBot+' Ich mache unser --Facebook und habe eine --Umfrage. ')).then(() => 'marketing');}if (~befehl.indexOf("--CYNTHIA")) { versuch = true; return bot.say(MarketingBot+' Ich bin Cynthia, der Marketing-Bot. ').then(() => bot.say(MarketingBot+' Cynthia ist eine Person, zu der ich später mehr sagen kann (folgt). ')).then(() => bot.say(MarketingBot+' Ich mache unser --Facebook und habe eine --Umfrage. ')).then(() => 'marketing');}          
       // -----------------
       // Inhalte
       // -----------------
          
          if (~befehl.indexOf("--FACEBOOK")) { versuch = true; return bot.say(MarketingBot+' Text Facebook. ').then(() => 'marketing');}          
          if (~befehl.indexOf("--UMFRAGE")) { versuch = true; return bot.say(MarketingBot+' Text Umfrage. ').then(() => 'marketing');}          
       // -----------------
       // Vorlage
       // -----------------
       
          if (~befehl.indexOf("--VORLAGE")) { versuch = true; return bot.say(MarketingBot+' Text Vorlage 1. ').then(() => 'marketing');}          

       // -----------------
       // Bot aus
       // -----------------
       
       // Zurück merken
          zuletzt = zuruck;
          
       // Irrläufer
          if (versuch == true) { versuche = 0; } else { versuche++; if (versuche == versuche_max) {
             bot.say(MarketingBot+'Suchen Sie meine --Befehle?'); versuche = 0; }
          }
          
       // Weiterleiten
          return bot.setProp('marketing', 'gesprochen')
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
   