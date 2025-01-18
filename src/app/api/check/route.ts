import { NextResponse } from "next/server";

export async function GET() {
    const usedLangs = ["TypeScript", "JavaScript", "CSS", "HTML", "Rust"];


    const apiUrl = `https://api.github.com/search/repositories?q=language:typescript stars:500..100000 &order=desc `;

    const githubToken = process.env.PAT_TOKEN;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `token ${githubToken}`, // Include token if needed
                Accept: "application/vnd.github+json"
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        

        // Return repositories as JSON response
        return NextResponse.json({
            success: true,
            repos: data.items.map(repo => ({
                name: repo.name,
                stars: repo.stargazers_count,
                url: repo.html_url,
            }))
        });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            success: false,
            message: error
        }, { status: 500 });
    }
}
