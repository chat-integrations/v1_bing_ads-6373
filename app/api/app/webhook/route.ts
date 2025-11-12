import { AppConfig } from "@livechat/developer-sdk";
import camelcase from "camelcase";
import lcConfig from "livechat.config.json";

export async function POST(req: Request) {
  try {
    const { clientID, licenseID, event, payload } = await req.json();

    if (clientID !== (lcConfig as AppConfig).blocks?.authorization?.clientId) {
      throw new Error("Unauthorized");
    }

    const handlerName = camelcase(event) as keyof typeof WebhooksHandlers;

    await WebhooksHandlers[handlerName](licenseID, payload);
  } catch (error) {
    const { message } = error as Error;

    console.log("AppWebhook -> error: ", message);

    return new Response("NOK!", {
      status: 400,
      statusText: message,
    });
  } finally {
    return new Response("OK!", {
      status: 200,
    });
  }
}

const WebhooksHandlers = {
  async applicationInstalled(
    licenseId: number,
    payload: { applicationId: string }
  ) {
    console.log("AppWebhook -> applicationInstalled", licenseId, payload);
  },

  async applicationUninstalled(
    licenseId: number,
    payload: { applicationId: string }
  ) {
    console.log("AppWebhook -> applicationUninstalled", licenseId, payload);
  },

  async paymentActivated(
    licenseId: number,
    payload: { paymentId: string; quantity: number }
  ) {
    console.log("AppWebhook -> paymentActivated", licenseId, payload);
  },

  async paymentCollected(
    licenseId: number,
    payload: { paymentId: string; total: number }
  ) {
    console.log("AppWebhook -> paymentCollected", licenseId, payload);
  },

  async paymentCancelled(licenseId: number, payload: { paymentId: string }) {
    console.log("AppWebhook -> paymentCancelled", licenseId, payload);
  },
};
