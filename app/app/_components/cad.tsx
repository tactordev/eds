"use client";
import { useActionState, useState } from "react";
import Section from "./section";
import { CADLog, Form, SuspectFields, UnitFields, VehicleFields, VictimFields } from "@/types/cad";
import Input from "@/components/input";
import { title } from "@/lib/formatters";

function save() {
    return;
}

export default function Cad(
    {
        data
    }: {
        data: CADLog[]
    }
) {
    const [state, action, isSaving] = useActionState(save, undefined);
    const [curLog, setCurLog] = useState<number>(-1);

    return (
        <Section title="CAD">
            <div>
                {
                    data.map((c: CADLog, i: number) =>
                        <p onClick={() => setCurLog(c.logId)} key={`cad_log_selector_${i}`} className={`${curLog === c.logId ? "bg-zinc-200/5" : "bg-zinc-200/1" } border-1 border-zinc-200/2 shadow-sm backdrop-blur-md select-none font-mono tabular-nums px-4 py-0.5 text-sm rounded-sm transition-colors duration-200 hover:bg-zinc-200/3 hover:cursor-pointer w-fit`}>
                            { c.logId }
                        </p>
                    )
                }
            </div>

            <div className="gap-2 flex flex-col justify-center items-start mt-4">
                {
                    data.find((l: CADLog, i: number) => 
                        l.logId === curLog
                    )?.forms.map((f: Form, i: number) =>
                        <div key={`cad_log_${curLog}_forms_${i}`} className="bg-zinc-800/10 px-4 py-4 flex flex-row w-full flex-wrap gap-2">
                            <p className="flex w-full text-lg text-zinc-300/80">{title(f.formType)}</p>
                            {
                                Object.keys(f.fields).map((fi: string, i: number) =>
                                    <Input key={`cad_log_${curLog}_forms_${i}_field_${fi}`} disabled={isSaving} name={`field-${fi}`} defaultValue={f.fields[fi as keyof typeof f.fields] as string} placeholder={fi}>
                                        <p className="text-sm text-zinc-300/80">{title(fi, "camel")}</p>
                                    </Input>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </Section>
    )
}