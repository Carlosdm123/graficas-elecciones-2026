// ============================================
// ABLY UNIVERSAL
// ============================================

const ably = new Ably.Realtime({
key:"bOKecA.DM-G9g:YojB__4e1uHIMPer7ANbwW7xF8jRunVc9TW7ALFLwpQ"
});

const channel = ably.channels.get("ably-elecciones-completo");


// ============================================
// INDICADOR WS
// ============================================

const connectionDot = document.getElementById("connectionDot");

if(connectionDot){

ably.connection.on((stateChange)=>{

if(stateChange.current==="connected"){
connectionDot.style.background="#00ff7a";
}

if(stateChange.current==="connecting"){
connectionDot.style.background="orange";
}

if(stateChange.current==="disconnected"){
connectionDot.style.background="#ff0033";
}

});

}


// ============================================
// UTILIDAD
// ============================================

function publish(data){
channel.publish("graphics",data);
}


// ============================================
// OVERLAY
// ============================================

function openOverlay(){
window.open("overlay.html","_blank");
}

function copyOverlay(){

navigator.clipboard.writeText(
window.location.origin + "/overlay.html"
);

}


// ============================================
// BANNERS
// ============================================

let activeBannerIndex=null;

let banners=[

"Registraduría reporta normalidad en apertura de urnas para elecciones 2026",

"Candidatos presidenciales inician jornada de votación en Bogotá",

"Alta participación ciudadana marca primeras horas de elecciones 2026"

];

function renderBanners(){

const panel=document.getElementById("bannerPanel");

if(!panel) return;

panel.innerHTML="";

banners.forEach((text,i)=>{

const row=document.createElement("div");
row.className="item";

const switchWrap=document.createElement("label");
switchWrap.className="switch";

const toggle=document.createElement("input");
toggle.type="checkbox";
toggle.checked=(activeBannerIndex===i);

toggle.onchange=()=>toggleBanner(i);

const slider=document.createElement("span");
slider.className="slider";

switchWrap.appendChild(toggle);
switchWrap.appendChild(slider);

const label=document.createElement("span");
label.innerText=text;

const del=document.createElement("button");
del.className="deleteBtn";
del.innerText="Borrar";

del.onclick=()=>deleteBanner(i);

row.appendChild(switchWrap);
row.appendChild(label);
row.appendChild(del);

panel.appendChild(row);

});

}

function toggleBanner(i){

if(activeBannerIndex===i){

publish({
type:"banner",
action:"hide"
});

activeBannerIndex=null;

renderBanners();

return;

}

activeBannerIndex=i;

publish({
type:"banner",
action:"show",
text:banners[i].toUpperCase()
});

renderBanners();

}

function deleteBanner(i){

banners.splice(i,1);

if(activeBannerIndex===i){

publish({
type:"banner",
action:"hide"
});

activeBannerIndex=null;

}

renderBanners();

}

function addBanner(){

const input=document.getElementById("newBannerText");

if(!input) return;

const text=input.value.trim();

if(!text) return;

banners.push(text);

input.value="";

updateCounter(input,"bannerCounter",130);

renderBanners();

}


// ============================================
// CANDIDATOS
// ============================================

let activeCandidateIndex=null;

