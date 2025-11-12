"use client";

import { useEffect, useState } from "react";
import { NumericInput } from "@livechat/design-system-react-components";
import {
  useApp,
  useHelpDeskFullscreen,
  HelpDeskFullscreenProvider,
} from "@livechat/developer-ui-react";

function Widget() {
  const { app } = useApp();
  const { widget } = useHelpDeskFullscreen();
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    widget.setNotificationBadge(notificationsCount);
  }, [widget, notificationsCount]);

  console.log(app);

  return (
    <div>
      <h1>Fullscreen widget</h1>
      <NumericInput
        min={0}
        max={99}
        id="notifications-count"
        value={String(notificationsCount)}
        onChange={(value) => setNotificationsCount(Number(value))}
      />
    </div>
  );
}

export default function Page() {
  return (
    <HelpDeskFullscreenProvider>
      <Widget />
    </HelpDeskFullscreenProvider>
  );
}
