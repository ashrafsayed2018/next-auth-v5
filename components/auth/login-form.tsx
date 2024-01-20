"use client"
import * as z from "zod";

import { useState, useTransition } from "react";
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas";
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

export const LoginForm = () => {

  const [isPending,startTransiton] = useTransition();

  const [error,setError] = useState<string|undefined>();
  const [success,setSuccess] = useState<string|undefined>();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })
  const submitLogin = (values: z.infer<typeof LoginSchema>) =>{
      setError("");
      setSuccess("");
       startTransiton(() => {
        Login(values).then(data => {
          setError(data.error)
          setSuccess(data.success);
        });
       })
  }
  return (
    <CardWrapper
    headerLabel='welcome back'
    backButtonLabel="Don't have an account"
    backButtonHref='/auth/register'
    showSocial
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                {...field}
                placeholder="type your email address"
                type="email"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
           ) }
           / >

          <FormField 
             control={form.control}
             name="password"
             render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                {...field}
                placeholder="type your password"
                type="password"
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
        className="w-full">Login</Button>

      </form>

    </Form>
    </CardWrapper>
  )
}

