/* eslint-disable @typescript-eslint/no-unused-vars */
import Prisma from '@/Utils/Prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Define the types
interface IdTokenClaims {
    email: string;
    profile?: {
        login?: string;
        // Add other properties if needed
    };
    // Add other properties if needed
}

interface IdToken {
    ext_provider?: {
        claims: IdTokenClaims;
    };
}

export async function GET(req: NextRequest) {
    try {
        const redirectUrl = new URL('/', req.url).toString();

        const { getUser, getIdToken } = getKindeServerSession();
        const user = await getUser();
        const idToken = (await getIdToken()) as IdToken; // Cast to IdToken type

        if (!user || !user.id || !user.given_name || !user.family_name) {
            console.error('Invalid user data:', user);
            return NextResponse.redirect("https://repogallery.tech/");
        }

        // Log the profile object to debug
        console.log('Profile:', idToken.ext_provider?.claims.profile);

        const email = idToken.ext_provider?.claims.email as string;
        const login = idToken.ext_provider?.claims.profile?.login as string;

        console.log('Login:', login);
        console.log('Email:', email);

        // Ensure login and email are not null or undefined
        if (!login || !email) {
            console.error('Missing login or email data.');
            return NextResponse.redirect("https://repogallery.tech/");
        }

        const userDetails = await Prisma.users.upsert({
            where: { kindeID: user.id },
            create: {
                firstName: user.given_name,
                lastName: user.family_name,
                kindeID: user.id,
                picture: user.picture || '',
                username: login,
                email: email
            },
            update: {
                firstName: user.given_name,
                lastName: user.family_name,
                picture: user.picture || '',
                username: login,
                email: email
            },
        });

        console.log('User Details:', userDetails);
        return NextResponse.redirect("https://repogallery.tech/");

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.redirect("https://repogallery.tech/");
    }
}