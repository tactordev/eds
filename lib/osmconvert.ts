import { graph_from_pbf } from "tilerama";

export async function get_graph(location_name: string) {
    const graph = await graph_from_pbf(`../data/${location_name}.osm.pbf`);
    return graph;
}

// for getting geographical coordinates etc. for heuristics
// for (const node of graph.nodes()) {
//     const attributes = graph.getNodeAttributes(node);
// }



// for getting length & dist for pathfidning
// for (const edge of graph.outEdges(currentNode)) {
//     const attrs = graph_from_pbf.getEdgeAttributes(edge);
// }