"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/db/schema";
import { newSession, delSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
const tilerama = require("tilerama") as typeof import("tilerama");


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

// password requirements:
// min. 8 chars
// 1 capital char
// 1 special char
export async function register(prev: any, data: FormData) {
    // get form data
    // data fields: username, password, repeat-password
    const username = data.get("username") as string;
    const pwd = data.get("password") as string;
    const reppwd = data.get("reppassword") as string;
    
    // missing fields
    if (!username || !pwd || !reppwd) {
        console.log(username, pwd, reppwd);
        return { error: "Required field(s) were left blank." };
    }

    // pwd and repeated pwd don't match
    if (pwd !== reppwd) {
        return { error: "Passwords do not match." };
    }

    // password checks
    if (pwd.length < 8) {
        return { error: "Your password doesn't meet the password length requirement (> 8 chars)." };
    }

    // regex search
    if (!/[A-Z]/.test(pwd)) {
        return { error: "Your password doesn't meet the password requirements (at least 1 capital character)." };
    }

    if (!/[!£$%^&*()\-_=+{}\[\]:;@'~#<,>./?|\\¬`¦]/.test(pwd)) {
        return { error: "Your password doesn't meet the password requirements (at least 1 special character)." };
    }

    // user already has wanted username
    const [check_user] = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
    if (check_user) {
        return { error: "This username is not available." };
    }

    // attempt to fetch salt_rounds from .env
    let salt_rounds: number = 10;
    try {
        const temp = process.env.SALT_ROUNDS;
        salt_rounds = parseInt(temp!); // attempt to parse
    } catch (err) {
        // if not found, warn using the default value
        console.warn("Error passing salt rounds: ", err);
        return { error: "There was an error saving your account." };
    }
    
    // hash and insert pwd into db
    const hash = await bcrypt.hash(pwd, salt_rounds);
    const user = await db.insert(usersTable)
        .values({ username: username, passwordHash: hash })
        .returning();

    // gen new session
    await newSession(user[0].user_id);
    redirect("/app");
}

export async function osm_convert(location_name: string) {
    const graph = await tilerama.graph_from_pbf(`./data/${location_name}.osm.pbf`);
    const { nodes, edges } = tilerama.graph_to_geojson(graph);
    return { nodes, edges };
}

export async function logout() {
    await delSession();
    redirect("/");
};
