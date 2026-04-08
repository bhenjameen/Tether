import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
    
    // Clear NextAuth session tokens as well to prevent persistent redirects
    cookieStore.delete('authjs.session-token');
    cookieStore.delete('__Secure-authjs.session-token');

    return NextResponse.json({ message: 'Logged out successfully' });
}
