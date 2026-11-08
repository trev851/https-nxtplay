// NXTPLAY – Stremio catalogs powered by TMDB.
// Node 18+. Requires TMDB_API_KEY; REGION defaults to US. Optional PROVIDER_<ID> overrides provider IDs.
const http = require("http");
const KEY = process.env.TMDB_API_KEY;
const REGION = (process.env.REGION || "US").toUpperCase();
const FALLBACK_REGION = (process.env.FALLBACK_REGION || "US").toUpperCase();
const PORT = process.env.PORT || 7000;
const PAGE = 20;
const PAGES_PER_REQUEST = 2;

// Network catalogs are TV-series-only. Streaming services are resolved from TMDB by name per region.
const SERVICES = [
  { id: "netflix", label: "Netflix", names: ["Netflix"], fallback: 8 },
  { id: "prime", label: "Prime Video", names: ["Amazon Prime Video"], fallback: 9 },
  { id: "disney", label: "Disney+", names: ["Disney Plus", "Disney+"], fallback: 337 },
  { id: "disneyjr", label: "Disney Jr", networkId: 281, baseService: "disney" },
  { id: "starz", label: "Starz", names: ["Starz"], fallback: 43 },
  { id: "cinemax", label: "Cinemax", names: ["Cinemax"], fallback: 157 },
  { id: "hbo", label: "HBO Max", names: ["HBO", "HBO Max", "Max"], fallback: 1899 },
  { id: "hulu", label: "Hulu", names: ["Hulu"], fallback: 15 },
  { id: "paramount", label: "Paramount+", names: ["Paramount Plus", "Paramount+"], match: /paramount/i, fallback: 531 },
  { id: "apple", label: "Apple TV+", names: ["Apple TV Plus", "Apple TV+", "Apple TV"], fallback: 350 },
  { id: "crunchyroll", label: "Crunchyroll", names: ["Crunchyroll"], fallback: 283 },
  { id: "lifetime", label: "Lifetime Movie Club", names: ["Lifetime Movie Club"], fallback: 318, networkIds: { series: 34 } },
  { id: "hallmark", label: "Hallmark", names: ["Hallmark Movies Now", "Hallmark TV", "Hallmark+"], match: /hallmark/i },
  { id: "amcplus", label: "AMC+", names: ["AMC+", "AMC Plus"] },
  { id: "freevee", label: "Freevee (IMDb TV)", names: ["Freevee", "Amazon Freevee", "IMDb TV"] },
  { id: "cartoonnetwork", label: "Cartoon Network", networkId: 56, types: ["series"] },
  { id: "boomerang", label: "Boomerang", networkId: 435, types: ["series"] },
  { id: "nickjr", label: "Nick Jr.", networkId: 184, types: ["series"] },
  { id: "adultswim", label: "Adult Swim", networkId: 80, types: ["series"] }
];
const MOVIE_GENRES = ["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Music","Mystery","Romance","Science Fiction","Thriller","War","Western"];
const TV_GENRES = ["Action & Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Kids","Mystery","Reality","Sci-Fi & Fantasy","Soap","Talk","War & Politics","Western"];
const extraFor = genres => [{ name: "genre", options: genres, isRequired: false }, { name: "search", isRequired: false }, { name: "skip", isRequired: false }];
const autoplayHints = Object.freeze({ autoplay: { nextEpisodeAutoPlay: true, nextSeasonAutoPlay: true } });
const serviceTypes = s => s.types || ["movie", "series"];
const manifest = {
  id: "community.nxtplay.all", version: "2.4.0", name: "NXTPLAY",
  description: `Streaming services and TV network catalogs (${REGION})`,
  resources: ["catalog", "meta"], idPrefixes: ["tt"], types: ["movie", "series"],
  catalogs: SERVICES.flatMap(s => serviceTypes(s).map(type => ({ type, id: s.id, name: `${s.label} ${type === "movie" ? "Movies" : "TV Shows"}`, extra: extraFor(type === "movie" ? MOVIE_GENRES : TV_GENRES) }))),
  behaviorHints: { configurable: false, ...autoplayHints }
};

