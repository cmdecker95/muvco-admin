import type { APIRoute } from "astro";
import { getXataClient } from "../../xata";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  try {
    // Extract form data
    const bodyBuffer = await request.arrayBuffer();
    const bodyString = new TextDecoder().decode(bodyBuffer);
    const formData = JSON.parse(bodyString);

    const { to, from, subject, body, id } = formData;
    console.log("Form data:", formData);

    // Validate form data
    if (
      typeof to !== "string" ||
      typeof from !== "string" ||
      typeof subject !== "string" ||
      typeof body !== "string" ||
      to.trim().length < 1 ||
      from.trim().length < 1 ||
      subject.trim().length < 1 ||
      body.trim().length < 1
    ) {
      throw new Error("Form data could not be parsed.");
    }

    // Update database
    const prospect = {
      to: to.trim(),
      from: from.trim(),
      subject: subject.trim(),
      body: body.trim(),
    };

    const xata = getXataClient();

    const record = await xata.db.prospect.update(id, { contacted: true });

    console.log("From Xata:", record);

    // Send email
    try {
      const resend = new Resend(import.meta.env.RESEND_API_KEY);
      const data = await resend.emails.send({
        from: `The MUV Collective <${from}>`,
        to: [to],
        subject: subject,
        html: body,
      });

      console.log("From Resend:", data);

      return new Response(JSON.stringify({ message: "Success!" }), {
        status: 201,
      });
    } catch (error) {
      console.error("Couldn't send via resend:", error);

      return new Response(
        JSON.stringify({ message: "Internal Server Error" }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Error processing form data:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
