/**
 * Marks the current nav item without any client JavaScript.
 *
 * The header used to be a client component purely so it could read the
 * pathname, which roughly tripled hydration cost on every page. Instead each
 * page states which section it is, and this emits one server-rendered rule
 * targeting that link. No hooks, no hydration, and it works in every browser
 * rather than needing :has().
 */
export default function ActiveSection({ href }: { href: string }) {
  const sel = `[data-nav="${href}"]`;
  const css =
    `${sel}{color:#fff}` +
    `${sel} .nav-rule{opacity:1}` +
    `${sel}.nav-pill{background:rgba(255,255,255,.10);color:#fff}`;
  return <style>{css}</style>;
}
