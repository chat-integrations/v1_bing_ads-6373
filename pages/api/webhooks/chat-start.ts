import type { NextApiRequest, NextApiResponse } from "next";

// TEMP store for dev-only. We'll switch to Vercel KV or DB later.
const orgConfigs = new Map<string, any>();

// Extract msclkid from visitor URL
function extractMsclkid(url?: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.searchParams.get("msclkid");
  } catch {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const body = req.body;

    const licenseId =
      String(body?.license_id ||
             body?.organization?.license_id ||
             body?.license ||
             "");

    const chatId = String(body?.chat_id || body?.id || "");
    const startedAt = body?.timestamp || new Date().toISOString();

    const visitorUrl =
      body?.visitor?.page_url ||
      body?.visitor?.referrer ||
      "";

    const msclkid = extractMsclkid(visitorUrl);

    const org = orgConfigs.get(licenseId);

    console.log("Webhook received:", {
      licenseId,
      chatId,
      startedAt,
      msclkid,
      orgConfig: org || "(none)"
    });

    // TODO later: call Microsoft Ads Offline Conversion API

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Webhook error:", e);
    return res.status(200).json({ ok: false });
  }
}

// Export helper so settings API can store per-org config
export function setOrgConfig(licenseId: string, cfg: any) {
  orgConfigs.set(licenseId, cfg);
}
