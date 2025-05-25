import { usersTable } from "@/db/schema";
import { db } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { eq } from 'drizzle-orm';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id);

        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, userId))
            .get();

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
