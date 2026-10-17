# G.G Metal Works website

Read `README.md`, then `HANDOFF.md`.

- Next.js 16 has breaking changes from older versions: check `node_modules/next/dist/docs/` before using an API.
- Content is data: `lib/site.ts` and `content/*`. Content requests are edits there, not in page code.
- Server components by default; client components only for interaction. No new runtime dependency without a reason
  in `HANDOFF.md`. Keep the CSP in `next.config.ts` strict (add an origin only when a feature needs it).
- Copy makes no claims the owner has not given us (certifications, capacities, delivery times, prices).
- Verify: `npm run lint && npx tsc --noEmit && npm run build` (a new route needs `build` before `tsc`).
- Git: commit or push only when the owner asks. Update `HANDOFF.md` at the end of every task.
