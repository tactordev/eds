import { ChevronDown, Clock, Hash, ListSortDescending, UserSearch } from "lucide-react";
import Section from "./section";
import { RecordScene } from "@/types/scenes";


interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    width?: string;
}

function Filter(
    {
        name,
        width,
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


// id, type (priority), involved officers, time elapsed
function FilterBar() {
    return (
        <div className="grid grid-cols-123 w-full py-0.5 rounded-md sticky top-2 bg-zinc-200/1 border-1 border-zinc-200/2 shadow-sm backdrop-blur-md">
            <Filter className="col-span-20" name="id">
                <Hash className="w-3.5 h-3.5 text-zinc-300">
                    <title>Scene ID</title>
                </Hash>
            </Filter>
            <Separator />
            <Filter className="col-span-20" name="type">
                <ListSortDescending className="w-4 h-4 text-zinc-300">
                    <title>Scene Type</title>
                </ListSortDescending>
            </Filter>
            <Separator />
            <Filter className="col-span-60" name="involved officers">
                <UserSearch className="w-4 h-4 text-zinc-300">
                    <title>Involved Units</title>
                </UserSearch>
            </Filter>
            <Separator />
            <Filter className="col-span-20" name="time elapsed">
                <Clock className="w-4 h-4 text-zinc-300">
                    <title>Elapsed Time</title>
                </Clock>
            </Filter>
        </div>
    )
}

function Record(
    {
        data
    }: {
        data: RecordScene
    }
) {
    return (
        <div className="grid grid-cols-120 w-full pb-1.5 border-b-1 border-zinc-300/10 items-center p-0 m-0">
            <p className="text-zinc-300 px-2 col-span-20 font-mono tabular-nums">{ data.sceneId }</p>
            <p className="text-zinc-300 px-2 col-span-20 font-mono tabular-nums">{ data.type }</p>
            <div className="flex flex-row px-2 col-span-60 gap-2 truncate">
                {
                    data.units.length > 0 ? data.units.map((u, i) => <p key={`scene_record_callsign_${data.sceneId}_${u.unitId}`} className={`text-zinc-300 text-sm font-mono tabular-nums px-2 py-0.5 rounded-md ${u.department === "police" ? "bg-blue-500/10" : u.department === "ambulance" ? "bg-white/10" : "bg-red-500/10" }`}>{u.callsign}</p>)
                    : <p className="font-mono text-zinc-300/80 text-sm px-2 col-span-60">No units attached.</p>
                }
            </div>
            <p className="text-zinc-300 px-2 col-span-20 font-mono tabular-nums truncate">{ data.startTime } seconds</p>
        </div>
    )
}

function RecordList(
    {
        data
    }: {
        data: RecordScene[]
    }
) {
    return data.map((d, index) => <Record key={`scene_record_${index}`} data={d} />);
}

export default function Scenes(
    {
        data
    }: {
        data: RecordScene[]
    }
) {
    return (
        <Section className="gap-2" title="Scenes">
            <FilterBar />
            <RecordList data={data} />
        </Section>
    )
}