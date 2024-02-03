import {v4 as uuidv4} from "uuid";
import { getVerificationTokenByEmail
 } from "./verification-token";
import { prisma } from "@/lib/prisma";
import { getPasswordResetTokenByEmail } from "./password-reset";

export const generateVerificationToken = async (email: string) =>{
  const  token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail
(email);

  if(existingToken) {

    await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }

    const verificationToken = prisma.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });

 return verificationToken;
}


export const generatePasswordResetToken = async (email: string) => {
  const  token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);


  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
       
    await prisma.passwordResetToken.delete({
      where: {
          id: existingToken.id,
      }
  })
}

    // Create a new password reset token
    const passwordResetToken = await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires
      }
    });
  
    return passwordResetToken;
  
  

}