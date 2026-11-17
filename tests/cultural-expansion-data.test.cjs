'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const pack = require('../data/cultural-expansion/route-pack.v1.json');
const { validateCulturalPack } = require('../scripts/validate-cultural-expansion.cjs');
const copy = () => JSON.parse(JSON.stringify(pack));
test('cultural route evidence, geography and media relationships are internally consistent', () => {
  assert.deepEqual(validateCulturalPack(pack), []);
});
test('rejects missing locations, sources and false materialized-asset claims', () => {
  const broken = copy();
  broken.plans[0].placeIds.push('missing-stop');
  broken.places[0].sourceIds = [];
  broken.media[0].status.downloaded = true;
  broken.media[0].status.hash = null;
  const errors = validateCulturalPack(broken);
  assert.ok(errors.some(x => x.includes('unknown stop')));
  assert.ok(errors.some(x => x.includes('evidence required')));
  assert.ok(errors.some(x => x.includes('SHA-256')));
});
test('rejects duplicate points and confusing a collection with its depicted location', () => {
  const broken = copy();
  broken.places.push(broken.places[0]);
  broken.works[5].collection.placeId = broken.works[5].placeLinks[0].placeId;
  const errors = validateCulturalPack(broken);
  assert.ok(errors.some(x => x.includes('duplicate ID')));
  assert.ok(errors.some(x => x.includes('masquerade')));
});
