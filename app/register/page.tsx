"use client";
import Input from "@/components/input";
import InputButton from "@/components/button";
import {
  CircleUser,
  User,
  LockKeyhole,
  LoaderCircle
} from "lucide-react";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/actions";


export default function Register() {
  const [state, action, isPending] = useActionState(register, null);
  const router = useRouter();


  return (
    <main className="flex flex-col w-full h-full items-center justify-center">
      <div className="px-4 py-4 bg-zinc-200/5 rounded-md">
        <div className="flex flex-row gap-2 items-center mb-3">
          <CircleUser className="text-zinc-200/80 w-6 h-6" />
          <h1 className="text-2xl font-semibold text-zinc-200/80">Register</h1>
        </div>
        <form action={action} className="flex flex-col w-full h-full gap-2">
          <Input disabled={isPending} name="username" placeholder="Username">
            <User className="w-5 h-5 text-zinc-200/40" />
            <p className="text-base text-zinc-200/40">Username</p>
          </Input>
          <Input type="password" disabled={isPending} name="password" placeholder="Password">
            <LockKeyhole className="w-4 h-4 text-zinc-200/40" />
            <p className="text-base ml-1 mt-0.5 text-zinc-200/40">Password</p>
          </Input>
          <Input type="password" disabled={isPending} name="reppassword" placeholder="Password">
            <LockKeyhole className="w-4 h-4 text-zinc-200/40" />
            <p className="text-base ml-1 mt-0.5 text-zinc-200/40">Repeat Password</p>
          </Input>
          {state?.error && (
            <p className="flex flex-row w-full items-center justify-center text-xs text-red-400/80 text-pretty max-w-52 text-center">{state.error}</p>
          )}
          <InputButton className={`flex flex-row h-8 gap-2 justify-center items-center ${isPending ? "opacity-60" : ""}`}>
            { isPending ? <LoaderCircle className="w-4 h-4 text-zinc-300/80 animate-spin" />
              : <p className="text-sm text-zinc-300/60">Register</p>
            }
          </InputButton>
        </form>
      </div>
    </main>
  );
}
