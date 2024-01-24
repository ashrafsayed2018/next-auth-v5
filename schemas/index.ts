import * as z from "zod";
export const LoginSchema = z.object({
    email:z.string().email({
        message: "البريد الالكتروني مطلوب",
    }),
    password:z.string().min(1, {
        message: "كلمة المرور مطلوبه",
    }),
});


export const RegisterSchema = z.object({
    name:z.string().min(1, {
        message: "الاسم مطلوب",
    }),
    email:z.string().email({
        message: "البريد الالكتروني مطلوب",
    }),
    password:z.string().min(6, {
        message: "اقل عدد حروف هو 6 حروف",
    }),
});