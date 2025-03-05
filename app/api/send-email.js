import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        await sendgrid.send({
            to: "jalalgirma.dev@gmail.com",
            from: "jalalgirma.dev@gmail.com",
            subject: `[Contact Form] : ${req.body.subject}`,
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Contact Form Submission</title>
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      </head>
      <body style="font-family: 'helvetica', 'ui-sans'; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 5px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="color: #333; margin-bottom: 20px;">You've got a new message from ${req.body.name}</h3>
          <div style="font-size: 16px; line-height: 1.5;">
            <p><strong>Email:</strong> ✉️ ${req.body.email}</p>
            <p><strong>Subject:</strong> ${req.body.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${req.body.message}</p>
          </div>
          <p style="font-size: 14px; color: #666; padding-top: 20px; border-top: 1px solid #eee; margin-top: 20px;">
            Sent from your website contact form on ${new Date().toLocaleDateString()}
          </p>
        </div>
      </body>
      </html>`,
        });

        return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("SendGrid Error:", error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
}