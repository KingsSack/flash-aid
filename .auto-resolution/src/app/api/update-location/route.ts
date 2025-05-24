import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/index'; // Assuming your Drizzle db instance is exported from here
import { usersTable } from '@/db/schema'; // Assuming your schema is exported from here
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { email, latitude, longitude } = await req.json();

    if (!email || latitude === undefined || longitude === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db
      .update(usersTable)
      .set({
        latitude: latitude,
        longitude: longitude,
      })
      .where(eq(usersTable.email, email));

    return NextResponse.json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error('Error updating location:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
