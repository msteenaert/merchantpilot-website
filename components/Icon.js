// Icon paths copied from the Shopify theme.
const P = {
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  feed: <><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="19" cy="17" r="2" /></>,
  refresh: <><path d="M21 12a9 9 0 11-3-6.7" /><path d="M21 3v6h-6" /></>,
  alert: <path d="M12 9v4m0 4h.01M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-5-5" /></>,
  pulse: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  price: <><path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8z" /><circle cx="7.5" cy="7.5" r="1.5" /></>,
  process: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9z" /><path d="M9 14l2 2 4-4" /></>,
  global: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  people: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0112 0" /><path d="M16 5a3 3 0 010 6M18 20a6 6 0 00-3-5.2" /></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  code: <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />,
  megaphone: <><path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1z" /><path d="M15 9a4 4 0 010 6M18 6a8 8 0 010 12" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>,
  support: <path d="M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.2A8 8 0 1121 12z" />,
  cash: <><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 10v.01M18 14v.01" /></>,
  euro: <path d="M17 6.5a6 6 0 100 11M5 10h9M5 14h9" />,
  store: <><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></>,
};
export default function Icon({ name }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{P[name] || P.shield}</svg>;
}
