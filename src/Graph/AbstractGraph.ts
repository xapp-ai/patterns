/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable no-console */
import { Graph } from "./Graph";

/**
 * Abstract implementation of a graph.
 *
 * @see https://github.com/benoitvallon/computer-science-in-javascript/blob/master/data-structures-in-javascript/graph.es6.js
 *
 * @export
 * @class AbstractGraph
 * @implements {Graph}
 */
export class AbstractGraph implements Graph {
    public readonly vertices: string[];

    public readonly edges: { [vertex: string]: string[] };

    private numberOfEdges: number;

    constructor() {
        this.vertices = [];
        this.edges = {};
        this.numberOfEdges = 0;
    }

    addVertex(vertex: string) {
        this.vertices.push(vertex);
        this.edges[vertex] = [];
    }

    removeVertex(vertex: string) {
        const index = this.vertices.indexOf(vertex);
        if (index >= 0) {
            // if it exists
            this.vertices.splice(index, 1);
        }
        while (this.edges[vertex].length) {
            const adjacentVertex = this.edges[vertex].pop();
            this.removeEdge(adjacentVertex, vertex);
        }
    }

    addEdge(vertex1: string, vertex2: string) {
        if (!this.edges[vertex1] || !this.edges[vertex2]) {
            let nonExistentVertex = !this.edges[vertex1] ? vertex1 : "";
            if (!this.edges[vertex2]) {
                if (nonExistentVertex) {
                    nonExistentVertex += ` and ${vertex2} don't exist.`;
                } else {
                    nonExistentVertex = `${vertex2} doesn't exist.`;
                }
            }
            console.info(`Unable to add edge ${vertex1} -> ${vertex2}, ${nonExistentVertex}`);
            return;
        }
        // error condition checked and message printed,
        // add them.
        this.edges[vertex1].push(vertex2);
        // Add this makes it bi-directional
        // this.edges[vertex2].push(vertex1);
        this.numberOfEdges++;
    }

    removeEdge(vertex1: string, vertex2: string) {
        const index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
        const index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;
        if (index1 >= 0) {
            // it exists, remove it
            this.edges[vertex1].splice(index1, 1);
            this.numberOfEdges--;
        }
        if (index2 >= 0) {
            this.edges[vertex2].splice(index2, 1);
        }
    }

    size(): number {
        return this.vertices.length;
    }

    relations(): number {
        return this.numberOfEdges;
    }

    traverseDFS(vertex: string, callback: (vertex: string) => void) {
        if (this.vertices.indexOf(vertex) === -1) {
            return console.info("Vertex not found");
        }
        const visited: { [vertex: string]: boolean } = {};
        this._traverseDFS(vertex, visited, callback);
    }

    private _traverseDFS(vertex: string, visited: { [vertex: string]: boolean }, fn: (vertex: string) => void) {
        visited[vertex] = true;
        if (this.edges[vertex] !== undefined) {
            fn(vertex);
        }
        /* tslint:disable:prefer-for-of */
        for (let i = 0; i < this.edges[vertex].length; i++) {
            if (!visited[this.edges[vertex][i]]) {
                this._traverseDFS(this.edges[vertex][i], visited, fn);
            }
        }
        /* tslint:enable:prefer-for-of */
    }

    traverseBFS(vertex: string, callback: (vertex: string) => void) {
        if (this.vertices.indexOf(vertex) === -1) {
            return console.info("Vertex not found");
        }
        const queue = [];
        queue.push(vertex);
        const visited: { [vertex: string]: boolean } = {};
        visited[vertex] = true;

        while (queue.length) {
            vertex = queue.shift();
            callback(vertex);
            /* tslint:disable:prefer-for-of */
            for (let i = 0; i < this.edges[vertex].length; i++) {
                if (!visited[this.edges[vertex][i]]) {
                    visited[this.edges[vertex][i]] = true;
                    queue.push(this.edges[vertex][i]);
                }
            }
            /* tslint:enable:prefer-for-of */
        }
    }

    print() {
        console.log(
            this.vertices
                .map(function(vertex) {
                    return `${vertex} -> ${this.edges[vertex].join(", ")}`.trim();
                }, this)
                .join(" | ")
        );
    }
}
