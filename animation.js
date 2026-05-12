/* ===================================== */
mosca.style.filter="blur(0)";

let t=0;

timeouts.push(setTimeout(()=>{
texto.style.opacity=1;
texto.style.filter="blur(0)";
},t+200));

timeouts.push(setTimeout(()=>{
texto.style.opacity=0;
texto.style.filter="blur(20px)";
},t+20000));

t += 20000;

timeouts.push(setTimeout(()=>{
logoMosca.style.opacity=1;
logoMosca.style.filter="blur(0)";
},t+200));

timeouts.push(setTimeout(()=>{
logoMosca.style.opacity=0;
logoMosca.style.filter="blur(20px)";
},t+20000));

t += 20000;

timeouts.push(setTimeout(()=>{

logoEE.style.opacity=1;

const mask = logoEE.querySelector(".circle-mask");

mask.style.clipPath="circle(60% at 50% 50%)";

setTimeout(()=>{
mask.style.background="transparent";
},400);

},t+200));

timeouts.push(setTimeout(()=>{

const mask = logoEE.querySelector(".circle-mask");

mask.style.background="white";
mask.style.clipPath="circle(0% at 50% 50%)";

},t+10000));

timeouts.push(setTimeout(()=>{
logoEE.style.opacity=0;
},t+10500));

t += 10000;

timeouts.push(setTimeout(()=>{

moscaRunning=false;

if(!moscaActiva) return;
if(minutosLoop <= 0) return;

let delay=minutosLoop * 60 * 1000;

timeouts.push(setTimeout(()=>{
if(moscaActiva){
startMosca();
}
},delay));

},t));

interval=setInterval(updateTexto,1000);
updateTexto();

}

function stopMosca(){
moscaActiva=false;
resetMosca();
}

/* ===================================== */
});
