"use client";
import Input from "@/components/input";
import InputButton from "@/components/button";
import {
  CircleUser,
  User,
  LockKeyhole,
  LoaderCircle
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions";
import { verifySession } from "@/lib/session";


export default function Home() {
  const router = useRouter();

  const [state, action, isPending] = useActionState(login, null); // used for form submit 
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      // verifies session token/cookie that is stored in their browser cookies
      const checkSession = async () => {
          const res = await verifySession();
          
          if (res.status === 1) { // 1 means valid token
              router.push("/app");
          } else {
              setIsLoading(false);
          }
      };

      checkSession();
  });

  return (
    <main className="flex flex-col w-full h-full items-center justify-center">
      {
        isLoading ? <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center">
          <LoaderCircle className="w-4 h-4 text-zinc-300/80 animate-spin" /></div> 
        : <div className="px-4 py-4 bg-zinc-200/5 rounded-md">
          {/* title */}
          <div className="flex flex-row gap-2 items-center mb-3">
            <CircleUser className="text-zinc-200/80 w-6 h-6" />
            <h1 className="text-2xl font-semibold text-zinc-200/80">Login</h1>
          </div>

          {/* Input form */}
          <form action={action} className="flex flex-col w-full h-full gap-2">

            {/* Username field */}
            <Input disabled={isPending} name="username" placeholder="Username">
              <User className="w-5 h-5 text-zinc-200/40" />
              <p className="text-base text-zinc-200/40">Username</p>
            </Input>

            {/* Password field */}
            <Input type="password" disabled={isPending} name="password" placeholder="Password">
              <LockKeyhole className="w-4 h-4 text-zinc-200/40" />
              <p className="text-base ml-1 mt-0.5 text-zinc-200/40">Password</p>
            </Input>

            {/* State content e.g. for showing errors when logging in */}
            {state?.error && (
              <p className="flex flex-row w-full items-center justify-center text-sm text-red-400/80">{state.error}</p>
            )}

            {/* Login button */}
            <InputButton className={`flex flex-row h-8 gap-2 justify-center items-center ${isPending ? "opacity-60" : ""}`}>
              { isPending ? <LoaderCircle className="w-4 h-4 text-zinc-300/80 animate-spin" />
                : <p className="text-sm text-zinc-300/60">Login</p>
              }
            </InputButton>
            
            {/* Option to go to register form */}
            <p
              onClick={() => { router.push("/register"); }}
              className="text-xs text-zinc-200/40 ml-1 border-b border-zinc-200/40 w-fit hover:border-zinc-200/60 hover:text-zinc-200/60 cursor-pointer transition-colors duration-200"
            >
              Register
            </p>
          </form>
        </div>
      }
    </main>
  );
}
