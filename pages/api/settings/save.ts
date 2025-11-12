import type { NextApiRequest, NextApiResponse } from "next";
import { setOrgConfig } from "../webhooks/chat-start";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    licenseId,
    msadsAccountId,
    offlineGoalName,
    currency = "GBP",
    defaultValue = 1,
  } = req.body as {
    licenseId?: string;
    msadsAccountId?: string;
    offlineGoalName?: string;
    currency?: string;
    defaultValue?: number;
  };

  if (!licenseId)
    return res.status(400).json({ error: "licenseId required" });

  setOrgConfig(String(licenseId), {
    msadsAccountId: String(msadsAccountId),
    offlineGoalName: String(offlineGoalName),
    currency: String(currency),
    defaultValue: Number(defaultValue),
  });

  return res.status(200).json({ ok: true });
}
