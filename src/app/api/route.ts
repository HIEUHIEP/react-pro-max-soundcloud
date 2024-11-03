import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    const url = new URL(request.url);
    const fileName = new URLSearchParams(url.search)


    // return NextResponse.json({ data: "" })
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${fileName.get("audio")}`)
}