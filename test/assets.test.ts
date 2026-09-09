import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { projects } from "../content/projects.ts";
import { essays } from "../content/essays.ts";
import { renderMarkdown } from "../lib/markdown.ts";

test("every heroShot file exists in public/", () => {
  for (const p of projects) {
    if (!p.heroShot) continue;
    assert.ok(existsSync(`public${p.heroShot}`), `${p.slug} heroShot missing: ${p.heroShot}`);
  }
});

test("the resume is present, is a real PDF, and is one page", () => {
  assert.ok(existsSync("public/resume.pdf"), "public/resume.pdf missing");
  const buf = readFileSync("public/resume.pdf");
  assert.equal(buf.subarray(0, 5).toString(), "%PDF-", "not a PDF");
  const pages = (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  assert.equal(pages, 1, `resume should be 1 page, found ${pages}`);
  const kb = statSync("public/resume.pdf").size / 1024;
  assert.ok(kb > 20 && kb < 800, `resume size looks wrong: ${Math.round(kb)}KB`);
});

test("no single image is large enough to hurt LCP", () => {
  for (const p of projects) {
    if (!p.heroShot) continue;
    const kb = statSync(`public${p.heroShot}`).size / 1024;
    assert.ok(kb < 600, `${p.heroShot} is ${Math.round(kb)}KB, too heavy for a hero`);
  }
});

test("both essay markdown files exist and render", () => {
  for (const e of essays) {
    const path = `content/essays/${e.slug}.md`;
    assert.ok(existsSync(path), `missing ${path}`);
    const md = readFileSync(path, "utf8");
    const html = renderMarkdown(md);
    assert.ok(html.length > 1000, `${e.slug} rendered suspiciously short`);

    // Only assert on structure the source actually contains. evaluator-bug is
    // prose and code, grading-the-model carries the benchmark tables.
    if (md.split("\n").some((l) => l.startsWith("|"))) {
      assert.match(html, /<table/, `${e.slug} lost its tables`);
    }
    if (md.includes("```")) {
      assert.match(html, /<pre/, `${e.slug} lost its code blocks`);
      assert.ok(!html.includes("<script"), `${e.slug} rendered a script tag`);
    }
  }
});

test("essay pull quotes appear in their own source text", () => {
  for (const e of essays) {
    const md = readFileSync(`content/essays/${e.slug}.md`, "utf8");
    const needle = e.pullQuote.replace(/[.]$/, "");
    assert.ok(md.includes(needle), `${e.slug} pull quote is not in the essay: ${e.pullQuote}`);
  }
});

test("essays carry no repo-relative markdown links", () => {
  for (const e of essays) {
    const md = readFileSync(`content/essays/${e.slug}.md`, "utf8");
    const bad = md.match(/\]\([a-z][a-z0-9-]*\.md\)/g);
    assert.equal(bad, null, `${e.slug} still links to ${bad?.join(", ")}`);
  }
});
