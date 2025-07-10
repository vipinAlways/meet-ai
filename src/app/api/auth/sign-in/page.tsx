import React from "react";
import SignIn from "./SignIn";
import { checkIsAuthenticated } from "~/server/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";

const page: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    redirect("/");
  }

  return(
    <div className="flex items-center justify-center w-full min-h-screen">
       <SignIn />
    </div>
  );
};

export default page;
  