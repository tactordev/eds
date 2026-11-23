import { ChevronDown, Clock, Hash, IdCard, Info, ListSortDescending, ShieldUser, Users, UserSearch } from "lucide-react";
import Section from "./section";
import { RecordUnit } from "@/types/units";
import { title } from "@/lib/formatters";


interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
}

function Filter(
    {
        name,
        ...props
    }: FilterProps
) {
    return (
        <div className={`${props.className} flex flex-row w-full items-center justify-between px-2 py-1`} >
            { props.children ?? <></> }
            <div className="p-1 hover:bg-zinc-300/5 hover:cursor-pointer transition-colors duration-200 rounded-sm">
                <ChevronDown className="w-3.5 h-3.5 text-zinc-300" />
            </div>
        </div>
    )
}

function Separator() {
    return <div className="w-0 h-full border-r-1 border-zinc-300/10"></div>   
}


// callsigns, department, occupants
function FilterBar() {
    return (
        <div className="grid grid-cols-123 w-full py-0.5 rounded-md sticky top-2 bg-zinc-200/1 border-1 border-zinc-200/2 shadow-sm backdrop-blur-md">
            <Filter className="col-span-20" name="id">
                <IdCard className="w-3.5 h-3.5 text-zinc-300">
                    <title>Callsign</title>
                </IdCard>
            </Filter>
            <Separator />
            <Filter className="col-span-30" name="type">
                <ShieldUser className="w-4 h-4 text-zinc-300">
                    <title>Department</title>
                </ShieldUser>
            </Filter>
            <Separator />
            <Filter className="col-span-20" name="involved officers">
                <Users className="w-4 h-4 text-zinc-300">
                    <title>Occupants</title>
                </Users>
            </Filter>
            <Separator />
            <Filter className="col-span-50" name="time elapsed">
                <Info className="w-4 h-4 text-zinc-300">
                    <title>Status</title>
                </Info>
            </Filter>
        </div>
    )
}


const testData: RecordUnit[] = [
    {
        unitId: 1,
        callsign: "1L-4A1",
        department: "police",
        status: "On-scene at #1",
        occupants: 2,
        location: [0, 0]
    },
    {
        unitId: 2,
        callsign: "1T-211",
        department: "ambulance",
        status: "On-scene at #1",
        occupants: 2,
        location: [0, 0]
    },
    {
        unitId: 3,
        callsign: "4D-12",
        department: "fire",
        status:" On-scene at #1",
        occupants: 5,
        location: [0, 0]
    },
    {
        unitId: 4,
        callsign: "4D-8",
        department: "fire",
        status: "On standby",
        occupants: 4,
        location: [0, 0]
    }
]
function Record(
    {
        data
    }: {
        data: RecordUnit
    }
) {
    return (
        <div className="grid grid-cols-120 w-full pb-1.5 border-b-1 border-zinc-300/10 items-center p-0 m-0">
            <p className="text-zinc-300 px-2 col-span-20 font-mono tabular-nums">{ data.callsign }</p>
            <p className={`text-zinc-300 px-2 col-span-30 font-mono tabular-nums text-sm px-2 py-0.5 rounded-sm w-fit ${data.department === "police" ? "bg-blue-500/10" : data.department === "ambulance" ? "bg-white/10" : "bg-red-500/10" }`}>{ title(data.department) }</p>
            <p className="text-zinc-300 px-2 col-span-20 font-mono tabular-nums">{ data.occupants }</p>
            <p className="text-zinc-300/80 px-2 col-span-50 font-mono tabular-nums text-sm truncate">{ data.status }</p>
        </div>
    )
}

function RecordList(
    {
        data
    }: {
        data: RecordUnit[]
    }
) {
    return data.map((d, index) => <Record key={`unit_record_${index}`} data={d} />);
}

export default function Units(
    {
        data
    }: {
        data: RecordUnit[]
    }
) {
    return (
        <Section className="gap-2" title="Units">
            <FilterBar />
            <RecordList data={data} />
        </Section>
    )
}