import Prisma from '@/Utils/Prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id || !user.given_name || !user.family_name) {
            console.error('Invalid user data:', user);
            return NextResponse.redirect("http://localhost:3000");
        }

        console.log('User:', user);

        const userDetails = await Prisma.users.upsert({
            where: { kindeID: user.id },
            create: {
                firstName: user.given_name,
                lastName: user.family_name,
                kindeID: user.id,
                picture: user.picture || '',
            },
            update: {
                firstName: user.given_name,
                lastName: user.family_name,
            },
        });

        console.log('User Details:', userDetails);
        return NextResponse.redirect("http://localhost:3000/");
    } catch (error) {
        return NextResponse.redirect("http://localhost:3000/");
    }
}
