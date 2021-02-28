// In your Javascript (external .js resource or <script> tag)
/*   setInterval(function time(){
    var d = new Date();  
    var hours = d.getHours() - 2;
    var min = 60 - d.getMinutes();
    if((min + '').length == 1){
      min = '0' + min;
    }
    var sec = 60 - d.getSeconds();
    if((sec + '').length == 1){
          sec = '0' + sec;
    }
    jQuery('#the-final-countdown h1').html(hours+':'+min+':'+sec)
  }, 1000); */

  // Code By Webdevtrick ( https://webdevtrick.com )

function timeLeft(){
  var d = new Date();  
  endtime = d.getUTCFullYear()+2+"-01-01T00:00:00.000+00:00"
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  return {
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
};

$(document).ready(function() {
  $("#header").hover(function() {
    $(this).toggleClass('bluelight');
  });
  
  $(".clock").hover(function() {
    $(this).toggleClass('bluelight');
  });
  
    setInterval(function(){
      var t = timeLeft();
      $('#hours').text(t.hours);
      $('#mins').text(('0' + t.minutes).slice(-2));
      $('#secs').text(('0' + t.seconds).slice(-2));

    },1000);
});