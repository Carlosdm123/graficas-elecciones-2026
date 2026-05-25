let bannerMaskCreated = false;

function createBannerMask(){

if(bannerMaskCreated) return;

const banner = document.getElementById("banner");

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

bannerMaskCreated = true;

}

function resetBanner(){

createBannerMask();

const banner = document.getElementById("banner");
const mask1 = document.getElementById("mask1");
const mask2 = document.getElementById("mask2");
const logo  = document.getElementById("logoBox");

banner.style.transition="none";
mask1.style.transition="none";
mask2.style.transition="none";
logo.style.transition="none";

banner.style.transform="translateY(0px)";
banner.style.opacity="1";

logo.style.left="50vw";

mask1.style.clipPath="inset(0 0 0 100%)";
mask2.style.clipPath="inset(0 0 0 100%)";

mask2.style.zIndex="1";

}

function startBanner(){

resetBanner();

const mask1 = document.getElementById("mask1");
const mask2 = document.getElementById("mask2");
const logo  = document.getElementById("logoBox");

setTimeout(()=>{

mask1.style.transition="clip-path 0.6s ease";
mask1.style.clipPath="inset(0 0 0 0)";

},100);

setTimeout(()=>{

mask1.style.clipPath="inset(0 1720px 0 0)";

logo.style.transition="left 0.6s ease";
logo.style.left="100px";

},1030);

setTimeout(()=>{

mask2.style.zIndex="-1";
mask2.style.clipPath="inset(0 0 0 0)";

},925);

}

function hideBanner(){

const banner=document.getElementById("banner");

banner.style.transition="transform 1.5s ease";
banner.style.transform="translateY(400px)";

}
