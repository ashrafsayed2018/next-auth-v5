"use server";
import * as z from "zod"
import { LoginSchema } from "@/schemas";
export const Login =async (values:z.infer<typeof LoginSchema>) => {
 
    const validate = LoginSchema.safeParse(values);

    if (validate.success) {

        return {success: "email sent successfully"}
    } else {

        return {error: "not valid email"}
    }
}