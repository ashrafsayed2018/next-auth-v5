import {prisma} from "@/lib/prisma"

export const getPasswordResetTokenByToken = (token: string) => {

    try {
       const passwordResetToken = prisma.passwordResetToken.findUnique({
        where: {token: token}
       });
       return passwordResetToken;
    } catch (error) {
        return null;
    }
}


export const getPasswordResetTokenByEmail = (email: string) => {

    try {
       const passwordResetToken = prisma.passwordResetToken.findFirst({
        where: {email}
       });
       return passwordResetToken;
    } catch (error) {
        return null;
    }
}