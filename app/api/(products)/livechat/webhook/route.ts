import camelcase from "camelcase";

export async function POST(req: Request) {
  try {
    const { webhook_id, secret_key, action, organization_id, payload } =
      await req.json();

    if (secret_key !== process.env.WEBHOOK_SECRET) {
      throw new Error("Unauthorized");
    }

    const handlerName = camelcase(action) as keyof typeof WebhooksHandlers;

    await WebhooksHandlers[handlerName](organization_id, webhook_id, payload);
  } catch (error) {
    const { message } = error as Error;

    console.log("ChatWebhook -> error: ", message);

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
  async incomingChat(
    organization_id: string,
    webhook_id: string,
    payload: unknown
  ) {
    console.log(
      "ChatWebhook -> incomingChat",
      organization_id,
      webhook_id,
      payload
    );
  },
};
