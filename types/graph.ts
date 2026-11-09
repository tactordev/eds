import graphFromOsm from 'graph-from-osm';

export type MapGraph = {
    
}

const generateGraph = async (
    {
        location
    }: {
        location: [number, number, number, number] // for defining the bounding box
    }
) => {
    const settings = {
        bbox: location, // geo rect
        highways: ["primary", "secondary", "tertiary", "residential"],
        timeout: 600000000, maxContentLength: 1500000000
    }; // setting / preset data

    // data & conversion
    const data = await graphFromOsm.getOsmData(settings);
    const graph = graphFromOsm.osmDataToGraph(data);

    return graph;
}


