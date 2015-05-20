// Upload time
function UploadClock( ) {
    var d = new Date(),        
        h = d.getHours(),
        m = d.getMinutes();
    
    if(h < 10) {h = '0' + h}; 
    if(m < 10) {m = '0' + m};
    
    $('.hour').html(h + ' ' +'<span class="colon">:</span>' + ' ' + m);
};


$(document).ready(function(){

    
    
// ---------------------------------------------------------------
// Selection. by http://playground.deaxon.com/js/object-selection/
// ---------------------------------------------------------------
    
$(function(e){
 var target = $( e.target ),
     d = $('.desktop'),
     selection;
    
  d.mousedown(function(e){
      var target = $( e.target );
      if( $(target).parents('.window').length  || target.is('.ui-draggable') ) {

      } else {
          var initialxpos = e.pageX,
          initialypos = e.pageY,
          selectionId = "selection";
          $(".desktop")
            .append($(document.createElement("span")).attr("id", selectionId));
          selection = $("#" + selectionId);
          d.mousemove(function(e){
            var cursorxpos = e.pageX,
                cursorypos = e.pageY,
                dw = d.width(),
                dh = d.height(),
                styleValue = "visibility:visible;";
            if(cursorxpos > initialxpos)
              styleValue += "left:" + initialxpos + "px;" +
                            "width:" + (cursorxpos - initialxpos) + "px;" +
                            "max-width:" + (dw - initialxpos - 2) + "px;";
            else
              styleValue += "right:" + (dw - initialxpos) + "px;" +
                            "width:" + (initialxpos - cursorxpos) + "px;";
            if(cursorypos > initialypos)
              styleValue += "top:" + initialypos + "px;" +
                            "height:" + (cursorypos - initialypos) + "px;" +
                            "max-height:" + (dh - initialypos - 2) + "px;";
            else
              styleValue += "bottom:" + (dh - initialypos) + "px;" +
                            "height:" + (initialypos - cursorypos) + "px;";
            selection.attr("style", styleValue);
          });
          
          d.mouseup(function(){
            selection.remove();
        });
          
      }
      
    })
});
    
// -------------------------------------------
// -------------------------------------------
// Horloge.
// -------------------------------------------
   
    var zIndex = 1;
    var d= new Date(),
        j= d.getDate(),
        m= d.getMonth(),
        tab_m = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"),
        y= d.getFullYear();
    
    if(j < 10) {
        j = '0' + j;
    }; 
    
    $('.date .year').html(' ' + y);
    $('.date .day').html(j + ' ' +  tab_m[m]);
    
    setTimeout( function() {
        $('.booting h2 span').addClass('animGo');
    },3000);
    
    setInterval(UploadClock,1000);
    
  // -------------------------------------------
    
     var tuto = localStorage.getItem("tuto");
    
    $('.tuto .close-tuto').click(function(){
        var tuto = localStorage.setItem("tuto","ok");
        $('.tuto').css('opacity','0');
        $('.menu').addClass('translate');
        $('.dock').addClass('dock-slide');
        $('.tuto').hide();
    });
    
    $('#first-window .next').click(function(){
        $('#first-window').css('left','-200%');
        $('#second-window').css('top','0');
        setTimeout(function(){
                $('#first-window').hide()
        },1000);
    });
    
    $('#second-window .next').click(function(){
        $('#second-window').css('left','-200%');
        $('#last-window').css('top','0');
        setTimeout(function(){
                $('#second-window').hide()
        },1000);
    });
    
    
    if( tuto == "ok") {
        $('.tuto').remove();
        $('.menu').addClass('translate');
        $('.dock').addClass('dock-slide');
    }
    
    
    
  // -------------------------------------------
    
    $('#searchsubmit').click(function(){
        $('#searchresult').css('display','block');
        
        if( $('#searchresult').is(':visible') ) {
        $('.navigation-actions .left li:first-child a').click(function(){
            $('#serchresult').parents('.windowbody').css('padding', '0');
            $('#searchresult').hide();
        });
    } else { $('#serchresult').parents('.windowbody').css('padding', '0 9%'); }
    });
    
   // -------------------------------------------
    
    $('.window-archive section input[type="submit"]').click(function(){
        
            $(this).parents().closest('.window').addClass('shake');
            $(this).parent().find('input[type="password"]').addClass('error-input');
            setTimeout(function(){
                
                $('.window').removeClass('shake');
                $('input[type="password"]').removeClass('error-input');
            },1000)

    });
    
    $('.window-archive section input[type="password"]').bind("pressEnter",function(e){
        
        $(this).parents().closest('.window').addClass('shake');
            $(this).parent().find('input[type="password"]').addClass('error-input');
            setTimeout(function(){
                
                $('.window').removeClass('shake');
                $('input[type="password"]').removeClass('error-input');
            },1000)
        
        });
        
    $('.window-archive section input[type="password"]').keyup(function(e){
        if(e.keyCode == 13)
        {
          $(this).trigger("pressEnter");
        }
    });

  
  // -------------------------------------------
    
    $('#notif .cont a:last-child').click(function(){
        $('#notif').removeClass('notif-pop');
    });

 // ------------------------------------------- 
    $('.toolbar ul').each(function() {
        var window = $(this).closest('.window'); 
        
        $(this).find('a').click(function(e) {
            e.preventDefault();
        });
        
        $(this).find('.window-close-button').click(function(e) {
            
            $(window).addClass('window-closed');
            
            setTimeout(function(){
                $(window).hide()
                $(window).removeClass('window-active');
            },300);
            
            var dockWidth = $('.dock').width(),
                windowName = $(window).data('window');
            
            $('.dock ul li a[data-window="'+ windowName + '"]').parent().removeClass('dock-item--open');
            $('.dock ul li a[data-window="'+ windowName + '"]').parent().removeClass('dock-item--minimized');
            
            $('.dock ul .litte-app a[data-window="'+ windowName + '"]').each(function(){
                $('.dock ul .litte-app a[data-window="'+ windowName + '"]').parent().remove();
                $('.dock').width(dockWidth-72);
            });
            
            
        });
        
        // remove dock icon for links and desktop softwares.
        $(this).find('.window-minimize-button').click(function(e) {
            $(window).addClass('window-minimized');
            
            var windowName = $(window).data('window');
            $('.dock ul li a[data-window="'+ windowName + '"]').parent().removeClass('dock-item--open');
            $('.dock ul li a[data-window="'+ windowName + '"]').parent().addClass('dock-item--minimized');
            
        });
        
        $(this).find('.window-maximize-button').click(function(e) {
            $(window).toggleClass('window-maximized');
            
        });
        
    });
    
// -------------------------------------------
// Emails.
// -------------------------------------------

    $('.messages-list li a').click(function(){
        var emailNumber = $(this).data('message');
        $('.mails-messages #intro').hide();
        $('.message').hide();
        $('.message[data-message="'+ emailNumber + '"]').addClass('message-open').show();
    });
     
    $('.window[data-window="mail"]').resizable({
        resize: function() {
            var mailWidth = $(this).width();
            
            if(mailWidth < 903 ) {
                $('.profil-picture').addClass('masking');
                $('.message-title').addClass('expand-size');
                $('.message-title p:last-child').addClass('addPadding');
                $('.yann-profile').addClass('masking');
                $('.mails-toolbar .top-toolbar').addClass('toolbar-adapt');
                $('.panel-toolbar').addClass('panel-adapt');
                $('.message-infos .navigation').addClass('navigation-adapt');
            } else {
                $('.profil-picture').removeClass('masking');
                $('.message-title').removeClass('expand-size');
                $('.message-title p:last-child').removeClass('addPadding');
                $('.yann-profile').removeClass('masking');
                $('.mails-toolbar .top-toolbar').removeClass('toolbar-adapt');
                $('.panel-toolbar').removeClass('panel-adapt');
                $('.message-infos .navigation').removeClass('navigation-adapt');
            }
        }
       
    });
    
     
    
    var countNewMail = 3;
    
    var emailCount = localStorage.getItem('mail');
    
    if ( emailCount == 0 ) { 
        $('.new-mail').css('display','none');
        
        $('.new').each(function(){
            $(this).removeClass('new').addClass('old');
        });
        
    }
    
    $('.new').click(function(){
        
        if( $(this).is('.new') ) {
            countNewMail --;
            localStorage['emailCount'] = countNewMail; 
            $('.new-mail').text(countNewMail);
            if ( countNewMail == 0 ) { 
                localStorage['mail'] = 0;
                $('.new-mail').css('display','none');
            }
        }
    });
    
    //mails
    $('.messages-list li a').click(function(){
        $('.messages-list li a').removeClass('active');
        $(this).addClass('active');
        
        if($(this).is('.new')) { 
            $(this).removeClass('new');
            $(this).addClass('old');
        }
    });
        
// -------------------------------------------
    
    
// -------------------------------------------
// answer Emails.
// -------------------------------------------
    var message1answer = localStorage.getItem("message1answer"),
        message2answer = localStorage.getItem("message2answer"),
        message3answer = localStorage.getItem("message3answer"),
        message4answer = localStorage.getItem("message4answer"),
        message5answer = localStorage.getItem("message5answer"),
        message6answer = localStorage.getItem("message6answer"),
        message7answer = localStorage.getItem("message7answer"),
        message8answer = localStorage.getItem("message8answer"),
        message10answer = localStorage.getItem("message10answer");
        
    $('.message[data-message="message1"] .navigation li:first-child a').click(function(){
        var message1answer = localStorage.setItem('message1answer', 'rep1-ok');
        $(this).addClass('answered');
        $('.message[data-message="message1"] .answer').typed({
        strings: ["<p>Salut Harry, </p><p>Désolé de pas avoir prévenu, tu dois comprendre que j’ai pas mal de soucis pour le</p><p>moment et je dois dire que vous prévenir n’est pas rentré dans mes priorités.</p><p>Je tâcherai de passer quand je serai moins nerveux, j’ai un problème à régler avant.</p><p>Pour les rumeurs, je suis au courant. Je crois que Rachelle n’est pas</p><p>innocente quant à la diffusion de ces ragots.</p><p> Je pense qu’elle a été voir la police pour qu’ils enquêtent sur moi. </p><p>Tu sais que ma vie n’a pas été rose ces dernières années.</p><p>Je m’accroche...</p><p>Passe le bonjour à Flo et merci pour votre soutien,</p><p>Yann.</p>"],
        typeSpeed: 0
      });
    });
    
    if( message1answer == 'rep1-ok' ) {
        $('.message[data-message="message1"] .navigation li:first-child a').addClass('answered');
        $('.message[data-message="message1"] .navigation li:first-child a').unbind();
        $('.message[data-message="message1"] .answer').append('<p>Salut Harry, </p><p>Désolé de pas avoir prévenu, tu dois comprendre que j’ai pas mal de soucis pour le</p><p>moment et je dois dire que vous prévenir n’est pas rentré dans mes priorités.</p><p>Je tâcherai de passer quand je serai moins nerveux, j’ai un problème à régler avant.</p><p>Pour les rumeurs, je suis au courant. Je crois que Rachelle n’est pas</p><p>innocente quant à la diffusion de ces ragots.</p><p> Je pense qu’elle a été voir la police pour qu’ils enquêtent sur moi. </p><p>Tu sais que ma vie n’a pas été rose ces dernières années.</p><p>Je m’accroche...</p><p>Passe le bonjour à Flo et merci pour votre soutien,</p><p>Yann.</p>');  
    } 
    
    /* ---------------------------------------- */
    
    $('.message[data-message="message2"] .navigation li:first-child a').click(function(){
        var message2answer = localStorage.setItem('message2answer','rep2-ok');
        $(this).addClass('answered');
        $('.message[data-message="message2"] .answer').typed({
        strings: ["<p>Bonjour Mme Redoux,</p><p>Merci pour votre invitation mais je suis dans le regret de devoir vous annoncer</p><p> que je décline cette dernière.</p><p>Comme vous devez sans doute vous en douter, je n’ai pas la tête à cela et je n’ai rien à dire à vos lecteurs.</p><p>Je n’ai bien entendu rien à voir avec cette histoire et donc rien à expliquer. Laissez-moi retrouver ma fille.</p><p>La seule chose que vous pouvez m’offrir est un peu de tranquillité...</p><p>Merci de votre compréhension.</p><p>Yann Dorner.</p>"],
        typeSpeed: 0
      });
    });
    
    if( message2answer == 'rep2-ok' ) {
        
        $('.message[data-message="message2"] .navigation li:first-child a').unbind();
        $('.message[data-message="message2"] .navigation li:first-child a').addClass('answered');
        $('.message[data-message="message2"] .answer').append('<p>Bonjour Mme Redoux,</p><p>Merci pour votre invitation mais je suis dans le regret de devoir vous annoncer</p><p> que je décline cette dernière.</p><p>Comme vous devez sans doute vous en douter, je n’ai pas la tête à cela et je n’ai rien à dire à vos lecteurs.</p><p>Je n’ai bien entendu rien à voir avec cette histoire et donc rien à expliquer. Laissez-moi retrouver ma fille.</p><p>La seule chose que vous pouvez m’offrir est un peu de tranquillité...</p><p>Merci de votre compréhension.</p><p>Yann Dorner.</p>');  
    } 
    
    /* ---------------------------------------- */
    
    $('.message[data-message="message3"] .navigation li:first-child a').click(function(){
        var message3answer = localStorage.setItem('message3answer','rep3-ok');
        $(this).addClass('answered');
        $('.message[data-message="message3"] .answer').typed({
        strings: ["<p>Attends t'es sérieuse là ???</p><p>Tu crois vraiment que je suis capable d'enlever ma propre fille pour emmerder mon ex ?</p><p>J'en profiterais en même temps pour anéantir ma carrière et le semblant de vie de</p><p>famille qu'il me reste ! T'es aussi gourde que t'en as l'air. Réfléchie deux minutes et</p><p>si t'es assez intelligente pour ça, ne m'adresse plus JAMAIS la parole.</p>"],
        typeSpeed: 0
      });
    });
    
    if( message3answer == 'rep3-ok' ) {
        
        $('.message[data-message="message3"] .navigation li:first-child a').unbind();
        $('.message[data-message="message3"] .navigation li:first-child a').addClass('answered');;
        $('.message[data-message="message3"] .answer').append("<p>Attends t'es sérieuse là ???</p><p>Tu crois vraiment que je suis capable d'enlever ma propre fille pour emmerder mon ex ?</p><p>J'en profiterais en même temps pour anéantir ma carrière et le semblant de vie de</p><p>famille qu'il me reste ! T'es aussi gourde que t'en as l'air. Réfléchie deux minutes et</p><p>si t'es assez intelligente pour ça, ne m'adresse plus JAMAIS la parole.</p>");  
    } 
    
     /* ---------------------------------------- */
    
    $('.message[data-message="message4"] .navigation li:first-child a').click(function(){
        var message4answer = localStorage.setItem('message4answer','rep4-ok');
        $(this).addClass('answered');
        $('.message[data-message="message4"] .answer').typed({
        strings: ["<p>Ce n'est pas ce que tu crois, je fais tout pour retrouver Clara, je m'en veux et tu le sais.</p><p>J'ai une piste, mais je ne peux rien te dire pour le moment. C'est... Dangereux.</p><p>Je n'ai que faire des rumeurs, cela ne m'atteint pas, pas plus que la police. </p>"],
        typeSpeed: 0
      });
    });
    
    if( message4answer == 'rep4-ok' ) {
        
        $('.message[data-message="message4"] .navigation li:first-child a').unbind();
        $('.message[data-message="message4"] .navigation li:first-child a').addClass('answered');
        $('.message[data-message="message4"] .answer').append("<p>Ce n'est pas ce que tu crois, je fais tout pour retrouver Clara, je m'en veux et tu le sais.</p><p>J'ai une piste, mais je ne peux rien te dire pour le moment. C'est... Dangereux.</p><p>Je n'ai que faire des rumeurs, cela ne m'atteint pas, pas plus que la police. </p>");  
    } 
    
     /* ---------------------------------------- */
    
    $('.message[data-message="message5"] .navigation li:first-child a').click(function(){
        var message5answer = localStorage.setItem('message5answer','rep5-ok');
        $(this).addClass('answered');
        $('.message[data-message="message5"] .answer').typed({
        strings: ["<p>Bonjour Mr. Lantier,</p><p>Je comprends tout à fait et la biographie indiquée correspond parfaitement à celle</p><p> que j'ai envoyé précédemment. Vous pouvez donc continuer le processus.</p><p>Bonne semaine,</p><p>Yann Dorner</p>"],
        typeSpeed: 0
      });
    });
    
    if( message5answer == 'rep5-ok' ) {
        
        $('.message[data-message="message5"] .navigation li:first-child a').unbind();
        $('.message[data-message="message5"] .navigation li:first-child a').addClass('answered');
        $('.message[data-message="message5"] .answer').append("<p>Bonjour Mr. Lantier,</p><p>Je comprends tout à fait et la biographie indiquée correspond parfaitement à celle</p><p> que j'ai envoyé précédemment. Vous pouvez donc continuer le processus.</p><p>Bonne semaine,</p><p>Yann Dorner</p>");  
    } 
    
    /* ---------------------------------------- */
    
    $('.message[data-message="message6"] .navigation li:first-child a').click(function(){
        var message6answer = localStorage.setItem('message6answer','rep4-ok');
        $(this).addClass('answered');
        $('.message[data-message="message6"] .answer').typed({
        strings: ["<p>Salut Josh,</p><p>Mon téléphone est débranché, je n'arrête pas d'être harcelé par les médias.</p><p>Tu as mon numéro de GSM tu n'as qu'à te servir de celui-là.</p><p>Pour le livre, c'est en bonne voie, il me reste une conclusion à définir pour</p><p>le chapitre 6. Je pense que je vais tuer le personnage, je verrai où cela va mener.</p><p>Ce sera dans ta boîte Lundi matin, promis.</p>"],
        typeSpeed: 0
      });
    });
    
    if( message6answer == 'rep6-ok' ) {
        
        $('.message[data-message="message6"] .navigation li:first-child a').unbind();
        $('.message[data-message="message6"] .navigation li:first-child a').addClass('answered');
        $('.message[data-message="message6"] .answer').append("<p>Salut Josh,</p><p>Mon téléphone est débranché, je n'arrête pas d'être harcelé par les médias.</p><p>Tu as mon numéro de GSM tu n'as qu'à te servir de celui-là.</p><p>Pour le livre, c'est en bonne voie, il me reste une conclusion à définir pour</p><p>le chapitre 6. Je pense que je vais tuer le personnage, je verrai où cela va mener.</p><p>Ce sera dans ta boîte Lundi matin, promis.</p>");  
    } 
    
    /* ---------------------------------------- */
    
    $('.message[data-message="message7"] .navigation li:first-child a').click(function(){
        var message7answer = localStorage.setItem('message7answer','rep7-ok');
        $(this).addClass('answered');
        $('.message[data-message="message7"] .answer').typed({
        strings: ["<p>Salut Max,</p><p>Oui, j’ai des petits soucis et je n’ai pas le temps de participer à ces marches,</p><p>à mon grand regret.Ne t’en fait pas pour Rachelle, je suis au courant de ce qui</p><p>se dit sur moi mais je sais que les gens</p><p> pourront faire la différence entre le vrai du faux.</p><p>Je pense donner des nouvelles à la presse, mais vraiment pas maintenant,</p><p>je dois régler quelque chose avant.</p><p>Merci de ton soutien Max, ça me touche.</p>"],
        typeSpeed: 0
      });
    });
    
    if( message7answer == 'rep7-ok' ) {
        
        $('.message[data-message="message7"] .navigation li:first-child a').unbind();
        $('.message[data-message="message7"] .navigation li:first-child a').addClass('answered');
        $('.message[data-message="message7"] .answer').append("<p>Salut Max,</p><p>Oui, j’ai des petits soucis et je n’ai pas le temps de participer à ces marches,</p><p>à mon grand regret.Ne t’en fait pas pour Rachelle, je suis au courant de ce qui</p><p>se dit sur moi mais je sais que les gens</p><p> pourront faire la différence entre le vrai du faux.</p><p>Je pense donner des nouvelles à la presse, mais vraiment pas maintenant,</p><p>je dois régler quelque chose avant.</p><p>Merci de ton soutien Max, ça me touche.</p>");  
    } 
    
     /* ---------------------------------------- */
    
    $('.message[data-message="message8"] .navigation li:first-child a').click(function(){
        var message8answer = localStorage.setItem('message8answer','rep8-ok');
        $(this).addClass('answered');
        $('.message[data-message="message8"] .answer').typed({
        strings: ["<p>Bonjour Will,</p><p>Un grand merci pour ce que vous avez fait, je sais que vous avez dû</p><p>enfreindre quelques règles pour ce dossier</p><p>mais j'en avais réellement besoin.</p><p>Quand tout ça sera terminé, je vous expliquerai.</p><p>En attendant, ne parlez de ça à personne.</p>"],
        typeSpeed: 0
      });
    });
    
    if( message8answer == 'rep8-ok' ) {
        
        $('.message[data-message="message8"] .navigation li:first-child a').unbind();
        $('.message[data-message="message8"] .navigation li:first-child a').addClass('answered');
        $('.message[data-message="message8"] .answer').append("<p>Bonjour Will,</p><p>Un grand merci pour ce que vous avez fait, je sais que vous avez dû</p><p>enfreindre quelques règles pour ce dossier</p><p>mais j'en avais réellement besoin.</p><p>Quand tout ça sera terminé, je vous expliquerai.</p><p>En attendant, ne parlez de ça à personne.</p>");  
    } 
    
    /* ---------------------------------------- */
    
    $('.message[data-message="message10"] .navigation li:first-child a').click(function(){
        var message10answer = localStorage.setItem('message10answer','rep10-ok');
        $(this).addClass('answered');
        $('.message[data-message="message10"] .answer').typed({
        strings: ["<p>Salut Maman, je te sonne ce soir.</p>"],
        typeSpeed: 0
      });
    });
    
    if( message10answer == 'rep10-ok' ) {
        
        $('.message[data-message="message10"] .navigation li:first-child a').unbind();
        $('.message[data-message="message10"] .navigation li:first-child a').addClass('answered');
        $('.message[data-message="message10"] .answer').append("<p>Salut Maman, je te sonne ce soir.</p>");  
    } 
    
// -------------------------------------------
    
// -------------------------------------------
// Brouillard-navigation.
// -------------------------------------------
    $('.pdf-bottom ul li:nth-child(2)').text('1/4');
    $('.page').first().addClass('page-visible');  
    $('.page').hide();    
    $('.page-visible').show();
    

    $('.pdf-bottom ul li:last-child a').click(function(){
        $('.page-visible').removeClass('page-visible').addClass('oldVisible');    
            if ( $('.oldVisible').is(':last-child')) {
                $('.page').first().addClass('page-visible');
            } else{
                $('.oldVisible').next().addClass('page-visible');
            }
            
        $('.oldVisible').removeClass('oldVisible');
        $('.page').hide();
        $('.page-visible').show();
        
        if( $('#page1').is('.page-visible') ) { $('.pdf-bottom ul li:nth-child(2)').text('1/4'); };
        if( $('#page2').is('.page-visible') ) { $('.pdf-bottom ul li:nth-child(2)').text('2/4'); };
        if( $('#page3').is('.page-visible') ) { $('.pdf-bottom ul li:nth-child(2)').text('3/4'); };
        if( $('#page4').is('.page-visible') ) { $('.pdf-bottom ul li:nth-child(2)').text('4/4'); };

    });
    

    $('.pdf-bottom ul li:first-child a').click(function(){
        $('.page-visible').removeClass('page-visible').addClass('oldVisible');    
        if ( $('.oldVisible').is(':first-child')) {
            $('.page').last().addClass('page-visible');
        } else{
            $('.oldVisible').prev().addClass('page-visible');
        }
        
        $('.oldVisible').removeClass('oldVisible');
        $('.page').hide();
        $('.page-visible').show();
        
        if( $('#page1').is('.page-visible') ) { $('.pdf-bottom ul li:nth-child(2)').text('1/4'); };
        if( $('#page2').is('.page-visible') ) { $('.pdf-bottom ul li:nth-child(2)').text('2/4'); };
        if( $('#page3').is('.page-visible') ) { $('.pdf-bottom ul li:nth-child(2)').text('3/4'); };
        if( $('#page4').is('.page-visible') ) { $('.pdf-bottom ul li:nth-child(2)').text('4/4'); };
        
            
    });
    
    
    
// -------------------------------------------
    
    
    $(function() {
        $('.window:visible').each(function() {
          var appName = $(this).data('window');

         $('.dock ul li a[data-window="' + appName + '"]').parent().addClass('dock-item--open');

        if( $('.window[data-window="'+ appName +'"]').hasClass('window-closed') ) { 
            $('.dock ul li a[data-window="' + appName + '"]').parent().removeClass('dock-item--open');
            $('dock ul .litte-app a[data-window="'+appName+'"] span').remove();
        }else{}

        });

        $('.window:hidden').each(function() {
          $(this).addClass('window-opening');
        });
  });
    
    $('.window').click(function(e){
        var appName = $(this).data('window'),
            target = $(e.target);

        if ( !$(this).is('.window-active') && !target.is('.window a') && !target.is('.message-content a img') && !target.is('.message-content a figure') && !target.parents().hasClass('.mails-toolbar') && !target.is('#notif a')) {
            $('.window').removeClass('window-active');
        }
      
        if( !target.is('.window  a') && !target.is('.message-content a img') && !target.is('.message-content a figure') ) {
            $(this).addClass('window-active');
            $(this).css({'z-index' : zIndex++});
            
        } else {  }
    
      
      
      var targetDock = $('.dock ul li a[data-window="' + appName + '"]').parent();


      if( $(this).hasClass('window-active') ) {
          $('.dock ul li').removeClass('dock-item--open');
          $(targetDock).addClass('dock-item--open');
      }
      
  });    

  
  function openSoftware(e) {
    var appName = $(this).data('window'),
        targetWindow = $('.window[data-window="' + appName + '"]'),
        targetDock = $('.dock ul li a[data-window="' + appName + '"]').parent(),
        target = $(e.target),
        dockWidth = $('.dock').width(),
        appDockName = $(this).find('span').text();
        
    e.preventDefault();
      
    
      
    $('.dock ul li').removeClass('dock-item--minimized');
    
    if ( targetWindow.is(':visible') ) {

      if ( targetWindow.hasClass('window-active') ) {
        
        $(targetWindow).removeClass('window-active');
        $(targetWindow).toggleClass('window-minimized');

        if ( !targetWindow.hasClass('window-minimized') ) {
            
          $('.window').removeClass('window-active');
          $(targetWindow).removeClass('window-closed');

         $(targetWindow).addClass('window-active').css({ 
            'z-index' : zIndex++
          });
          
         $(targetDock).addClass('dock-item--open');
        }
      } else {
        // open soft if it's closed
        $('.window').removeClass('window-active');
        $(targetWindow).addClass('window-active').removeClass('window-minimized').css({'z-index' : zIndex++});
        $(targetDock).addClass('dock-item--open');
        
        setTimeout(function() {
            $('.window[data-window="' + appName + '"]').removeClass('window-closed');
        }, 500);
          
      } 
        // Add open state on dock icon.
        
        $(targetDock).removeClass('dock-item--open'); 
        $(targetDock).toggleClass('dock-item--minimized');
    } else {
      
      if( !target.parents().hasClass('mails-toolbar') && !target.parents().hasClass('message-infos') ) {
          $('.window').removeClass('window-active');
      }
      
      $('.window[data-window="' + appName + '"]').css({ 'z-index' : zIndex++ }).addClass('window-active').show();
        
      
      setTimeout(function() {
        $('.window[data-window="' + appName + '"]').removeClass('window-closed');
        
      }, 500);
      
      $(targetDock).addClass('dock-item--open');
    }
      
  };
    
    $('a').dblclick(function(e){
      var appName = $(this).data('window'),
          targetWindow = $('.window[data-window="' + appName + '"]'),
          targetDock = $('.dock ul li a[data-window="' + appName + '"]').parent(),
          target = $(e.target),
          dockWidth = $('.dock').width(),
          appDockName = $(this).find('span').text(),
          charCount = appDockName.split("",7),
          fin = charCount.join("")+'...';
        
        if( !$(e.target).parents().hasClass('dock-item-internet') && 
            !$(e.target).parents().hasClass('dock-item-explorer') &&            
            !$(e.target).parents().hasClass('dock-item-mail') && 
            !$(e.target).is('.tuto') &&
            !$(e.target).parents().hasClass('.window-notes') &&
            !$(e.target).hasClass('hidden-link') &&
            !$(e.target).parent().hasClass('.tuto') &&
            !$(e.target).parent().hasClass('.tuto2') ) {
          
          if ( $(e.target).parents().hasClass('folder-file-folder') || 
              $(e.target).hasClass('folder-file-folder') || 
              $(e.target).parents().hasClass('mails-toolbar') || 
              $(e.target).parents().hasClass('navigation') ||
              $(e.target).parents().hasClass('pdf-window') ||
              $(e.target).parents().hasClass('navigation-actions') ) {
              
          } else {
              
              if( $('.dock ul li a[data-window="' + appName + '"]' ).length === 0  ) {
                   $('.dock').width(dockWidth + 78);
                   if( $(e.target).hasClass('pdf') ) {
                       $('.dock ul').append('<li class="litte-app dock-item-pdf"><a href="#" data-window="'+appName+'"><span>'+fin+'</span></a></li>');
                   }
                   if( $(e.target).parents().hasClass('joint') ) {
                       $('.dock ul').append('<li class="litte-app dock-item-pdf"><a href="#" data-window="'+appName+'"><span>dos.pdf</span></a></li>');
                   }
                   if( $(e.target).hasClass('doc')  ) {
                       $('.dock ul').append('<li class="litte-app dock-item-word"><a href="#" data-window="'+appName+'"><span>'+fin+'</span></a></li>');
                   }
                   if( $(e.target).hasClass('folder')  ) {
                       $('.dock ul').append('<li class="litte-app dock-item-folder"><a href="#" data-window="'+appName+'"><span>'+fin+'</span></a></li>');
                   }
                  if( $(e.target).hasClass('enquete') ) {
                       $('.dock ul').append('<li class="litte-app dock-item-folder"><a href="#" data-window="'+appName+'"><span>'+appDockName+'</span></a></li>');
                   }
                   if( $(e.target).children().hasClass('word-icon') || $(e.target).parents().hasClass('word-icon') || $(e.target).hasClass('word-icon') || $(e.target).hasClass('fill-name') ) {
                       $('.dock ul').append('<li class="litte-app dock-item-word"><a href="#" data-window="'+appName+'"><span>'+fin+'</span></a></li>');
                   }
                   if( $(e.target).children().hasClass('img-icon') || $(e.target).parents().hasClass('img-icon') || $(e.target).hasClass('img-icon') ) {
                       $('.dock ul').append('<li class="litte-app dock-item-img"><a href="#" data-window="'+appName+'"><span>'+fin+'</span></a></li>');
                   }
                  if( $(e.target).children().hasClass('note-icon') || $(e.target).parents().hasClass('note-icon') || $(e.target).hasClass('note-icon') ) {
                       $('.dock ul').append('<li class="litte-app dock-item-notes"><a href="#" data-window="'+appName+'"><span>'+fin+'</span></a></li>');
                   }
                  if( $(e.target).children().hasClass('pdf-icon') || $(e.target).parents().hasClass('pdf-icon') || $(e.target).hasClass('pdf-icon') ) {
                       $('.dock ul').append('<li class="litte-app dock-item-pdf"><a href="#" data-window="'+appName+'"><span>'+fin+'</span></a></li>');
                   }
                  if( $(e.target).children().hasClass('ar-icon') || $(e.target).parents().hasClass('ar-icon') || $(e.target).hasClass('ar-icon') ) {
                       $('.dock ul').append('<li class="litte-app dock-item-ar"><a href="#" data-window="'+appName+'"><span>'+fin+'</span></a></li>');
                   }


            } 
              
          }
        
       
       
    } 
      
    $('.litte-app a').click(openSoftware);  
  }); 

/* ------------------------------------------------------------ */    

// -------------------------------------------
// Note.
// -------------------------------------------

    $('.window-notes .windowbody ul li a').click(function(){
        var getNoteName = $(this).data('note');
        $('.note-editor div').hide();
        $('.window-notes ul li a').removeClass('targeted');
        $(this).addClass('targeted');
        $('.note-editor div[data-note="'+ getNoteName + '"]').show();
    });

    
/* ------------------------------------------------------------ */    
    
    //change page navigation
    $('.first-enigma').each(function(e){
        $('.left li:first-child a').click(function(){
            $('.first-enigma').hide();
            $('.home').show();
            $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
            $('.window[data-window="internet"] .addressbar').html('nav://home');
        });
        
        $('.launch-enigma1').click(function(){
            $('.home').hide();
            $('.first-enigma').show();
            $('.window[data-window="internet"] .toolbar h3').html('Prêt pour un voyage Yann ? - Navigateur internet');
            $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws');
        });
        
    });
        
    
    // Change folder second level folder
    $('.window[data-window="enquete"] .dossier-principal .folder-file-folder:first-child').dblclick(function(){
            $('.window[data-window="enquete"] .dossier-principal').hide();
            $('.window[data-window="enquete"] .dossier-article').show();
        });
    $('.window[data-window="enquete"] .ariane span:first-child').click(function(){
        $('.window[data-window="enquete"] .dossier-article').hide();
        $('.window[data-window="enquete"] .dossier-principal').show();
    });
    
    $('.window[data-window="travail"] .dossier-principal .folder-file-folder:first-child').dblclick(function(){
            $('.window[data-window="travail"] .dossier-principal').hide();
            $('.window[data-window="travail"] .dossier-cover').show();
        });
    $('.window[data-window="travail"] .ariane span:first-child').click(function(){
        $('.window[data-window="travail"] .dossier-cover').hide();
        $('.window[data-window="travail"] .dossier-principal').show();
    });
    
    $('.window[data-window="travail"] .dossier-principal .folder-file-folder:nth-child(2)').dblclick(function(){
            $('.window[data-window="travail"] .dossier-principal').hide();
            $('.window[data-window="travail"] .dossier-abysse').show();
        });
    $('.window[data-window="travail"] .ariane span:first-child').click(function(){
        $('.window[data-window="travail"] .dossier-abysse').hide();
        $('.window[data-window="travail"] .dossier-principal').show();
    });
    $('.window[data-window="perso"] .dossier-principal .folder-file-folder:nth-child(1)').dblclick(function(){
        $('.window[data-window="perso"] .dossier-principal').hide();
        $('.window[data-window="perso"] .dossier-alsace').show();
    });
    $('.window[data-window="perso"] .ariane span:first-child').click(function(){
        $('.window[data-window="perso"] .dossier-alsace').hide();
        $('.window[data-window="perso"] .dossier-principal').show();
    });
    
   
    
    
    $('.dock ul li a').click(openSoftware);
    $('table .file-list').dblclick(openSoftware);
    $('.logo a').click(openSoftware);
    $('.mails-toolbar a').click(openSoftware);
    $('.hidden-link').click(openSoftware);
    $('.files').dblclick(openSoftware);
    $('.folder').dblclick(openSoftware);
    $('.enquete').dblclick(openSoftware);
    $('.folder-file').dblclick(openSoftware);
    $('.joint').dblclick(openSoftware);
    
    
    // -------------------------------------------
    
// -------------------------------------------
// text editor doc.
// -------------------------------------------
    
        
        $('.window-doc .tools button').click(function() {
            $(this).parents('.window').find('.text-editor').focus();
        });
        
        
          $('.window-doc .tools button[data-func]').click(function(){
            document.execCommand( $(this).data('func'), false );
          });

          $('.window-doc .tools select[data-func]').change(function(){
            var $value = $(this).find(':selected').val();
            document.execCommand( $(this).data('func'), false, $value);
          });

        
    
// -------------------------------------------

  $('.launch-teller').click(function(){
            $('.home').hide();
            $('.window[data-window="internet"] .toolbar h3').html('Yann Dorner - Teller');
            $('.window[data-window="internet"] .addressbar').html('www.teller.tel/yann-dorner.html');
            $('#telleriframe').attr('src','../desktop/teller.html');
            $('#telleriframe').show();

            if ( $('#telleriframe').is(':visible') ) {
                $('.navigation-actions .left li:first-child a').click(function(){
                    $('#telleriframe').hide();
                    $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                    $('.window[data-window="internet"] .addressbar').html('nav://home');
                });
            }
    });
    
    $('.launch-bressier').click(function(){
            $('.home').hide();
            $('.window[data-window="internet"] .toolbar h3').html('L\'affaire Dorner - Plume Bressier');
            $('.window[data-window="internet"] .addressbar').html('www.plume-bressier.be/affaire-dorner.html');
            $('#bressieriframe').attr('src','../desktop/bressier.html');
            $('#bressieriframe').show();

            if ( $('#bressieriframe').is(':visible') ) {
                $('.navigation-actions .left li:first-child a').click(function(){
                    $('#bressieriframe').hide();
                    $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                    $('.window[data-window="internet"] .addressbar').html('nav://home');
                });
            }
    });  
    
// -------------------------------------------
// Unfocus when click on desktop
// -------------------------------------------    

$('.desktop').click(function(e){
    if( !$(e.target).parents().hasClass('window') && !$(e.target).parents().hasClass('dock') && !$(e.target).hasClass('ui-resizable-handle') ) {
        
        $('.window').removeClass('window-active');
    }
});
    
// -------------------------------------------

    
    $('.window').draggable({
        handle: '.toolbar',
        containment: 'parent',
        start: function() {
            $(this).addClass('window-active');
        }
    });
    
    
    
    $('.window').resizable({
        containment: 'parent',
        minWidth: 633,
        minHeight : 300
    });
    $('.fichier-scan').resizable({
        containment: 'parent',
        minWidth: 325,
        minHeight : 400,
        
        });
    
    $('.files').draggable({
        containment: 'parent',
        snap: true
        
    });
    
    $('.pdf-window').resizable({
        containment: 'parent',
        minWidth: 390,
        minHeight : 523
    });
    
    $('.folder, .enquete').draggable({
        containment: 'parent',
        snap: true
        
    });
    
    
    $(document).ajaxComplete(function() {        
        $('.window').draggable({
            handle: '.toolbar',
            containment: 'parent',
            start: function() {
                $(this).addClass('window-active');
            }
        });

        $('.window').resizable({
            containment: 'parent',
            minWidth: 633,
            minHeight : 300
        });

        $('.hidden-link').click(function(e){
            var appName = $(this).data('window'),
                dockWidth = $('.dock').width(),
                appDockName = $(this).find('span').text(),
                filesDockName = $('.desktop').find('.window[data-window="'+appName+'"] .toolbar h3').text(),
                charCount = filesDockName.split("",7),
                fin = charCount.join("")+'...';

            if( $('.dock ul li a[data-window="' + appName + '"]').length === 0 ) {
                   $('.dock').width(dockWidth + 72);
                   $('.dock ul').append('<li class="litte-app dock-item-img"><a href="#" data-window="'+appName+'"><span>'+fin+'</span></a></li>');
               }
            $('.litte-app a').click(openSoftware);  
        });

        $('.hidden-link').click(openSoftware);
        
        $('.launch-teller').click(function(){
            $('.home').hide();
            $('.window[data-window="internet"] .toolbar h3').html('Yann Dorner - Teller');
            $('.window[data-window="internet"] .addressbar').html('www.teller.tel/yann-dorner.html');
            $('#telleriframe').attr('src','../desktop/teller.html');
            $('#telleriframe').show();

            if ( $('#telleriframe').is(':visible') ) {
                $('.navigation-actions .left li:first-child a').click(function(){
                    $('#telleriframe').hide();
                    $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                    $('.window[data-window="internet"] .addressbar').html('nav://home');
                });
            }
        });
        
        $('.launch-bressier').click(function(){
            $('.home').hide();
            $('.window[data-window="internet"] .toolbar h3').html('L\'affaire Dorner - Plume Bressier');
            $('.window[data-window="internet"] .addressbar').html('www.plume-bressier.be/affaire-dorner.html');
            $('#bressieriframe').attr('src','../desktop/bressier.html');
            $('#bressieriframe').show();

            if ( $('#bressieriframe').is(':visible') ) {
                $('.navigation-actions .left li:first-child a').click(function(){
                    $('#bressieriframe').hide();
                    $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                    $('.window[data-window="internet"] .addressbar').html('nav://home');
                });
            }
        });  
        
        $('#searchsubmit').click(function(){
            $('#searchresult').css('display','block');

            if( $('#searchresult').is(':visible') ) {
            $('.navigation-actions .left li:first-child a').click(function(){
                $('#serchresult').parents('.windowbody').css('padding', '0');
                $('#searchresult').hide();
            });
        } else { $('#serchresult').parents('.windowbody').css('padding', '0 9%'); }
        });
    
        

    
});


    
// -------------------------------------------
// Enigmas
// -------------------------------------------
    
    var site = localStorage.getItem("site-statut"),
        diary = localStorage.getItem('diary-entry'),
        tuto2 =  localStorage.getItem("tuto2"),
        answer;
    
    if( tuto2 == 'tuto2-ok') {  $('.tuto2').remove(); }
    
    $('.menu ul li:first-child a').click(function() {
        $(this).text('Journal').css('font-weight','normal');
    });
    
    $('.d-link').click(function(){
        $('.menu ul li:first-child a').text('Journal').css('font-weight','normal');
    });
    
    
    
    
    // First Enigma
    
    function firstEnigma(e) {
        e.preventDefault;
        var answer = $('input#answer-enigma').val();
        
        if( answer == 5040 ) { 
            var site = localStorage.setItem('site-statut', 'site1-ok'),
                diary = localStorage.setItem('diary-entry',2);
            
            $('.tuto2').each(function() {
                    
                    $(this).show();
                    
                    $('.tuto2 .close-tuto').click(function(){
                        tuto2 =  localStorage.setItem("tuto2","tuto2-ok"),
                        $('.tuto2').hide();
                        setTimeout(function() {
                            $('.tuto2').remove();
                        }, 500);
                        
                    });
                    
                });
            
            $('.menu ul li:first-child a').attr('href',"../diary/entry-2.html").text('Journal(1)').css('font-weight','bold');
            
            var attrJournal = $('.menu nav ul li a').attr('href');
            
            
            $('#notif').addClass('notif-pop');
            $('.d-link').attr('href',attrJournal);
            
            $('.menu ul li:first-child a ').addClass('new-article')
                       .delay(3000)
                       .queue(function() {
                           $(this).removeClass("new-article");
                           $(this).dequeue();
                       });
            
            $('.window[data-window="internet"] .windowbody .window-container').load("site2.html");
        
        };
    };
    
    $('.first-enigma #submit-button').click(firstEnigma); 
    $('.first-enigma input[type="text"]').keyup(function(e){
        if(e.keyCode == 13)
        {
          firstEnigma(e);
        };
    });
        
    $(document).ajaxComplete(function() {
    
        // Second enigma
        $('.second-enigma').each(function(e){
            $('.window[data-window="internet"] .toolbar h3').html('Balade romantique - Navigateur internet');
            $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/csvJrrv743');
            $('.left li:first-child a').click(function(){
                $('.second-enigma').hide();
                $('.home').show();
                $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('nav://home');
            });

            $('.launch-enigma2').click(function(){
                $('.home').hide();
                $('.second-enigma').show();
                $('.window[data-window="internet"] .toolbar h3').html('Balade romantique - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/csvJrrv743');
            });
            
            
                function secondEnigma(e) {
                var answer = $('input#answer-enigma').val();
                
                if( answer == 1509 ) {
                    var site = localStorage.setItem('site-statut', 'site2-ok'),
                        diary = localStorage.setItem('diary-entry',3);
                    
                    $('.menu ul li:first-child a ').attr('href',"../diary/entry-3.html").text('Journal(1)').css('font-weight','bold');
                    
                    var attrJournal = $('.menu nav ul li a').attr('href');
            
                    $('#notif').addClass('notif-pop');
                    $('.d-link').attr('href',attrJournal);
                    
                    $('.menu ul li:first-child a ').addClass('new-article')
                       .delay(3000)
                       .queue(function() {
                           $(this).removeClass("new-article");
                           $(this).dequeue();
                       });
                    
                    $('.window[data-window="internet"] .windowbody .window-container').load("site3.html");
                }
                };
            
            $('.second-enigma #submit-button').click(secondEnigma);
            $('.second-enigma input[type="text"]').keyup(function(e){
                if(e.keyCode == 13)
                {
                  secondEnigma(e);
                };
            });
            
            
        });
        
        
        // Third enigma
        $('.third-enigma').each(function(e){
            $('.window[data-window="internet"] .toolbar h3').html('L\'inspiration - Navigateur internet');
            $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/RzV268zzuX');
            $('.left li:first-child a').click(function(){
                $('.third-enigma').hide();
                $('.home').show();
                $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('nav://home');
            });

            $('.launch-enigma3').click(function(){
                $('.home').hide();
                $('.third-enigma').show();
                $('.window[data-window="internet"] .toolbar h3').html('L\'inspiration - Navigateur internet');
            $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/RzV268zzuX');
            });
            
            function thirdEnigma(e) {
                var answer = $('input#answer-enigma').val();
                
                if( answer == 477 ) {
                    var site = localStorage.setItem('site-statut', 'site3-ok'),
                        diary = localStorage.setItem('diary-entry',4);
                    
                    $('.menu ul li:first-child a ').attr('href',"../diary/entry-4.html").text('Journal(1)').css('font-weight','bold');
                    
                    var attrJournal = $('.menu nav ul li a').attr('href');
            
                    $('#notif').addClass('notif-pop');
                    $('.d-link').attr('href',attrJournal);
                    
                    $('.menu ul li:first-child a ').addClass('new-article')
                       .delay(3000)
                       .queue(function() {
                           $(this).removeClass("new-article");
                           $(this).dequeue();
                       });
                    
                    $('.window[data-window="internet"] .windowbody .window-container').load("site4.html");
                }
            };
            
            $('.third-enigma #submit-button').click(thirdEnigma);
            $('.third-enigma input[type="text"]').keyup(function(e){
                if(e.keyCode == 13)
                {
                  thirdEnigma(e);
                };
            });
            
        });
        
        // Fourth enigma
        $('.fourth-enigma').each(function(e){
            $('.window[data-window="internet"] .toolbar h3').html('Le début de la fin - Navigateur internet');
            $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/lD87ddEz1s');
            $('.left li:first-child a').click(function(){
                $('.fourth-enigma').hide();
                $('.home').show();
                $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('nav://home');
            });

            $('.launch-enigma4').click(function(){
                $('.home').hide();
                $('.fourth-enigma').show();
                $('.window[data-window="internet"] .toolbar h3').html('Le début de la fin - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/lD87ddEz1s');
            });
            
            function fourthEnigma(e) {
                var answer = $('input#answer-enigma').val();
                
                if( answer == 8555 ) {
                    var site = localStorage.setItem('site-statut', 'site4-ok'),
                        diary = localStorage.setItem('diary-entry',5);
                    
                    $('.menu ul li:first-child a ').attr('href',"../diary/entry-5.html").text('Journal(1)').css('font-weight','bold');
                    
                    var attrJournal = $('.menu nav ul li a').attr('href');
            
                    $('#notif').addClass('notif-pop');
                    $('.d-link').attr('href',attrJournal);
                    
                    $('.menu ul li:first-child a ').addClass('new-article')
                       .delay(3000)
                       .queue(function() {
                           $(this).removeClass("new-article");
                           $(this).dequeue();
                       });
                    
                    $('.window[data-window="internet"] .windowbody .window-container').load("site5.html");
                }
            };
            
            $('.fourth-enigma #submit-button').click(fourthEnigma);
            $('.fourth-enigma input[type="text"]').keyup(function(e){
                if(e.keyCode == 13)
                {
                  fourthEnigma(e);
                };
            });
        });
        
        // Fourth enigma
        $('.fifth-enigma').each(function(e){
            $('.window[data-window="internet"] .toolbar h3').html('La fin - Navigateur internet');
            $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/sfvvC8Za4s');
            $('.left li:first-child a').click(function(){
                $('.fifth-enigma').hide();
                $('.home').show();
                $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('nav://home');
            });

            $('.launch-enigma5').click(function(){
                $('.home').hide();
                $('.fifth-enigma').show();
                $('.window[data-window="internet"] .toolbar h3').html('La fin - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/sfvvC8Za4s');
            });
            
            
            
        });
    
    });
    
    // -------------------------------------------

    
    
        if(site == 'site1-ok' || answer == 5040) {
            $('.window[data-window="internet"] .windowbody .window-container').load("site2.html", function() {

                $('.tuto2').each(function() {
                    
                    $(this).show();
                    
                    $('.tuto2 .close-tuto').click(function(){
                        tuto2 =  localStorage.setItem("tuto2","tuto2-ok"),
                        $('.tuto2').hide();
                        setTimeout(function() {
                            $('.tuto2').remove();
                        }, 500);
                        
                    });
                    
                });
                
                $('.menu ul li:first-child a ').attr('href',"../diary/entry-2.html");
                
                
                $('.window[data-window="internet"] .toolbar h3').html('Balade romantique - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/csvJrrv743');
                $('.second-enigma').each(function(e){
                    e.preventDefault;
                    $('.left li:first-child a').click(function(){
                        $('.second-enigma').hide();
                        $('.home').show();
                        $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                        $('.window[data-window="internet"] .addressbar').html('nav://home');
                    });

                    $('.launch-enigma2').click(function(){
                        $('.home').hide();
                        $('.second-enigma').show();
                        $('.window[data-window="internet"] .toolbar h3').html('Balade romantique - Navigateur internet');
                        $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/csvJrrv743');
                    });                    
                });
            });
        }
    
        if(site == 'site2-ok' || answer == 1509) {
            $('.window[data-window="internet"] .windowbody .window-container').load("site3.html", function() {

                $('.window[data-window="internet"] .toolbar h3').html('L\'inspiration - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/RzV268zzuX');
                $('.third-enigma').each(function(e){
                    e.preventDefault;
                    $('.left li:first-child a').click(function(){
                        $('.third-enigma').hide();
                        $('.home').show();
                        $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                        $('.window[data-window="internet"] .addressbar').html('nav://home');
                    });

                    $('.launch-enigma3').click(function(){
                        $('.home').hide();
                        $('.third-enigma').show();
                        $('.window[data-window="internet"] .toolbar h3').html('L\'inspiration - Navigateur internet');
                        $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/RzV268zzuX');
                    });                    
                });
            });
            
            $('.menu ul li:first-child a ').attr('href',"../diary/entry-3.html");
        }
    
        if(site == 'site3-ok' || answer == 477) {
            $('.window[data-window="internet"] .windowbody .window-container').load("site4.html", function() {

                $('.window[data-window="internet"] .toolbar h3').html('Le début de la fin - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/lD87ddEz1s');
                $('.fourth-enigma').each(function(e){
                    e.preventDefault;
                    $('.left li:first-child a').click(function(){
                        $('.fourth-enigma').hide();
                        $('.home').show();
                        $('.window[data-window="internet"] .toolbar h3').html('Accueil - Navigateur internet');
                        $('.window[data-window="internet"] .addressbar').html('nav://home');
                    });

                    $('.launch-enigma4').click(function(){
                        $('.home').hide();
                        $('.fourth-enigma').show();
                        $('.window[data-window="internet"] .toolbar h3').html('Le début de la fin - Navigateur internet');
                        $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/lD87ddEz1s');
                    });                    
                });
            });
            
            $('.menu ul li:first-child a ').attr('href',"../diary/entry-4.html");
        }
    
        if(site == 'site4-ok' || answer == 8555) {
            $('.window[data-window="internet"] .windowbody .window-container').load("site5.html", function() {

                $('.window[data-window="internet"] .toolbar h3').html('Le début de la fin - Navigateur internet');
                $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/lD87ddEz1s');
                $('.fourth-enigma').each(function(e){
                    e.preventDefault;
                    $('.left li:first-child a').click(function(){
                        $('.fifth-enigma').hide();
                        $('.home').show();
                        $('.window[data-window="internet"] .toolbar h3').html('La fin - Navigateur internet');
                        $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/sfvvC8Za4s');
                    });

                    $('.launch-enigma5').click(function(){
                        $('.home').hide();
                        $('.fifth-enigma').show();
                        $('.window[data-window="internet"] .toolbar h3').html('La fin - Navigateur internet');
                        $('.window[data-window="internet"] .addressbar').html('www.le-voyage-de-yann.ws/sfvvC8Za4s');
                    });                    
                });
            });
            
            $('.menu ul li:first-child a ').attr('href',"../diary/entry-5.html");
        }
    
    
    

    
    
    
    
});
    
    


    
