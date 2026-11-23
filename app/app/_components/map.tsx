"use client";
import { useEffect, useRef } from "react";
import { Map as MapLibreMap, setWorkerUrl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Section from "./section";


export default function Map(
    {
        center
    }: {
        center: [number, number]
    }
) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<MapLibreMap | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
        
        const map = new MapLibreMap({
            container: containerRef.current,
            style: "https://tiles.openfreemap.org/styles/liberty",
            center: center,
            zoom: 14
        });

        mapRef.current = map;

        return () => map.remove();
    }, []);

    return <Section title="Map">
        <div
            ref={containerRef}
            className="h-full w-full rounded-md overflow-hidden"
        />
    </Section>
}