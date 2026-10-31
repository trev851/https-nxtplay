// NXTPLAY – Stremio addon with live Netflix, Prime Video, Disney+ and HBO Max catalogs (movies + TV) using TMDB.
// No dependencies. Needs Node 18+. Env: TMDB_API_KEY (required), REGION (default US), PORT (set by Render), PROVIDER_<ID> (optional).
const http = require("http");

const KEY = process.env.TMDB_API_KEY;
const REGION = (process.env.REGION || "US").toUpperCase();
const PORT = process.env.PORT || 7000;
const PAGE = 20;              // TMDB page size
const PAGES_PER_REQUEST = 2;  // 40 titles per Stremio request keeps responses fast

// Streaming services. Provider ids are looked up by name for your REGION at runtime,
// falling back to the TMDB defaults below. Override any with env vars like PROVIDER_HBO=1899.
const SERVICES = [
  { id: "netflix", label: "Netflix",     names: ["Netflix"],                fallback: 8 },
  { id: "prime",   label: "Prime Video", names: ["Amazon Prime Video"],     fallback: 9 },
  { id: "disney",  label: "Disney+",     names: ["Disney Plus", "Disney+"], fallback: 337 },
  { id: "hbo",     label: "HBO Max",     names: ["HBO Max", "Max"],         fallback: 1899 }
];

const MOVIE_GENRES = ["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Music","Mystery","Romance","Science Fiction","Thriller","War","Western"];
const TV_GENRES = ["Action & Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Kids","Mystery","Reality","Sci-Fi & Fantasy","Soap","Talk","War & Politics","Western"];

const extraFor = genres => [{ name: "genre", options: genres, isRequired: false }, { name: "search", isRequired: false }, { name: "skip", isRequired: false }];

const manifest = {
  id: "community.nxtplay",
  version: "1.1.0",
  name: "NXTPLAY",
  description: `Netflix, Prime Video, Disney+ and HBO Max movies and TV shows (${REGION})`,
  resources: ["catalog"],
  types: ["movie", "series"],
  catalogs: SERVICES.flatMap(s => [
    { type: "movie",  id: s.id, name: `${s.label} Movies`,   extra: extraFor(MOVIE_GENRES) },
    { type: "series", id: s.id, name: `${s.label} TV Shows`, extra: extraFor(TV_GENRES) }
  ]),
  behaviorHints: { configurable: false }
};

// ---- tiny TTL cache ----
const cache = new Map();
const remember = async (key, ttlMs, fn) => {
  const hit = cache.get(key);
  if (hit && hit.exp > Date.now()) return hit.val;
  const val = await fn();
  if (val !== null && val !== undefined) cache.set(key, { val, exp: Date.now() + ttlMs });
  return val;
};
const HOUR = 3600e3;

// ---- TMDB ----
const tmdb = (path, params = {}) => {
  const url = new URL("https://api.themoviedb.org/3" + path);
  url.searchParams.set("api_key", KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return remember(url.toString(), 6 * HOUR, async () => {
    for (let i = 0; i < 3; i++) {
      try {
        const r = await fetch(url);
        if (r.ok) return r.json();
        if (r.status === 404) return null;
      } catch (_) {}
      await new Promise(s => setTimeout(s, 800));
    }
    return null;
  });
};

const resolved = {};
const providerId = svc => resolved[svc.id] || (resolved[svc.id] = (async () => {
  const env = process.env["PROVIDER_" + svc.id.toUpperCase()];
  if (env) return Number(env);
  const d = await tmdb("/watch/providers/movie", { watch_region: REGION });
  const list = d?.results || [];
  for (const n of svc.names) {
    const f = list.find(p => p.provider_name.toLowerCase() === n.toLowerCase());
    if (f) return f.provider_id;
  }
  return svc.fallback;
})());

const genreIds = async tmdbType => {
  const d = await tmdb(`/genre/${tmdbType}/list`);
  return Object.fromEntries((d?.genres || []).map(g => [g.name, g.id]));
};

const pool = async (items, size, fn) => {
  const out = new Array(items.length); let i = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < items.length) { const n = i++; out[n] = await fn(items[n]); }
  }));
  return out;
};

