"use client";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { api } from "~/trpc/react";

interface SignInProps {
  email: string;
  disable: boolean;
}

const SignIn = () => {
  const [authProp, setAuthProp] = useState<SignInProps>({
    email: "",
    disable: false,
  });

  const userQuery = api.user.existingUser.useQuery(
    { email: authProp.email },
    {
      enabled: !!authProp.email && authProp.email.includes("@"),
    }
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!authProp.email.includes("@")) {
        alert("Please enter a valid email");
        return;
      }

      const isExistingUser = userQuery.data;

      signIn("nodemailer", {
        email: authProp.email,
        callbackUrl: isExistingUser ? "/" : "/profile",
      });

      setAuthProp((prev) => ({ ...prev, disable: true }));
    },
    [authProp.email, userQuery.data]
  );

  return (
    <div className="flex items-center justify-center flex-col p-2 h-96">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 rounded-lg p-8 text-lg shadow-md transition-colors sm:text-xl"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-md border p-2 focus:border-blue-500 focus:outline-none"
            id="email"
            type="email"
            placeholder="Email"
            value={authProp.email}
            onChange={(e) =>
              setAuthProp((prev) => ({ ...prev, email: e.target.value }))
            }
            disabled={authProp.disable}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-zinc-100"
          disabled={authProp.disable}
        >
          Sign In
        </button>
      </form>
      <div className="text-center">Or</div>
      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/" });
        }}
        className="mt-4 flex items-center justify-center rounded-md bg-blue-600 p-2 text-lg text-white shadow-md transition-colors hover:bg-blue-500 sm:text-xl"
      >
        Sign in with Google <FcGoogle />
      </button>
    </div>
  );
};

export default SignIn;