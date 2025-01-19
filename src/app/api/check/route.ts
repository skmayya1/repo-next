import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const baseUrl = "https://api.github.com/search/repositories?q=";
    const token = process.env.PAT_TOKEN;

    const { searchParams } = new URL(request.url);
    const Query = searchParams.get("query") || "";
    const selectedLanguages = searchParams.get("languages")?.split(",") || [];
    const selectedLabels = searchParams.get("labels")?.split(",") || [];

    const queryString =
        Query +
        (selectedLanguages.length
            ? selectedLanguages.map((lang) => `+language:${lang}`).join("")
            : "") +
        (selectedLabels.length
            ? selectedLabels.map((label) => `+topic:${label}`).join("")
            : "");

    if (!Query && !selectedLanguages.length && !selectedLabels.length) {
        return NextResponse.json(
            { error: "Query, languages, or labels must be provided" },
            { status: 400 }
        );
    }

    const url = `${baseUrl}${queryString}&per_page=100`;

    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `token ${token}`  // Corrected here
            }
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Fetched Data:", data);

        return NextResponse.json(data.items);
    } catch (error) {
        console.error("Failed to fetch repositories:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
