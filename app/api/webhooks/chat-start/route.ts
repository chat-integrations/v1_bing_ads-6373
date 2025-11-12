import { NextRequest, NextResponse } from "next/server";

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

const orgConfigs = new Map<string, OrgConfig>();

function extractMsclkid(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.searchParams.get("msclkid");
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LiveChatWebhookBody;

    const licenseId =
      body.license_id ||
      body.organization?.license_id ||
      body.license ||
      "";

    const chatId = body.chat_id || body.id || "";
    const startedAt = body.timestamp || new Date().toISOString();

    const visitorUrl =
      body.visitor?.page_url ||
      body.visitor?.referrer ||
      "";

    const msclkid = extractMsclkid(visitorUrl);

    const org = orgConfigs.get(String(licenseId));

    console.log("Webhook received (App Router):", {
      licenseId,
      chatId,
      startedAt,
      visitorUrl,
      msclkid,
      orgConfig: org || "(none)",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ ok: false });
  }
}
