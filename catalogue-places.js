'use strict';
countrySearchNames.Bangladesh='孟加拉国';countrySearchNames.Netherlands='荷兰';for(const [area,country]of [['亚洲','孟加拉国'],['欧洲','荷兰']])if(!itineraryAreas[area].includes(country))itineraryAreas[area].push(country);
for(const row of catalogueNewPlaces){
 if(places.some(p=>p.id===row.id))throw Error('Duplicate catalogue place '+row.id);
 const {essay,photo,imageReview,coordinateProvenance,destination,...data}=row;places.push({...data,icon:'◇',sourceLabel:'机构资料与馆藏著录',coordinateNote:row.id==='expansion-hulan-xigang'?'公园区域代表点，不是纪念碑、墓穴或公园入口的精确导航位置。':row.id==='expansion-kafka-grave'?'墓园区域代表点；卡夫卡实际墓位为21—14—21，不是精确墓穴导航。':'建筑或地景代表点，不是无障碍入口或精确导航位置。'});placeEssays[row.id]=essay;if(photo){photoLibrary[row.id]=photo;editorialPlacePhotos[row.id]=row.id;}
 for(const id of row.themes){atlasThemePlaceIds.set(id,[...(atlasThemePlaceIds.get(id)||[]),row.id]);if(discoveryMeta[id])discoveryMeta[id][2]+=' '+row.name+' '+row.desc;const map=typeof culturalThemeMaps==='undefined'?null:culturalThemeMaps.get(id);if(map)map.extraPlaces=[...new Set([...(map.extraPlaces||[]),row.id])];}
}