const toMeta = async (tmdbType, stremioType, t, requireProvider) => {
  const d = await tmdb(`/${tmdbType}/${t.id}`, { append_to_response: "external_ids,watch/providers" });
  if (!d) return null;
  const imdb = d.external_ids?.imdb_id || d.imdb_id;
  if (!imdb) return null;
  if (requireProvider) {
    const flat = d["watch/providers"]?.results?.[REGION]?.flatrate || [];
    if (!flat.some(p => p.provider_id === requireProvider)) return null;
  }
  const date = d.release_date || d.first_air_date || "";
  return {
    id: imdb, type: stremioType, name: d.title || d.name,
    poster: d.poster_path ? "https://image.tmdb.org/t/p/w342" + d.poster_path : `https://images.metahub.space/poster/medium/${imdb}/img`,
    background: d.backdrop_path ? "https://image.tmdb.org/t/p/w780" + d.backdrop_path : undefined,
    description: d.overview || undefined,
    releaseInfo: date.slice(0, 4) || undefined,
    genres: (d.genres || []).map(g => g.name)
  };
};

const getCatalog = async (type, id, extra) => {
  const svc = SERVICES.find(x => x.id === id);
  if (!svc || !KEY || !["movie", "series"].includes(type)) return { metas: [] };
  const tmdbType = type === "movie" ? "movie" : "tv";
  const pid = await providerId(svc);

  if (extra.search) {
    const r = await tmdb(`/search/${tmdbType}`, { query: extra.search });
    const metas = (await pool((r?.results || []).slice(0, 20), 8, t => toMeta(tmdbType, type, t, pid))).filter(Boolean);
    return { metas };
  }

  const skip = Math.max(0, parseInt(extra.skip, 10) || 0);
  const first = Math.floor(skip / PAGE) + 1;
  const params = { with_watch_providers: pid, watch_region: REGION, with_watch_monetization_types: "flatrate", sort_by: "popularity.desc" };
  if (extra.genre) {
    const gid = (await genreIds(tmdbType))[extra.genre];
    if (gid) params.with_genres = gid;
  }
  const pages = await Promise.all(Array.from({ length: PAGES_PER_REQUEST }, (_, i) => tmdb(`/discover/${tmdbType}`, { ...params, page: first + i })));
  const found = pages.flatMap(p => p?.results || []);
  const metas = (await pool(found, 10, t => toMeta(tmdbType, type, t, 0))).filter(Boolean);
  return { metas: metas.filter((m, i) => metas.findIndex(x => x.id === m.id) === i) };
};

// ---- HTTP ----
const send = (res, code, body, type = "application/json") => {
  res.writeHead(code, {
    "Content-Type": type + "; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Cache-Control": type === "application/json" ? "public, max-age=3600" : "no-cache"
  });
  res.end(typeof body === "string" ? body : JSON.stringify(body));
};

const parseExtra = str => {
  const out = {};
  for (const part of str.split("&")) {
    const i = part.indexOf("=");
    if (i > 0) { try { out[part.slice(0, i)] = decodeURIComponent(part.slice(i + 1)); } catch (_) {} }
  }
  return out;
};

http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, "");
  const path = req.url.split("?")[0];
  try {
    if (path === "/health") return send(res, 200, { ok: true, tmdbKey: Boolean(KEY), region: REGION });
    if (path === "/manifest.json") return send(res, 200, manifest);
    const m = path.match(/^\/catalog\/([^/]+)\/([^/]+?)(?:\/([^/]+?))?\.json$/);
    if (m) return send(res, 200, await getCatalog(m[1], m[2], m[3] ? parseExtra(decodeURIComponent(m[3])) : {}));
    if (path === "/") {
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      return send(res, 200, `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NXTPLAY</title>
<body style="font-family:system-ui;background:#0f1226;color:#f3f1ee;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center">
<div><h1>NXTPLAY</h1><p>Netflix, Prime Video, Disney+ and HBO Max catalogs for Stremio (${REGION}).</p>
<p><a style="background:#ffb020;color:#241800;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:700" href="stremio://${host}/manifest.json">Install in Stremio</a></p>
<p style="color:#a4a8c9">Or paste https://${host}/manifest.json into Stremio's addon search.</p></div></body>`, "text/html");
    }
    send(res, 404, { error: "Not found" });
  } catch (e) {
    console.error(e);
    send(res, 200, { metas: [] });
  }
}).listen(PORT, () => console.log(`NXTPLAY addon listening on ${PORT} (region ${REGION}, key ${KEY ? "set" : "MISSING"})`));
