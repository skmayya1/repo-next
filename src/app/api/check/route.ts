import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { getIdToken } = getKindeServerSession();
    const idToken = await getIdToken()


    console.log(idToken);
    return NextResponse.json(idToken.ext_provider?.claims.email)
}