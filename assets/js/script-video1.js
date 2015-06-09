$(function(){
    
     // video 1
    var video = $('.video-intro video'),
        tuto = localStorage.getItem("tuto");
    
    $('.video-intro').hide();
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('#start').click(function(){
        window.location.replace("http://alexandre-buruk.be/tfe/version_juin/smartphone.html");
    });
} else {
    
    $('.fermer').click(function() {
        video[0].pause();
        video[0].currentTime = 0;
        $('.video-intro').fadeOut('slow');
        $('body').css('overflow','auto');
    });
    
    $('#start').click(function(){
        
        $('.video-intro').fadeIn('slow');
        $('body').css('overflow','hidden');
        
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
}

});