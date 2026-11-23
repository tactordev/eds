import { CADLog } from "./cad"
import { Caller } from "./call";
import { Map } from "./map";
import { RecordScene } from "./scenes";
import { RecordUnit } from "./units";


export type Simulation = {
    map: Map,
    units: RecordUnit[],
    scenes: RecordScene[],
    calls: Caller[],
    cadLogs: CADLog[],
    secondsElapsed: number,
    sceneTimings: [number, RecordScene][]
};

