import { db } from "@/lib/db";

export const findUserByEmail = async (email: string) => {
 try {

    const user = await db.user.findFirst({
        where: {
            email
        }
    })
    return user;
} catch (err) {
    return null;
}
}


export const findUserById = async (id: string) => {
    try {
   
       const user = await db.user.findFirst({
           where: {
               id
           }
       })
       return user;
   } catch (err) {
       return null;
   }
   }