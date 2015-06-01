$(function() {
    $('#indice a').click(function(){
        $('#indice').toggleClass('appear');
    }); 
               
    var diary = localStorage.getItem('diary-entry');
    var url = $('.entry1 .diary-navigation ul li:first-child a ').attr('href');
    console.log(url);
    
    if(diary >= 2) {
            $('.entry1 .diary-navigation ul li:last-child a').addClass('diary-active-link');
            $('.entry1 .diary-navigation ul li:last-child a').attr("href", "entry-2.html")
    }  else {
        
        $('.entry2').each(function(){
            var url = $('.entry2 .diary-navigation ul li:first-child a ').attr('href');
            $('.entry2').remove();
            window.location.replace(url);
        });
    }
    
    if(diary >= 3) {
            $('.entry2 .diary-navigation ul li:last-child a').addClass('diary-active-link');
            $('.entry2 .diary-navigation ul li:last-child a').attr("href", "entry-3.html")
    } else {
        
        $('.entry3').each(function(){
            var url = $('.entry3 .diary-navigation ul li:first-child a ').attr('href');
            $('.entry3').remove();
            window.location.replace(url);
        });
    }
    
    if(diary >= 4) {
            $('.entry3 .diary-navigation ul li:last-child a').addClass('diary-active-link');
            $('.entry3 .diary-navigation ul li:last-child a').attr("href", "entry-4.html")

    } else {
        
        $('.entry4').each(function(){
            var url = $('.entry4 .diary-navigation ul li:first-child a ').attr('href');
            $('.entry4').remove();
            window.location.replace(url);
        });

    }
    
    if(diary >= 5) {
            $('.entry4 .diary-navigation ul li:last-child a').addClass('diary-active-link');
            $('.entry4 .diary-navigation ul li:last-child a').attr("href", "entry-5.html")
    }  else {
        
        
        $('.entry5').each(function(){
            var url = $('.entry5 .diary-navigation ul li:first-child a ').attr('href');
            $('.entry5').remove();
            window.location.replace(url);
        });
    }
    
    
    
  
  // -------------------------------------------
               
});