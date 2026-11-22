import React, { RefObject } from "react";


interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    ref?: RefObject<HTMLDivElement | null>;
}

export default function Section(
    {
        title,
        ref,
        ...props
    }: SectionProps
) {
    return (
        <div ref={ref} className={`${props.className} row-span-1 col-span-1 flex flex-col px-4 py-2 bg-zinc-800/5 border-1 first:border-l-4 [&:nth-child(4)]:border-l-4 border-zinc-100/2.5`}>
            <h1 className="text-zinc-300 font-semibold text-lg">{title}</h1>
            {
                props.children ?? <></>
            }
        </div>
    )
}