"use client"
import * as z from "zod";

import { useState, useTransition } from "react";
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {RegisterSchema } from "@/schemas";
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
import { Register } from "@/actions/register";

export const RegisterForm = () => {

  const [isPending,startTransiton] = useTransition();

  const [error,setError] = useState<string|undefined>();
  const [success,setSuccess] = useState<string|undefined>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name:"",
      email: '',
      password: '',
    }
  })
  const submitRegister = (values: z.infer<typeof RegisterSchema>) =>{
      setError("");
      setSuccess("");
       startTransiton(() => {
        Register(values).then(data => {
          setError(data.error)
          setSuccess(data.success);
        });
       })
  }
  return (
    <CardWrapper
    headerLabel='Create new Account'
    backButtonLabel="Already have an account"
    backButtonHref='/auth/login'
    showSocial
    >
    <Form {...form}>

      <form
      onSubmit={form.handleSubmit(submitRegister)}
      className="space-y-6"
       >

        <div className="space-y-4">

        <FormField 
             control={form.control}
             name="name"
             render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                {...field}
                placeholder="type your name"
                type="text"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
           ) }
           / >
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
        className="w-full">Create new account</Button>

      </form>

    </Form>
    </CardWrapper>
  )
}

