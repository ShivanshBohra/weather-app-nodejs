const curDate= document.getElementById('date');
let weathercon = document.getElementById('weathercon');
const tempStatus ="{%tempstatus%}";
if(tempStatus == "Sunny"){
    weathercon.innerHTML=
    "<i class='fas fa-sun' style='color: #eccc68'></i>"; 
}else if(tempStatus =="Clouds"){
    weathercon.innerHTML="<i class='fas fa-cloud' style='color: #f1f2f6'></i>"; 
}
else if(tempStatus =="Rainy"){
    weathercon.innerHTML="<i class='fas fa-rain' style='color: #a4b0be'></i>"; 
}else{
    weathercon.innerHTML="<i class='fas fa-cloud' style='color: #44c3de'></i>"; 
}

const getCurrentDay = () =>{
    let currentTime = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day =  weekday[currentTime.getDay()];
    return day;
};
const getCurrentTime =()=>{
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();

    let hours = now.getHours();
    let mins = now.getMinutes();

    let periods = "AM";

    if(hours > 11){
        periods = "PM";
        if(hours > 12) hours -= 12;
    }
    mins = mins < 10 ? "0" + mins : mins;

    return `${month} ${date} | ${hours}:${mins}${periods}`;        
};

curDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();