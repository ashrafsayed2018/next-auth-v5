"use server";
import * as z from "zod"
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { findUserByEmail } from "@/data/user";
export const Register =async (values:z.infer<typeof RegisterSchema>) => {
 
    const validatedFields = RegisterSchema.safeParse(values);

    if (validatedFields.success) {
        const {name,email,password} = validatedFields.data;

       const hashedPassword = await bcrypt.hash(password,10);

       
    //    check if email already exists

    const existingEmail = await findUserByEmail(email)

     if (existingEmail) {
        return {error: "Email already exists"}
     }

     await db.user.create({
        data: {
            name,
            email,
            password:hashedPassword
        }
        });

        // TODO: set verification token email

        return {success: "email sent successfully"}

    } else {

        return {error: "not valid email"}
    }
}