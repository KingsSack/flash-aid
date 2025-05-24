import { usersTable } from "@/db/schema";
import { db } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        const { name, age, email, latitude, longitude } = await req.json();

        if (!name || !age || !email) {
            return NextResponse.json({ error: 'Missing required fields: name, age, email' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email)).get();
        
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
        }

        await db.insert(usersTable).values({
            name,
            age,
            email,
            latitude: latitude || null,
            longitude: longitude || null,
        });

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const users = await db.select().from(usersTable).all();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
