"use client";
import { useEffect, useState } from "react";
import Section from "./section";
import { Caller } from "@/types/call";

export default function Call(
    {
        data
    }: {
        data: Caller[]
    }
) {
    const calls: Caller[] = data;
    const [curCaller, setCurCaller] = useState<number>((() => {
        if (calls.length > 0) {
            return calls[0].callerId;
        }

        return -1;
    }));

    return (
        <Section title="Call" className="row-span-2">
            <div className="flex flex-row gap-1">
                {
                    calls.map((c: Caller, i: number) =>
                        <p onClick={() => setCurCaller(c.callerId)} key={`caller_selector_${i}`} className={`${curCaller === c.callerId ? "bg-zinc-200/5" : "bg-zinc-200/1" } border-1 border-zinc-200/2 shadow-sm backdrop-blur-md select-none font-mono tabular-nums px-4 py-0.5 text-sm rounded-sm transition-colors duration-200 hover:bg-zinc-200/3 hover:cursor-pointer`}>
                            { c.callerId }
                        </p>
                    )
                }
            </div>
            {
                curCaller === -1 ? <p className="mt-1 text-zinc-300 text-sm">No calls found.</p>
                :   <div className="flex flex-col w-full h-full justify-between">
                        <div className="flex flex-col gap-2 mt-4 w-full">
                            {
                                (() => {
                                    const call = calls.find((c) => c.callerId === curCaller);

                                    return call && call.transcript.length > 0 ? (
                                        call.transcript.map((t, i) => <p key={`caller_message_${i}`} className={`${t.agent === "operator" ? "bg-blue-800/5 self-end" : "bg-zinc-200/3 self-start" } max-w-96 w-fit h-fit px-4 py-1.5 border-1 border-zinc-200/2 shadow-sm rounded-sm text-sm text-zinc-300/90 select-none`}>{t.value}</p>)
                                    ) : (
                                        <p className="mt-2 w-full flex flex-row justify-center text-zinc-300/80 text-sm">No messages yet</p>
                                    )
                                })()
                            }  
                        </div>

                        <div className="flex flex-row flex-wrap gap-2 py-2 px-4 my-2 mx-1 bg-zinc-200/1 border-1 border-zinc-200/2 shadow-sm backdrop-blur-md rounded-sm">
                            {
                                (() => {
                                    const call = calls.find((c) => c.callerId === curCaller);

                                    return call && call.responses.length > 0 ? (
                                        call.responses.map((r, i) => <p key={`caller_response_${i}`} className="flex flex-wrap w-fit h-fit px-4 py-1.5 bg-zinc-200/3 border-1 border-zinc-200/2 shadow-sm rounded-sm text-sm text-zinc-300/80 select-none hover:cursor-pointer hover:bg-zinc-200/5 hover:text-white/90 transition-colors duration-200">{r}</p>)
                                    ) : (
                                        <p className="text-sm text-zinc-300/60 select-none">No responses found.</p>
                                    )
                                })()
                            }
                        </div>
                    </div>
            }
        </Section>
    );
}