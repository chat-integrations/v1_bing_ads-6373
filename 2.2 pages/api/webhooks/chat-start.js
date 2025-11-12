// Receives LiveChat “chat started” webhook and dispatches to Microsoft Ads (later)

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const body = req.body || {};
    // LiveChat sends org/license info in payload; adjust once you see your real payload
    const licenseId = String(body?.license_id || body?.organization?.license_id || "");
    const chatId    = String(body?.chat_id || body?.id || "");
    const startedAt = body?.timestamp || new Date().toISOString();

    // Try to pull msclkid from visitor URL or referrer (adjust once you inspect payload)
    const visitorUrl = body?.visitor?.page_url || body?.visitor?.referrer || "";
    const msclkid = getQueryParam(visitorUrl, "msclkid");

    // Load org config (account/goal/currency/value)
    const org = await getOrgConfig(licenseId);
    if (!org) {
      console.warn(`No Microsoft Ads config for licenseId=${licenseId}`);
      return res.status(200).json({ status: "skipped_no_org_config" });
    }

    // For now: log what we would send; you’ll wire the actual call in Step 6
    console.log("Chat start → would send to Microsoft Ads:", {
      licenseId, chatId, startedAt, msclkid, org
    });

    // TODO (Step 6): await sendOfflineConversionToMicrosoftAds({ ... });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(200).json({ ok: false, error: "logged" });
  }
}

function getQueryParam(url, key) {
  try {
    if (!url) return null;
    const u = new URL(url);
    return u.searchParams.get(key);
  } catch {
    return null;
  }
}

// --- very small in-file store for dev; swap to Vercel KV/DB before going public ---
const memory = new Map();
async function getOrgConfig(licenseId) {
  return memory.get(licenseId);
}
export async function setOrgConfig(licenseId, cfg) {
  memory.set(licenseId, cfg);
}
