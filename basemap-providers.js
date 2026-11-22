'use strict';
// Reviewed allowlist. No arbitrary endpoints, URL hash, keys or automatic provider hopping.
const basemapProviders={
 versatiles:{id:'versatiles',name:'VersaTiles',style:'assets/basemaps/versatiles-9.1.0/muted.json',version:'9.1.0',labelFont:['noto_sans_regular'],cities:'assets/basemaps/natural-earth-5.1.2/cities.geo.json',attribution:[{label:'VersaTiles',url:'https://versatiles.org/'},{label:'© OpenStreetMap contributors',url:'https://www.openstreetmap.org/copyright'},{label:'Natural Earth',url:'https://www.naturalearthdata.com/'}],servicePolicy:'https://docs.versatiles.org/guides/use_tiles_versatiles_org'}
};
const defaultBasemapProvider='versatiles';
function currentBasemapProvider(){return basemapProviders[defaultBasemapProvider]}
function resolveBasemapResources(style,base){
 return {...style,sprite:Array.isArray(style.sprite)?style.sprite.map(s=>({...s,url:new URL(s.url,base).href})):style.sprite?new URL(style.sprite,base).href:undefined};
}
function maptilerRasterAttribution(){
 return {logo:{src:'assets/vendor/maptiler/logo.svg',url:'https://www.maptiler.com/',alt:'MapTiler logo'},attribution:[{label:'© MapTiler',url:'https://www.maptiler.com/copyright/'},{label:'© OpenStreetMap contributors',url:'https://www.openstreetmap.org/copyright'}]};
}
function renderBasemapAttribution(provider=currentBasemapProvider()){
 const el=document.querySelector('.basemap-attribution');el.replaceChildren();
 if(provider.logo){
  const link=document.createElement('a'),image=document.createElement('img');link.className='basemap-provider-logo';link.href=provider.logo.url;link.target='_blank';link.rel='noopener';image.src=provider.logo.src;image.alt=provider.logo.alt;image.width=67;image.height=20;link.append(image);el.append(link);
 }
 const text=document.createElement('span');el.append(text);
 provider.attribution.forEach((item,i)=>{if(i)text.append(' · ');const link=document.createElement('a');link.href=item.url;link.textContent=item.label;link.target='_blank';link.rel='noopener';text.append(link)});
}
