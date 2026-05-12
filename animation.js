/* ====================================== */
/* ABLY UNIVERSAL */
/* ====================================== */

const ABLY_KEY =
"bOKecA.DM-G9g:YojB__4e1uHIMPer7ANbwW7xF8jRunVc9TW7ALFLwpQ";

const CHANNEL_NAME =
"ably-elecciones-completo";

const ably =
new Ably.Realtime(ABLY_KEY);

const channel =
ably.channels.get(CHANNEL_NAME);


/* ====================================== */
/* INDICADOR CONEXIÓN */
/* ====================================== */

const connectionDot =
document.getElementById("connectionDot");

ably.connection.on((stateChange)=>{

if(!connectionDot) return;

if(stateChange.current==="connected"){
connectionDot.style.background="#00ff7a";
}

if(
stateChange.current==="connecting" ||
stateChange.current==="disconnected"
){
connectionDot.style.background="#ffaa00";
}

if(
stateChange.current==="suspended" ||
stateChange.current==="failed"
){
connectionDot.style.background="#ff0033";
}

});


/* ====================================== */
/* OVERLAY URL */
/* ====================================== */

const overlayURL =
window.location.origin +
window.location.pathname.replace(
"control.html",
"overlay.html"
);


/* ====================================== */
/* BOTONES */
/* ====================================== */

function openOverlay(){

window.open(
overlayURL,
"_blank"
);

}

function copyOverlay(){

navigator.clipboard.writeText(
overlayURL
);

alert("URL copiada para vMix");

}


/* ====================================== */
/* BANNERS */
/* ====================================== */

let banners=[

"Registraduría reporta normalidad en apertura de urnas para elecciones 2026",

"Candidatos presidenciales inician jornada de votación en Bogotá",

"Alta participación ciudadana marca primeras horas de elecciones 2026"

];

let activeBannerIndex=null;


/* RENDER */

function renderBanners(){

const panel =
document.getElementById("bannerPanel");

if(!panel) return;

panel.innerHTML="";

banners.forEach((text,i)=>{

const row =
document.createElement("div");

row.className="item";


const switchWrap =
document.createElement("label");

switchWrap.className="switch";


const toggle =
document.createElement("input");

toggle.type="checkbox";

toggle.checked =
(activeBannerIndex===i);

toggle.onchange=
()=>toggleBanner(i);


const slider =
document.createElement("span");

slider.className="slider";


switchWrap.appendChild(toggle);
switchWrap.appendChild(slider);


const label =
document.createElement("span");

label.innerText=text;


const del =
document.createElement("button");

del.innerText="Borrar";

del.className="deleteBtn";

del.onclick=
()=>deleteBanner(i);


row.appendChild(switchWrap);
row.appendChild(label);
row.appendChild(del);

panel.appendChild(row);

});

}


/* TOGGLE */

function toggleBanner(i){

if(activeBannerIndex===i){

channel.publish("graphics",{
type:"banner",
action:"hide"
});

activeBannerIndex=null;

renderBanners();

return;

}

activeBannerIndex=i;

channel.publish("graphics",{
type:"banner",
action:"show",
text:banners[i].toUpperCase()
});

renderBanners();

}


/* DELETE */

function deleteBanner(i){

banners.splice(i,1);

if(activeBannerIndex===i){

channel.publish("graphics",{
type:"banner",
action:"hide"
});

activeBannerIndex=null;

}

renderBanners();

}


/* ADD */

function addBanner(){

const input =
document.getElementById(
"bannerNewText"
);

const text =
input.value.trim();

if(!text) return;

banners.push(text);

input.value="";

updateBannerCounter();

renderBanners();

}


/* COUNTER */

const bannerTextarea =
document.getElementById(
"bannerNewText"
);

const bannerCounter =
document.getElementById(
"bannerCounter"
);

const bannerError =
document.getElementById(
"bannerError"
);

if(bannerTextarea){

bannerTextarea.addEventListener(
"input",
updateBannerCounter
);

}

