import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const Users = await User.find();

    return NextResponse.json({ Users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const UserData = body.formData;

    await User.create(UserData);

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}