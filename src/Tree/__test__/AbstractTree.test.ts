/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as SinonChai from "sinon-chai";
import { AbstractTree } from "../AbstractTree";

chai.use(SinonChai);
const expect = chai.expect;

// Test Assets
interface Data {
    name: string;
}
class TestTree extends AbstractTree<Data> { }

const dataRoot: Data = { name: "root" };
const data0: Data = { name: "data0" };
const data1: Data = { name: "data1" };
const data2: Data = { name: "data2" };
const data3: Data = { name: "data3" };
const data4: Data = { name: "data4" };
const data5: Data = { name: "data5" };

describe("AbstractTree", () => {
    describe("#constructor()", () => {
        it("sets the root node", () => {
            const treeNoRoot = new TestTree();
            expect(treeNoRoot.root).to.be.undefined;
            const treeRoot = new TestTree({ data: dataRoot, children: [] });
            expect(treeRoot.root.data).to.equal(dataRoot);
        });
    });
    describe("#find()", () => {
        let tree: TestTree;
        beforeEach(() => {
            tree = new TestTree({ data: dataRoot, children: [] });
        });
        it("finds the root", () => {
            expect(tree.find(dataRoot).data).to.equal(dataRoot);
        });
        it("finds a child on a node", () => {
            tree.add(data0, dataRoot);
            tree.add(data1, data0);
            const node = tree.find(data1);
            expect(node.data).to.equal(data1);
        });
    });
    describe("#add()", () => {
        let tree: TestTree;
        beforeEach(() => {
            tree = new TestTree({ data: dataRoot, children: [] });
        });
        it("adds the data as a child to the supplied root data node", () => {
            tree.add(data0, dataRoot);
            expect(tree.root.children).to.have.length(1);
            expect(tree.root.children[0].data).to.equal(data0);
        });
        it("adds data as a child to an existing child node", () => {
            tree.add(data0, dataRoot);
            tree.add(data1, data0);
            tree.add(data2, data1);
        });
        it("throws an Error when the second paramter isn't passed and a root exists", () => {
            expect(tree.add.bind(tree, data0)).to.throw();
        });
        describe("without root", () => {
            beforeEach(() => {
                tree = new TestTree();
            });
            it("sets the root", () => {
                tree.add(data2);
                expect(tree.root).to.exist;
                expect(tree.root.data).to.equal(data2);
            });
        });
    });
    describe("traversals", () => {
        let tree: TestTree;
        let spy: sinon.SinonSpy;
        beforeEach(() => {
            tree = new TestTree({ data: dataRoot, children: [] });
            tree.add(data0, dataRoot);
            tree.add(data1, data0);
            tree.add(data2, data1);

            tree.add(data3, data0);
            tree.add(data4, data0);

            tree.add(data5, dataRoot);

            // this creates
            // root
            //  |- data0
            //  |   |- data1
            //  |   |  |- data2
            //  |   |- data3
            //  |   |- data4
            //  |- data5

            spy = sinon.spy();
        });
        describe("#traverseBFS()", () => {
            it("traverses the correct order", () => {
                tree.traverseBFS(spy);
                /* tslint:disable:no-magic-numbers */
                expect(spy).to.have.callCount(7);
                /* tslint:enable:no-magic-numbers */
                expect(spy.args[2][0].data).to.equal(data5);
            });
        });
        describe("#traverseDFS()", () => {
            it("traverses the correct order", () => {
                tree.traverseDFS(spy);
                /* tslint:disable:no-magic-numbers */
                expect(spy).to.have.callCount(7);
                /* tslint:enable:no-magic-numbers */
                expect(spy.args[2][0].data).to.equal(data1);
            });
        });
        describe("print()", () => {
            it("prints the tree", () => {
                tree.print(data => {
                    return data.name;
                });
            });
            describe("when passed a newline callback", () => {
                let lineSpy: sinon.SinonSpy;
                beforeEach(() => {
                    lineSpy = sinon.spy();
                });
                it("prints the tree", () => {
                    tree.print(
                        data => {
                            return data.name;
                        },
                        () => {
                            lineSpy();
                        }
                    );
                    /* tslint:disable:no-magic-numbers */
                    expect(lineSpy).to.have.callCount(7);
                    /* tslint:enable:no-magic-numbers */
                });
            });
        });
    });
});
