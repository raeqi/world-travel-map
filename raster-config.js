'use strict';
// Only the documented MapTiler XYZ API is accepted. No arbitrary tile hosts,
// public demo keys, URL/hash credentials, proxy, persistent cache or fallback hopping.
function normalizeRasterConfig(input){
 if(!input||typeof input!=='object')return {enabled:false,reason:'credentials-missing'};
 if(input.provider!=='maptiler')return {enabled:false,reason:'config-invalid'};
 const mapId=input.mapId||'streets-v4',apiKey=input.apiKey||'';
 if(!apiKey)return {enabled:false,reason:'credentials-missing'};
 if(typeof apiKey!=='string'||!/^[-_a-zA-Z0-9]{8,128}$/.test(apiKey)||typeof mapId!=='string'||!/^[-_a-zA-Z0-9]{1,80}$/.test(mapId))return {enabled:false,reason:'config-invalid'};
 return {enabled:true,provider:'maptiler',mapId,apiKey};
}
function currentRasterConfig(){return normalizeRasterConfig(globalThis.TERRA_RASTER_CONFIG)}
function rasterTileTemplate(config){return 'https://api.maptiler.com/maps/'+encodeURIComponent(config.mapId)+'/256/{z}/{x}/{y}.png?key='+encodeURIComponent(config.apiKey)}
async function validateRasterSource(config,{fetcher=fetch,signal}={}){
 const url='https://api.maptiler.com/maps/'+encodeURIComponent(config.mapId)+'/256/tiles.json?key='+encodeURIComponent(config.apiKey);
 let response;try{response=await fetcher(url,{signal})}catch{throw Error('source-unavailable')}
 if(response.status===401||response.status===403)throw Error('source-auth');
 if(!response.ok)throw Error('source-unavailable');
 let json;try{json=await response.json()}catch{throw Error('source-invalid')}
 if(!Array.isArray(json.tiles)||!json.tiles.length||!json.tiles.every(t=>typeof t==='string'&&t.startsWith('https://api.maptiler.com/')))throw Error('source-invalid');
 return true;
}
function safeBasemapError(code){return ['credentials-missing','config-invalid','tile-load-failed','tiles-timeout','engine-load-failed','webgl-unavailable','source-auth','source-unavailable','source-invalid'].includes(code)?code:'basemap-unavailable'}
if(typeof module!=='undefined'&&module.exports)module.exports={normalizeRasterConfig,rasterTileTemplate,validateRasterSource,safeBasemapError};