function updateBannerCounter(){

const len =
bannerTextarea.value.length;

bannerCounter.innerText=
len+" / 130";

if(len>110){

bannerCounter.classList.add(
"warning"
);

bannerTextarea.classList.add(
"limit"
);

}else{

bannerCounter.classList.remove(
"warning"
);

bannerTextarea.classList.remove(
"limit"
);

}

if(len>=130){

bannerError.style.display="block";

}else{

bannerError.style.display="none";

}

}


/* ====================================== */
/* ROLES */
/* ====================================== */

let roles=[

{
name:"CARLOS EDUARDO CAICEDO",
role:"CANDIDATO POR FIRMAS INDEPENDIENTE"
},

{
name:"CLAUDIA LÓPEZ",
role:"CON CLAUDIA IMPARABLES"
}

];

let activeRoleIndex=null;
let autoOffTimer=null;


/* RENDER */

function renderRoles(){

const panel =
document.getElementById(
"rolesPanel"
);

if(!panel) return;

panel.innerHTML="";

roles.forEach((item,i)=>{

const row =
document.createElement("div");

row.className="item";


const switchWrap =
document.createElement("label");

switchWrap.className="switch";


const toggle =
document.createElement("input");

toggle.type="checkbox";

toggle.checked=
(activeRoleIndex===i);

toggle.onchange=
()=>toggleRole(i);


const slider =
document.createElement("span");

slider.className="slider";


switchWrap.appendChild(toggle);
switchWrap.appendChild(slider);


const label =
document.createElement("span");

label.innerText=item.name;


const del =
document.createElement("button");

del.innerText="Borrar";

del.className="deleteBtn";

del.onclick=
()=>deleteRole(i);


row.appendChild(switchWrap);
row.appendChild(label);
row.appendChild(del);

panel.appendChild(row);

});

}


/* TOGGLE */

function toggleRole(i){

if(activeRoleIndex===i){

channel.publish("graphics",{
type:"roles",
action:"hide"
});

activeRoleIndex=null;

clearTimeout(autoOffTimer);

renderRoles();

return;

}

activeRoleIndex=i;

channel.publish("graphics",{
type:"roles",
action:"show",
name:roles[i].name,
role:roles[i].role
});

clearTimeout(autoOffTimer);

autoOffTimer=setTimeout(()=>{

channel.publish("graphics",{
type:"roles",
action:"hide"
});

activeRoleIndex=null;

renderRoles();

},11000);

renderRoles();

}


/* DELETE */

function deleteRole(i){

roles.splice(i,1);

if(activeRoleIndex===i){

channel.publish("graphics",{
type:"roles",
action:"hide"
});

activeRoleIndex=null;

}

renderRoles();

}


/* ADD */

function addRole(){

const nameInput =
document.getElementById("newName");

const roleInput =
document.getElementById("newRole");

const name =
nameInput.value.trim();

const role =
roleInput.value.trim();

if(!name || !role) return;

roles.push({
name:name,
role:role
});

nameInput.value="";
roleInput.value="";

renderRoles();

}


/* ====================================== */
/* CANDIDATOS */
/* ====================================== */

const candidates=[

{name:"Iván Cepeda",file:"candidato 1.png"},
{name:"Clara Eugenia López",file:"candidato 2.png"},
{name:"Claudia López",file:"candidato 3.png"},
{name:"Santiago Botero",file:"candidato 4.png"},
{name:"Abelardo de la Espriella",file:"candidato 5.png"}

];

let candidateBanners=[

{
text:"Iván Cepeda celebra el crecimiento de su sector en el conteo presidencial",
candidate:"candidato 1.png"
}

];

let activeCandidateIndex=null;


/* RENDER */

