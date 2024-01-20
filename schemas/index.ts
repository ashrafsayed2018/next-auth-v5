import * as z from "zod";
export const LoginSchema = z.object({
    email:z.string().email({
        message: "email is required",
    }),
    password:z.string().min(1, {
        message: "password is required",
    }),
});


export const RegisterSchema = z.object({
    name:z.string().min(1, {
        message: "name is required",
    }),
    email:z.string().email({
        message: "email is required",
    }),
    password:z.string().min(6, {
        message: "minimum password character is 6",
    }),
});