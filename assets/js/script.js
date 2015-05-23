$(function(){
    
    // video 1
    var video = $('.video-intro video'),
        tuto = localStorage.getItem("tuto");
    $('.video-intro').hide();
    
    $('.fermer').click(function() {
        video[0].pause();
        video[0].currentTime = 0;
        $('.video-intro').fadeOut('slow');
    });
    
    $('#start').click(function(){
        
        $('.video-intro').fadeIn('slow');
        
        if( $('.video-intro').is(':visible') ) {
            
            video[0].play();
            
        }
    });
    
    $('.video-intro video').on('ended',function(){
      var url  = window.location.href,
          cleanUrl= url.substring(0, url.indexOf('index.html#'));
      window.location.replace(cleanUrl+'desktop/index.html');
    });
    
    if ( tuto === "ok") {
        
        $('#start').addClass('continue');
        $('.video-intro').remove();
        $('#start').attr('href', 'desktop/index.html');
    }
    
    
    
});