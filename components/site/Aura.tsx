/**
 * The Lumina ground: a fixed CSS gradient field with a grain overlay.
 *
 * v1 loaded a WebGL script from a third-party CDN on top of this. That is
 * dropped: it is decoration on the critical path of a page whose argument is
 * engineering judgement, and the CSS layer alone carries the look.
 */
export default function Aura() {
  return <div className="aura-background-component" aria-hidden="true" />;
}
