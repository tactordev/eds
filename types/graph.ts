import graphFromOsm from 'graph-from-osm';

const generateGraph = async () => {
    const settings = {
        bbox: [], // geo rect
        highways: ["primary", "secondary", "tertiary", "residential"],
        timeout: 600000000, maxContentLength: 1500000000
    };

    const data = await graphFromOsm.getOsmData(settings);
    const graph = graphFromOsm.osmDataToGraph(data);

    return graph;
}