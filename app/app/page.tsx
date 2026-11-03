"use client";
import Cad from "./_components/cad";
import Call from "./_components/call";
import Scenes from "./_components/scenes";
import Units from "./_components/units";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifySession } from "@/lib/session";
import {
    LoaderCircle
} from "lucide-react";


const Map = dynamic(() => import("./_components/map"), {
    ssr: false
});


const Content = () => {
    // frontend
    return (
        <div className="w-full h-full grid grid-cols-3 grid-rows-2">
            <Scenes /> <Call /> <Map /> <Units /> <Cad />
        </div>
    ) 
}

export default function App() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    

    useEffect(() => {
        const checkSession = async () => {
            const res = await verifySession();
            console.log(res);
            if (res.status === 0) { router.push("/"); } else { setIsLoading(false); }
        }

        const interval = setInterval( async () => {
            checkSession();
        }, 1000*60*5);


        checkSession();

        return clearInterval(interval);
    })

    return (
        <div>
            {
                isLoading ? <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center"><LoaderCircle className="w-4 h-4 text-zinc-300/80 animate-spin" /></div> : <Content />
            }
        </div>
    )
}