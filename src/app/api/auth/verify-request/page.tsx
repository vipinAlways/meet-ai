//TODO:compelete the route and the profile page too 
import React from "react";
import { FcGoogle } from "react-icons/fc";

const page = () => {
  return (
    <div className="flex h-full w-full items-center justify-center text-xl sm:text-3xl">
      <h1 className="flex items-center justify-center flex-col gap-4 shadow-md  p-5 rounded-lg transition-colors h-96 ">
        {" "}
        click here Check the Authentication Mail{" "}
        <a
          href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
          className="flex items-center gap-4 rounded-md bg-blue-500 px-4 py-2 text-zinc-200 outline-0 transition-all duration-150 ease-out hover:bg-blue-600"
        >
          <FcGoogle /> Mail
        </a>{" "}
      </h1>
    </div>
  );
};

export default page;
