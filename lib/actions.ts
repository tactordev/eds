"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/db/schema";
import { newSession, delSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";


export async function login(prev: any, data: FormData) {
    // extract form data
    const username = data.get("username") as string;
    const pwd = data.get("password") as string;

    // if either of the fields is missing, return error
    if (!username || !pwd) return { error: "Required fields were left blank." };

    // fetch user information from the database
    const [user] = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);

    if (!user) return { error: "Invalid credentials" }; 

    // compare the stored hashed password with the submitted pwd
    const passwordMatch = await bcrypt.compare(pwd, user.passwordHash);
    if (!passwordMatch) return { error: "Invalid credentials." };

    // generate a new session if all credentials match
    await newSession(user.user_id);
    redirect("/app");
};


export async function logout() {
    await delSession();
    redirect("/");
};
