
 // Jquery ready
    $(document).ready(function() { 
       
       
       
    });
    
 // Addon vom 22.6.16
    function addon(methode) {
       
       if (methode == "nachInit") {
       	 
          $(".sk-messages-container").prepend('<div class="sk-intro">'+texte["chat"]["startText"]+'</div>');
          
          $(".sk-from").remove();
          $(".sk-left-row").prepend('<div class="sk-from">Absender</div>');
          
       }
       
       if (methode == "nachNachricht") {
       	 
          $(".sk-row").filter("[data-fromt!='true']").find(".sk-from").remove();
          $(".sk-left-row").filter("[data-fromt!='true']").attr("data-fromt","true").prepend('<div class="sk-from">Absender</div>');
          
       }
       
    }
    