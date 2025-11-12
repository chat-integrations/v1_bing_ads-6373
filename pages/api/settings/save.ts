import type { NextApiRequest, NextApiResponse } from "next";
import { setOrgConfig } from "../webhooks/chat-start";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    licenseId,
    msadsAccountId,
    offlineGoalName,
    currency = "GBP",
    defaultValue = 1
  } = req.body || {};

  if (!licenseId) return res.status(400).json({ error: "licenseId required" });

  setOrgConfig(String(licenseId), {
    msadsAccountId,
    offlineGoalName,
    currency,
    defaultValue
  });

  return res.status(200).json({ ok: true });
}
