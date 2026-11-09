import { CADLog } from "./cad"
import { RecordScene } from "./scenes";
import { RecordUnit } from "./units";


export type Simulation {
    map: Map,
    units: RecordUnit[],
    scenes: RecordScene[],
    cadLogs: CADLog[],
    secondsElapsed: number,
    sceneTimings: [number, RecordScene][]
};

