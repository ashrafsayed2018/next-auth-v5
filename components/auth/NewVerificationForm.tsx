"use client"
import {BeatLoader} from "react-spinners"
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"
import { CardWrapper } from "@/components/auth/card-wrapper"

import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { prisma } from "@/lib/prisma";
import { getVerificationTokenByToken } from "@/data/verification-token";

function NewVerificationForm() {

   const [error,setError]  =useState<string| undefined>()
   const [success,setSuccess]  =useState<string| undefined>()
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const onSubmit = useCallback(async() => {


      if (!token) {
       setError("token is required")
         return false;
      }

      
     const dbToken = await getVerificationTokenByToken(token);

     console.log(`browser token: ${token}`)
     console.log(`first token: ${dbToken}`)
     newVerification(token).then((data) => {
         setError(data.error);
         setSuccess(data.success);
       }).catch((error) => {
         setError(error.message);
       });
    }, [token])

    useEffect(() => {
      onSubmit();
    },[onSubmit])
  return (
     <CardWrapper
     headerLabel="تاكيد البريد الالكتروني"
     backButtonHref="/auth/login"
     backButtonLabel="تسجيل دخول" >
        <div className="w-full flex items-center justify-center">
            {!success && !error &&  (
               <BeatLoader/>
            )}
            {success &&<FormSuccess message="success" />}
            {error && <FormError message="error" />}
        </div>
     </CardWrapper>
  )
}

export default NewVerificationForm