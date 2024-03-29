"use client"

import { useRouter } from "next/navigation"

import { ReactNode } from "react"

type LoginButtonProps = {
    children:ReactNode,
    mode?:"modal" | "redirect",
    asChild?:boolean

}

export const  LoginButton =  ({ children,mode="redirect",asChild}:LoginButtonProps) => {
    const router = useRouter()
    const onClick = () => {
      console.log("clicked login")
        router.push("/auth/login")
    }
    if(mode === "modal") {
        return (<span>

          TODO: todo implementation
        </span>)
    }
  return (
    <span className="cursor-pointer" onClick={onClick}>
        {children}
    </span>
  )
}