const candidates=[

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

let candidateBanners=[

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

const panel=document.getElementById("candidatePanel");

if(!panel) return;

panel.innerHTML="";

candidateBanners.forEach((item,i)=>{

const row=document.createElement("div");
row.className="item";

const switchWrap=document.createElement("label");
switchWrap.className="switch";

const toggle=document.createElement("input");
toggle.type="checkbox";
toggle.checked=(activeCandidateIndex===i);

toggle.onchange=()=>toggleCandidate(i);

const slider=document.createElement("span");
slider.className="slider";

switchWrap.appendChild(toggle);
switchWrap.appendChild(slider);

const label=document.createElement("span");
label.innerText=item.text;

const select=document.createElement("select");

candidates.forEach(candidate=>{

const option=document.createElement("option");

option.value=candidate.file;
option.innerText=candidate.name;

if(candidate.file===item.candidate){
option.selected=true;
}

select.appendChild(option);

});

select.onchange=(e)=>{

candidateBanners[i].candidate=e.target.value;

if(activeCandidateIndex===i){

publish({
type:"candidatos",
action:"show",
text:candidateBanners[i].text.toUpperCase(),
candidate:candidateBanners[i].candidate
});

}

};

const del=document.createElement("button");
del.className="deleteBtn";
del.innerText="Borrar";

del.onclick=()=>deleteCandidate(i);

row.appendChild(switchWrap);
row.appendChild(label);
row.appendChild(select);
row.appendChild(del);

panel.appendChild(row);

});

}

function toggleCandidate(i){

if(activeCandidateIndex===i){

publish({
type:"candidatos",
action:"hide"
});

activeCandidateIndex=null;

renderCandidates();

return;

}

activeCandidateIndex=i;

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

if(activeCandidateIndex===i){

publish({
type:"candidatos",
action:"hide"
});

activeCandidateIndex=null;

}

renderCandidates();

}

function addCandidateBanner(){

const input=document.getElementById("newCandidateText");

if(!input) return;

const text=input.value.trim();

if(!text) return;

candidateBanners.push({
text:text,
candidate:"candidato 1.png"
});

input.value="";

updateCounter(input,"candidateCounter",130);

renderCandidates();

}


// ============================================
// ROLES
// ============================================

let activeRoleIndex=null;
let autoOffTimer=null;

let roles=[

{name:"CARLOS EDUARDO CAICEDO",role:"CANDIDATO POR FIRMAS INDEPENDIENTE"},

{name:"LUIS GILBERTO MURILLO URRUTIA",role:"LUIS GILBERTO SOY YO"},

{name:"CLAUDIA LÓPEZ",role:"CON CLAUDIA IMPARABLES"},

{name:"CATALINA VALENCIA",role:"MODERADORA"}

];

function renderRoles(){

const panel=document.getElementById("rolesPanel");

if(!panel) return;

panel.innerHTML="";

roles.forEach((item,i)=>{

const row=document.createElement("div");
row.className="item";

const switchWrap=document.createElement("label");
switchWrap.className="switch";

const toggle=document.createElement("input");

toggle.type="checkbox";
toggle.checked=(activeRoleIndex===i);

toggle.onchange=()=>toggleRole(i);

const slider=document.createElement("span");
slider.className="slider";

switchWrap.appendChild(toggle);
switchWrap.appendChild(slider);

const label=document.createElement("span");
label.innerText=item.name;

const del=document.createElement("button");

del.className="deleteBtn";
del.innerText="Borrar";

del.onclick=()=>deleteRole(i);

row.appendChild(switchWrap);
row.appendChild(label);
row.appendChild(del);

panel.appendChild(row);

});

}

function toggleRole(i){

if(activeRoleIndex===i){

publish({
type:"roles",
action:"hide"
});

activeRoleIndex=null;

clearTimeout(autoOffTimer);

renderRoles();

return;

}

activeRoleIndex=i;

publish({
type:"roles",
action:"show",
name:roles[i].name.toUpperCase(),
role:roles[i].role.toUpperCase()
});

clearTimeout(autoOffTimer);

autoOffTimer=setTimeout(()=>{

publish({
type:"roles",
action:"hide"
});

activeRoleIndex=null;

renderRoles();

},11000);

renderRoles();

}

function deleteRole(i){

roles.splice(i,1);

if(activeRoleIndex===i){

publish({
type:"roles",
action:"hide"
});

activeRoleIndex=null;

}

renderRoles();

}

function addRole(){

const nameInput=document.getElementById("newRoleName");
const roleInput=document.getElementById("newRoleText");

if(!nameInput || !roleInput) return;

const name=nameInput.value.trim();
const role=roleInput.value.trim();

if(!name || !role) return;

roles.push({name,role});

nameInput.value="";
roleInput.value="";

updateCounter(nameInput,"roleNameCounter",70);
updateCounter(roleInput,"roleTextCounter",100);

renderRoles();

}


// ============================================
// MOSCA
// ============================================

const moscaToggle=document.getElementById("moscaToggle");
const horaInput=document.getElementById("hora");
const loopMin=document.getElementById("loopMin");

if(moscaToggle){

moscaToggle.addEventListener("change",()=>{

publish({
type:"mosca",
action: moscaToggle.checked ? "on" : "off"
});

});

}

if(horaInput){

horaInput.addEventListener("change",()=>{

publish({
type:"mosca",
action:"updateHora",
hora:horaInput.value
});

});

}

if(loopMin){

loopMin.addEventListener("change",()=>{

publish({
type:"mosca",
action:"updateLoop",
minutos:loopMin.value
});

});

}


// ============================================
// CONTADORES
// ============================================

function updateCounter(input,id,max){

const counter=document.getElementById(id);

if(!counter || !input) return;

counter.innerText=input.value.length+" / "+max;

}


// ============================================
// INIT
// ============================================

window.addEventListener("DOMContentLoaded",()=>{

renderBanners();
renderCandidates();
renderRoles();

const bannerInput=document.getElementById("newBannerText");
const candidateInput=document.getElementById("newCandidateText");

const roleNameInput=document.getElementById("newRoleName");
const roleTextInput=document.getElementById("newRoleText");

if(bannerInput){

bannerInput.addEventListener("input",()=>{

updateCounter(
bannerInput,
"bannerCounter",
130
);

});

}

if(candidateInput){

candidateInput.addEventListener("input",()=>{

updateCounter(
candidateInput,
"candidateCounter",
130
);

});

}

if(roleNameInput){

roleNameInput.addEventListener("input",()=>{

updateCounter(
roleNameInput,
"roleNameCounter",
70
);

});

}

if(roleTextInput){

roleTextInput.addEventListener("input",()=>{

updateCounter(
roleTextInput,
"roleTextCounter",
100
);

});

}


// LOOP DEFAULT MOSCA

publish({
type:"mosca",
action:"updateLoop",
minutos:2
});

});
