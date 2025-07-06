import React from 'react'
import SignIn from './SignIn'
import { checkIsAuthenticated } from '~/server/auth/checkIsAuthenticated';
import { redirect } from 'next/navigation';

const page:React.FC =async () => {

  const isAuthenticated = await checkIsAuthenticated();
   if (isAuthenticated) {
    // If the user is already authenticated, redirect them to the home page
    redirect("/");
  }

  return (
    <SignIn/>
  )
}

export default page