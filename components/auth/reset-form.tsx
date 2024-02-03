"use client"
import * as z from "zod";
import { useState, useTransition } from "react";
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetPasswordSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {CardWrapper} from '@/components/auth/card-wrapper'
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Login } from "@/actions/login";
import { ResetPassword } from "@/actions/reset-password";

export const ResetForm = () => {

  const [isPending,startTransition] = useTransition();

  const [error,setError] = useState<string|undefined>();
  const [success,setSuccess] = useState<string|undefined>();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: ''
    }
  })
  const submitLogin = (values: z.infer<typeof ResetPasswordSchema>) =>{
      setError("");
      setSuccess("");
      startTransition(() => {
        ResetPassword(values).then(data => {
          setError(data!.error)
          setSuccess(data!.success);
        });
       })
  }
  return (
    <CardWrapper
    headerLabel='نسيت كلمة المرور'
    backButtonLabel="العودة لصفحة الدخول"
    backButtonHref='/auth/login'
    >
    <Form {...form}>

      <form
      onSubmit={form.handleSubmit(submitLogin)}
      className="space-y-6"
       >

        <div className="space-y-4">
           <FormField 
             control={form.control}
             name="email"
             render={({field}) => (
            <FormItem>
              <FormLabel>البريد الالكتروني</FormLabel>
              <FormControl>
                <Input
                {...field}
                placeholder="اكتب بريدك الالكتروني"
                type="email"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
           ) }
           / >

        
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button 
        type="submit" 
        disabled={isPending}
        className="w-full">ارسل اعادة تعيين كلمة المرور للبريد الالكتروني</Button>

      </form>

    </Form>
    </CardWrapper>
  )
}

