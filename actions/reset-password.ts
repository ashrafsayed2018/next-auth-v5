"use server"

import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas";
import { findUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/data/tokens";



export const ResetPassword = async (values:z.infer<typeof ResetPasswordSchema>) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
       return {error: "بريد الكتروني غير صحيح"}
  }

  const {email} = validatedFields.data;

  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
       return {error: "لا يوجد بريد الكتروني"}
  }


    //   TODO: generate token and send email notification

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
  return {success: "تم ارسال رساله بالبريد الالكتروني"}


}
