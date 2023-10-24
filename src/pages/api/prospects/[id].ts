import type { APIRoute } from "astro";
import { getXataClient } from "../../../xata";

export const GET: APIRoute = async ({ params }) => {
  const xata = getXataClient();
  const data = await xata.db.prospect.read(params.id);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
