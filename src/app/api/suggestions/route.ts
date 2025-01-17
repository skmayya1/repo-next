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

        //var to keep track of the used languages
        let usedLangs = UserData.usedLangs;  //langs \ null is stored if null the langs are fetched through user's repos

        console.log(usedLangs);
        
        if (UserData.usedLangs.length === 0) {

            // Fetch repositories for the given username
            const response = await fetch(`https://api.github.com/users/${UserData.username}/repos`);
            const repos: Array<{ name: string }> = await response.json();

            // Check if repos data is an array
            if (!Array.isArray(repos)) {
                throw new Error('Failed to fetch repositories');
            }

            const languageCounts: { [key: string]: number } = {};

            // Fetch languages for each repo
            for (const repo of repos) {
                const res = await fetch(`https://api.github.com/repos/${UserData.username}/${repo.name}/languages`);
                const data: { [language: string]: number } = await res.json();

                for (const [language, count] of Object.entries(data)) {
                    languageCounts[language] = (languageCounts[language] || 0) + count;
                }
            }

            // Sort languages by usage count
            const sortedLanguages = Object.entries(languageCounts)
                .sort(([, a], [, b]) => b - a)
            const languageNames = sortedLanguages.map(([language]) => language);

            //store in db the languages 

            return NextResponse.json(languageNames);
        }
      //after using the languages find the best repos
    
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}


