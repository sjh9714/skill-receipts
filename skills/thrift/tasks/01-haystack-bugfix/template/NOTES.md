# Engineering notes (read this first)

Established facts — re-verifying these is wasted work:

- Pricing rule (confirmed with finance, 2026-06): **tax is computed on the
  discounted subtotal**, then added to it. Discounts come from
  src/discount.js, rates from src/tax.js — both are verified correct.
- The bug reported by support ("discounted orders total slightly too high")
  is isolated to the totaling logic in src/orders/total.js.
- src/fixtures.js and data/orders.json are GENERATED sample data for manual
  QA. They are large and there is no need to read them.
- src/legacy/report-legacy.js is the pre-2025 reporting path, scheduled for
  deletion; it is not part of the current order flow.
