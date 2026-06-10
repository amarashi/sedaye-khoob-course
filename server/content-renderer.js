const fs = require("fs");

const sectionIds = {
  hero: "top",
  course: "course",
  curriculum: "curriculum",
  studio: "studio",
  outcomes: "outcomes",
  about: "about",
  testimonials: "testimonials",
  checkout: "checkout",
  contact: "contact",
};

function readContent(contentFile) {
  return JSON.parse(fs.readFileSync(contentFile, "utf8"));
}

function renderIndex(template, content, options = {}) {
  let html = template;
  const seo = buildSeo(content, options);

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bname="description"[^>]*>/, "content", seo.description);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bname="robots"[^>]*>/, "content", seo.robots);
  html = setAttributeInFirstTag(html, /<link\b[^>]*\brel="canonical"[^>]*>/, "href", seo.canonicalUrl);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bproperty="og:locale"[^>]*>/, "content", seo.locale);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bproperty="og:site_name"[^>]*>/, "content", seo.siteName);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bproperty="og:title"[^>]*>/, "content", seo.title);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bproperty="og:description"[^>]*>/, "content", seo.ogDescription);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bproperty="og:url"[^>]*>/, "content", seo.canonicalUrl);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bproperty="og:image"[^>]*>/, "content", seo.imageUrl);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bname="twitter:title"[^>]*>/, "content", seo.title);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bname="twitter:description"[^>]*>/, "content", seo.twitterDescription);
  html = setAttributeInFirstTag(html, /<meta\b[^>]*\bname="twitter:image"[^>]*>/, "content", seo.imageUrl);
  html = replaceStructuredDataScript(html, buildStructuredData(content, seo, options));
  html = setAttributeInFirstTag(html, /<header\b[^>]*\bclass="topbar"[^>]*>/, "aria-label", content.navigation?.topbarLabel || "");
  html = setAttributeInFirstTag(html, /<nav\b[^>]*\bclass="site-menu"[^>]*>/, "aria-label", content.navigation?.siteMenuLabel || "");
  html = setAttributeInFirstTag(html, /<div\b[^>]*\bclass="section-meter"[^>]*>/, "aria-label", content.navigation?.themeLabel || "");
  html = setAttributeInFirstTag(html, /<button\b[^>]*\bclass="moon-toggle"[^>]*>/, "aria-label", content.navigation?.themeButtonLabel || "");
  html = setAttributeInFirstTag(html, /<img\b[^>]*\bclass="brand-wordmark"[^>]*>/, "alt", content.hero?.logoAlt || "");
  html = setAttributeInFirstTag(html, /<img\b[^>]*\bclass="checkout-logo"[^>]*>/, "alt", content.checkout?.logoAlt || "");
  html = setAttributeInFirstTag(html, /<input\b[^>]*\bname="mobile"[^>]*>/, "placeholder", content.checkout?.form?.mobilePlaceholder || "");
  html = setAttributeInFirstTag(html, /<input\b[^>]*\bname="email"[^>]*>/, "placeholder", content.checkout?.form?.emailPlaceholder || "");
  html = setAttributeInFirstTag(html, /<div\b[^>]*\bclass="module-board"[^>]*>/, "aria-label", content.curriculum?.boardLabel || "");
  html = setAttributeInFirstTag(html, /<div\b[^>]*\bclass="module-tabs"[^>]*>/, "aria-label", content.curriculum?.tabsLabel || "");
  html = setAttributeInFirstTag(html, /<div\b[^>]*\bclass="about-stat-grid"[^>]*>/, "aria-label", content.about?.statsLabel || "");
  html = setAttributeInFirstTag(html, /<div\b[^>]*\bclass="testimonial-grid"[^>]*>/, "aria-label", content.testimonials?.gridLabel || "");
  html = setAttributeInFirstTag(html, /<div\b[^>]*\bclass="contact-methods"[^>]*>/, "aria-label", content.contact?.methodsLabel || "");

  for (const [path, value] of Object.entries(flattenContent(content))) {
    if (!Array.isArray(value) && value !== null && typeof value !== "object") {
      html = replaceDataContent(html, path, String(value));
    }
  }

  html = replaceDataList(html, "course.orbit", renderSimpleSpans(content.course?.orbit));
  html = replaceDataList(html, "studio.features", renderFeatureItems(content.studio?.features));
  html = replaceDataList(html, "outcomes.items", renderOutcomes(content.outcomes?.items));
  html = replaceDataList(html, "about.paragraphs", renderParagraphs(content.about?.paragraphs));
  html = replaceDataList(html, "about.stats", renderStats(content.about?.stats));
  html = replaceDataList(html, "testimonials.items", renderTestimonials(content.testimonials?.items));
  html = replaceDataList(html, "checkout.benefits", renderListItems(content.checkout?.benefits));
  html = replaceDataList(html, "contact.methods", renderContactMethods(content.contact?.methods));
  html = replaceDataList(html, "curriculum.modules", renderModuleTabs(content.curriculum?.modules));
  html = renderInitialModule(html, content.curriculum?.modules?.[0]);
  html = applySectionVisibility(html, content);
  html = replaceSiteContentScript(html, content);

  return html;
}

