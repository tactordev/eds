"use server";

// import and initialise environment variables
import * as dotenv from "dotenv";
dotenv.config();

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// secret to encode session tokens <-- in .env
const session_secret = process.env.SESSION_SECRET;
const encoded_secret = new TextEncoder().encode(session_secret);

// generate new session token
export async function newSession(userId: string) {
    // generation
    const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await new SignJWT({ user_id: userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt(new Date(Date.now()))
        .setExpirationTime("7d")
        .sign(encoded_secret);

    // store it as a cookie
    const store = await cookies();
    store.set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiry,
        sameSite: "lax",
        path: "/"
    });
};


// on page load, check if the user has a valid, active session
// also check periodically whether the session token is correct
// redirect to login page if incorrect
export async function verifySession() {
    const store = await cookies();
    const token = store.get("session")?.value;

    if (!token) return { status: 0, error: "No session token found." };

    try {
        // verify token and extract payload
        const { payload } = await jwtVerify(token, encoded_secret, {
            algorithms: ["HS256"]
        });

        return { status: 1, userId: payload.userId as string };


    } catch (err) {
        // if token invalid/not found
        console.warn(err);
        return { status: 0, error: "Invalid session token."};
    }
}

export async function delSession() {
    const store = await cookies();
    store.delete("session");
};