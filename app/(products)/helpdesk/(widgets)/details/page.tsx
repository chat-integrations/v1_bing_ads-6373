"use client";

import { Card } from "@livechat/design-system-react-components";
import { HelpDeskDetailsProvider } from "@livechat/developer-ui-react";

export default function Page() {
  return (
    <HelpDeskDetailsProvider>
      {({ ticketInfo }) => (
        <div>
          <h1>Ticket Details widget</h1>

          <Card title="Ticket info">
            {ticketInfo ? (
              <ul>
                <li>Ticket ID: {ticketInfo.id}</li>
              </ul>
            ) : (
              "Loading ticket info ..."
            )}
          </Card>
        </div>
      )}
    </HelpDeskDetailsProvider>
  );
}