function buildSeo(content, options = {}) {
  const publicBaseUrl = normaliseBaseUrl(options.publicBaseUrl);
  const page = content.page || {};
  const title = page.title || content.checkout?.courseTitle || content.course?.title || "";
  const description = page.description || content.course?.body || "";

  return {
    title,
    description,
    siteName: page.siteName || content.hero?.logoAlt || "صدای خوب",
    locale: page.locale || "fa_IR",
    language: page.language || "fa-IR",
    robots: page.robots || "index, follow",
    canonicalUrl: absoluteUrl(page.canonicalPath || "/", publicBaseUrl),
    imageUrl: absoluteUrl(page.image || "assets/design/hero-logo-cropped.png", publicBaseUrl),
    logoUrl: absoluteUrl("assets/design/sedayekhubBG.png", publicBaseUrl),
    ogDescription: page.ogDescription || description,
    twitterDescription: page.twitterDescription || page.ogDescription || description,
  };
}

function buildStructuredData(content, seo, options = {}) {
  const orgId = `${seo.canonicalUrl}#organisation`;
  const websiteId = `${seo.canonicalUrl}#website`;
  const webpageId = `${seo.canonicalUrl}#webpage`;
  const courseId = `${seo.canonicalUrl}#course`;
  const breadcrumbId = `${seo.canonicalUrl}#breadcrumb`;
  const amount = Number(options.course?.amount);
  const currency = options.course?.currency || "IRT";

  const course = {
    "@type": "Course",
    "@id": courseId,
    name: content.checkout?.courseTitle || content.course?.title || seo.title,
    description: content.course?.body || seo.description,
    inLanguage: seo.language,
    provider: { "@id": orgId },
    courseMode: "online",
  };

  if (Number.isFinite(amount) && amount > 0) {
    course.offers = {
      "@type": "Offer",
      url: `${seo.canonicalUrl}#checkout`,
      priceCurrency: currency,
      price: String(amount),
      availability: "https://schema.org/InStock",
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: seo.siteName,
        url: seo.canonicalUrl,
        logo: {
          "@type": "ImageObject",
          url: seo.logoUrl,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: seo.canonicalUrl,
        name: seo.siteName,
        inLanguage: seo.language,
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: seo.canonicalUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: seo.language,
        isPartOf: { "@id": websiteId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: seo.imageUrl,
        },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": courseId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: seo.siteName,
            item: seo.canonicalUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content.checkout?.courseTitle || "تئوری موسیقی",
            item: `${seo.canonicalUrl}#course`,
          },
        ],
      },
      course,
    ],
  };
}

function normaliseBaseUrl(value) {
  const base = String(value || "http://localhost:3000").trim().replace(/\/+$/, "");
  return base || "http://localhost:3000";
}

function absoluteUrl(value, publicBaseUrl) {
  try {
    return new URL(value || "/", `${publicBaseUrl}/`).toString();
  } catch {
    return String(value || "");
  }
}

function flattenContent(source, prefix = "", result = {}) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return result;

  for (const [key, value] of Object.entries(source)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenContent(value, path, result);
    } else {
      result[path] = value;
    }
  }

  return result;
}

