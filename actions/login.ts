"use server";
import * as z from "zod"
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { findUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/data/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bycrpt from "bcryptjs"
export const Login =async (values:z.infer<typeof LoginSchema>) => {
 
    const validatedFields = LoginSchema.safeParse(values);

    if (validatedFields.success) {

        const {email, password} = validatedFields.data;


        const existingUser = await findUserByEmail(email);
        const passwordMatch = await bycrpt.compare(password, existingUser?.password!);
        if (!existingUser || !existingUser!.email || !passwordMatch) {

            return {error: 'بريد الكتروني او كلمة مرور غير صحيحه'}
        }

        if(!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email)

            // TODO: set verification token email


            await sendVerificationEmail(verificationToken.email, verificationToken.token)

            return {success: 'تم ارسال تاكيد للبريد الالكتروني'};
        }

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
                        return {error : "بيانات الدخول غير صالحه"}

                    default:
                        return {error : "حدث خطاء ما"}
                }
            }

            throw err;

        }
     
    } else {

        return {error: "بريد الكتروني غير صحيح"}
    }
}