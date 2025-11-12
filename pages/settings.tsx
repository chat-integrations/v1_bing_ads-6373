import { useState, ChangeEvent, FormEvent } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    licenseId: "",
    msadsAccountId: "",
    offlineGoalName: "",
    currency: "GBP",
    defaultValue: 1,
  });

  const [status, setStatus] = useState("");

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Saving...");

    const res = await fetch("/api/settings/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setStatus(data.ok ? "Saved" : "Error");
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h1>Microsoft Ads Settings</h1>

      <form onSubmit={save}>
        <label>
          LiveChat License ID
          <br />
          <input
            name="licenseId"
            value={form.licenseId}
            onChange={update}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Microsoft Ads Account ID
          <br />
          <input
            name="msadsAccountId"
            value={form.msadsAccountId}
            onChange={update}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Offline Conversion Goal Name
          <br />
          <input
            name="offlineGoalName"
            value={form.offlineGoalName}
            onChange={update}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Default Conversion Value
          <br />
          <input
            type="number"
            name="defaultValue"
            value={form.defaultValue}
            onChange={update}
          />
        </label>
        <br />
        <br />

        <label>
          Currency Code
          <br />
          <input
            name="currency"
            value={form.currency}
            onChange={update}
          />
        </label>
        <br />
        <br />

        <button type="submit">Save</button>
      </form>

      <p>{status}</p>
    </div>
  );
}