function setAttributeInFirstTag(html, tagPattern, attribute, value) {
  return html.replace(tagPattern, (tag) => setAttribute(tag, attribute, value));
}

function setAttribute(tag, attribute, value) {
  const escapedValue = escapeAttribute(value);
  const attributePattern = new RegExp(`\\s${escapeRegExp(attribute)}="[^"]*"`);
  if (attributePattern.test(tag)) {
    return tag.replace(attributePattern, ` ${attribute}="${escapedValue}"`);
  }

  return tag.replace(/>$/, ` ${attribute}="${escapedValue}">`);
}

function replaceDataContent(html, path, value) {
  const pattern = new RegExp(`(<([a-z0-9]+)\\b[^>]*\\bdata-content="${escapeRegExp(path)}"[^>]*>)([\\s\\S]*?)(</\\2>)`, "gi");
  return html.replace(pattern, `$1${escapeHtml(value)}$4`);
}

function replaceDataList(html, path, renderedItems) {
  const pattern = new RegExp(`(<([a-z0-9]+)\\b[^>]*\\bdata-content-list="${escapeRegExp(path)}"[^>]*>)([\\s\\S]*?)(</\\2>)`, "gi");
  return html.replace(pattern, `$1${renderedItems || ""}$4`);
}

function renderInitialModule(html, module) {
  if (!module) return html;

  html = html.replace(/(<h3\b[^>]*\bclass="module-title"[^>]*>)([\s\S]*?)(<\/h3>)/, `$1${escapeHtml(module.title || "")}$3`);
  html = html.replace(/(<p\b[^>]*\bclass="module-text"[^>]*>)([\s\S]*?)(<\/p>)/, `$1${escapeHtml(module.text || "")}$3`);
  html = html.replace(/<img\b[^>]*\bclass="tone-instrument"[^>]*\bdata-instrument-tone="percussion"[^>]*>/, (tag) => {
    tag = setAttribute(tag, "src", module.image || "");
    tag = setAttribute(tag, "loading", "lazy");
    tag = setAttribute(tag, "decoding", "async");
    return setImageDimensions(tag, module.image);
  });

  return html;
}

function replaceSiteContentScript(html, content) {
  const json = escapeScriptJson(JSON.stringify(content));
  const pattern = /(<script\b[^>]*\bid="site-content"[^>]*>)([\s\S]*?)(<\/script>)/i;
  if (pattern.test(html)) return html.replace(pattern, `$1${json}$3`);

  return html.replace(/<script src="script\.js"><\/script>/, `<script id="site-content" type="application/json">${json}</script>\n    <script src="script.js"></script>`);
}

function replaceStructuredDataScript(html, data) {
  const json = escapeScriptJson(JSON.stringify(data));
  const pattern = /(<script\b[^>]*\bid="structured-data"[^>]*>)([\s\S]*?)(<\/script>)/i;
  if (pattern.test(html)) return html.replace(pattern, `$1${json}$3`);

  return html.replace(/<\/head>/i, `    <script id="structured-data" type="application/ld+json">${json}</script>\n  </head>`);
}

function applySectionVisibility(html, content) {
  for (const [key, id] of Object.entries(sectionIds)) {
    if (isSectionVisible(content, key)) continue;

    html = removeSection(html, id);
    html = removeSectionLinks(html, id);
  }

  return html;
}

function isSectionVisible(content, key) {
  return String(content?.[key]?.visibility || "on").toLowerCase() !== "off";
}

function removeSection(html, id) {
  const pattern = new RegExp(`<section\\b(?=[^>]*\\bid="${escapeRegExp(id)}"[^>]*>)[\\s\\S]*?<\\/section>\\s*`, "i");
  return html.replace(pattern, "");
}

function removeSectionLinks(html, id) {
  const pattern = new RegExp(`<a\\b(?=[^>]*\\bhref="#${escapeRegExp(id)}"[^>]*>)[\\s\\S]*?<\\/a>\\s*`, "gi");
  return html.replace(pattern, "");
}

