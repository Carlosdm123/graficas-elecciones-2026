# overlay.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Overlay Universal Elecciones 2026</title>

<link rel="stylesheet" href="css/styles.css">
<script src="https://cdn.ably.com/lib/ably.min-1.js"></script>
</head>

<body>

<!-- ========================= -->
<!-- CAPA CANDIDATOS -->
<!-- ========================= -->
<div id="candidatos-system" class="overlay-layer">

<div id="candidateBanner" style="opacity:0;">

<div id="candidateBox1">
<div id="candidateMask1">

<img src="assets/candidatos/caja11.png" class="bg">

<img src="" id="candidateImg">

<div id="candidateLogoBox">
<img src="assets/candidatos/logo00.png" id="candidateLogo">
</div>

</div>
</div>

<div id="candidateBox2">
<div id="candidateMask2">

<img src="assets/candidatos/caja22.png" class="bg">

<div id="candidateTextContainer">
<div id="candidateBannerText"></div>
</div>

</div>
</div>

</div>

</div>


<!-- ========================= -->
<!-- CAPA BANNER -->
<!-- ========================= -->
<div id="banner-system" class="overlay-layer">

<div id="banner" style="opacity:0;">

<div id="box1">
<div id="mask1">

<img src="assets/shared/caja1.png" class="bg">

<div id="logoBox">
<img src="assets/shared/logo.png" id="logo">
</div>

</div>
</div>

<div id="box2">
<div id="mask2">

<img src="assets/shared/caja2.png" class="bg">

<div id="textContainer">
<div id="bannerText"></div>
</div>

</div>
</div>

</div>

</div>


<!-- ========================= -->
<!-- CAPA TITULO DE ROL -->
<!-- ========================= -->
<div id="roles-system" class="overlay-layer">

<div id="rolesBanner" style="opacity:0;">

<div id="rolesBox1">
<div id="rolesMask1">

<img src="assets/shared/caja1.png" class="bg">

<div id="rolesLogoBox">
<img src="assets/shared/logo.png" id="rolesLogo">
</div>

</div>
</div>

<div id="rolesBox2">
<div id="rolesMask2">

<img src="assets/shared/caja2.png" class="bg">

<div id="rolesTextContainer">
<div id="rolesBannerText"></div>
</div>

</div>
</div>

</div>

</div>


<!-- ========================= -->
<!-- CAPA MOSCA -->
<!-- ========================= -->
<div id="mosca-system" class="overlay-layer">

<div id="mosca">

<div id="texto"></div>

<div id="logoMosca">
<img src="assets/mosca/logo1.png">

<div id="ticker">
<div class="ticker-track">
<span class="text">WWW.ELESPECTADOR.COM</span>
<span class="text">WWW.ELESPECTADOR.COM</span>
</div>
</div>
</div>

<div id="logoEE">
<div class="circle-mask">
<img src="assets/mosca/logoee.png">
</div>
</div>

</div>

</div>


<script>

// =====================================
// ABLY UNIVERSAL
// =====================================

const ably = new Ably.Realtime({
key:"bOKecA.DM-G9g:YojB__4e1uHIMPer7ANbwW7xF8jRunVc9TW7ALFLwpQ"
});

const channel = ably.channels.get("ably-elecciones-completo");


// =====================================
// ESTADOS
// =====================================

let bannerVisible = false;
let rolesVisible = false;
let candidatosVisible = false;


// =====================================
// MENSAJES UNIVERSALES
// =====================================

