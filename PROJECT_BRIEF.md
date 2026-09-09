# Seattle Black Town Car demo

## Scope and recovered brief
New frontend-only customer presentation, recovered from the user's “Website Services Review” conversation. React, TypeScript, Vite, and React Router. No database, authentication, payment, external reservation submission, or messaging. This task implements the design foundation and homepage stage, with useful supporting routes and a local booking journey. Later stages may extend galleries, advanced itinerary controls, pricing, and operational policies; none are represented as working here.

## Brand
- Original supplied PNG copied byte-for-byte into `public/assets/seattle-town-car-logo.png`. Preserve its 300×112 aspect ratio.
- Logo says **Seattle Town Car Service**; configurable working site name is **Seattle Black Town Car**. Naming discrepancy requires eventual client approval.
- Black `#10100F`, champagne `#D5B587`, warm ivory `#F7F5F0`.
- `DESIGN.md` preserves the installed Uber reference. The bundled Uber and BMW community references were both reviewed for this stage.
- The implementation takes Uber's direct booking hierarchy and legible form pattern, then blends in BMW's automotive photography, disciplined grid, and alternating dark/light editorial bands. It uses a 1200px content area, generous 80px section rhythm, 700-weight sentence-case Inter headings, 400/500 body copy, quiet 8px inputs, 12–16px content panels, and selective pill-shaped actions. Champagne gold replaces either reference brand's action color.

## Routes and data
`/`, `/services`, `/fleet`, `/rates`, `/about`, `/contact`, `/book`; unmatched URLs have a useful recovery page. Centralized typed services, vehicle fixtures, locations, brand, and FAQs live in `src/data.ts`. The complete 277-row client rate sheet, Vancouver rates, exact display values, surcharge rules, search helpers, robust rate parsing, and static estimate logic live in `src/rates-data.ts` as the single pricing source of truth. Service purpose remains separate from vehicle class. Booking context preserves draft entries during internal navigation. The estimate is guidance only; availability and final pricing are confirmed through the existing quote-request flow.

Nine service categories: Airport Transfers, Airport SUV Service, SUV Chauffeur Service, Corporate Transportation, Hourly Chauffeur, Proms & Events, Wedding Transportation, Group & Van Transportation, Family Transportation.

Five representative classes: Standard Sedan, Business Class, Luxury SUV, Passenger Van, First Class. Capacities are explicitly illustrative.

## Initial implementation
Homepage booking panel transfers editable trip data into `/book`. Local location suggestions allow custom addresses. Booking supports trip type, pickup/drop-off, Seattle date/time, hourly duration, passengers/luggage, child-seat and assistance requests, compatible vehicle selection, review, and clearly simulated confirmation. No contact information is persisted or transmitted. Services support addressable details; fleet supports capacity filtering. Contact form only acknowledges locally.

## Deliberately deferred from later brief stages
Multi-image galleries, additional stops, return legs, deterministic sample pricing, draft persistence, and fully developed policy pages. No stage-completion claims are made for those later prompts.

## Stage progress
Stage 1 is complete: all six requested routes resolve, the homepage is fully composed, the responsive navigation is implemented, service and fleet fixtures are centralized, and the simulated booking journey is usable. Service detail dialogs are intentionally concise and may become richer detail panels in the next stage.

Homepage refinement: the hero now uses the supplied 1920×1080 H.264 video as a full-width cinematic background, including behind the transparent homepage header. Playback is constrained to 00:03–00:13, the static sedan remains the poster and reduced-motion fallback, and the homepage-only quick-booking card was removed without changing the dedicated booking route.

Homepage showcase refinement: the booking explanation is now a connected, one-time-reveal journey timeline that becomes vertical below 850px. The homepage Services section presents all nine centralized service categories in a static, manually scrollable rail with state-aware previous/next controls. The featured Business Class, Luxury SUV, and First Class cards use a seamless duplicated continuous rail that pauses for hover, focus, and pointer interaction. Reduced-motion users receive a static Fleet rail. Homepage-only representative labels and the fleet disclaimer were removed; the dedicated Services and Fleet pages are unchanged.

Service and About refinement: all nine centralized services now include a dedicated local 960×600 WebP image and meaningful alt text. Service cards reserve a stable image ratio and fall back to a neutral surface if an asset cannot load. The About route now includes the supplied since-2005 company history, more than two decades of Seattle experience, professional chauffeur positioning, journey-planning strengths, the existing “Make space for what matters” feature, and a directly following six-item “Why Choose Us” editorial grid. No awards, fleet-size claims, ratings, or guarantees were added.

Rates and estimate stage: `/rates` presents every client-supplied ZIP/destination/rate row in a responsive, immediately searchable directory, alongside the exact passenger, vehicle, gratuity, late-night, meet-and-greet, and Vancouver rules. Raw ambiguous values remain intact while reusable parsing exposes conservative low/high values and textual notes. The final booking review recalculates a static estimate from current trip state, applies only supported SUV, Seattle-area van, and late-night adjustments, discloses excluded 20% gratuity, and requests a custom quote when no reliable match exists.

## Verification — 2026-09-10
- `npm run lint`: completed with four non-blocking React fast-refresh/effect warnings; no errors.
- `npm run build`: production TypeScript/Vite build completed successfully. The installed Vite version reports that the local Node 20.14 runtime is below its preferred 20.19+ version, but the build still completed.
- Homepage showcase refinement: `npm run lint`, `npx tsc -b`, and a Vite production bundle completed successfully using source-level validation only. Existing lint warnings remain non-blocking.
- Desktop browser (approximately 1680×900): inspected the hero, logo contrast, booking panel, representative image crops, light/dark section rhythm, and lower content. No visible overflow or broken imagery.
- Compact/mobile layout: inspected at a 500px-wide browser viewport. Header logo, Book CTA, hamburger control, hero image, and stacked quick-booking panel fit without horizontal overflow. CSS includes dedicated 650px and 360px adaptations.
- Interactions: opened and closed FAQ content; populated a sample SEA → Downtown Seattle trip for 2026-09-12 at 14:30; Continue opened `/book` and preserved every value in editable fields and the trip summary.
- Navigation: header/footer links and all requested client-side routes were checked against the router configuration; an explicit useful fallback route is present.
- Rates/estimate validation: the authoritative source and structured dataset each contain 277 ZIP rows. Code-level assertions covered case-insensitive and partial city search, partial ZIP search, single/range/textual parsing, SUV +$20/+$35 paths, Seattle van +$90, 11:00 PM/5:00 AM boundaries, Vancouver BC special rates, Vancouver WA disambiguation, and unmatched destinations. Production build and TypeScript completed; lint reports only the four pre-existing React warnings.
