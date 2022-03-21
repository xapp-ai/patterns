/*! Copyright (c) 2019, XAPPmedia */
export interface Graph {
    vertices: string[];
    addVertex(vertex: string): void;
    removeVertex(vertex: string): void;
    edges: { [vertex: string]: string[] };
    addEdge(vertex1: string, vertex2: string): void;
    removeEdge(vertex1: string, vertex2: string): void;
}
