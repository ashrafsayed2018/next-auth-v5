"use server";
import * as z from "zod"
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schemas";
import { prisma } from "@/lib/prisma";
import { findUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/data/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const Register =async (values:z.infer<typeof RegisterSchema>) => {
 
    const validatedFields = RegisterSchema.safeParse(values);

    if (validatedFields.success) {

        const {name,email,password} = validatedFields.data;

        const hashedPassword = await bcrypt.hash(password,10);

       
        // check if email already exists

        const existingEmail = await findUserByEmail(email)

        if (existingEmail) {
        return {error: "البريد الالكتروني موجود"}
        }

        await prisma.user.create({
            data: {
                name,
                email,
                password:hashedPassword
            }
        });

        const verificationToken = await generateVerificationToken(email)

     

        // TODO: set verification token email


        await sendVerificationEmail(verificationToken.email, verificationToken.token)


        return {success: "تم  تاكيد التسجيل بالايميل"}

    } else {

        return {error: "بريد غير صالح"}
    }
}