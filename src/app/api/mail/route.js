const nodemailer = require("nodemailer");

export async function POST(request) {
  const data = await request.json();
  const send = await sendMail(data);
  if (send.messageId) {
    return Response.json({ message: "EMAIL_SEND" });
  } else {
    return Response.json({ message: "EMAIL_ERROR" });
  }
    
}

const sendMail = async (data) => {

  const { name, email, message } = data;


    const nodemailer_auth_user = process.env.NODEMAILER_USER;
    const nodemailer_auth_pass = process.env.NODEMAILER_PASS;
    
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: nodemailer_auth_user,
          pass: nodemailer_auth_pass,
        },
      });
      const mailOptions = {
        from: nodemailer_auth_user,
        to: data.email,
        subject: "Amigo invisible",
        html: message,
      };
      const send = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", send.messageId);
        return send;
}