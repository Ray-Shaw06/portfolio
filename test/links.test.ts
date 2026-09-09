import { test } from "node:test";
import assert from "node:assert/strict";
import { projects } from "../content/projects.ts";
import { profile } from "../content/profile.ts";

const urls = [
  ...projects.flatMap((p) => p.links.map((l) => l.href)),
  profile.github,
  profile.linkedin,
].filter((h): h is string => Boolean(h) && h!.startsWith("http"));

/**
 * LinkedIn answers non-browser requests with 999, its anti-bot status. The
 * link works for real visitors, so 999 from linkedin.com is treated as
 * reachable rather than silently dropping the URL from the check.
 */
function acceptable(url: string, status: number): boolean {
  if (status >= 200 && status < 400) return true;
  return status === 999 && new URL(url).hostname.endsWith("linkedin.com");
}

test("every outbound link resolves", { timeout: 90000 }, async () => {
  const failures: string[] = [];
  for (const url of [...new Set(urls)]) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!acceptable(url, res.status)) failures.push(`${url} -> ${res.status}`);
    } catch (e) {
      failures.push(`${url} -> ${(e as Error).message}`);
    }
  }
  assert.deepEqual(failures, [], `dead links:\n${failures.join("\n")}`);
});
