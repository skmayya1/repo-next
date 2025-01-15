import { NextResponse } from "next/server"

export async function GET() {
    try {
        const res = await fetch('https://api.github.com/search/repositories?q=stars:>100000&sort=stars&order=desc')
        const data = await res.json()
        console.log(data.items[0]);
        
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "An error occurred" }, { status: 500 })
    }
}