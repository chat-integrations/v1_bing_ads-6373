"use client";

import { useApp } from "@livechat/developer-ui-react";

export default function Page() {
  const { app } = useApp();

  console.log(app);

  return (
    <div>
      <h1>Fullscreen</h1>
    </div>
  );
}