const cache = new Map();
const remember = async (key, ttl, fn) => {
  const hit = cache.get(key);
  if (hit && hit.exp > Date.now()) return hit.val;
  const val = await fn();
  if (val !== null && val !== undefined) cache.set(key, { val, exp: Date.now() + ttl });
  return val;
};
const tmdb = (path, params = {}) => {
  const url = new URL("https://api.themoviedb.org/3" + path);
  if (KEY) url.searchParams.set("api_key", KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return remember(url.toString(), 6 * 3600e3, async () => {
    for (let i = 0; i < 3; i++) {
      try { const r = await fetch(url); if (r.ok) return r.json(); if (r.status === 404) return null; } catch (_) {}
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    return null;
  });
};
const resolved = {};
const providerIds = (svc, region = REGION) => resolved[svc.id + region] || (resolved[svc.id + region] = (async () => {
  const env = process.env["PROVIDER_" + svc.id.toUpperCase()];
  if (env) return env.split(",").map(Number).filter(Boolean);
  const lists = await Promise.all(["movie", "tv"].map(t => tmdb(`/watch/providers/${t}`, { watch_region: region })));
  const list = lists.flatMap(d => d?.results || []);
  const ids = new Set();
  if (svc.match) list.filter(p => svc.match.test(p.provider_name)).forEach(p => ids.add(p.provider_id));
  else for (const name of svc.names || []) {
    const found = list.find(p => p.provider_name.toLowerCase() === name.toLowerCase());
    if (found) { ids.add(found.provider_id); break; }
  }
  if (!ids.size && svc.fallback) ids.add(svc.fallback);
  return [...ids];
})());
const genreIds = async type => {
  const d = await tmdb(`/genre/${type}/list`);
  return Object.fromEntries((d?.genres || []).map(g => [g.name, g.id]));
};
const pool = async (items, size, fn) => {
  const out = new Array(items.length); let i = 0;
  await Promise.all(Array.from({ length: size }, async () => { while (i < items.length) { const n = i++; out[n] = await fn(items[n]); } }));
  return out;
};
const toMeta = async (tmdbType, type, item, requireProvider, region = REGION) => {
  const d = await tmdb(`/${tmdbType}/${item.id}`, { append_to_response: "external_ids,watch/providers" });
  if (!d) return null;
  const imdb = d.external_ids?.imdb_id || d.imdb_id;
  if (!imdb) return null;
  if (requireProvider) {
    const flatrate = d["watch/providers"]?.results?.[region]?.flatrate || [];
    if (!flatrate.some(p => requireProvider.includes(p.provider_id))) return null;
  }
  const date = d.release_date || d.first_air_date || "";
  const title = d.title || d.name;
  return { id: imdb, imdb_id: imdb, title, name: title, type,
    poster: d.poster_path ? "https://image.tmdb.org/t/p/w342" + d.poster_path : `https://images.metahub.space/poster/medium/${imdb}/img`,
    background: d.backdrop_path ? "https://image.tmdb.org/t/p/w780" + d.backdrop_path : undefined,
    description: d.overview || undefined, releaseInfo: date.slice(0, 4) || undefined,
    genres: (d.genres || []).map(g => g.name), ...autoplayHints };
};
const regionsToTry = () => FALLBACK_REGION && FALLBACK_REGION !== "NONE" && FALLBACK_REGION !== REGION ? [REGION, FALLBACK_REGION] : [REGION];
const catalogFor = async (svc, type, tmdbType, extra, region) => {
  const envNet = Number(process.env["NETWORK_" + svc.id.toUpperCase()]) || undefined; // optional override, e.g. NETWORK_BOOMERANG=123
  const networkId = envNet || svc.networkIds?.[type] || (type === "series" ? svc.networkId : undefined);
  const base = svc.baseService ? SERVICES.find(s => s.id === svc.baseService) : svc; // Disney Jr borrows Disney+ listings
  const providers = networkId && !svc.baseService ? [] : await providerIds(base, region);
  if (extra.search) {
    const result = await tmdb(`/search/${tmdbType}`, { query: extra.search });
    return (await pool((result?.results || []).slice(0, 20), 8, item => toMeta(tmdbType, type, item, null, region))).filter(Boolean);
  }
  const skip = Math.max(0, parseInt(extra.skip, 10) || 0);
  const first = Math.floor(skip / PAGE) + 1;
  const gid = extra.genre ? (await genreIds(tmdbType))[extra.genre] : null;
  const onProviders = { with_watch_providers: providers.join("|"), watch_region: region, with_watch_monetization_types: "flatrate", sort_by: "popularity.desc" };
  const run = async params => {
    if (gid) params.with_genres = gid;
    const pages = await Promise.all(Array.from({ length: PAGES_PER_REQUEST }, (_, i) => tmdb(`/discover/${tmdbType}`, { ...params, page: first + i })));
    return pages.flatMap(p => p?.results || []);
  };
  let found;
  if (networkId) {
    found = await run({ with_networks: networkId, sort_by: "popularity.desc" });
    if (!found.length && svc.baseService) found = await run({ ...onProviders, ...(gid ? {} : { with_genres: 10762 }) }); // kids' shows on the base service
  } else if (svc.baseService) {
    found = await run({ ...onProviders, certification_country: "US", "certification.lte": "G" }); // G-rated movies on the base service
    if (!found.length) found = await run({ ...onProviders, ...(gid ? {} : { with_genres: "10751|16" }) });
  } else found = await run({ ...onProviders });
  const metas = (await pool(found, 10, item => toMeta(tmdbType, type, item, null, region))).filter(Boolean);
  return metas.filter((m, i) => metas.findIndex(x => x.id === m.id) === i);
};
const getCatalog = async (type, id, extra) => {
  const svc = SERVICES.find(s => s.id === id);
  if (!svc || !KEY || !serviceTypes(svc).includes(type)) return { metas: [] };
  const tmdbType = type === "movie" ? "movie" : "tv";
  for (const region of regionsToTry()) {
    const metas = await catalogFor(svc, type, tmdbType, extra, region);
    if (metas.length || (extra.skip && Number(extra.skip) > 0)) return { metas };
  }
  return { metas: [] };
};
const getMetaFull = async (type, imdb) => {
  if (!KEY || !["movie", "series"].includes(type) || !/^tt\d+$/.test(imdb)) return null;
  const tmdbType = type === "movie" ? "movie" : "tv";
  const found = await tmdb(`/find/${imdb}`, { external_source: "imdb_id" });
  const hit = (tmdbType === "movie" ? found?.movie_results : found?.tv_results)?.[0];
  if (!hit) return null;
  const d = await tmdb(`/${tmdbType}/${hit.id}`, { append_to_response: "credits" });
  if (!d) return null;
  const date = d.release_date || d.first_air_date || "", title = d.title || d.name;
  const meta = { id: imdb, imdb_id: imdb, title, name: title, type,
    poster: d.poster_path ? "https://image.tmdb.org/t/p/w500" + d.poster_path : `https://images.metahub.space/poster/medium/${imdb}/img`,
    background: d.backdrop_path ? "https://image.tmdb.org/t/p/w1280" + d.backdrop_path : undefined,
    description: d.overview || undefined, releaseInfo: date.slice(0, 4) || undefined,
    released: date ? new Date(date).toISOString() : undefined,
    runtime: (d.runtime || d.episode_run_time?.[0]) ? `${d.runtime || d.episode_run_time[0]} min` : undefined,
    genres: (d.genres || []).map(g => g.name), cast: (d.credits?.cast || []).slice(0, 10).map(c => c.name),
    director: type === "movie" ? (d.credits?.crew || []).filter(c => c.job === "Director").map(c => c.name) : undefined, ...autoplayHints };
  if (type === "series") {
    const seasons = (d.seasons || []).filter(s => s.season_number > 0 && s.episode_count > 0);
    const lists = await pool(seasons, 4, s => tmdb(`/tv/${hit.id}/season/${s.season_number}`));
    meta.videos = lists.flatMap(l => (l?.episodes || []).map(e => ({ id: `${imdb}:${e.season_number}:${e.episode_number}`, title: e.name || `Episode ${e.episode_number}`, season: e.season_number, episode: e.episode_number, released: e.air_date ? new Date(e.air_date).toISOString() : undefined, overview: e.overview || undefined, thumbnail: e.still_path ? "https://image.tmdb.org/t/p/w300" + e.still_path : undefined })));
  }
  return meta;
};
const send = (res, code, body, type = "application/json", cacheControl) => {
  res.writeHead(code, { "Content-Type": type + "; charset=utf-8", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*", "Cache-Control": cacheControl || (type === "application/json" ? "public, max-age=3600" : "no-cache") });
  res.end(typeof body === "string" ? body : JSON.stringify(body));
};
const parseExtra = str => {
  const out = {};
  for (const part of str.split("&")) { const i = part.indexOf("="); if (i > 0) { try { out[part.slice(0, i)] = decodeURIComponent(part.slice(i + 1)); } catch (_) {} } }
  return out;
};
http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, "");
  let path = req.url.split("?")[0].replace(/^\/v\d+(?=\/)/, "");
  const scope = (path.match(/^\/(netflix|prime|disneyjr|disney|starz|cinemax|hbo|hulu|paramount|apple|crunchyroll|lifetime|hallmark|amcplus|freevee|cartoonnetwork|boomerang|nickjr|adultswim|all)(?=\/)/) || [])[1];
  if (scope) path = path.slice(scope.length + 1);
  try {
    if (path === "/health") return send(res, 200, { ok: true, version: manifest.version, tmdbKey: Boolean(KEY), region: REGION });
    if (path === "/manifest.json") {
      const svc = SERVICES.find(s => s.id === scope);
      const m = svc ? { ...manifest, id: `community.nxtplay.${svc.id}`, name: `NXTPLAY ${svc.label}`, description: `${svc.label} catalog (${REGION})`, catalogs: manifest.catalogs.filter(c => c.id === svc.id) } : manifest;
      return send(res, 200, m, "application/json", "no-store");
    }
    const cm = path.match(/^\/catalog\/([^/]+)\/([^/]+?)(?:\/([^/]+?))?\.json$/);
    if (cm) return send(res, 200, await getCatalog(cm[1], cm[2], cm[3] ? parseExtra(decodeURIComponent(cm[3])) : {}), "application/json", "no-store");
    const mm = path.match(/^\/meta\/([^/]+)\/([^/]+)\.json$/);
    if (mm) { const meta = await getMetaFull(mm[1], decodeURIComponent(mm[2])); return meta ? send(res, 200, { meta }) : send(res, 404, { error: "Not found" }); }
    if (path === "/") {
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      const cards = [...SERVICES, { id: "all", label: "All services and networks" }].map(s => `<p><a href="/v3/${s.id}/manifest.json">Install ${s.label}</a></p>`).join("");
      return send(res, 200, `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NXTPLAY</title><body style="font-family:system-ui;background:#101329;color:#f3f1ee;text-align:center;padding:30px"><h1>NXTPLAY</h1><p>Streaming services and TV network catalogs for Stremio (${REGION}).</p>${cards}<p>Manifest: https://${host}/manifest.json</p></body>`, "text/html");
    }
    return send(res, 404, { error: "Not found" });
  } catch (e) { console.error(e); return send(res, 200, { metas: [] }, "application/json", "no-store"); }
}).listen(PORT, () => console.log(`NXTPLAY listening on ${PORT}; region ${REGION}; TMDB key ${KEY ? "set" : "missing"}`));
