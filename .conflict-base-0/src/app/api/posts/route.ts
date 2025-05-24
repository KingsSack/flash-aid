import { postsTable, usersTable } from "@/db/schema";
import { db } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        const { email, title, body, latitude, longitude } = await req.json();

        if (!email || !title || !body || latitude === undefined || longitude === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
      
        // Find the user to link the post
        const user = await db.select().from(usersTable).where(eq(usersTable.email, email)).get();
      
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
      
        await db.insert(postsTable).values({
            title: title,
            body: body,
            latitude: latitude,
            longitude: longitude,
            userId: user.id,
        });
      
        return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const posts = await db.select().from(postsTable).all();

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
