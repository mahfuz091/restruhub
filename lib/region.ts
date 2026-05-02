export type Region = "bd" | "eur" | "global";

const CACHE_KEY = "app_user_region";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const BD_TIMEZONES = new Set(["Asia/Dhaka", "Asia/Dacca"]);
const BD_LOCALE_PREFIXES = ["bn-BD", "bn_BD", "bn-bd"];

const EUR_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  "CH",
  "NO",
  "IS",
  "LI",
]);

interface RegionCache {
  region: Region;
  cachedAt: number;
}

function readCache(): Region | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as RegionCache;
    if (Date.now() - parsed.cachedAt < CACHE_TTL_MS) return parsed.region;

    localStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore invalid or unavailable storage.
  }

  return null;
}

function writeCache(region: Region): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ region, cachedAt: Date.now() } as RegionCache),
    );
  } catch {
    // Ignore storage failures.
  }
}

function detectRegionFromBrowser(): Region | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (BD_TIMEZONES.has(timezone)) return "bd";
    if (timezone.startsWith("Europe/")) return "eur";
  } catch {
    // Ignore missing Intl support.
  }

  try {
    const locales = [navigator.language, ...(navigator.languages ?? [])];
    for (const locale of locales) {
      if (BD_LOCALE_PREFIXES.some((prefix) => locale.startsWith(prefix))) {
        return "bd";
      }
    }
  } catch {
    // Ignore missing navigator support.
  }

  return null;
}

async function detectRegionFromIP(): Promise<Region> {
  const providers: Array<() => Promise<string | null>> = [
    async () => {
      const res = await fetch("https://cloudflare.com/cdn-cgi/trace", {
        signal: AbortSignal.timeout(5000),
      });
      const text = await res.text();
      const match = text.match(/^loc=([A-Z]{2})/m);
      return match?.[1] ?? null;
    },
    async () => {
      const res = await fetch("https://api.country.is/", {
        signal: AbortSignal.timeout(5000),
      });
      const data = (await res.json()) as { country?: string };
      return data.country ?? null;
    },
    async () => {
      const res = await fetch("https://get.geojs.io/v1/ip/country.json", {
        signal: AbortSignal.timeout(5000),
      });
      const data = (await res.json()) as { country?: string };
      return data.country ?? null;
    },
  ];

  for (const provider of providers) {
    try {
      const code = await provider();
      if (!code) continue;
      if (code === "BD") return "bd";
      if (EUR_COUNTRIES.has(code)) return "eur";
      return "global";
    } catch {
      // Try the next provider.
    }
  }

  return "global";
}

export async function getRegion(): Promise<Region> {
  const cached = readCache();
  if (cached !== null) return cached;

  const browserRegion = detectRegionFromBrowser();
  if (browserRegion !== null) {
    writeCache(browserRegion);
    return browserRegion;
  }

  const ipRegion = await detectRegionFromIP();
  writeCache(ipRegion);
  return ipRegion;
}
