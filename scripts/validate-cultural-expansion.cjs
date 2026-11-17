'use strict';
// Pure data validator; source evidence and browser behavior still require independent review.
function validateCulturalPack(pack) {
  const errors = [];
  const check = (ok, message) => { if (!ok) errors.push(message); };
  const groups = ['themes', 'places', 'works', 'plans', 'media', 'sources'];
  for (const group of groups) {
    check(Array.isArray(pack[group]), group + ': array required');
    if (!Array.isArray(pack[group])) continue;
    check(new Set(pack[group].map(x => x.id)).size === pack[group].length, group + ': duplicate ID');
    for (const row of pack[group]) check(typeof row.id === 'string' && row.id.length > 0, group + ': missing ID');
  }
  if (groups.some(group => !Array.isArray(pack[group]))) return errors;
  const themes = new Map(pack.themes.map(x => [x.id, x]));
  const places = new Map(pack.places.map(x => [x.id, x]));
  const works = new Map(pack.works.map(x => [x.id, x]));
  const media = new Map(pack.media.map(x => [x.id, x]));
  const sources = new Set(pack.sources.map(x => x.id));
  const sourceRefs = (row, required = false) => {
    check(!required || (Array.isArray(row.sourceIds) && row.sourceIds.length > 0), row.id + ': evidence required');
    for (const id of row.sourceIds || []) check(sources.has(id), row.id + ': unknown source ' + id);
  };
  const secureUrl = url => typeof url === 'string' && url.startsWith('https://') && url.length > 8 && !Array.from(url).some(c => c.charCodeAt(0) <= 32);
  for (const source of pack.sources) check(secureUrl(source.url), source.id + ': invalid source URL');
  for (const theme of pack.themes) {
    check(theme.topology === 'network', theme.id + ': cultural collections must not claim a historical continuous trail');
    check(Array.isArray(theme.discoveryTerms) && theme.discoveryTerms.length > 1, theme.id + ': discovery terms required');
    if (theme.heroMediaId) check(media.has(theme.heroMediaId), theme.id + ': unknown hero media');
  }
  for (const place of pack.places) {
    check(themes.has(place.theme), place.id + ': unknown theme');
    check(Number.isFinite(place.lon) && Math.abs(place.lon) <= 180 && Number.isFinite(place.lat) && Math.abs(place.lat) <= 90, place.id + ': invalid coordinate');
    check(place.coordinateStatus === 'editorial-representative-not-navigation', place.id + ': coordinate limits required');
    check(typeof place.desc === 'string' && place.desc.trim().length >= 45, place.id + ': substantive description required');
    check(typeof place.lookFor === 'string' && place.lookFor.trim().length >= 20, place.id + ': specific observation required');
    sourceRefs(place, true);
  }
  for (const plan of pack.plans) {
    check(themes.has(plan.theme), plan.id + ': unknown theme');
    check(['route', 'network', 'loop'].includes(plan.topology), plan.id + ': unknown topology');
    check(Array.isArray(plan.placeIds) && plan.placeIds.length >= 2, plan.id + ': at least two stops required');
    for (const id of plan.placeIds || []) {
      check(places.has(id), plan.id + ': unknown stop ' + id);
      if (places.has(id)) check(places.get(id).theme === plan.theme, plan.id + ': cross-theme stop ' + id);
    }
    check(Number.isFinite(plan.suggestedDays) && plan.suggestedDays > 0, plan.id + ': duration required');
    check(Array.isArray(plan.months) && plan.months.length > 0 && plan.months.every(x => Number.isInteger(x) && x >= 1 && x <= 12), plan.id + ': invalid months');
    check(typeof plan.reason === 'string' && plan.reason.length > 30, plan.id + ': route-specific rationale required');
    sourceRefs(plan);
  }
  for (const work of pack.works) {
    check(themes.has(work.theme), work.id + ': unknown theme');
    sourceRefs(work, true);
    for (const link of work.placeLinks || []) {
      check(places.has(link.placeId), work.id + ': unknown linked place ' + link.placeId);
      check(typeof link.relation === 'string' && typeof link.certainty === 'string', work.id + ': relationship certainty required');
      if (work.collection && work.collection.placeId === link.placeId) check(link.relation === 'collection', work.id + ': collection must not masquerade as depicted place');
    }
    if (work.collection && work.collection.placeId) check(places.has(work.collection.placeId), work.id + ': unknown collection');
    for (const id of work.mediaIds || []) check(media.has(id), work.id + ': unknown media ' + id);
  }
  for (const item of pack.media) {
    if (item.workId) check(works.has(item.workId), item.id + ': unknown work');
    for (const id of item.placeIds || []) check(places.has(id), item.id + ': unknown media location ' + id);
    check(secureUrl(item.sourcePage) && secureUrl(item.downloadUrl) && secureUrl(item.rightsUrl), item.id + ': source, download and rights URLs required');
    check(typeof item.rights === 'string' && typeof item.rightsEvidence === 'string', item.id + ': per-file rights evidence required');
    check(item.status && typeof item.status.downloaded === 'boolean' && typeof item.status.visualChecked === 'boolean', item.id + ': asset state required');
    if (item.status && item.status.downloaded) check(typeof item.status.hash === 'string' && /^[a-f0-9]{64}$/.test(item.status.hash), item.id + ': downloaded asset requires SHA-256');
    if (item.status && !item.status.downloaded) check(item.status.hash === null, item.id + ': unmaterialized asset must not have a claimed hash');
  }
  return errors;
}
module.exports = { validateCulturalPack };
