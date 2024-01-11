import React from 'react'
import {CardWrapper} from '@/components/auth/card-wrapper'
import { Header } from '@/components/auth/header'

export const LoginForm = () => {
  return (
    <CardWrapper
    headerLabel='welcome back'
    backButtonLabel="Don't have an account"
    backButtonHref='/auth/register'
    showSocial
    >
    login form
    </CardWrapper>
  )
}

