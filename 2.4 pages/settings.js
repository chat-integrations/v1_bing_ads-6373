import { useState } from "react";

export default function Settings() {
  const [form, setForm] = useState({
    licenseId: "",
    msadsAccountId: "",
    offlineGoalName: "",
    currency: "GBP",
    defaultValue: 1
  });
  const [status, setStatus] = useState("");

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch("/api/settings/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setStatus(data.ok ? "Saved" : `Error: ${data.error || "unknown"}`);
  };

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Microsoft Ads Settings</h1>
      <p>Paste your organisation’s Microsoft Ads details.</p>

      <form onSubmit={onSave}>
        <label>LiveChat License ID<br/>
          <input name="licenseId" value={form.licenseId} onChange={onChange} required />
        </label><br/><br/>

        <label>Microsoft Ads Account ID<br/>
          <input name="msadsAccountId" value={form.msadsAccountId} onChange={onChange} required />
        </label><br/><br/>

        <label>Offline Conversion Goal Name<br/>
          <input name="offlineGoalName" value={form.offlineGoalName} onChange={onChange} required />
        </label><br/><br/>

        <label>Default Conversion Value<br/>
          <input name="defaultValue" type="number" step="0.01" value={form.defaultValue} onChange={onChange} />
        </label><br/><br/>

        <label>Currency (ISO code, e.g., GBP)<br/>
          <input name="currency" value={form.currency} onChange={onChange} />
        </label><br/><br/>

        <button type="submit">Save</button>
        <div style={{ marginTop: 10 }}>{status}</div>
      </form>
    </main>
  );
}