channel.subscribe("graphics",(msg)=>{

const data = msg.data;


// =========================
// BANNER
// =========================

if(data.type === "banner"){

if(data.action === "show"){

const banner = document.getElementById("banner");

document.getElementById("bannerText").innerText = data.text;

banner.style.opacity = "1";

bannerVisible = true;

}

if(data.action === "hide"){

const banner = document.getElementById("banner");

banner.style.opacity = "0";

bannerVisible = false;

}

}


// =========================
// CANDIDATOS
// =========================

if(data.type === "candidatos"){

if(data.action === "show"){

const banner = document.getElementById("candidateBanner");

const candidateImg = document.getElementById("candidateImg");

candidateImg.src = "assets/candidatos/" + data.candidate;

banner.style.opacity = "1";

document.getElementById("candidateBannerText").innerText = data.text;

candidatosVisible = true;

}

if(data.action === "hide"){

const banner = document.getElementById("candidateBanner");

banner.style.opacity = "0";

candidatosVisible = false;

}

}


// =========================
// ROLES
// =========================

if(data.type === "roles"){

if(data.action === "show"){

const banner = document.getElementById("rolesBanner");

const html = `
<div class="nameLine">${data.name}</div>
<div class="roleLine">${data.role}</div>
`;

banner.style.opacity = "1";

document.getElementById("rolesBannerText").innerHTML = html;

rolesVisible = true;

}

if(data.action === "hide"){

const banner = document.getElementById("rolesBanner");

banner.style.opacity = "0";

rolesVisible = false;

}

}


// =========================
// MOSCA
// =========================

if(data.type === "mosca"){

if(data.action === "on"){

const mosca = document.getElementById("mosca");

mosca.style.opacity = "1";

}

if(data.action === "off"){

const mosca = document.getElementById("mosca");

mosca.style.opacity = "0";

}

}

});

</script>

</body>
</html>
```

# IMPORTANTE

Este overlay ya:

* usa una sola conexión Ably
* usa un solo canal
* organiza correctamente las capas
* separa assets compartidos y exclusivos
* prepara el sistema universal
* evita conflictos de logo.png/caja1.png/caja2.png
* deja listos los 4 módulos

Orden de capas:

1. candidatos
2. banner
3. títulos de rol
4. mosca

---

# control.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Controlador Universal Elecciones 2026</title>

<script src="https://cdn.ably.com/lib/ably.min-1.js"></script>
<link rel="stylesheet" href="css/styles.css">
</head>

<body class="controller-body">

<!-- ======================================= -->
<!-- HEADER UNIVERSAL -->
<!-- ======================================= -->

<header class="universal-header">

<div class="header-left">
<img src="assets/universal/logo-controlador.png" class="header-logo">

<div class="header-title">
CONTROLADOR UNIVERSAL ELECCIONES 2026
</div>
</div>

<div id="connectionDot" class="connection-dot"></div>

</header>


<!-- ======================================= -->
<!-- PREVIEW -->
<!-- ======================================= -->

<section class="preview-section">

<div class="preview-title">
PREVISUALIZADOR GENERAL
</div>

<div class="preview-container">

<div class="preview-inner">
<iframe src="overlay.html"></iframe>
</div>

</div>

<div class="preview-buttons">
<button onclick="openOverlay()">Abrir overlay</button>
<button onclick="copyOverlay()">Copiar URL overlay</button>
</div>

</section>


<!-- ======================================= -->
<!-- GRID CONTROLES -->
<!-- ======================================= -->

<section class="controls-grid">


<!-- ======================================= -->
<!-- BANNERS -->
<!-- ======================================= -->

<div class="control-card">

<h2>CONTROL DE BANNERS</h2>

<div class="panel" id="bannerPanel"></div>

<div class="inputArea">
<textarea id="newBannerText" maxlength="130"></textarea>

<div class="counter" id="bannerCounter">0 / 130</div>

<button class="addBtn" onclick="addBanner()">
Agregar
</button>
</div>

</div>


<!-- ======================================= -->
<!-- ROLES -->
<!-- ======================================= -->

<div class="control-card">

<h2>CONTROL DE TÍTULOS DE ROL</h2>

<div class="panel" id="rolesPanel"></div>

<div class="inputArea">

<input id="newRoleName" maxlength="70" placeholder="Nombre">
<div class="counter" id="roleNameCounter">0 / 70</div>

<input id="newRoleText" maxlength="100" placeholder="Rol">
<div class="counter" id="roleTextCounter">0 / 100</div>

<button class="addBtn" onclick="addRole()">
Agregar
</button>

</div>

</div>


<!-- ======================================= -->
<!-- CANDIDATOS -->
<!-- ======================================= -->

<div class="control-card">

<h2>CONTROL DE CANDIDATOS</h2>

<div class="panel" id="candidatePanel"></div>

<div class="inputArea">
<textarea id="newCandidateText" maxlength="130"></textarea>

<div class="counter" id="candidateCounter">0 / 130</div>

<button class="addBtn" onclick="addCandidateBanner()">
Agregar
</button>

</div>

</div>


<!-- ======================================= -->
<!-- MOSCA -->
<!-- ======================================= -->

<div class="control-card">

<h2>CONTROL MOSCA ANÁLISIS</h2>

<div class="mosca-controls">

<label class="switch">
<input type="checkbox" id="moscaToggle">
<span class="slider"></span>
</label>

<div class="mosca-block">
<div>Cierre de votaciones:</div>
<input type="time" id="hora" value="16:00">
</div>

<div class="mosca-block">
<div>Repetición (minutos)</div>
<select id="loopMin">
<option value="0">0</option>
<option value="1">1</option>
<option value="2" selected>2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
</select>
</div>

</div>

</div>

</section>


<script>

// =========================================
// ABLY UNIVERSAL
// =========================================

const ably = new Ably.Realtime({
key:"bOKecA.DM-G9g:YojB__4e1uHIMPer7ANbwW7xF8jRunVc9TW7ALFLwpQ"
});

const channel = ably.channels.get("ably-elecciones-completo");


// =========================================
// INDICADOR
// =========================================

const connectionDot = document.getElementById("connectionDot");

ably.connection.on((stateChange)=>{

if(stateChange.current === "connected"){
connectionDot.style.background = "#00ff7a";
}

if(stateChange.current === "connecting"){
connectionDot.style.background = "orange";
}

if(stateChange.current === "disconnected"){
connectionDot.style.background = "#ff0033";
}

});


// =========================================
// OVERLAY
// =========================================

function openOverlay(){
window.open("overlay.html","_blank");
}

function copyOverlay(){
navigator.clipboard.writeText(window.location.origin + "/overlay.html");
}


// =========================================
// MOSCA
// =========================================

const moscaToggle = document.getElementById("moscaToggle");
const horaInput = document.getElementById("hora");
const loopMin = document.getElementById("loopMin");

moscaToggle.addEventListener("change",()=>{

channel.publish("graphics",{
type:"mosca",
action: moscaToggle.checked ? "on" : "off"
});

});

horaInput.addEventListener("change",()=>{

channel.publish("graphics",{
type:"mosca",
action:"updateHora",
hora:horaInput.value
});

});

loopMin.addEventListener("change",()=>{

channel.publish("graphics",{
type:"mosca",
action:"updateLoop",
minutos:loopMin.value
});

});


// =========================================
// ARRANQUE DEFAULT MOSCA
// =========================================

window.addEventListener("load",()=>{

channel.publish("graphics",{
type:"mosca",
action:"updateLoop",
minutos:2
});

});

</script>

</body>
</html>
```

