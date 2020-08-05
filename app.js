//entry point of js window.onload function 
window.onload = function(){
  registerSw();
  sSize();
  var key = "b172b284138855427ecf17fdc6eaddc9";
  const kelvin = 273;
  var lat,long;
  var main = document.getElementById("main");
  var cd = document.getElementById("cd");
 
cd.onclick = function(){


  

}
// checking for geo location
if(navigator.onLine){
    if(navigator.geolocation){

     navigator.geolocation.getCurrentPosition(pos,err);
      
   
}else{

    main.innerHTML = "Not Supported";
}
}else{   
  cd.innerHTML = `<center class="bg-danger font-weight-bold text-white m-auto alert alert-dark w-50" id="offlineerr"> You're Offline, Go Online to Proceed !! <br></center>`;  
}
 


  // geo location pos function
function pos(pos){
   lat = pos.coords.latitude;
   long = pos.coords.longitude;
   console.log("lat " + lat +" long"+long);
   getWeather(lat,long); 
}

// error function
function err(error){

  if (error.code = error.PERMISSION_DENIED) {
    
    cd.innerHTML = `<center class="bg-danger font-weight-bold text-white m-auto alert alert-dark w-50" id="elocerr"> Please Enable Location to see Weather ForeCast..!! <br> & then press below button <br>
    <a href="index.html">try again ? </button></center>`;
    
   }
}


// get weather
function getWeather(a,b){

fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${a}&lon=${b}&appid=${key}`)
.then(response => response.json())
.then(data => show(data));

}

  // data show function
function show(e){
  console.log(e);
  main.style.display = "block";
  var title = document.getElementById("title");
  var ico = document.getElementById("ico");
  var icoTitle = document.getElementById("ico-title");
  var temp = document.getElementById("temp");
  var feellike = document.getElementById("flike");
  var humidity = document.getElementById("humidity");
  var cloud = document.getElementById("cloud");
  var pressure = document.getElementById("pressure");
  var sunrise = document.getElementById("sunrise");
  var sunset = document.getElementById("sunset");
  var visibility = document.getElementById("visibility");
  var wind_deg = document.getElementById("wind_deg");
  var wind_speed = document.getElementById("wind_speed");
  var date = document.getElementById("date");

  
  title.innerText = e.timezone;
  var d = new Date();
  date.innerHTML = d.toDateString(e.current.dt);
  temp.innerHTML = "<i class='fas fa-temperature-low'></i>" + " | " + Math.floor(e.current.temp - kelvin) + "° C";
  ico.src = `http://openweathermap.org/img/wn/${e.current.weather[0].icon}.png`;
  ico.title = e.current.weather[0].main;
  icoTitle.innerHTML  = "<i class='fas fa-thermometer'></i>"+ " | " + e.current.weather[0].description;
  feellike.innerHTML = "<i class='fas fa-temperature-high'></i>"  + " | Feels Like: "+ Math.floor(e.current.feels_like - kelvin) + "° C";
  humidity.innerHTML = "<i class='fas fa-tint'></i>" + " | Humidity: "+ e.current.humidity + "%";
  sunrise.innerHTML = "<i class='fas fa-sun'></i>"+" | Sunrise: " + new Date(e.current.sunrise*1000 ).toLocaleTimeString();
  sunset.innerHTML = "<i class='far fa-sun'></i>"+" | Sunset: " + new Date(e.current.sunset*1000 ).toLocaleTimeString();
  cloud.innerHTML = "<i class='fas fa-cloud-sun'></i>" + " | Cloud: " + e.current.clouds + "%";
  pressure.innerHTML = "<i class='fas fa-sort-amount-up-alt'></i>"+ " | Pressure: " + e.current.pressure;
  visibility.innerHTML = "<i class='fas fa-eye'></i>" + " | Visibility: " + e.current.visibility;
  wind_deg.innerHTML = "<i class='fas fa-drafting-compass'></i>"+" | Wind Degree: " + e.current.wind_deg +"°";
  wind_speed.innerHTML = "<i class='fas fa-wind'></i>" + " | Wind Speed: " + e.current.wind_speed +" Mph";

}


}

// registering service worker
async function registerSw(){
    if('serviceWorker' in navigator){
      try{
        await navigator.serviceWorker.register('sw.js');
      }catch(e){
        console.log("Registration Failed");
      }
    }
  }

// set screen size
  function sSize(){
    document.body.style.width = screen.availWidth;
    document.body.style.height = screen.availHeight; 
  }

  //  Open when someone clicks on the span element 
var val ;
function openNav(e) {
  document.getElementById("myNav").style.width = "100%";
  e.style.display = "none";
  val = e;
}

//  Close when someone clicks on the "x" symbol inside the overlay 
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  val.style.display = "inline-block";
}


// function search(){
// var cinp = document.getElementById("city");
// alert("pressed");
// fetch(`api.openweathermap.org/data/2.5/weather?q=${cinp.value}&appid=${key}`).then(response => response.json()).then(res => console.log(res));
// }



  
  