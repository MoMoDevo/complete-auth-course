import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Token from "@/models/token";
import { connectToDB } from "@/utils/connetctoSb";



connectToDB()

export async function POST(request) {
  try {

    const reqBody = await request.json();
    const token = reqBody.token;
    const tokenObj = await Token.findOne({ token });
    const userId = tokenObj.userId;
    await User.updateOne({ _id: userId }, { isEmailVerified: true });
    return NextResponse.json({
      message: "Email verified successfully",
      data: null,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}