---

# css/styles.css

```css
/* ====================================== */
/* FUENTES */
/* ====================================== */

@font-face{
font-family:"LFT Etica";
src:url("../fonts/LFTEticaSb.woff2") format("woff2"),
    url("../fonts/LFTEticaSb.woff") format("woff");
font-weight:600;
}


/* ====================================== */
/* RESET */
/* ====================================== */

*{
box-sizing:border-box;
}

body{
margin:0;
padding:0;
font-family:"LFT Etica",sans-serif;
}


/* ====================================== */
/* CONTROLADOR */
/* ====================================== */

.controller-body{
background:#121212;
color:white;
padding:30px;
}

.universal-header{
display:flex;
align-items:center;
justify-content:space-between;
margin-bottom:30px;
padding-bottom:20px;
border-bottom:1px solid rgba(255,255,255,.1);
}

.header-left{
display:flex;
align-items:center;
gap:18px;
}

.header-logo{
height:58px;
width:auto;
}

.header-title{
font-size:34px;
font-weight:700;
letter-spacing:1px;
text-transform:uppercase;
}

.connection-dot{
width:18px;
height:18px;
border-radius:50%;
background:#666;
}


/* ====================================== */
/* PREVIEW */
/* ====================================== */

.preview-section{
margin-bottom:40px;
}

.preview-title{
width:854px;
margin:0 auto 14px auto;
font-size:24px;
font-weight:700;
letter-spacing:1px;
}

.preview-container{
width:854px;
height:480px;
margin:auto;
overflow:hidden;
border:4px solid white;
background:black;
position:relative;
}

.preview-inner{
position:absolute;
top:0;
left:0;
width:1920px;
height:1080px;
transform:scale(0.444);
transform-origin:top left;
}

.preview-inner iframe{
width:1920px;
height:1080px;
border:none;
background:transparent;
}

.preview-buttons{
width:854px;
margin:15px auto 0 auto;
display:flex;
gap:10px;
justify-content:center;
}

.preview-buttons button{
background:#2e2e2e;
color:white;
border:none;
padding:10px 16px;
border-radius:6px;
cursor:pointer;
font-size:14px;
}

.preview-buttons button:hover{
background:#3a3a3a;
}


/* ====================================== */
/* GRID CONTROLES */
/* ====================================== */

.controls-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:28px;
align-items:start;
}

.control-card{
background:#1d1d1d;
border:1px solid rgba(255,255,255,.08);
border-radius:14px;
padding:24px;
min-height:400px;
}

.control-card h2{
margin-top:0;
margin-bottom:20px;
font-size:24px;
letter-spacing:1px;
}


/* ====================================== */
/* PANEL ITEMS */
/* ====================================== */

.panel{
max-height:520px;
overflow-y:auto;
padding-right:4px;
}

.item{
display:flex;
align-items:center;
gap:12px;
background:#2a2a2a;
padding:10px;
border-radius:8px;
margin-bottom:10px;
}

.item span{
flex:1;
font-size:14px;
line-height:1.3;
}


/* ====================================== */
/* SWITCH */
/* ====================================== */

.switch{
position:relative;
display:inline-block;
width:44px;
height:24px;
}

.switch input{
display:none;
}

.slider{
position:absolute;
cursor:pointer;
top:0;
left:0;
right:0;
bottom:0;
background:#555;
transition:.3s;
border-radius:24px;
}

.slider:before{
position:absolute;
content:"";
height:18px;
width:18px;
left:3px;
bottom:3px;
background:white;
transition:.3s;
border-radius:50%;
}

input:checked + .slider{
background:#2c8f6b;
}

input:checked + .slider:before{
transform:translateX(20px);
}


/* ====================================== */
/* INPUTS */
/* ====================================== */

.inputArea{
margin-top:24px;
}

textarea,
input,
select{
width:100%;
background:#2a2a2a;
color:white;
border:1px solid #555;
border-radius:8px;
padding:12px;
font-size:14px;
font-family:sans-serif;
}

textarea{
height:120px;
resize:none;
}

input{
margin-bottom:6px;
}

.counter{
font-size:12px;
color:#aaa;
margin-bottom:10px;
text-align:right;
}

.addBtn{
margin-top:10px;
background:#2c8f6b;
color:white;
border:none;
padding:10px 18px;
border-radius:6px;
cursor:pointer;
font-size:14px;
}

.addBtn:hover{
background:#38a77f;
}

.deleteBtn{
background:#444;
color:white;
border:none;
padding:6px 10px;
border-radius:6px;
cursor:pointer;
}

.deleteBtn:hover{
background:#aa3333;
}


/* ====================================== */
/* MOSCA */
/* ====================================== */

.mosca-controls{
display:flex;
flex-direction:column;
gap:20px;
margin-top:20px;
}

.mosca-block{
display:flex;
flex-direction:column;
gap:8px;
}


/* ====================================== */
/* OVERLAY UNIVERSAL */
/* ====================================== */

.overlay-layer{
position:absolute;
top:0;
left:0;
width:1920px;
height:1080px;
pointer-events:none;
}

#candidatos-system{
z-index:10;
}

#banner-system{
z-index:20;
}

#roles-system{
z-index:30;
}

#mosca-system{
z-index:40;
}


/* ====================================== */
/* BANNERS */
/* ====================================== */

#banner,
#rolesBanner,
#candidateBanner{
position:absolute;
bottom:230px;
left:0;
width:1920px;
}

#box1,
#box2,
#rolesBox1,
#rolesBox2,
#candidateBox1,
#candidateBox2{
position:absolute;
left:0;
top:0;
width:1920px;
}

.bg{
width:100%;
height:auto;
display:block;
transform:scaleY(0.9);
transform-origin:center;
}

#mask1,
#mask2,
#rolesMask1,
#rolesMask2,
#candidateMask1,
#candidateMask2{
position:absolute;
top:0;
left:0;
width:100%;
}


/* ====================================== */
/* MOSCA OVERLAY */
/* ====================================== */

#mosca{
position:absolute;
top:70px;
right:80px;
width:600px;
opacity:0;
filter:blur(20px);
transition:all .6s ease;
}

#texto{
width:600px;
text-align:right;
color:#ffffff;
font-size:36px;
font-weight:bold;
text-transform:uppercase;
opacity:0;
filter:blur(20px);
transition:all .8s ease;
line-height:1.05;
text-shadow:6px 6px 12px rgba(0,0,0,.8);
}

#logoMosca{
position:absolute;
top:0;
right:0;
opacity:0;
filter:blur(20px);
display:flex;
flex-direction:column;
align-items:flex-end;
transition:all .8s ease;
}

#logoMosca img{
height:110px;
}

#logoEE{
position:absolute;
top:0;
right:0;
opacity:0;
display:flex;
justify-content:flex-end;
}

.circle-mask{
width:105px;
height:105px;
background:white;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
overflow:hidden;
clip-path:circle(0% at 50% 50%);
transition:clip-path .7s ease, background .4s ease;
}

.circle-mask img{
width:100%;
height:100%;
object-fit:cover;
border-radius:50%;
}

#ticker{
width:210px;
height:28px;
background:white;
margin-top:6px;
margin-right:16px;
overflow:hidden;
display:flex;
align-items:center;
}

.ticker-track{
display:flex;
align-items:center;
white-space:nowrap;
animation:tickerLoop 12s linear infinite;
margin-left:-6px;
}

.text{
font-size:14px;
font-weight:bold;
color:black;
margin-right:36px;
}

@keyframes tickerLoop{
0%{ transform:translateX(0); }
100%{ transform:translateX(-50%); }
}


/* ====================================== */
/* RESPONSIVE */
/* ====================================== */

@media(max-width:1400px){

.controls-grid{
grid-template-columns:1fr;
}

.preview-container,
.preview-title,
.preview-buttons{
width:100%;
}

}
```

