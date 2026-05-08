// ======================================
// ABLY
// ======================================

const ably = new Ably.Realtime(
"bOKecA.DM-G9g:YojB__4e1uHIMPer7ANbwW7xF8jRunVc9TW7ALFLwpQ"
);

const channel = ably.channels.get(
"ably-elecciones-completo"
);


// ======================================
// OVERLAY ELEMENTS
// ======================================

const banner=document.getElementById("banner");
const bannerText=document.getElementById("bannerText");

const candidateBanner=document.getElementById("candidateBanner");
const candidateText=document.getElementById("candidateBannerText");
const candidateImg=document.getElementById("candidateImg");

const rolesBanner=document.getElementById("rolesBanner");
const roleName=document.getElementById("roleName");
const roleText=document.getElementById("roleText");

const mosca=document.getElementById("moscaContainer");


// ======================================
// INITIAL STATES
// ======================================

if(banner){
banner.style.opacity="0";
}

if(candidateBanner){
candidateBanner.style.opacity="0";
}

if(rolesBanner){
rolesBanner.style.opacity="0";
}

if(mosca){
mosca.style.opacity="0";
}


// ======================================
// WEBSOCKET LISTENER
// ======================================

channel.subscribe("graphics",(message)=>{

const data=message.data;


// ======================================
// BANNER
// ======================================

if(data.type==="banner"){

if(!banner) return;

if(data.action==="show"){

bannerText.innerText=data.text;

banner.style.opacity="1";

}

if(data.action==="hide"){

banner.style.opacity="0";

}

}


// ======================================
// CANDIDATOS
// ======================================

if(data.type==="candidatos"){

if(!candidateBanner) return;

if(data.action==="show"){

candidateText.innerText=data.text;

candidateImg.src=
"assets/candidatos/"+data.candidate;

candidateBanner.style.opacity="1";

}

if(data.action==="hide"){

candidateBanner.style.opacity="0";

}

}


// ======================================
// ROLES
// ======================================

if(data.type==="roles"){

if(!rolesBanner) return;

if(data.action==="show"){

roleName.innerText=data.name;

roleText.innerText=data.role;

rolesBanner.style.opacity="1";

}

if(data.action==="hide"){

rolesBanner.style.opacity="0";

}

}


// ======================================
// MOSCA
// ======================================

if(data.type==="mosca"){

if(!mosca) return;

if(data.action==="on"){

mosca.style.opacity="1";

}

if(data.action==="off"){

mosca.style.opacity="0";

}

}

});


// ======================================
// CONTROLADOR
// ======================================

const connectionDot=document.getElementById(
"connectionDot"
);

if(connectionDot){

ably.connection.on((stateChange)=>{

if(stateChange.current==="connected"){
connectionDot.style.background="#00ff7a";
}

if(stateChange.current==="connecting"){
connectionDot.style.background="#ffaa00";
}

if(stateChange.current==="disconnected"){
connectionDot.style.background="#ff0033";
}

});

}


// ======================================
// PREVIEW
// ======================================

function openOverlay(){

window.open(
"overlay.html",
"_blank"
);

}

function copyOverlay(){

navigator.clipboard.writeText(
window.location.origin+"/overlay.html"
);

alert("URL copiada");

}


// ======================================
// BANNERS CONTROL
// ======================================

let banners=[

"Registraduría reporta normalidad en apertura de urnas para elecciones 2026",

"Candidatos presidenciales inician jornada de votación en Bogotá",

"Alta participación ciudadana marca primeras horas de elecciones 2026"

];

let activeBannerIndex=null;


