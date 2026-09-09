import { test } from "node:test";
import assert from "node:assert/strict";
import { projects } from "../content/projects.ts";
import { profile } from "../content/profile.ts";

const PROSE = ["oneLine", "constraint", "hardPart", "decision", "cost", "cardBlurb"] as const;

test("every project is present and complete", () => {
  // A floor, not an exact count: adding a project should not break the suite,
  // but silently losing one should.
  assert.ok(projects.length >= 7, `expected at least 7 projects, got ${projects.length}`);
  for (const p of projects) {
    for (const field of ["slug", "name", "status", ...PROSE] as const) {
      assert.ok(
        p[field] && String(p[field]).trim().length > 0,
        `${p.slug} is missing ${field}`,
      );
    }
    assert.ok(p.stack.length > 0, `${p.slug} has no stack`);
    assert.ok(p.links.length > 0, `${p.slug} has no links`);
    assert.ok(p.facts.length > 0, `${p.slug} has no facts`);
  }
});

test("every fact cites a source", () => {
  for (const p of projects) {
    for (const f of p.facts) {
      assert.ok(
        f.source.trim().length > 0,
        `${p.slug} fact "${f.label}" has no source`,
      );
    }
  }
});

test("no em dashes in prose copy", () => {
  for (const p of projects) {
    for (const field of PROSE) {
      assert.ok(
        !String(p[field]).includes("—"),
        `${p.slug} ${field} contains an em dash`,
      );
    }
  }
  for (const field of ["headline", "looking"] as const) {
    assert.ok(!profile[field].includes("—"), `profile ${field} contains an em dash`);
  }
});

test("dynamo has its own section, not a card", () => {
  const d = projects.find((p) => p.slug === "dynamo");
  assert.ok(d, "dynamo project missing");
  assert.equal(d!.showAsCard, false);
  assert.ok(projects.filter((p) => p.showAsCard).length >= 5);
});

test("no client deliverables are published for the paid work", () => {
  const d = projects.find((p) => p.slug === "dynamo")!;
  const blob = [d.oneLine, d.constraint, d.hardPart, d.decision, d.cost].join(" ");
  for (const leak of ["solve.sh", "instruction.md", "task.toml", "check.sh"]) {
    assert.ok(!blob.includes(leak), `dynamo copy names a client deliverable file: ${leak}`);
  }
  assert.ok(
    d.links.every((l) => !l.href),
    "dynamo must publish no link to client work",
  );
});

test("screening line names both role types", () => {
  assert.match(profile.screeningFacts, /SWE or AI engineering/);
});

test("SpotterAI uses the custom domain, not the vercel subdomain", () => {
  const s = projects.find((p) => p.slug === "spotterai")!;
  const live = s.links.find((l) => l.label === "Live app")!;
  assert.equal(live.href, "https://spotterai.xyz");
});

test("the evaluator check count matches the code, not the stale marketing copy", () => {
  const s = projects.find((p) => p.slug === "spotterai")!;
  const checks = s.facts.find((f) => f.label === "Deterministic checks")!;
  assert.equal(checks.value, "14");
});
