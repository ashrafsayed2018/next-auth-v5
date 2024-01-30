"use server";

import { prisma } from "@/lib/prisma";
import { findUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token:string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {error: "Verification token not found"}
  }

  const hasExpired = new Date(existingToken.expires) < new Date()


  if (hasExpired) {

    return {error: " token has expired"};
  }

  const existingUserEmail = await findUserByEmail(existingToken.email);

  if (!existingUserEmail) {

    return {error: " email not found"}
  }
  await prisma.user.update({
    where: {id: existingUserEmail.id},
    data: {
        emailVerified: new Date(),
        email: existingToken.email
    }
  })
  
  await prisma.verificationToken.delete({
    where: {id: existingToken.id},
  })

  return {success : "email verified successfully"}
}
