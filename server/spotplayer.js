// Spot Player (spotplayer.ir) licence API client.
//
// Shared by the checkout callback in server/index.js and the CLI in
// scripts/spotplayer-admin.js, so both talk to the panel the same way.
// API reference: https://spotplayer.ir/help/api/docs

const PANEL_BASE = "https://panel.spotplayer.ir";
const DOWNLOAD_BASE = "https://dl.spotplayer.ir";

const config = {
  enabled: process.env.SPOTPLAYER_ENABLED === "true",
  api: process.env.SPOTPLAYER_API || "",
  mode: process.env.SPOTPLAYER_MODE || "test",
  courseIds: (process.env.SPOTPLAYER_COURSE_IDS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  watermarkTemplate: process.env.SPOTPLAYER_WATERMARK_TEMPLATE || "{name} | {mobile}",
  device: {
    p0: Number(process.env.SPOTPLAYER_ALLOWED_DEVICES || 2),
    p1: Number(process.env.SPOTPLAYER_WINDOWS || 0),
    p2: Number(process.env.SPOTPLAYER_MACOS || 0),
    p3: Number(process.env.SPOTPLAYER_UBUNTU || 0),
    p4: Number(process.env.SPOTPLAYER_ANDROID || 0),
    p5: Number(process.env.SPOTPLAYER_IOS || 0),
    p6: Number(process.env.SPOTPLAYER_WEBAPP || 2),
  },
};

// Throws with an actionable message when the env is not ready to issue licences.
function assertConfigured() {
  if (!config.api) {
    throw new Error("SPOTPLAYER_API is missing. Copy the API key from the Spot Player panel into .env.");
  }
  if (config.courseIds.length === 0) {
    throw new Error(
      "SPOTPLAYER_COURSE_IDS is empty. Run `npm run spotplayer courses` to list your course IDs, then set it in .env."
    );
  }
  for (const [key, value] of Object.entries(config.device)) {
    if (!Number.isInteger(value) || value < 0 || value > 99) {
      throw new Error(`Spot Player device limit ${key} must be an integer between 0 and 99 (got ${value}).`);
    }
  }
}

// Every panel call carries $API + $LEVEL: -1. A POST body makes it a write call.
async function request(url, payload = null) {
  const response = await fetch(url, {
    method: payload ? "POST" : "GET",
    headers: {
      "content-type": "application/json",
      $API: config.api,
      $LEVEL: "-1",
    },
    body: payload ? JSON.stringify(stripNulls(payload)) : undefined,
  });

  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Spot Player returned a non-JSON response (HTTP ${response.status}): ${text.slice(0, 200)}`);
  }

  // The panel reports business errors inside the body, often with HTTP 200.
  if (json?.ex?.msg) {
    throw new Error(`Spot Player error: ${json.ex.msg}`);
  }
  if (!response.ok) {
    throw new Error(`Spot Player HTTP ${response.status} from ${url}: ${text.slice(0, 200)}`);
  }

  return json;
}

async function createLicence({ name, watermarkText, payload }) {
  assertConfigured();

  const result = await request(`${PANEL_BASE}/license/edit/`, {
    test: config.mode === "test",
    name,
    course: config.courseIds,
    watermark: { texts: [{ text: watermarkText }] },
    device: config.device,
    payload,
  });

  if (!result?.key) {
    throw new Error(`Spot Player did not return a licence key: ${JSON.stringify(result).slice(0, 200)}`);
  }

  return {
    id: result._id || null,
    key: result.key,
    url: absoluteLicenceUrl(result.url),
    raw: result,
  };
}

// The panel returns `url` as a domain-less path (e.g. "/xxxx/yyyy.spl"); the
// customer-facing link must be absolute against dl.spotplayer.ir or it resolves
// against our own domain and 404s.
function absoluteLicenceUrl(value) {
  const url = String(value || "").trim();
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${DOWNLOAD_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
}

function buildWatermark({ fullName, mobile, email }) {
  return config.watermarkTemplate
    .replaceAll("{name}", fullName || "")
    .replaceAll("{mobile}", mobile || "")
    .replaceAll("{email}", email || "");
}

// Used by the CLI to discover the course IDs that go into SPOTPLAYER_COURSE_IDS.
async function listCourses() {
  if (!config.api) {
    throw new Error("SPOTPLAYER_API is missing. Set it in .env before listing courses.");
  }
  return request(`${PANEL_BASE}/course/?p=0`);
}

function stripNulls(value) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== null && item !== undefined));
}

module.exports = {
  config,
  assertConfigured,
  createLicence,
  buildWatermark,
  listCourses,
  absoluteLicenceUrl,
  request,
  PANEL_BASE,
  DOWNLOAD_BASE,
};
