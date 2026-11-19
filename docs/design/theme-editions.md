# Regional editions

Navigation, search, saved trips and route order stay consistent. Each edition changes its reading lens, cover composition, map palette, line rhythm and sidebar station treatment.

- Nature: field observations, landscape photography, fine graticule and landscape glyphs.
- Culture: archive framing, serif title, restrained borders and architectural glyphs.
- Three Gorges: panoramic river photograph, blue connecting lines and a river-like station rail.
- US parks: field-guide panel, shield-like station numbers and regional route dashes.
- Tea Horse Road: trade-station reading, earthy palette, square station stamps and broken historic links.
- Silk Road: desert/sea contrast, graticule, mixed-dash network and junction reading.
- Marco Polo: voyage-log typography, maritime blue, chapter reading and long route dashes.
- Xu Xiake: original book-page landscape, serif Chinese title, chronological margin and short dotted itinerary lines.
- Kumano: original cedar-forest/stairway composition, station rail and close geographic station diagram. At local zoom the low-resolution world coastline is omitted rather than passed off as a trail map.
- Camino: original open-road/shell-waymark illustration, blue/ochre wayfinding and long-distance station sequence.

All connecting lines are schematic. No drawn textures represent elevation, and no cover is a navigational map. The three walking illustrations are original SVGs, not historic scans or external photographs. Existing photographs retain their source and license entries in media.js. References inform the reading direction, not copied assets:
- https://www.nlcpress.com/ProductView.aspx?Id=12998
- https://www2.tb-kumano.jp/en/kumano-kodo/pdf/Kumano-Kodo-Nakahechi-Route-Maps-Complete.pdf

QA: node --test tests/*.test.cjs; syntax checks; all ten desktop editions inspected; 390×844 iframe layouts checked for Xu/Kumano/Camino and Kumano route interaction exercised. This is responsive browser QA, not physical-device testing.
