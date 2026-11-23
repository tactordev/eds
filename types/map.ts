import { RecordScene } from "./scenes"
import { RecordUnit } from "./units"
import { Graph } from "./graph";


export type Map = {
    id: number,
    url: string,
    unit_positions: [RecordUnit, number][],
    scene_positions: [RecordScene, number][],
    activeRoutes: [RecordUnit, number][],
    centre_coordinate: [number, number];
    graph: Graph
}


// "long,lat": "name,identifier"
export const locations: Record<string, string> = {
    "42.37,-71.10": "Cambridge, ME",
    "37.13,-84.08": "London, KY",
    "51.51,-0.13": "London, UK",
    "52.21,0.12": "Cambridge, UK"
};