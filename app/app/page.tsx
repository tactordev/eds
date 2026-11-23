"use client";
import Cad from "./_components/cad";
import Call from "./_components/call";
import Scenes from "./_components/scenes";
import Units from "./_components/units";
import dynamic from "next/dynamic";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { verifySession } from "@/lib/session";
import { generateSimulation } from "@/lib/simulation";
import { Simulation } from "@/types/simulation";
import {
    LoaderCircle
} from "lucide-react";
import InputButton from "@/components/button";
import { locationPathNames, Map } from "@/types/map";
import { Graph } from "@/types/graph";
import Dropdown from "@/components/dropdown";
import { locations } from "@/types/map";
import { osm_convert } from "@/lib/actions";

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
            <Scenes data={simulation.scenes} />
            <Call data={simulation.calls} />
            <MapComponent center={simulation.map.centre_coordinate} />
            <Units data={simulation.units} />
            <Cad data={simulation.cadLogs} />
        </div>
    ) 
}

const SetupMenu = () => {
    // if in a current simulation
    const [isSim, setIsSim] = useState<boolean>(false); 

    // store the current simulation
    const [sim, setSim] = useState<Simulation | undefined>(undefined);
    
    // selecting location
    const [location, setLocation] = useState<string>("Select a city...");

    // generate a new simulation
    const genSim = async (prev: any, data: FormData) => {
        // extract data
        if (location === "Select a city...") {
            return { error: "No location selected." };
        }

        const coordinates = [
            parseFloat(location.split(",")[1]),
            parseFloat(location.split(",")[0]),
        ];

        const graph = await osm_convert(locationPathNames[location]);
        console.log(graph);


        // generate map info
        const map: Map = {
            id: 1,
            url: "https://github.com/tactordev/eds",
            unit_positions: [], 
            scene_positions: [],
            activeRoutes: [],
            centre_coordinate: [coordinates[0], coordinates[1]],
            graph: new Graph(
                {}
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

                    <p className="text-sm text-zinc-200/80 mb-2">
                        No Current Simulation found.
                    </p>


                    {/* City dropdown select */}
                    <h2 className="text-zinc-200/80 font-semibold mt-2 mb-1">Select City</h2>
                    <Dropdown
                        hint={location}
                        dropdownOptions={
                            locations
                        }
                        setValue={setLocation}
                    />

                    {
                        state?.error && <p className="mt-2 text-sm text-red-500/80">{state.error}</p>
                    }
                    {/* Submit form */}
                    <InputButton className={`flex flex-row justify-center ${state?.error ? "mt-1" : "mt-3"}`}>
                        {
                            !isPending ?
                                <p className="text-zinc-300/60">Generate Simulation</p>
                            : <LoaderCircle className="w-4 h-4 text-zinc-300/80 animate-spin" />
                        }
                    </InputButton>
                    {
                        isPending && <p className="w-full text-center mt-0.5 text-xs text-zinc-200/40">This may take a while...</p>
                    }
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

        return () => clearInterval(interval); // cleanup
    }, []);

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