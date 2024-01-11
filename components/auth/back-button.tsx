"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

type backButtonProps = {
    label:string,
    href:string
}
export const BackButton = ({label,href}:backButtonProps) =>{
  return (
    <div>
        <Button variant={"link"} size={"sm"} asChild className="w-full font-normal">
            <Link href={href}>{label}</Link>
        </Button>
    </div>
  )
}

