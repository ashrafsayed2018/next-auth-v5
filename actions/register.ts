"use server";
import * as z from "zod"
import { RegisterSchema } from "@/schemas";
export const Register =async (values:z.infer<typeof RegisterSchema>) => {
 
    const validate = RegisterSchema.safeParse(values);

    if (validate.success) {

        return {success: "email sent successfully"}
    } else {

        return {error: "not valid email"}
    }
}