// @ts-ignore
import graphFromOsm from 'graph-from-osm';

// graph types
export type GraphEdge = Record<string, number>;
export type GraphT = Record<string, GraphEdge>;


// class initialisations
export class Graph {
    // adjacency dict for graph
    private adjacency: Record<string, Record<string, number>> = {};
    public node_count: number = 0; 

    constructor ( // initialise class
        adjacency: { GraphNode?: { GraphNode: number }},
    ) {
        this.adjacency = adjacency;
    };

    // add a new, disconnected node to the graph
    addNode(node_name: string) { 0
        // if it already exists
        if (Object.keys(this.adjacency).includes(node_name)) {
            return false;
        }

        this.adjacency.node_name = {};
        return true;
    };

    // add a new edge between two nodes
    addEdge(start: string, end: string, weight: number) {
        // if the start and end nodes don't exist
        if (!this.adjacency?.start || !this.adjacency?.end) { 
            return false;
        }

        this.adjacency.start.end = weight;
        return true;
    };
    
    // get neighbouring nodes
    getNeighbours(node_name: string) {
        return !(Object.keys(this.adjacency).includes(node_name)) ? null
            : Object.keys(this.adjacency.node_name);
    };

    getWeight(start: string, end: string) {
        // if the connection doesn't exist
        if (!this.adjacency?.start?.end) { 
            return null;
        }

        return this.adjacency.start.end;
    };

};


// class used for traversing a graph
export class GraphTraversal { 
    // storing heuristic: node_name, value
    private heuristics: Record<string, number> = {};
    
    // for temporarily storing the shortest path between two nodes
    private path_cache: Record<string, Record<string, number>> = {};
    
    private start_node: string | undefined = undefined;
    private end_node: string | undefined = undefined;
    private graph: Graph | undefined = undefined;
    
    // external factors
    private weather_impact: number = 0;
    private traffic_impact: number = 0;

    constructor ( // class initialiser
        start_node: string,
        end_node: string,
        graph: Graph,
        weather_impact: number,
        traffic_impact: number
    ) {
        this.start_node = start_node;
        this.end_node = end_node;
        this.graph = graph;
        this.weather_impact = weather_impact
        this.traffic_impact = traffic_impact
    };


    calculateHeuristics() {
        return
        // calculate heuristics based on manhattan distance
    };

    getPath(start: string, end: string) {
        return
        // calculate path from one node to another using a* implementation
    };

    // updating the effect of a factor
    updateEffect(type: string, value: number) {
        switch (type) {
            case "weather":
                this.weather_impact = value;
                break;
            case "traffic":
                this.traffic_impact = value;
                break;
            default: return false;
        }

        return true;
    };
};

/* from github repository

const mySettings = {                                         // Define my settings
  bbox: [4.3841, 50.8127, 4.3920, 50.8182],                          // Geographical rectangle
  highways: ["primary", "secondary", "tertiary", "residential"],     // Type of roads to consider
  timeout: 600000000, maxContentLength: 1500000000                   // OSM query parameters
}

const generateGraph = async (settings) => {
  const osmData = await graphFromOsm.getOsmData(settings);   // Import OSM raw data
  const graph = graphFromOsm.osmDataToGraph(osmData)         // Here is your graph
  console.log("Your graph contains " + graph.features.length + " nodes ans links.");
}

generateGraph(mySettings);                                   // Execution

*/

export const generateGraph = async (
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
    const gen = async (settings: any) => {
        const data = await graphFromOsm.getOsmData(settings);
        const graph = graphFromOsm.osmDataToGraph(data);

        return graph;
    }

    const result = gen(settings);
    return result;
}


