
import nodemailer from "nodemailer";
import Token from "@/models/token";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }) => {
  console.log(userId.toString());
  try {
    const token = await bcryptjs.hash(userId.toString(), 10);
    const newToken = new Token({
      userId: userId.toString(),
      token,
      emailType,
    });

    await newToken.save();

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            
                  user: "675f73a793ad98",
                  pass: "3e048e028aeed0"
                
             
          //TODO: add these credentials to .env file
        }
    });

    const mailOptions = {
      from:"mohamedhazara87@gmail.com",
      to: email,
    };

    if (emailType === "emailVerification") {
      mailOptions.subject = "Email Verification";
      mailOptions.html = `
        <h1>Click on the link below to verify your email</h1>
        <a href="http://localhost:3000/verifyemail?token=${token}">Verify Email</a>
      `;
    } else {
      mailOptions.subject = "Reset Password";
      mailOptions.html = `
            <h1>Click on the link below to reset your password</h1>
            <a href="http://localhost:3000//resetpassword?token=${token}">Reset Password</a>
        `;
    }

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};


 


       