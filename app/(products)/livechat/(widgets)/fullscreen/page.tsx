"use client";

import { useEffect, useState } from "react";
import { Card, NumericInput } from "@livechat/design-system-react-components";
import {
  useApp,
  useLiveChatFullscreen,
  LiveChatFullscreenProvider,
} from "@livechat/developer-ui-react";
import {
  AgentConfigurationDto,
  LiveChatConfigurationApiError,
} from "@livechat/developer-studio-api";

function Widget() {
  const { app } = useApp();
  const { widget } = useLiveChatFullscreen();

  const [agents, setAgents] = useState<AgentConfigurationDto[] | null>(null);
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    widget.setNotificationBadge(notificationsCount);
  }, [widget, notificationsCount]);

  useEffect(() => {
    if (!app?.authorization) {
      return;
    }

    app.api.products.livechat.configuration.agents
      .getAgents()
      .then(({ data }) => {
        setAgents(data);
      })
      .catch(async (error) => {
        const apiError = error.response.data.error as
          | LiveChatConfigurationApiError
          | undefined;
        const eventMessage = apiError
          ? `${apiError.type}: ${apiError.message}`
          : "Unknown error";

        await app.features.reports.sendError("4xx", eventMessage);
      });
  }, [app]);

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
      <h3>Agents list:</h3>
      <div className="agents-list">
        {agents
          ? agents.map((agent) => (
              <Card key={agent.id} title={agent.name} src={agent.avatar}>
                {agent.role}
              </Card>
            ))
          : "Loading agents..."}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LiveChatFullscreenProvider>
      <Widget />
    </LiveChatFullscreenProvider>
  );
}
