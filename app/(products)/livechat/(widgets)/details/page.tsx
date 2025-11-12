"use client";

import { Button, Card } from "@livechat/design-system-react-components";
import { LiveChatDetailsProvider } from "@livechat/developer-ui-react";

export default function Page() {
  return (
    <LiveChatDetailsProvider>
      {({ widget, customerProfile }) => (
        <div>
          <h1>Chat Details widget</h1>
          <Button
            kind="primary"
            type="button"
            onClick={() => {
              widget.putMessage("New message");
            }}
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
    </LiveChatDetailsProvider>
  );
}
