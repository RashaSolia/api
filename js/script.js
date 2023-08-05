let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let searchinput = document.getElementById('searchinput')
let details = document.getElementById('details')
async function search(Cname) {
    let api_data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=171a494fb6b64446ae1153029230308&q=${Cname}&days=3`)
    if (api_data.ok && api_data.status != 400) {
        let Cname = await api_data.json();
        displayWeather(Cname.location, Cname.current)  
        displayAnother(Cname.forecast.forecastday); 
     
     }

}

searchinput.addEventListener("keydown", (Cname) => {
    search(Cname.target.value);

});


function displayWeather(Cname, api_data) {
    if (api_data != null) {
        let date=new Date(api_data.last_updated);
      let temp = `  <div class="item col-md-4 px-3 border rounded-start-2 border-dark  ">

        <div class="item-header  d-flex justify-content-between ">
     <p>${days[date.getDay()]}</p>
<p>    ${date.getDate()+monthNames[date.getMonth()]}</p>
</div>
<div class="content py-5" id="details">
<p>  ${Cname.name}</p>
<p class="degree ">
${ api_data.temp_c} <sup>o</sup>C 
<span>         
   <img src="https:${api_data.condition.icon}" >
</span>  
</p>
<p class="text-info"> clear</p>
<span><img src="./images/icon-umberella@2x.png" class="p-2" alt="">
20%</span>
<span><img src="./images/icon-wind@2x.png" class="p-2" alt="">
18km/h</span>

<span><img src="./images/icon-compass@2x.png" class="p-2" alt="">
East</span>
</div>


     </div>`
     details.innerHTML = temp;

    }

}


function displayAnother(Cname){
    let newValue=''
    for (let date = 1; date <Cname.length; date++){
        newValue +=`   <div class="item col-md-4 px-3 border rounded-start-2 border-dark">
        <div class="item-header text-center" id="today">
         <p >
            ${  days[new Date(Cname[date].date).getDay()]}
         </p>
        </div>
        <div class="content text-center p-5">
     
            <img src="https:${Cname[date].day.condition.icon}" width="48" >
                

            <div class="fs-2 fw-bolder">
            ${Cname[date].day.maxtemp_c}<span>o</span>C
            </div>
            <small class="fs-4">${Cname[date].day.mintemp_c}<span>o</span></small>
            <div class="custom text-info fs-5 py-4 ">
              ${ Cname[date].day.condition.text} 
            </div>  </div>   </div>   </div>
    `

    }
    details.innerHTML += newValue;

}
search("cairo");



















