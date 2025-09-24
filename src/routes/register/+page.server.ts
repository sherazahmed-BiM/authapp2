import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const name = data.get("name") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    // Validation
    if (!email || !password || !name) {
      return {
        error: "All fields are required",
      };
    }

    if (password !== confirmPassword) {
      return {
        error: "Passwords do not match",
      };
    }

    if (password.length < 6) {
      return {
        error: "Password must be at least 6 characters long",
      };
    }

    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return {
        error: "User with this email already exists",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        email,
        name,
        password: hashedPassword,
      })
      .returning();

    if (!newUser) {
      return {
        error: "Failed to create user",
      };
    }

    // Redirect to login page with success message
    throw redirect(303, "/?registered=true");
  },
};
