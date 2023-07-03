import { sendEmail } from "@/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Token from "@/models/token";
import bcryptjs from "bcryptjs";
import { connectToDB } from "@/utils/connetctoSb";

 
// for sending password reset link to email
export async function POST(request) {
  try {
    await connectToDB()
    const { email } = await request.json();

    const user = await User.findOne({ email });

    if (!user) throw new Error("User with this email does not exist");
    await sendEmail({
      email: user.email,
      emailType: "resetPassword",
      userId: user._id,
    });
    return NextResponse.json(
      { message: "Password reset link sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: error.message },
      { status: 500 }
    );
  }
}

// for resetting password
export async function PUT(request) {
  try {

    await connectToDB()
    const reqBody = await request.json();
    const token = reqBody.token;
    const tokenObj = await Token.findOne({ token });
    if (!tokenObj) throw new Error("Invalid or expired password reset token");

    const userId = tokenObj.userId;
    const hashedPassword = await bcryptjs.hash(reqBody.password, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: error.message },
      { status: 500 }
    );
  }
}
