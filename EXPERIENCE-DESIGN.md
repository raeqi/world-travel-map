# Discovery and reading edition

Frontend Design skill applied (2026-11-17): https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md

Palette: paper #ffffff, ink #243746, secondary #647282, blue #315e87, light slate #f0f3f6, ochre #a27a32. Source paintings retain their colours. Typography: Noto Serif CJK SC for titles; system sans for controls and long reading; comfortable left-aligned measures.

Homepage: a six-theme carousel pairs real photographs, art and an object study with a useful global search. Nakasendo combines a present street with Hiroshige; Hedeby preserves the photographed rune stone on a dark ground; canal, highland and park landscapes keep their own image compositions. An interest filter and a geographic filter reveal themes and curated itineraries. The carousel leads directly into interest and geographic discovery; the fixed three-theme recommendation row has been removed. The complete catalogue remains available and searchable. Counts derive from the data, not handwritten hero statistics. Search and filters persist in the URL and survive returning from a route.

Map/reading: common sidebar and navigation metrics, recognisable source-specific covers. A stable desktop reading drawer and a mobile bottom sheet replace the small floating card. Title, overview, optional expanded context, related works and sources form a consistent hierarchy. All original records benefit; only explicitly curated entries claim new research. Escape and close restore focus, route context survives reading a station.

Critique: replacing twenty buttons with twenty identical poster tiles would retain the discovery problem. Separate finding from browsing; show route search results as itineraries, and show cultural imagery as evidence. No invented runes, contour maps, generic AI scenery or page-wide pale green background.

Data: extend Impressionism from four to eight licensed paintings; add one focused Van Gogh theme with three paintings and four biography locations. Creation/depiction and collection remain separate. Restricted Met 437133 is excluded after API verification. The London painting's 1903 date is not described as a date of field painting.

Carousel: fixed stage dimensions and instant content changes avoid slide motion or layout shifts. Automatic updates remain outside live announcements. Focus entry and manual selection stop rotation until explicitly restarted; hover, hidden-page and offscreen states suspend timers. Reduced-motion preferences disable automatic rotation. Mobile controls use 44-pixel targets in two rows.

Sidebar correction: independent 10px desktop / 8px mobile place-card spacing, fixed icon/arrow widths, wrapping names, and a persistent vertical splitter. The splitter is pointer- and keyboard-operable; the map canvas resizes with it, and narrow map panes use a smaller reading drawer. Mobile keeps the stacked layout.

Image correction: theme identity is distinct from itinerary evidence. Route media is selected only from a stop present in that route; other routes use a neutral typographic location card. No country receives a generic Kyoto fallback. Carousel controls remain visible without explanatory playback text.

Natural landscape discovery shares eleven specifically tagged existing road itineraries without moving their parent themes or copying stops. A map-view search can return scoped landscape itineraries even when no theme matches. Home filters remain in route URLs and survive reload and return. Motion preferences and visibility gates no longer write to the explicit user pause setting; disabling reduced motion resumes an otherwise playing carousel. See NATURE-DISCOVERY.md for scope and unimplemented map candidates.
