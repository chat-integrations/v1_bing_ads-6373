// Saves per-organisation Microsoft Ads settings (dev-only memory store)

import { setOrgConfig } from "../webhooks/chat-start";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { licenseId, msadsAccountId, offlineGoalName, currency = "GBP", defaultValue = 1 } = req.body || {};

  if (!licenseId) return res.status(400).json({ error: "licenseId required" });
  if (!msadsAccountId) return res.status(400).json({ error: "msadsAccountId required" });
  if (!offlineGoalName) return res.status(400).json({ error: "offlineGoalName required" });

  await setOrgConfig(String(licenseId), {
    msadsAccountId: String(msadsAccountId),
    offlineGoalName: String(offlineGoalName),
    currency: String(currency),
    defaultValue: Number(defaultValue)
  });

  return res.status(200).json({ ok: true });
}
