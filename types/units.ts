

export type UnitType = "police" | "ambulance" | "fire";

export interface RecordUnit {
    unitId: number;
    callsign: string;
    department: UnitType;
    occupants: number;
    status: string;
    location: number[]
}

