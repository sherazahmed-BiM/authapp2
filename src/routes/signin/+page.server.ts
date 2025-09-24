import { redirect, fail } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users, sessions } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, locals, cookies }: any) => {
    console.log('🔄 Manual authentication server action called');

    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    console.log('📝 Form data:', { email: email ? 'provided' : 'missing', password: password ? 'provided' : 'missing' });

    if (!email || !password) {
      console.log('❌ Missing credentials');
      return fail(400, { error: 'Email and password are required' });
    }

    try {
      // Manual authentication - check credentials first
      console.log('🔍 Looking up user:', email);

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email.trim()))
        .limit(1);

      console.log('👤 User lookup result:', user ? 'found' : 'not found');

      if (!user || !user.password) {
        console.log('❌ User not found or no password');
        return fail(401, { error: 'Invalid email or password' });
      }

      const isValidPassword = await bcrypt.compare(password.trim(), user.password);
      console.log('🔑 Password validation:', isValidPassword ? 'valid' : 'invalid');

      if (!isValidPassword) {
        console.log('❌ Invalid password');
        return fail(401, { error: 'Invalid email or password' });
      }

      console.log('✅ Credentials valid, creating session and redirecting');

      // Since credentials are valid, create a session manually
      // We can do this by setting the session in locals and redirecting

      // Generate a session token
      const sessionToken = randomUUID();

      // Create session in database
      await db.insert(sessions).values({
        sessionToken,
        userId: user.id,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      });

      console.log('✅ Session created in database');

      // Set the session cookie manually
      // Auth.js uses 'authjs.session-token' as the cookie name
      cookies.set('authjs.session-token', sessionToken, {
        httpOnly: true,
        secure: false, // localhost
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60, // 24 hours
      });

      console.log('✅ Session cookie set, authentication successful');

      // Return success - SvelteKit will handle the response
      // The client can redirect based on the success response
      return { success: true, redirectTo: '/dashboard' };

    } catch (err) {
      console.error('💥 Authentication error:', err);
      return fail(500, { error: 'Authentication failed' });
    }
  }
}; 