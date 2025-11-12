"use client";

import { IRichMessage } from "@livechat/agent-app-sdk";
import { Button, Card } from "@livechat/design-system-react-components";
import { LiveChatMessageBoxProvider } from "@livechat/developer-ui-react";

const getRichMessage = (currentLocation: string): IRichMessage => ({
  template_id: "cards",
  elements: [
    {
      title: "Hello",
      subtitle: "This is an example card",
      buttons: [
        {
          type: "message",
          text: "Say hello",
          value: "Say hello",
          postback_id: "send_message",
          user_ids: [],
        },
        {
          type: "webview",
          text: "Open link",
          postback_id: "open_url",
          user_ids: [],
          value: `${currentLocation}/livechat/moments/test`,
          webview_height: "full",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      ],
    },
  ],
});

export default function Page() {
  return (
    <LiveChatMessageBoxProvider>
      {({ widget, customerProfile }) => (
        <div>
          <h1>Message box widget</h1>
          <Button
            kind="primary"
            type="button"
            onClick={() =>
              widget?.putMessage(getRichMessage(window.location.origin))
            }
          >
            Put a message
          </Button>
          <Card title="Customer profile">
            {customerProfile ? (
              <ul>
                <li>Name: {customerProfile.name}</li>
                <li>Country: {customerProfile.geolocation.country}</li>
                <li>Timezone: {customerProfile.geolocation.timezone}</li>
              </ul>
            ) : (
              "Loading customer profile ..."
            )}
          </Card>
        </div>
      )}
    </LiveChatMessageBoxProvider>
  );
}