function renderCandidates(){

const panel =
document.getElementById(
"candidatePanel"
);

if(!panel) return;

panel.innerHTML="";

candidateBanners.forEach((item,i)=>{

const row =
document.createElement("div");

row.className="item";


const switchWrap =
document.createElement("label");

switchWrap.className="switch";


const toggle =
document.createElement("input");

toggle.type="checkbox";

toggle.checked=
(activeCandidateIndex===i);

toggle.onchange=
()=>toggleCandidate(i);


const slider =
document.createElement("span");

slider.className="slider";


switchWrap.appendChild(toggle);
switchWrap.appendChild(slider);


const label =
document.createElement("span");

label.innerText=item.text;


const select =
document.createElement("select");


candidates.forEach(candidate=>{

const option =
document.createElement("option");

option.value=
candidate.file;

option.innerText=
candidate.name;

if(candidate.file===item.candidate){
option.selected=true;
}

select.appendChild(option);

});


select.onchange=(e)=>{

candidateBanners[i].candidate=
e.target.value;

};


const del =
document.createElement("button");

del.innerText="Borrar";

del.className="deleteBtn";

del.onclick=
()=>deleteCandidate(i);


row.appendChild(switchWrap);
row.appendChild(label);
row.appendChild(select);
row.appendChild(del);

panel.appendChild(row);

});

}


/* TOGGLE */

function toggleCandidate(i){

if(activeCandidateIndex===i){

channel.publish("graphics",{
type:"candidatos",
action:"hide"
});

activeCandidateIndex=null;

renderCandidates();

return;

}

activeCandidateIndex=i;

channel.publish("graphics",{
type:"candidatos",
action:"show",
text:candidateBanners[i].text.toUpperCase(),
candidate:candidateBanners[i].candidate
});

renderCandidates();

}


/* DELETE */

function deleteCandidate(i){

candidateBanners.splice(i,1);

if(activeCandidateIndex===i){

channel.publish("graphics",{
type:"candidatos",
action:"hide"
});

activeCandidateIndex=null;

}

renderCandidates();

}


/* ADD */

function addCandidateBanner(){

const input =
document.getElementById(
"candidateNewText"
);

const text =
input.value.trim();

if(!text) return;

candidateBanners.push({
text:text,
candidate:"candidato 1.png"
});

input.value="";

updateCandidateCounter();

renderCandidates();

}


/* COUNTER */

const candidateTextarea =
document.getElementById(
"candidateNewText"
);

const candidateCounter =
document.getElementById(
"candidateCounter"
);

const candidateError =
document.getElementById(
"candidateError"
);

if(candidateTextarea){

candidateTextarea.addEventListener(
"input",
updateCandidateCounter
);

}

function updateCandidateCounter(){

const len =
candidateTextarea.value.length;

candidateCounter.innerText=
len+" / 130";

if(len>110){

candidateCounter.classList.add(
"warning"
);

candidateTextarea.classList.add(
"limit"
);

}else{

candidateCounter.classList.remove(
"warning"
);

candidateTextarea.classList.remove(
"limit"
);

}

if(len>=130){

candidateError.style.display="block";

}else{

candidateError.style.display="none";

}

}


/* ====================================== */
/* MOSCA */
/* ====================================== */

const toggle =
document.getElementById("toggle");

const horaInput =
document.getElementById("hora");

const loopSelect =
document.getElementById("loopMin");


if(toggle){

toggle.addEventListener("change",()=>{

channel.publish("graphics",{
type:"mosca",
action:
toggle.checked ? "on" : "off"
});

});

}


function enviarHora(){

channel.publish("graphics",{
type:"moscaHora",
hora:horaInput.value
});

}


function enviarLoop(){

channel.publish("graphics",{
type:"moscaLoop",
minutos:loopSelect.value
});

}


if(horaInput){

horaInput.addEventListener(
"change",
enviarHora
);

}

if(loopSelect){

loopSelect.addEventListener(
"change",
enviarLoop
);

}


/* ====================================== */
/* INIT */
/* ====================================== */

renderBanners();
renderRoles();
renderCandidates();

updateBannerCounter();
updateCandidateCounter();

enviarHora();
enviarLoop();
