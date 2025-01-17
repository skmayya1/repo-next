import { NextResponse } from "next/server"

export async function GET() {
    try {
        const res = await fetch('https://api.github.com/search/repositories?q=stars:>100000&sort=stars&order=desc')
        const data = await res.json()
        const filteredData = data.items.filter((item: { language:string | null; }) => item.language !== null)        
        return NextResponse.json(filteredData.slice(0, 8))
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "An error occurred" }, { status: 500 })
    }
}