import { MonoLabel } from "./primitives.tsx";
import { IconCheck, IconCross } from "./icons.tsx";

const TESTS = [
  "test_config_is_rewritten",
  "test_service_restarts_clean",
  "test_rejects_malformed_input",
  "test_handles_unseen_input",
];

/**
 * The validity proof for a benchmark task, drawn as the two runs it consists of.
 * Test names are illustrative. Nothing here is a task authored for a client.
 */
export default function RedGreen() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Panel
        tone="red"
        command="pytest -q            # untouched container"
        label="before the agent"
        pass={false}
        summary="4 failed"
        caption="Red first. If any test passes here, the task is accidentally already solved and it is not a task."
      />
      <Panel
        tone="green"
        command="bash solve.sh && pytest -q"
        label="after the reference solution"
        pass
        summary="4 passed"
        caption="Green after. Proves the task is solvable and that the grader recognises a correct answer."
      />
    </div>
  );
}

function Panel({
  tone,
  command,
  label,
  pass,
  summary,
  caption,
}: {
  tone: "red" | "green";
  command: string;
  label: string;
  pass: boolean;
  summary: string;
  caption: string;
}) {
  const accent =
    tone === "red"
      ? { text: "text-rose-300", bg: "bg-rose-400/[0.06]", ring: "border-rose-400/20" }
      : { text: "text-emerald-300", bg: "bg-emerald-400/[0.06]", ring: "border-emerald-400/20" };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <MonoLabel>{label}</MonoLabel>
        <span
          className={`rounded-full border ${accent.ring} ${accent.bg} px-2 py-0.5 font-mono text-[10px] ${accent.text}`}
        >
          {summary}
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-black/40 p-3.5">
        <div className="font-mono text-[11px] text-white/45">
          <span className="text-white/25">$ </span>
          {command}
        </div>
        <div className="mt-2.5 space-y-1">
          {TESTS.map((t) => (
            <div key={t} className="flex items-center gap-2">
              {pass ? (
                <IconCheck className={`text-[12px] ${accent.text}`} />
              ) : (
                <IconCross className={`text-[12px] ${accent.text}`} />
              )}
              <span className="font-mono text-[10.5px] text-white/55">{t}</span>
              <span className={`ml-auto font-mono text-[10px] ${accent.text}`}>
                {pass ? "PASS" : "FAIL"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[12.5px] leading-relaxed text-white/45">{caption}</p>
    </div>
  );
}
