"use client"

import { useRouter } from "next/navigation"

import { ReactNode } from "react"

type LoginButtonProps = {
    children:ReactNode,
    mode?:"modal" | "redirect",
    asChild?:boolean

}

function LoginButton({ children,mode="redirect",asChild}:LoginButtonProps) {
    const router = useRouter()
    const onClick = () => {
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

export default LoginButton