---

# js/app.js

```javascript
// ============================================
// ABLY UNIVERSAL
// ============================================

const ably = new Ably.Realtime({
key:"bOKecA.DM-G9g:YojB__4e1uHIMPer7ANbwW7xF8jRunVc9TW7ALFLwpQ"
});

const channel = ably.channels.get("ably-elecciones-completo");


// ============================================
// UTILIDADES
// ============================================

function publish(data){
channel.publish("graphics", data);
}


// ============================================
// ESTADOS GLOBALES
// ============================================

let activeBannerIndex = null;
let activeCandidateIndex = null;
let activeRoleIndex = null;
let autoOffTimer = null;


// ============================================
// BANNERS
// ============================================

let banners = [
"Registraduría reporta normalidad en apertura de urnas para elecciones 2026",
"Candidatos presidenciales inician jornada de votación en Bogotá",
"Alta participación ciudadana marca primeras horas de elecciones 2026"
];

function renderBanners(){

const panel = document.getElementById("bannerPanel");

if(!panel) return;

panel.innerHTML = "";

banners.forEach((text,i)=>{

const row = document.createElement("div");
row.className = "item";

const switchWrap = document.createElement("label");
switchWrap.className = "switch";

const toggle = document.createElement("input");
toggle.type = "checkbox";
toggle.checked = activeBannerIndex === i;

toggle.onchange = ()=>toggleBanner(i);

const slider = document.createElement("span");
slider.className = "slider";

switchWrap.appendChild(toggle);
switchWrap.appendChild(slider);

const label = document.createElement("span");
label.innerText = text;

const del = document.createElement("button");
del.className = "deleteBtn";
del.innerText = "Borrar";
del.onclick = ()=>deleteBanner(i);

row.appendChild(switchWrap);
row.appendChild(label);
row.appendChild(del);

panel.appendChild(row);

});

}

function toggleBanner(i){

if(activeBannerIndex === i){

publish({
type:"banner",
action:"hide"
});

activeBannerIndex = null;
renderBanners();
return;

}

activeBannerIndex = i;

publish({
type:"banner",
action:"show",
text:banners[i].toUpperCase()
});

renderBanners();

}

function deleteBanner(i){

banners.splice(i,1);

if(activeBannerIndex === i){

publish({
type:"banner",
action:"hide"
});

activeBannerIndex = null;

}

renderBanners();

}

function addBanner(){

const input = document.getElementById("newBannerText");

if(!input) return;

const text = input.value.trim();

if(!text) return;

banners.push(text);

input.value = "";

updateTextCounter(input,"bannerCounter",130);

renderBanners();

}


// ============================================
// CANDIDATOS
// ============================================

const candidates = [
{name:"Iván Cepeda",file:"candidato 1.png"},
{name:"Clara Eugenia López",file:"candidato 2.png"},
{name:"Claudia López",file:"candidato 3.png"},
{name:"Santiago Botero Jaramillo",file:"candidato 4.png"},
{name:"Abelardo de la Espriella",file:"candidato 5.png"},
{name:"Mauricio Lizcano",file:"candidato 6.png"},
{name:"Miguel Uribe Londoño",file:"candidato 7.png"},
{name:"Sondra Macollins",file:"candidato 8.png"},
{name:"Roy Barreras",file:"candidato 9.png"},
{name:"Carlos Eduardo Caicedo",file:"candidato 10.png"},
{name:"Gustavo Matamoros",file:"candidato 11.png"},
{name:"Paloma Valencia",file:"candidato 12.png"},
{name:"Sergio Fajardo",file:"candidato 13.png"},
{name:"Luis Gilberto Murillo",file:"candidato 14.png"},
{name:"Voto en blanco",file:"candidato 15.png"}
];

let candidateBanners = [
{
text:"Iván Cepeda celebra el crecimiento de su sector en el conteo presidencial",
candidate:"candidato 1.png"
},
{
text:"Los resultados presidenciales vuelven a poner a Clara López en escena",
candidate:"candidato 2.png"
},
{
text:"Claudia López mantiene influencia en el panorama político colombiano",
candidate:"candidato 3.png"
}
];

function renderCandidates(){

const panel = document.getElementById("candidatePanel");

if(!panel) return;

panel.innerHTML = "";

candidateBanners.forEach((item,i)=>{

const row = document.createElement("div");
row.className = "item";

const switchWrap = document.createElement("label");
switchWrap.className = "switch";

const toggle = document.createElement("input");
toggle.type = "checkbox";
toggle.checked = activeCandidateIndex === i;
toggle.onchange = ()=>toggleCandidate(i);

const slider = document.createElement("span");
slider.className = "slider";

switchWrap.appendChild(toggle);
switchWrap.appendChild(slider);

const label = document.createElement("span");
label.innerText = item.text;

const select = document.createElement("select");

candidates.forEach(candidate=>{

const option = document.createElement("option");
option.value = candidate.file;
option.innerText = candidate.name;

if(candidate.file === item.candidate){
option.selected = true;
}

select.appendChild(option);

});

select.onchange = (e)=>{

candidateBanners[i].candidate = e.target.value;

if(activeCandidateIndex === i){

publish({
type:"candidatos",
action:"show",
text:candidateBanners[i].text.toUpperCase(),
candidate:candidateBanners[i].candidate
});

}

};

const del = document.createElement("button");
del.className = "deleteBtn";
del.innerText = "Borrar";
del.onclick = ()=>deleteCandidate(i);

row.appendChild(switchWrap);
row.appendChild(label);
row.appendChild(select);
row.appendChild(del);

panel.appendChild(row);

});

}

function toggleCandidate(i){

if(activeCandidateIndex === i){

publish({
type:"candidatos",
action:"hide"
});

activeCandidateIndex = null;
renderCandidates();
return;

}

activeCandidateIndex = i;

publish({
type:"candidatos",
action:"show",
text:candidateBanners[i].text.toUpperCase(),
candidate:candidateBanners[i].candidate
});

renderCandidates();

}

function deleteCandidate(i){

candidateBanners.splice(i,1);

if(activeCandidateIndex === i){

publish({
type:"candidatos",
action:"hide"
});

activeCandidateIndex = null;

}

renderCandidates();

}

function addCandidateBanner(){

const input = document.getElementById("newCandidateText");

if(!input) return;

const text = input.value.trim();

if(!text) return;

candidateBanners.push({
text:text,
candidate:"candidato 1.png"
});

input.value = "";

updateTextCounter(input,"candidateCounter",130);

renderCandidates();

}


// ============================================
// ROLES
// ============================================

let roles = [
{name:"CARLOS EDUARDO CAICEDO",role:"CANDIDATO POR FIRMAS INDEPENDIENTE"},
{name:"LUIS GILBERTO MURILLO URRUTIA",role:"LUIS GILBERTO SOY YO"},
{name:"CLAUDIA LÓPEZ",role:"CON CLAUDIA IMPARABLES"},
{name:"CATALINA VALENCIA",role:"MODERADORA"}
];

function renderRoles(){

const panel = document.getElementById("rolesPanel");

if(!panel) return;

panel.innerHTML = "";

roles.forEach((item,i)=>{

const row = document.createElement("div");
row.className = "item";

const switchWrap = document.createElement("label");
switchWrap.className = "switch";

const toggle = document.createElement("input");
toggle.type = "checkbox";
toggle.checked = activeRoleIndex === i;
toggle.onchange = ()=>toggleRole(i);

const slider = document.createElement("span");
slider.className = "slider";

switchWrap.appendChild(toggle);
switchWrap.appendChild(slider);

const label = document.createElement("span");
label.innerText = item.name;

const del = document.createElement("button");
del.className = "deleteBtn";
del.innerText = "Borrar";
del.onclick = ()=>deleteRole(i);

row.appendChild(switchWrap);
row.appendChild(label);
row.appendChild(del);

panel.appendChild(row);

});

}

function toggleRole(i){

if(activeRoleIndex === i){

publish({
type:"roles",
action:"hide"
});

activeRoleIndex = null;
clearTimeout(autoOffTimer);
renderRoles();
return;

}

activeRoleIndex = i;

publish({
type:"roles",
action:"show",
name:roles[i].name.toUpperCase(),
role:roles[i].role.toUpperCase()
});

clearTimeout(autoOffTimer);

autoOffTimer = setTimeout(()=>{

publish({
type:"roles",
action:"hide"
});

activeRoleIndex = null;
renderRoles();

},11000);

renderRoles();

}

function deleteRole(i){

roles.splice(i,1);

if(activeRoleIndex === i){

publish({
type:"roles",
action:"hide"
});

activeRoleIndex = null;

}

renderRoles();

}

function addRole(){

const nameInput = document.getElementById("newRoleName");
const roleInput = document.getElementById("newRoleText");

if(!nameInput || !roleInput) return;

const name = nameInput.value.trim();
const role = roleInput.value.trim();

if(!name || !role) return;

roles.push({name,role});

nameInput.value = "";
roleInput.value = "";

updateTextCounter(nameInput,"roleNameCounter",70);
updateTextCounter(roleInput,"roleTextCounter",100);

renderRoles();

}


// ============================================
// CONTADORES
// ============================================

function updateTextCounter(input,id,max){

const counter = document.getElementById(id);

if(!counter || !input) return;

counter.innerText = input.value.length + " / " + max;

}


// ============================================
// EVENTOS INPUTS
// ============================================

window.addEventListener("DOMContentLoaded",()=>{

renderBanners();
renderCandidates();
renderRoles();

const bannerInput = document.getElementById("newBannerText");
const candidateInput = document.getElementById("newCandidateText");
const roleNameInput = document.getElementById("newRoleName");
const roleTextInput = document.getElementById("newRoleText");

if(bannerInput){

bannerInput.addEventListener("input",()=>{
updateTextCounter(bannerInput,"bannerCounter",130);
});

}

if(candidateInput){

candidateInput.addEventListener("input",()=>{
updateTextCounter(candidateInput,"candidateCounter",130);
});

}

if(roleNameInput){

roleNameInput.addEventListener("input",()=>{
updateTextCounter(roleNameInput,"roleNameCounter",70);
});

}

if(roleTextInput){

roleTextInput.addEventListener("input",()=>{
updateTextCounter(roleTextInput,"roleTextCounter",100);
});

}

});
```
