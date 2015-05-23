$(function(){
    var site5 = localStorage.getItem("site-statut"),
                video = $('.video-fin video');
    
    if(site5 == "site4-ok") {
        
        if( $('.video-fin').is(':visible') ) {
            video[0].play();
            
            $('.fermer').click(function() {
                video[0].pause();
                video[0].currentTime = 0;
                $('.video-fin').fadeOut('slow');
            });
            
            $('#play-video').click(function(){
                 $('.video-fin').show();
                 video[0].play();
            });

            $('.video-fin video').on('ended',function(){
              $('.video-fin').fadeOut('slow');
                video[0].pause();
                video[0].currentTime= 0;
            });
            
        }
        
    } else {
     var url  = window.location.href,
          cleanUrl= url.substring(0, url.indexOf('fin.html#'));
      window.location.replace(cleanUrl+'index.html');   
    }
    
    
    
});