function renderBanners(){

const panel=document.getElementById(
"bannerPanel"
);

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


function addBanner(){

const input=document.getElementById(
"newBannerText"
);

if(!input) return;

const text=input.value.trim();

if(!text) return;

banners.push(text);

input.value="";

updateCounter(
input,
"bannerCounter",
130
);

renderBanners();

}


// ======================================
// CANDIDATOS CONTROL
// ======================================

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

const candidates=[

{name:"Iván Cepeda",file:"candidato 1.png"},
{name:"Clara Eugenia López",file:"candidato 2.png"},
{name:"Claudia López",file:"candidato 3.png"},
{name:"Santiago Botero",file:"candidato 4.png"},
{name:"Abelardo de la Espriella",file:"candidato 5.png"},
{name:"Mauricio Lizcano",file:"candidato 6.png"},
{name:"Miguel Uribe",file:"candidato 7.png"},
{name:"Sondra Macollins",file:"candidato 8.png"},
{name:"Roy Barreras",file:"candidato 9.png"},
{name:"Carlos Caicedo",file:"candidato 10.png"},
{name:"Gustavo Matamoros",file:"candidato 11.png"},
{name:"Paloma Valencia",file:"candidato 12.png"},
{name:"Sergio Fajardo",file:"candidato 13.png"},
{name:"Luis Gilberto Murillo",file:"candidato 14.png"},
{name:"Voto en blanco",file:"candidato 15.png"}

];

let activeCandidateIndex=null;


function renderCandidates(){

const panel=document.getElementById(
"candidatePanel"
);

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

channel.publish("graphics",{
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


function addCandidateBanner(){

const input=document.getElementById(
"newCandidateText"
);

if(!input) return;

const text=input.value.trim();

if(!text) return;

candidateBanners.push({
text:text,
candidate:"candidato 1.png"
});

input.value="";

updateCounter(
input,
"candidateCounter",
130
);

renderCandidates();

}


// ======================================
// ROLES CONTROL
// ======================================

let roles=[

{
name:"CARLOS EDUARDO CAICEDO",
role:"CANDIDATO POR FIRMAS INDEPENDIENTE"
},

{
name:"LUIS GILBERTO MURILLO URRUTIA",
role:"LUIS GILBERTO SOY YO"
},

{
name:"CLAUDIA LÓPEZ",
role:"CON CLAUDIA IMPARABLES"
},

{
name:"CATALINA VALENCIA",
role:"MODERADORA"
}

];

let activeRoleIndex=null;
let autoOffTimer=null;


function renderRoles(){

const panel=document.getElementById(
"rolesPanel"
);

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
name:roles[i].name.toUpperCase(),
role:roles[i].role.toUpperCase()
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


function addRole(){

const nameInput=document.getElementById(
"newRoleName"
);

const roleInput=document.getElementById(
"newRoleText"
);

const name=nameInput.value.trim();
const role=roleInput.value.trim();

if(!name || !role) return;

roles.push({name,role});

nameInput.value="";
roleInput.value="";

updateCounter(
nameInput,
"roleNameCounter",
70
);

updateCounter(
roleInput,
"roleTextCounter",
100
);

renderRoles();

}


// ======================================
// MOSCA CONTROL
// ======================================

const moscaToggle=document.getElementById(
"moscaToggle"
);

const horaInput=document.getElementById(
"hora"
);

const loopMin=document.getElementById(
"loopMin"
);


if(moscaToggle){

moscaToggle.addEventListener("change",()=>{

channel.publish("graphics",{
type:"mosca",
action:moscaToggle.checked ? "on" : "off"
});

});

}


if(horaInput){

horaInput.addEventListener("change",()=>{

channel.publish("graphics",{
type:"mosca",
action:"updateHora",
hora:horaInput.value
});

});

}


if(loopMin){

loopMin.addEventListener("change",()=>{

channel.publish("graphics",{
type:"mosca",
action:"updateLoop",
minutos:loopMin.value
});

});

}


// ======================================
// COUNTERS
// ======================================

function updateCounter(input,id,max){

const counter=document.getElementById(id);

if(!counter) return;

counter.innerText=
input.value.length+" / "+max;

}


// ======================================
// INIT
// ======================================

window.addEventListener("DOMContentLoaded",()=>{

renderBanners();
renderCandidates();
renderRoles();

const bannerInput=document.getElementById(
"newBannerText"
);

if(bannerInput){

bannerInput.addEventListener("input",()=>{

updateCounter(
bannerInput,
"bannerCounter",
130
);

});

}


const candidateInput=document.getElementById(
"newCandidateText"
);

if(candidateInput){

candidateInput.addEventListener("input",()=>{

updateCounter(
candidateInput,
"candidateCounter",
130
);

});

}


const roleNameInput=document.getElementById(
"newRoleName"
);

if(roleNameInput){

roleNameInput.addEventListener("input",()=>{

updateCounter(
roleNameInput,
"roleNameCounter",
70
);

});

}


const roleTextInput=document.getElementById(
"newRoleText"
);

if(roleTextInput){

roleTextInput.addEventListener("input",()=>{

updateCounter(
roleTextInput,
"roleTextCounter",
100
);

});

}


// ======================================
// DEFAULT MOSCA
// ======================================

channel.publish("graphics",{
type:"mosca",
action:"updateLoop",
minutos:2
});

});
