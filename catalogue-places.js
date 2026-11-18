'use strict';
for(const row of catalogueNewPlaces){
 if(places.some(p=>p.id===row.id))throw Error('Duplicate catalogue place '+row.id);
 const {essay,photo,...data}=row;places.push({...data,icon:'◇',sourceLabel:'机构资料与馆藏著录',coordinateNote:'建筑代表点，不是无障碍入口或精确导航位置。'});placeEssays[row.id]=essay;photoLibrary[row.id]=photo;editorialPlacePhotos[row.id]=row.id;
 for(const id of row.themes){atlasThemePlaceIds.set(id,[...(atlasThemePlaceIds.get(id)||[]),row.id]);discoveryMeta[id][2]+=' '+row.name+' '+row.desc;}
}
