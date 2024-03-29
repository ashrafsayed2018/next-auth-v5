import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/lib/prisma";
import authConfig from "@/auth.config";

import { findUserById } from "@/data/user";


export const {
    handlers: {GET,POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error : "/auth/error"
    },
    events: {
      async linkAccount({user}) {
        await prisma.user.update({
            where: {
                id:user.id,
            },
            data: {
                emailVerified : new Date()
            }
        });
      }
    },
    callbacks: {

        async signIn ({user, account})  {
            // allow oauth without email verification
            if (account?.provider  !== "credentials") return true;

            const existingUser = await findUserById(user.id as string);


            if (!existingUser || !existingUser.emailVerified) return false;
           
            // TODO: 2FA check

          return true;
        },
        async session({token, session }) {

            if (session.user && token.sub) {
            session.user.id = token.sub
            }

            if (token.role && session.user ) {
                session.user.role = token.role;
            }
            return session
          },
          async jwt({ token }) {

            if (!token.sub) return token;

            const existingUser = await findUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.userRoleId;
            return token
          }
    },
    adapter:PrismaAdapter(prisma),
    session: {strategy:"jwt"},
    ...authConfig
});



