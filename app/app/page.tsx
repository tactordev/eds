"use client";
import Cad from "./_components/cad";
import Call from "./_components/call";
import Scenes from "./_components/scenes";
import Units from "./_components/units";
import dynamic from "next/dynamic";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifySession } from "@/lib/session";
import { generateSimulation } from "@/lib/simulation";
import { Simulation } from "@/types/simulation";
import {
    LoaderCircle
} from "lucide-react";
import InputButton from "@/components/button";
import { Map } from "@/types/map";
import Input from "@/components/input";
import { generateGraph, Graph } from "@/types/graph";


const MapComponent = dynamic(() => import("./_components/map"), {
    ssr: false
});


const Content = (
    {
        simulation
    }: {
        simulation: Simulation
    }
) => {
    
    // frontend
    return (
        <div className="fixed top-0 left-0 w-screen h-screen grid grid-cols-3 grid-rows-2">
            <Scenes /> <Call /> <MapComponent /> <Units /> <Cad />
        </div>
    ) 
}

const SetupMenu = () => {
    // if in a current simulation
    const [isSim, setIsSim] = useState<boolean>(false); 

    // store the current simulation
    const [sim, setSim] = useState<Simulation | undefined>(undefined);

    // generate a new simulation
    const genSim = async (prev: any, data: FormData) => {
        // extract data
        let longitudeTl, longitudeBr, latitudeTl, latitudeBr = null;
        try {
            longitudeTl = parseFloat(data.get("longitude-tl") as string);
            longitudeBr = parseFloat(data.get("longitude-br") as string);
            latitudeTl = parseFloat(data.get("latitude-tl") as string);
            latitudeBr = parseFloat(data.get("latitude-br") as string);
        } catch (err) {
            return { error: "Bounding box values were not numbers." };
        }
        if (!longitudeTl || !longitudeBr || !latitudeBr || !latitudeTl) {
            return { error: "Missing required fields." };
        }

        // generate map info
        const map: Map = {
            id: 1,
            url: "https://github.com/tactordev/eds",
            unit_positions: [], 
            scene_positions: [],
            activeRoutes: [],
            graph: new Graph(
                await generateGraph({ location: [longitudeTl, latitudeTl, longitudeBr, latitudeBr] })
            )
        };

        // define simulation
        const simulation: Simulation = generateSimulation(
            { map: map }
        );

        // update state
        setSim(simulation);
        setIsSim(true);
    };

    // form information
    const [state, action, isPending] = useActionState(genSim, null);

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">
            { !isSim ? 
                <form action={action} className="bg-zinc-200/5 rounded-md px-4 py-4">
                    {/* Generate new simulation prompt */}

                    <p className="text-zinc-200/80 mb-2">
                        No Current Simulation found.
                    </p>


                    {/* Settings to define bounding box of the map */}
                    <h2 className="text-zinc-200/80 font-semibold mt-2">Settings</h2>
                    <p className="text-zinc-200/80 mb-2">Top left corner of map:</p>
                    <div className="flex flex-row gap-2 mb-4">
                        <Input disabled={isPending} name="longitude-tl">
                            <p className="text-zinc-200/70">Longitude</p>
                        </Input>

                        <Input disabled={isPending} name="latitude-tl">
                            <p className="text-zinc-200/70">Latitude</p>
                        </Input>
                    </div>

                    <p className="text-zinc-200/80 mb-2">Bottom right corner of map:</p>
                    <div className="flex flex-row gap-2 mb-4">
                        <Input disabled={isPending} name="longitude-br">
                            <p className="text-zinc-200/70">Longitude</p>
                        </Input>

                        <Input disabled={isPending} name="latitude-br">
                            <p className="text-zinc-200/70">Latitude</p>
                        </Input>
                    </div>


                    {/* Submit form */}
                    <InputButton className="flex flex-row justify-center">
                        {
                            !isPending ?
                                <p className="text-zinc-300/60">Generate Simulation</p>
                            : <LoaderCircle className="w-4 h-4 text-zinc-300/80 animate-spin" />
                        }
                    </InputButton>
                </form>
            : <Content simulation={sim!} /> }
        </div>
    )
}

export default function App() {
    // initialise router & loading state
    const router = useRouter(); 
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // verifies session token/cookie that is stored in their browser cookies
        const checkSession = async () => {

            const res = await verifySession();
            
            if (res.status === 0) { // 0 means invalid or missing
                router.push("/");
            } else {
                setIsLoading(false);
            }
        }

        const interval = setInterval( async () => {
            checkSession();
        }, 1000*60*5); // checks token/cookie every 5 minutes

        checkSession(); // check on page load

        return clearInterval(interval); // cleanup
    });

    return (
        <div>
            {
                isLoading ? <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center">
                    <LoaderCircle className="w-4 h-4 text-zinc-300/80 animate-spin" /></div> 
                : <SetupMenu />
            }
        </div>
    )
}