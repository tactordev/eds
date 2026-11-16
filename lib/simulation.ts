import { Map } from "@/types/map";
import { Simulation } from "@/types/simulation";


// generate simulation object
export function generateSimulation(
    {
        map
    }: {
        map: Map
    }
) {
    // generate scenes & timings (NOT STARTED)

    // return actual simulation object
    return {
        map: map,
        units: [],
        scenes: [],
        cadLogs: [],
        secondsElapsed: 0,
        sceneTimings: []
    } as Simulation;
}