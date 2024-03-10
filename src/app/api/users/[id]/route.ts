import { NextRequest } from "next/server";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  console.log('email to be searched', email);
  
  const foundUser = await User.findOne({ email: email });
  return NextResponse.json({ foundUser }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string }}) {
  try {
    const { id } = params;

    const body = await request.json();
    const UserData = body.formData;

    const updateUserData = await User.findByIdAndUpdate(id, {
      ...UserData,
    });

    return NextResponse.json({ message: "User updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) {
  try {
    const { id } = params;

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}