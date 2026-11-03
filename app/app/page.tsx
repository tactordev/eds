"use client";
import Cad from "./_components/cad";
import Call from "./_components/call";
import Scenes from "./_components/scenes";
import Units from "./_components/units";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifySession } from "@/lib/session";

const Map = dynamic(() => import("./_components/map"), {
    ssr: false
});

export default function App() {
    

    // frontend
    return (
        <div className="w-full h-full grid grid-cols-3 grid-rows-2">
            <Scenes /> <Call /> <Map /> <Units /> <Cad />
        </div>
    )
}