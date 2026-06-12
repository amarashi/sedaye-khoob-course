// Builds the static GitHub Pages preview into dist/.
// Pre-renders index.html with the same renderer the server uses, so the
// admin sees the real page (content, meta, JSON-LD) without a backend.
// The preview is marked noindex; the checkout form stays visible but any
// submission shows the graceful "ordering unavailable" message because
// there is no /api on Pages.
const fs = require("fs");
const path = require("path");
const { readContent, renderIndex } = require("../server/content-renderer");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const pagesUrl = (process.env.PAGES_URL || "http://localhost:8080").replace(/\/+$/, "");

const content = readContent(path.join(rootDir, "content", "site.json"));
content.page = {
  ...content.page,
  robots: "noindex, nofollow",
  canonicalPath: `${new URL(`${pagesUrl}/`).pathname}`,
};

const template = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const html = renderIndex(template, content, { publicBaseUrl: pagesUrl });

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, "index.html"), html);

for (const file of ["styles.css", "script.js"]) {
  fs.copyFileSync(path.join(rootDir, file), path.join(distDir, file));
}
fs.cpSync(path.join(rootDir, "assets"), path.join(distDir, "assets"), { recursive: true });
fs.cpSync(path.join(rootDir, "content"), path.join(distDir, "content"), { recursive: true });

console.log(`Pages preview built in dist/ for ${pagesUrl}`);
