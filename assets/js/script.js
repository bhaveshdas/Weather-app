$(document).ready(function() {

  var tempChange = true;
  var backgroundImage;
var days = ["Sunday", "Monday", "Tuesday", " Wednesday", "Thursday", "Friday", "Saturday"];

var urlLocation = "http://ip-api.com/json";
  $.getJSON(urlLocation, function(location) {
    var city = location.city;
    var region = location.regionName;
    var d =  new Date();
    var weekday = d.getDay();
    $('#current-weather').append("<h2>" +"Current Location : " + city + " "  + "</h2>" ); 
    $('#current-weather').append(  d.toDateString()  ) ;

  var url = "http://api.weatherapi.com/v1/forecast.json?key=4d97e9599da74d4bb5374717201511&q=" + city + "&days=7" ; 

  $.getJSON(url, function(wd) {
    var tempC = wd.current.temp_c;
    var wind_speed = wd.current.wind_kph;
    var humidity = wd.current.humidity;
    var visibility = wd.current.vis_km;
    var icon = wd.current.condition.icon;
    var text = wd.current.condition.text;
    var uv = wd.current.uv;

    $('#current-weather').append("<br><b> " + text + "</b> </br>");
    $('#current-weather').append(  "Current Temperature : " + Math.floor(tempC) + "&degC" + "</br>" );
    $('#current-weather').append('<div id = "hi" >').append("Wind speed : " + wind_speed + " km/h" );
    $('#hi').append('<div>').append('<img id = "gust" src = "wind.png" ></img></div>' );
    $('#gust').width(40);
    $('#gust').height(30);
    $('#current-weather').append( "<br>" + "Humidity : " + humidity +"% " +"</br>");
    $('#current-weather').append(  "Visibility :" + visibility*1000 + "m ");

    let uvIndexAdd = $('<p>');
    let uvIndexNumber = $('<span>');

    $('#current-weather').append(uvIndexAdd.text(`UV Index: `));
    uvIndexAdd.append(uvIndexNumber.append(uv));
    if(uv < 3){
        uvIndexNumber.attr('id', 'uv-index-low');
        uvIndexAdd.append(uvIndexNumber.append(" Low"));
    } else if(uv < 6){
        uvIndexNumber.attr('id', 'uv-index-moderate');
        uvIndexAdd.append(uvIndexNumber.append("Moderate"));
    } else if(uv < 9){
        uvIndexNumber.attr('id', 'uv-index-high');
        uvIndexAdd.append(uvIndexNumber.append(" High"));

    } else if(uv >= 9){
         uvIndexNumber.attr('id', 'uv-index-severe');
         uvIndexAdd.append(uvIndexNumber.text("Extreme"));
    } else {
        console.log("issue with uv index")
    };
    

    $('#icon').attr("src" , "https:" + icon);
    
    for( let i = 1; i < 4; i++)
    {
  
    var day = wd.forecast.forecastday[i-1].day;
    var maxtempc = day.maxtemp_c;
    var mintempc = day.mintemp_c;
    var info = day.condition.text;
    var pic = day.condition.icon;
    if( i == 1)
    {
      $('#day-' + i).append("Tomorrow<br>" );
    }
    else
    {
      $('#day-' + i).append(days[(weekday+i)%7] + "<br>");
    }
    $('#day-' + i).append("Max-Temp : " + maxtempc);
    $('#day-' + i).append("<br>" + "Min-Temp : " + mintempc + "</br>");
    $('#day-' + i).append(info);
    $('#day' + i).attr("src","https:" + pic);
    }
  });
  

  $('#search-city').keypress(function(key){
    var enter = key.which;
    if( enter == 13)
    {
      $('input[name = City Name').click() ;

    }
  });
   $('#clicker').click(function() {
     var local = $('#search-city').val();
    
   
     var url = "http://api.weatherapi.com/v1/forecast.json?key=4d97e9599da74d4bb5374717201511&q=" + local + "&days=7" ;
     $.getJSON(url, function(wd) {
      var tempC = wd.current.temp_c;
      var humidity = wd.current.humidity;
      var visibility = wd.current.vis_km;
      var icon = wd.current.condition.icon;
      var text = wd.current.condition.text;
      var uv = wd.current.uv;
      var d = new Date();

         $('#current-weather').empty();
         $('#icon').attr('src',"https:" + icon);
         $('#current-weather').append("<h2>" + local + " "  + "</h2>" ); 
         $('#current-weather').append(  d.toDateString()  ) ;
         $('#current-weather').append("<br><b> " + text + "</b>");
         $('#current-weather').append( "<br>"+ "Current Temperature : " + Math.floor(tempC) + "&degC" );
         $('#current-weather').append("<br>"+ "Humidity : " + humidity +"% " + "</br>")
         $('#current-weather').append("Visibility : " + visibility*1000 + "m ");

         let uvIndexAdd = $('<p>');
         let uvIndexNumber = $('<span>');
         $('#current-weather').append(uvIndexAdd.text(`UV Index: `));
         uvIndexAdd.append(uvIndexNumber.text(uv));
         if(uv < 3){
             uvIndexNumber.attr('id', 'uv-index-low')
             uvIndexAdd.append(uvIndexNumber.append(" Low"));

         } else if(uv < 6){
             uvIndexNumber.attr('id', 'uv-index-moderate')
             uvIndexAdd.append(uvIndexNumber.append(" Moderate"));
         } else if(uv < 9){
             uvIndexNumber.attr('id', 'uv-index-high')
             uvIndexAdd.append(uvIndexNumber.append(" High"));
         } else if(uv >= 9){
              uvIndexNumber.attr('id', 'uv-index-severe')
              uvIndexAdd.append(uvIndexNumber.append(" Extreme"));
         } else {
             console.log("issue with uv index")
         };
         
       
         for( let i = 1; i < 4; i++)
         {
          $('#day-' + i).empty();
          if( i == 1)
    {
      $('#day-' + i).append("Tomorrow");
    }
    else
    {
      $('#day-' + i).append(days[(weekday+i)%7]);
    }
         var day = wd.forecast.forecastday[i-1].day;
         var maxtempc = day.maxtemp_c;
         var mintempc = day.mintemp_c;
         var info = day.condition.text;
         var pic = day.condition.icon;
         $('#day-' + i).append("<br>" + "Max-temp : " + maxtempc);
         $('#day-' + i).append("<br>" + "Min-temp : " + mintempc + "</br>");
         $('#day-' + i).append(info + "<br>");
         $('#day' + i).attr("src", "https:" + pic);
         }
      
  });
     
      });
    });

   
 
});

