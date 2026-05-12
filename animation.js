/* ===================================== */
/* ABLY */
/* ===================================== */

const ably = new Ably.Realtime({
key:"bOKecA.DM-G9g:YojB__4e1uHIMPer7ANbwW7xF8jRunVc9TW7ALFLwpQ"
});

const channel = ably.channels.get("ably-elecciones-completo");

/* ===================================== */
/* HELPERS BANNERS */
/* ===================================== */

const createdMasks = new WeakMap();

function createBannerMask(banner){

if(createdMasks.has(banner)) return;

const bannerMask = document.createElement("div");

bannerMask.style.position = "absolute";
bannerMask.style.left = "0px";
bannerMask.style.bottom = "83px";
bannerMask.style.width = "1920px";
bannerMask.style.height = "630px";
bannerMask.style.overflow = "hidden";

banner.parentNode.insertBefore(bannerMask, banner);

bannerMask.appendChild(banner);

banner.style.position = "absolute";
banner.style.bottom = "165px";
banner.style.left = "0";

createdMasks.set(banner,true);

}

function resetBanner(banner,isCandidate=false){

createBannerMask(banner);

const mask1 = banner.querySelector(".mask1");
const mask2 = banner.querySelector(".mask2");
const logoBox = banner.querySelector(".logoBox");

banner.style.transition = "none";

mask1.style.transition = "none";
mask2.style.transition = "none";
logoBox.style.transition = "none";

banner.style.transform = "translateY(0px)";
banner.style.opacity = "1";

logoBox.style.left = "50vw";

mask1.style.clipPath = "inset(0 0 0 100%)";
mask2.style.clipPath = "inset(0 0 0 100%)";

mask2.style.zIndex = "1";

/* CANDIDATOS */

if(isCandidate){

const candidateImg = banner.querySelector(".candidateImg");
const logo = banner.querySelector(".logo");

logo.style.opacity = "1";

candidateImg.style.display = "block";
candidateImg.style.opacity = "0";

}

}

function startBanner(banner,isCandidate=false){

resetBanner(banner,isCandidate);

const mask1 = banner.querySelector(".mask1");
const mask2 = banner.querySelector(".mask2");
const logoBox = banner.querySelector(".logoBox");

setTimeout(()=>{

mask1.style.transition = "clip-path 0.6s ease";

mask1.style.clipPath = "inset(0 0 0 0)";

},100);

setTimeout(()=>{

mask1.style.clipPath = "inset(0 1720px 0 0)";

logoBox.style.transition = "left 0.6s ease";

logoBox.style.left = "100px";

/* CANDIDATOS */

if(isCandidate){

const candidateImg = banner.querySelector(".candidateImg");
const logo = banner.querySelector(".logo");

logo.style.opacity = "0";

candidateImg.style.opacity = "1";

}

},1030);

setTimeout(()=>{

mask2.style.zIndex = "-1";

mask2.style.clipPath = "inset(0 0 0 0)";

},925);

}

function hideBanner(banner){

banner.style.transition = "transform 1.5s ease";

banner.style.transform = "translateY(400px)";

}

function hideImmediately(el){

el.style.opacity = "0";

}

/* ===================================== */
/* REFERENCIAS */
/* ===================================== */

const normalBanner = document.getElementById("normalBanner");
const rolesBanner = document.getElementById("rolesBanner");
const candidatosBanner = document.getElementById("candidatosBanner");

/* ===================================== */
/* ESTADOS */
/* ===================================== */

let normalVisible = false;
let rolesVisible = false;
let candidatosVisible = false;

/* ===================================== */
/* RESET INICIAL */
/* ===================================== */

hideImmediately(normalBanner);
hideImmediately(rolesBanner);
hideImmediately(candidatosBanner);

/* ===================================== */
/* MOSCA */
/* ===================================== */

const mosca = document.getElementById("mosca");
const texto = document.getElementById("texto");
const logoMosca = document.getElementById("logoMosca");
const logoEE = document.getElementById("logoEE");

let moscaActiva = false;
let moscaRunning = false;

let horaCierre = "16:00";
let interval = null;

let timeouts = [];
let minutosLoop = 0;

/* ===================================== */
/* RESET MOSCA */
/* ===================================== */

function resetMosca(){

moscaRunning = false;

timeouts.forEach(t=>clearTimeout(t));

timeouts = [];

if(interval){

clearInterval(interval);

interval = null;

}

texto.style.opacity = 0;
texto.style.filter = "blur(20px)";

logoMosca.style.opacity = 0;
logoMosca.style.filter = "blur(20px)";

logoEE.style.opacity = 0;

const mask = logoEE.querySelector(".circle-mask");

mask.style.clipPath = "circle(0% at 50% 50%)";

mask.style.background = "white";

mosca.style.opacity = 0;
mosca.style.filter = "blur(20px)";

}

/* ===================================== */
/* TIME FORMAT */
/* ===================================== */

function formatTime(sec){

sec = Math.max(0, sec);

let h = Math.floor(sec/3600);
let m = Math.floor((sec%3600)/60);
let s = sec%60;

return String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0");

}

/* ===================================== */
/* UPDATE TEXTO */
/* ===================================== */

function updateTexto(){

const now = new Date();

const colombiaNow = new Date(
now.toLocaleString("en-US", {
timeZone:"America/Bogota"
})
);

const nowSec =
colombiaNow.getHours() * 3600 +
colombiaNow.getMinutes() * 60 +
colombiaNow.getSeconds();

const [h,m] = horaCierre.split(":").map(Number);

const cierreSec = (h * 3600) + (m * 60);

let diff = cierreSec - nowSec;

if(diff > 0){

texto.innerHTML = `
CIERRE DE VOTACIONES EN:<br>${formatTime(diff)}
`;

}
else if(diff > -60){

texto.innerHTML = `
VOTACIONES CERRADAS
`;

}
else{

texto.innerHTML = `
ANÁLISIS DE RESULTADOS<br>ELECTORALES 2026
`;

}

}

