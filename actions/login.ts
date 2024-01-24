"use server";
import * as z from "zod"
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
export const Login =async (values:z.infer<typeof LoginSchema>) => {
 
    const validatedFields = LoginSchema.safeParse(values);

    if (validatedFields.success) {

        const {email, password} = validatedFields.data;

        try {

            await signIn("credentials", {
                email,
                password,
                redirectTo: DEFAULT_LOGIN_REDIRECT
            })
        } catch (err) {

            if (err instanceof AuthError) {

                switch (err.type) {

                    case "CredentialsSignin":
                        return {error : "invalid credentials"}

                    default:
                        return {error : "something went wrong"}
                }
            }

            throw err;

        }
     
    } else {

        return {error: "not valid email"}
    }
}