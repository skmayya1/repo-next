import Prisma from '@/Utils/Prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            return NextResponse.redirect("http://localhost:3000");
        }

        console.log(user);

        const userDetails = await Prisma.users.upsert({
            where: {
                email: user.email as string
            },
            create: {
                email: user.email as string,
                firstName: user.given_name as string,
                lastName: user.family_name as string,
                kindeID: user.id as string,
                picture: user.picture as string,
            },
            update: {
                firstName: user.given_name as string,
                lastName: user.family_name as string,
            }
        });

        if (userDetails) {
            console.log('User Details', userDetails);
            return NextResponse.redirect("http://localhost:3000/");
        } else {
            return NextResponse.redirect("http://localhost:3000/");
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.redirect("http://localhost:3000/");
    }
}