/* ===================================== */
/* START MOSCA */
/* ===================================== */

function startMosca(){

if(moscaRunning) return;

resetMosca();

moscaActiva = true;
moscaRunning = true;

mosca.style.opacity = 1;
mosca.style.filter = "blur(0)";

let t = 0;

/* TEXTO */

timeouts.push(setTimeout(()=>{

texto.style.opacity = 1;
texto.style.filter = "blur(0)";

},t+200));

timeouts.push(setTimeout(()=>{

texto.style.opacity = 0;
texto.style.filter = "blur(20px)";

},t+20000));

t += 20000;

/* LOGO */

timeouts.push(setTimeout(()=>{

logoMosca.style.opacity = 1;
logoMosca.style.filter = "blur(0)";

},t+200));

timeouts.push(setTimeout(()=>{

logoMosca.style.opacity = 0;
logoMosca.style.filter = "blur(20px)";

},t+20000));

t += 20000;

/* LOGO EE */

timeouts.push(setTimeout(()=>{

logoEE.style.opacity = 1;

const mask = logoEE.querySelector(".circle-mask");

mask.style.clipPath = "circle(60% at 50% 50%)";

setTimeout(()=>{

mask.style.background = "transparent";

},400);

},t+200));

timeouts.push(setTimeout(()=>{

const mask = logoEE.querySelector(".circle-mask");

mask.style.background = "white";

mask.style.clipPath = "circle(0% at 50% 50%)";

},t+10000));

timeouts.push(setTimeout(()=>{

logoEE.style.opacity = 0;

},t+10500));

t += 10000;

/* LOOP */

timeouts.push(setTimeout(()=>{

moscaRunning = false;

if(!moscaActiva) return;

if(minutosLoop <= 0) return;

let delay = minutosLoop * 60 * 1000;

timeouts.push(setTimeout(()=>{

if(moscaActiva){

startMosca();

}

},delay));

},t));

/* CONTADOR */

interval = setInterval(updateTexto,1000);

updateTexto();

}

/* ===================================== */
/* STOP MOSCA */
/* ===================================== */

function stopMosca(){

moscaActiva = false;

resetMosca();

}

/* ===================================== */
/* ABLY MENSAJES */
/* ===================================== */

channel.subscribe("control",(message)=>{

const data = message.data;

/* ===================================== */
/* BANNER NORMAL */
/* ===================================== */

if(data.module === "banner"){

if(data.action === "show"){

const text = data.text;

if(normalVisible){

hideBanner(normalBanner);

setTimeout(()=>{

normalBanner.querySelector(".bannerText").innerText = text;

normalBanner.style.opacity = "1";

startBanner(normalBanner);

normalVisible = true;

},3500);

}else{

normalBanner.querySelector(".bannerText").innerText = text;

normalBanner.style.opacity = "1";

startBanner(normalBanner);

normalVisible = true;

}

}

if(data.action === "hide"){

if(!normalVisible) return;

hideBanner(normalBanner);

setTimeout(()=>{

hideImmediately(normalBanner);

normalVisible = false;

},1500);

}

}

/* ===================================== */
/* ROLES */
/* ===================================== */

if(data.module === "roles"){

if(data.action === "show"){

const name = data.name.toUpperCase();
const role = data.role.toUpperCase();

const textHTML = `
<div class="nameLine">${name}</div>
<div class="roleLine">${role}</div>
`;

if(rolesVisible){

hideBanner(rolesBanner);

setTimeout(()=>{

rolesBanner.querySelector(".bannerText").innerHTML = textHTML;

rolesBanner.style.opacity = "1";

startBanner(rolesBanner);

rolesVisible = true;

},3500);

}else{

rolesBanner.querySelector(".bannerText").innerHTML = textHTML;

rolesBanner.style.opacity = "1";

startBanner(rolesBanner);

rolesVisible = true;

}

}

if(data.action === "hide"){

if(!rolesVisible) return;

hideBanner(rolesBanner);

setTimeout(()=>{

hideImmediately(rolesBanner);

rolesVisible = false;

},1500);

}

}

/* ===================================== */
/* CANDIDATOS */
/* ===================================== */

if(data.module === "candidatos"){

if(data.action === "show"){

const text = data.text;
const candidate = data.candidate;

const candidateImg =
candidatosBanner.querySelector(".candidateImg");

candidateImg.src = "assets/" + candidate;

if(candidatosVisible){

hideBanner(candidatosBanner);

setTimeout(()=>{

candidatosBanner.querySelector(".bannerText").innerText = text;

candidatosBanner.style.opacity = "1";

startBanner(candidatosBanner,true);

candidatosVisible = true;

},3500);

}else{

candidatosBanner.querySelector(".bannerText").innerText = text;

candidatosBanner.style.opacity = "1";

startBanner(candidatosBanner,true);

candidatosVisible = true;

}

}

if(data.action === "hide"){

if(!candidatosVisible) return;

hideBanner(candidatosBanner);

setTimeout(()=>{

hideImmediately(candidatosBanner);

candidatosVisible = false;

},1500);

}

}

/* ===================================== */
/* MOSCA */
/* ===================================== */

if(data.module === "mosca"){

if(data.action === "on"){

stopMosca();

setTimeout(()=>{

startMosca();

},80);

}

if(data.action === "off"){

stopMosca();

}

if(data.action === "updateHora"){

horaCierre = data.hora;

updateTexto();

}

if(data.action === "updateLoop"){

minutosLoop = parseInt(data.minutos || 0);

}

}

});
