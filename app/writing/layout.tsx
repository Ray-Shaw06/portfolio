import ActiveSection from "@/components/site/ActiveSection.tsx";

/** Applies to this section and everything beneath it, so a project page keeps
 *  Work marked as current. */
export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ActiveSection href="/writing/" />
      {children}
    </>
  );
}
