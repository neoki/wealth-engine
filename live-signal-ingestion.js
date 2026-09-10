const SOURCES = [
  {
    id: 'agent402-live-index',
    domain: 'agentic-commerce',
    url: 'https://agent402.tools/api/index',
    sourcePage: 'https://agent402.tools/marketplace',
    sourceType: 'live-machine-readable-marketplace-index'
  }
];

function finite(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function firstFinite(...values) {
  for (const value of values) {
    const n = finite(value);
    if (n !== null) return n;
  }
  return null;
}

function normalizeAgent402(payload, source) {
  const totals = payload?.totals || payload?.summary || payload || {};
  const sellers = Array.isArray(payload?.sellers) ? payload.sellers : Array.isArray(payload?.items) ? payload.items : [];
  const listings = firstFinite(totals.toolListings, totals.tools, totals.listings, totals.advertisedTools, payload?.toolListings);
  const buyers30d = firstFinite(totals.distinctBuyers30d, totals.buyers30d, payload?.distinctBuyers30d);
  const settlements30d = firstFinite(totals.settlements30d, totals.transactions30d, payload?.settlements30d);
  const indexedEndpoints = firstFinite(totals.endpoints, totals.indexedEndpoints, payload?.indexedEndpoints, sellers.length || null);

  return {
    id: `${source.id}-${new Date().toISOString().slice(0, 10)}`,
    domain: source.domain,
    observedAt: new Date().toISOString(),
    source: source.sourcePage,
    machineSource: source.url,
    sourceType: source.sourceType,
    verificationStatus: 'fetched-live-operator-self-reported',
    metrics: { listings, buyers30d, settlements30d, indexedEndpoints },
    caveat: 'Fetched automatically from the operator machine-readable index. Operator metrics are not independently audited.',
    ingestion: { autonomous: true, adapter: 'agent402-index-v1' }
  };
}

export async function ingestLiveSignals({ timeoutMs = 7000 } = {}) {
  const signals = [];
  const errors = [];
  for (const source of SOURCES) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(source.url, { headers: { accept: 'application/json', 'user-agent': 'WealthEngine/0.8 autonomous-market-research' }, signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      signals.push(normalizeAgent402(payload, source));
    } catch (error) {
      errors.push({ source: source.id, url: source.url, error: String(error?.message || error) });
    } finally {
      clearTimeout(timer);
    }
  }
  return { generatedAt: new Date().toISOString(), autonomous: true, sourcesAttempted: SOURCES.length, signals, errors };
}

export const liveSignalSources = SOURCES.map(({ id, domain, url, sourcePage }) => ({ id, domain, url, sourcePage }));
