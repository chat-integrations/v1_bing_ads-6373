import type { NextApiRequest, NextApiResponse } from "next";

type OrgConfig = {
  msadsAccountId: string;
  offlineGoalName: string;
  currency: string;
  defaultValue: number;
};

// TEMP in-memory store (replace with DB later)
const orgConfigs = new Map<string, OrgConfig>();

export function setOrgConfig(licenseId: string, cfg: OrgConfig) {
  orgConfigs.set(licenseId, cfg);
}

function extractMsclkid(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.searchParams.get("msclkid");
  } catch {
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const body: any = req.body;

    const licenseId =
      String(
        body?.license_id ||
          body?.organization?.license_id ||
          body?.license ||
          ""
      ) || "";

    const chatId = String(body?.chat_id || body?.id || "");
    const startedAt = body?.timestamp || new Date().toISOString();

    const visitorUrl: string | undefined =
      body?.visitor?.page_url ||
      body?.visitor?.referrer ||
      undefined;

    const msclkid = extractMsclkid(visitorUrl);

    const org = orgConfigs.get(licenseId);

    console.log("Webhook received:", {
      licenseId,
      chatId,
      startedAt,
      msclkid,
      orgConfig: org || "(none)",
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(200).json({ ok: false });
  }
}
