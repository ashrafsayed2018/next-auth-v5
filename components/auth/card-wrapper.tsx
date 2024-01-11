"use client"

import { ReactNode } from "react"
import { Card ,CardHeader,CardContent,CardFooter} from "../ui/card"
import { Header } from "@/components/auth/header"
import { Social } from "@/components/auth/social"
import { BackButton } from "@/components/auth/back-button"

type CardWrapperType = {
    children:ReactNode,
    headerLabel:string,
    backButtonLabel:string,
    backButtonHref:string,
    showSocial?:boolean
}
export const  CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}:CardWrapperType) => {
  return (
    <Card className="w-[400px] shadow-md">
        <CardHeader>
            <Header label="Login"></Header>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocial && 
        <CardFooter>
            <Social />
        </CardFooter>
        }
        <CardFooter>
            <BackButton
            label={backButtonLabel}
            href={backButtonHref} />
        </CardFooter>
    </Card>
  )
}

