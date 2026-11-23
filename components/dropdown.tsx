"use client";
import { locations } from "@/types/map";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";


interface DropdownProps extends React.ComponentProps<'div'> {
    children?: React.ReactNode;
    hint: string;
    dropdownOptions: Record<string, string>;
    setValue: (val: string) => void;
}

export default function Dropdown(
    {
        hint,
        dropdownOptions,
        setValue,
        ...props
    }: DropdownProps
) {
    const [dropped, setDropped] = useState<boolean>(false);

    return (
        <div {...props} className="relative w-full bg-zinc-800/60 rounded-md px-2 py-1 transition-colors duration-200 hover:cursor-pointer hover:bg-zinc-700/60">
            <div className="flex flex-row w-full justify-between items-center" onClick={() => setDropped(!dropped)}>
                <p className="text-sm text-zinc-200/40">{
                    hint === "Select a city..." ? hint 
                    : locations[hint]
                }</p>
                <ChevronDown className="w-4 h-4 text-zinc-200/40" />
            </div>
            {
                dropped && <div className="absolute flex flex-col z-100 top-full left-0 mt-0.5 backdrop-blur-sm bg-zinc-800/60 rounded-md w-full">
                    {
                        Object.entries(dropdownOptions).map((entry, index) => {
                            const key = entry[0];
                            const item = entry[1];

                            return <p key={`city-select-${key}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setValue(key); setDropped(false); }} className="text-sm text-zinc-200/40 px-2 py-1 hover:text-zinc-200/80 hover:bg-zinc-200/30 rounded-sm">{item}</p>
                        })
                    }
                </div>
            }
        </div>
    )
}