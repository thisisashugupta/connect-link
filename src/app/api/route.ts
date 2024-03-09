import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest, res : NextResponse) {

    console.log("request body", req.body);

    return NextResponse.json({ saved: true });    
}