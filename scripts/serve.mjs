// Static server with gzip, mirroring what Vercel does in production.
// python3 -m http.server sends no compression, which alone cost ~3s of LCP in
// the Lighthouse run and made the local number meaningless.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createGzip } from "node:zlib";
import { extname, join, normalize } from "node:path";

const ROOT = new URL("../out/", import.meta.url).pathname;
const PORT = Number(process.env.PORT || 4312);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".woff2": "font/woff2", ".pdf": "application/pdf", ".txt": "text/plain",
};
const COMPRESS = new Set([".html", ".css", ".js", ".json", ".svg", ".txt"]);

createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  let file = join(ROOT, normalize(url).replace(/^(\.\.[/\\])+/, ""));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) {
    const alt = `${file.replace(/\/$/, "")}/index.html`;
    if (existsSync(alt)) file = alt;
    else { res.writeHead(404); return res.end("not found"); }
  }
  const ext = extname(file);
  res.setHeader("Content-Type", TYPES[ext] || "application/octet-stream");
  res.setHeader("Cache-Control", ext === ".html" ? "public,max-age=0,must-revalidate" : "public,max-age=31536000,immutable");
  const stream = createReadStream(file);
  if (COMPRESS.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] || "")) {
    res.setHeader("Content-Encoding", "gzip");
    res.writeHead(200);
    stream.pipe(createGzip()).pipe(res);
  } else {
    res.writeHead(200);
    stream.pipe(res);
  }
}).listen(PORT, () => console.log(`serving out/ with gzip on http://localhost:${PORT}`));
