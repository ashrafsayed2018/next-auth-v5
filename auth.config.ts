import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "@/schemas"
import { findUserByEmail } from "@/data/user";
import bycrpt from "bcryptjs"
export default {
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET
    // }),
    Credentials({
   async authorize(credentials) {

    const validatedFields = LoginSchema.safeParse(credentials);

    if (validatedFields.success) {
        const {email, password} = validatedFields.data;

        const user = await findUserByEmail(email);

        if (!user || !user.password) return null;

        const passwordMatch = await bycrpt.compare(password, user.password);

        if (passwordMatch) return user;

    }
    return null;

   }
  })
],
} satisfies NextAuthConfig