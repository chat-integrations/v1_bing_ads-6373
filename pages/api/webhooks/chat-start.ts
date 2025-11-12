import type { NextApiRequest, NextApiResponse } from "next";

//
// TYPES
//
interface LiveChatVisitor {
  page_url?: string;
  referrer?: string;
}

interface LiveChatWebhookBody {
  license_id?: string;
  organization?: { license_id?: string };
  license?: string;
  chat_id?: string;
  id?: string;
  timestamp?: string;
  visitor?: LiveChatVisitor;
}

interface OrgConfig {
  msadsAccountId: string;
  offlineGoalName: string;
  currency: string;
  defaultValue: number;
}

//
// TEMP IN-MEMORY STORE
//
const orgConfigs = new Map<string, OrgConfig>();

export function setOrgConfig(licenseId: string, cfg: OrgConfig): void {
  orgConfigs.set(licenseId, cfg);
}

//
// HELPERS
//
function extractMsclkid(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.searchParams.get("msclkid");
  } catch {
    return null;
  }
}

//
// MAIN HANDLER
//
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> | void {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const body: LiveChatWebhookBody = req.body;

    const licenseId: string =
      body.license_id ||
      body.organization?.license_id ||
      body.license ||
      "";

    const chatId: string = body.chat_id || body.id || "";
    const startedAt: string = body.timestamp || new Date().toISOString();

    const visitorUrl: string | undefined =
      body.visitor?.page_url ||
      body.visitor?.referrer ||
      undefined;

    const msclkid: string | null = extractMsclkid(visitorUrl);

    const org = orgConfigs.get(String(licenseId));

    console.log("Webhook received:", {
      licenseId,
      chatId,
      startedAt,
      visitorUrl,
      msclkid,
      orgConfig: org || "(none)"
    });

    // TODO: send to Microsoft Ads API here

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(200).json({ ok: false });
  }
}
