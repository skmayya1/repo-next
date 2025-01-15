import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch('https://api.github.com/search/repositories?q=topic:good-first-issue&sort=stars&order=desc');
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
}