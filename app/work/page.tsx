import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work, Rehaan Shaw",
  alternates: { canonical: "/" },
  robots: { index: false },
};

/**
 * There is no separate work index: the home page's selected-work section is
 * the index. This exists so /work, which v1 linked with anchors, is never a
 * 404. Static export has no runtime redirect, so it is a meta refresh.
 */
export default function WorkIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-40">
      <meta httpEquiv="refresh" content="0; url=/#work" />
      <p className="text-[15px] text-white/70">
        Redirecting to <a className="underline underline-offset-4" href="/#work">selected work</a>.
      </p>
    </div>
  );
}
