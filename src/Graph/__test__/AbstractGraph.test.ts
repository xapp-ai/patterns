/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import * as chai from "chai";
import * as sinon from "sinon";
import * as SinonChai from "sinon-chai";
import { AbstractGraph } from "../AbstractGraph";

chai.use(SinonChai);
const expect = chai.expect;

// Just for testing
class StringGraph extends AbstractGraph {}

describe("AbstractGraph", () => {
    let graph: StringGraph;
    beforeEach(() => {
        graph = new StringGraph();
        graph.addVertex("1");
        graph.addVertex("2");
        graph.addVertex("3");
        graph.addVertex("4");
        graph.addVertex("5");
        graph.addVertex("6");
        graph.addEdge("1", "2");
        graph.addEdge("1", "5");
        graph.addEdge("2", "3");
        graph.addEdge("2", "5");
        graph.addEdge("3", "4");
        graph.addEdge("4", "5");
        graph.addEdge("4", "6");
    });
    describe("#size()", () => {
        it("returns the correct size", () => {
            expect(graph.size()).to.equal(6);
        });
    });
    describe("#relations()", () => {
        it("returns the correct size", () => {
            expect(graph.relations()).to.equal(7);
        });
    });
    describe("#print()", () => {
        it("prints the graph", () => {
            graph.print();
            // 1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4
        });
    });
    describe("#traverseDFS()", () => {
        let spy: sinon.SinonSpy;
        beforeEach(() => {
            spy = sinon.spy();
        });
        it("traverses in the correct order", () => {
            graph.traverseDFS("1", spy);
            // => 1 2 3 4 5 6
            expect(spy).to.have.callCount(6);
            expect(spy.args[0][0]).to.equal("1");
            expect(spy.args[1][0]).to.equal("2");
            expect(spy.args[2][0]).to.equal("3");
            expect(spy.args[3][0]).to.equal("4");
            expect(spy.args[4][0]).to.equal("5");
            expect(spy.args[5][0]).to.equal("6");
        });
    });
});

// ~indexOf - if found is true, not found is false
