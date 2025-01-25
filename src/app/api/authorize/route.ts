/* eslint-disable @typescript-eslint/no-unused-vars */
import Prisma from '@/Utils/Prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
    try {
        console.log(req.url);
        const redirectUrl = new URL('/',req.url).toString();
        
        
        const { getUser, getIdToken } = getKindeServerSession();
        const user = await getUser();
        const idToken = await getIdToken();

        console.log('User:', user);
        console.log('IdToken:', idToken);

        if (!user || !user.id || !user.given_name || !user.family_name) {
            console.error('Invalid user data:', user);
            return NextResponse.redirect("http://localhost:3000");
        }
        console.log(idToken.ext_provider?.claims);

        const email = idToken.ext_provider?.claims.email as string;
        const login = idToken.ext_provider?.claims.profile?.login as string || email;        
        console.log('Login:', login);
        console.log('Email:', email);

        // Ensure login and email are not null or undefined
        if (!login || !email) {
            console.error('Missing login or email data.');
            return NextResponse.redirect("http://localhost:3000");
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
        return NextResponse.redirect("http://localhost:3000/");

    } catch (error) {
        console.error('Error:');
        return NextResponse.redirect("http://localhost:3000/"); 
    }
}
