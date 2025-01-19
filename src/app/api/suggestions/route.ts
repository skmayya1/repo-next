/* eslint-disable @typescript-eslint/no-unused-vars */
import { IProject } from "@/Components/Shining";
import prisma from "@/Utils/Prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() { 
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    try {
        const UserData = await prisma.users.findUnique({
            where: {
                kindeID: user.id
            },
            select: {
                usedLangs: true,
                username:true
            }
        })
        if (!UserData) return NextResponse.json({ error: "User not found" }, { status: 404 });

        let usedLangs = UserData.usedLangs;  //langs \ null is stored if null the langs are fetched through user's repos
        console.log(usedLangs);
        
        
        if (UserData.usedLangs.length === 0) {

            // Fetch repositories for the given username
            const response = await fetch(`https://api.github.com/users/${UserData.username}/repos`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${process.env.PAT_TOKEN}`
                }
            });
            const repos: Array<{ name: string }> = await response.json();

            // Check if repos data is an array
            if (!Array.isArray(repos)) {
                throw new Error('Failed to fetch repositories');
            }

            const languageCounts: { [key: string]: number } = {};

            // Fetch languages for each repo
            for (const repo of repos) {
                const res = await fetch(`https://api.github.com/repos/${UserData.username}/${repo.name}/languages`, {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                        'Authorization': `token ${process.env.PAT_TOKEN}`
                    }
                });
                const data: { [language: string]: number } = await res.json();

                for (const [language, count] of Object.entries(data)) {
                    languageCounts[language] = (languageCounts[language] || 0) + count;
                }
            }

            const sortedLanguages = Object.entries(languageCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5);   
            const languageNames = sortedLanguages.map(([language]) => language);

            const updatedUser = await prisma.users.update({
                where: {
                    kindeID: user.id
                },
                data: {
                    usedLangs: languageNames
                }
                
            })
            usedLangs = languageNames;
        }

        const apiUrl = `https://api.github.com/search/repositories?q=language:${usedLangs[0]}+stars:500..50000`;

        const githubToken = process.env.PAT_TOKEN;
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
        const repos = data.items;
        

        // Shuffle the repos array
        const shuffledRepos = repos.sort(() => 0.5 - Math.random());

        // Take the first 4 items
        const randomRepos = shuffledRepos.slice(0, 8);

        return NextResponse.json({
            data: randomRepos.map((item: IProject) => ({
                id: item.id,
                name: item.name,
                full_name: item.full_name,
                html_url: item.html_url,
                description: item.description,
                language: item.language,
                owner: {
                    avatar_url: item.owner.avatar_url
                },
                homepage: item.homepage,
                stargazers_count: item.stargazers_count,
                forks_count: item.forks_count,
                open_issues_count: item.open_issues_count
            }))
        });

    
    } catch (error) {        
        return NextResponse.json({ error: error }, { status: 500 });
    }
}


