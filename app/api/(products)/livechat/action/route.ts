// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ChatActionPayload = {
  licence_id: string;
  agent_id: string;
  time: string;
  instance_id: string;
  source: string;
  chat_id: string;
  thread_id: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_host: string;
  customer_ip: string;
  customer_latitude: string;
  customer_longitude: string;
  customer_country: string;
  customer_region: string;
  customer_city: string;
  customer_timezone: string;
};

export async function GET(req: Request) {
  console.log(req.url);

  return new Response("OK!", {
    status: 200,
  });
}
