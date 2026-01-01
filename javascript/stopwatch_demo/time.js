window.onload = function(){

//global variables
let time = 00;
let interval;
let start = false;
let hr = 00;
let min = 00;
let sec = 00;
let ms = 00;

//functions
function getMs(){
  if(time>=1000){
    sec = Math.floor(time/1000);
    return time%1000;
  }
  else{
    return time;
  }
  return Math.floor(time/1000);
}
function getSec(){
  if(sec>=60){
    min = Math.floor(sec/60);
    return sec%60;
  }
  else{
    return sec;
  }
}
function getMin(){
  if(min>=60){
    hr = Math.floor(min/60);
    return min%60;
  }
  else{
    return min;
  }
}
function timer(){
  interval = setInterval(function(){
  time += 4; //on checking it was observed approx 250 ms from program = 1 sec on real time clock
            //so program 1sec(1000ms) = 4 seconds on real time clock. thus approximating
            // with real time clock by adding 4 ms to each 1ms of a program
  ms = getMs();//call before calling ms
  sec = getSec() ;//call before calling sec
  min = getMin();
  document.getElementById('hours').innerHTML = hr + " :"  ;
  document.getElementById('minutes').innerHTML =  min + " :" ;
  document.getElementById('seconds').innerHTML =  sec + " :";
  document.getElementById('millisec').innerHTML =  ms ;
},1);// repeats at every 1 milliseconds, 1000ms = 1 seconds
}
document.getElementById('start/stop').addEventListener("click",function(){
  start = !start;
  if(start){
    timer();
  }
  else{
    clearInterval(interval);
  }
});
document.getElementById('reset').addEventListener('click',function(){
  location.reload();
});
document.getElementById('Record').addEventListener('click',function(){
    document.getElementById('recorded').innerHTML += hr + " : " + min + " : "+ sec +" : "+ ms + "</br>" +"<hr>";
});
document.addEventListener('keydown', function(event){
  switch(event.key) {
    case 'r':
        document.getElementById('reset').click();
        break;
    case 's':
        document.getElementById('start/stop').click();
        break;
    case 't':
        document.getElementById('Record').click();
        break;
    default:
        window.alert(event.key + " has no function in this application");
    }
});
}
