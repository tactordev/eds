import { RecordScene } from "./scenes"
import { RecordUnit } from "./units"



export type Map {
    id: number,
    url: string,
    unit_positions: [RecordUnit, number][],
    scene_positions: [RecordScene, number][],
    activeRoutes: [RecordUnit, number]
}