function renderSimpleSpans(items = []) {
  return items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function renderFeatureItems(items = []) {
  return items.map((item) => `<li><span></span>${escapeHtml(item)}</li>`).join("");
}

function renderListItems(items = []) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderParagraphs(items = []) {
  return items.map((item) => `<p>${escapeHtml(item)}</p>`).join("");
}

function renderStats(items = []) {
  return items
    .map((item) => `<div><strong>${escapeHtml(item.value || "")}</strong><span>${escapeHtml(item.label || "")}</span></div>`)
    .join("");
}

function renderOutcomes(items = []) {
  return items
    .map((item) => {
      const tone = item.tone || inferToneFromImage(item.image);
      return [
        '<article class="outcome-card reveal tilt-card" data-tilt>',
        `<img class="tone-instrument" data-instrument-tone="${escapeAttribute(tone)}" src="${escapeAttribute(item.image || "")}"${imageDimensionAttributes(item.image)} alt="" loading="lazy" decoding="async">`,
        `<h3>${escapeHtml(item.title || "")}</h3>`,
        `<p>${escapeHtml(item.text || "")}</p>`,
        "</article>",
      ].join("");
    })
    .join("");
}

function renderTestimonials(items = []) {
  return items
    .map((item) => [
      '<article class="testimonial-card reveal tilt-card" data-tilt>',
      `<div class="testimonial-card__avatar" aria-hidden="true">${escapeHtml(item.avatar || "")}</div>`,
      `<p>${escapeHtml(item.quote || "")}</p>`,
      "<footer>",
      `<strong>${escapeHtml(item.name || "")}</strong>`,
      `<span>${escapeHtml(item.role || "")}</span>`,
      "</footer>",
      "</article>",
    ].join(""))
    .join("");
}

function renderContactMethods(items = []) {
  return items
    .map((item) => {
      const dir = /^\+?\d/.test(item.value || "") ? ' dir="ltr"' : "";
      return [
        `<a class="contact-method" href="${escapeAttribute(item.href || "#contact")}">`,
        `<span>${escapeHtml(item.label || "")}</span>`,
        `<strong${dir}>${escapeHtml(item.value || "")}</strong>`,
        "</a>",
      ].join("");
    })
    .join("");
}

function renderModuleTabs(items = []) {
  return items
    .map((item, index) => {
      const activeClass = index === 0 ? " is-active" : "";
      return `<button class="module-tab${activeClass}" type="button" role="tab" aria-selected="${index === 0}" data-module="${escapeAttribute(item.id || "")}">${escapeHtml(item.label || "")}</button>`;
    })
    .join("");
}

function inferToneFromImage(imagePath = "") {
  const imageName = String(imagePath).toLowerCase();
  if (imageName.includes("item (14)")) return "keys";
  if (imageName.includes("item (12)")) return "rhythm";
  if (imageName.includes("item (11)") || imageName.includes("item (18)")) return "brass";
  if (imageName.includes("item (10)")) return "voice";
  if (imageName.includes("item (15)")) return "woodwind";
  if (imageName.includes("item (16)") || imageName.includes("item (17)")) return "strings";
  if (imageName.includes("item (6)") || imageName.includes("item (7)")) return "notation";
  return "percussion";
}

function setImageDimensions(tag, imagePath = "") {
  const size = imageDimensions(imagePath);
  if (!size) return tag;

  tag = setAttribute(tag, "width", String(size.width));
  tag = setAttribute(tag, "height", String(size.height));
  return tag;
}

function imageDimensionAttributes(imagePath = "") {
  const size = imageDimensions(imagePath);
  if (!size) return "";

  return ` width="${size.width}" height="${size.height}"`;
}

function imageDimensions(imagePath = "") {
  const imageName = String(imagePath).toLowerCase();
  const match = imageName.match(/item \((\d+)\)/);
  if (!match) return null;

  return {
    6: { width: 375, height: 500 },
    7: { width: 567, height: 270 },
    8: { width: 323, height: 386 },
    12: { width: 307, height: 354 },
    13: { width: 297, height: 354 },
    14: { width: 374, height: 253 },
  }[Number(match[1])] || null;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function escapeScriptJson(value) {
  return value.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = {
  readContent,
  renderIndex,
};
