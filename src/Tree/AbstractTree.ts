/*! Copyright (c) 2019, XAPPmedia */
import { Node } from "./Node";
import { Tree } from "./Tree";

/**
 * Simple abstract tree.
 *
 * @see https://github.com/benoitvallon/computer-science-in-javascript/blob/master/data-structures-in-javascript/node.es6.js
 *
 * @export
 * @abstract
 * @class AbstractTree
 * @implements {Tree<D>}
 * @template D
 */
export abstract class AbstractTree<D extends object> implements Tree<D> {
    /**
     * The root of the tree
     *
     * @readonly
     * @type {Node<D>}
     * @memberof AbstractTree
     */
    get root(): Node<D> {
        return this._root;
    }
    protected _root: Node<D>;

    constructor(root?: Node<D>) {
        this._root = root;
    }
    /**
     * Add data to the tree
     *
     * If a root doesn't exist and only the first parameter is passed,
     * it will be set as root.
     *
     * @param {D} data Data to be added to the tree
     * @param {D} toNode
     * @memberof AbstractTree
     */
    add(data: D, toNode?: D) {
        const node: Node<D> = { data, children: [] };
        const parent = toNode ? this.find(toNode) : undefined;
        if (parent) {
            parent.children.push(node);
        } else {
            if (!this.root) {
                this._root = node;
            } else {
                throw new Error("Root node is already assigned");
            }
        }
    }
    /**
     * Find the data in the node.
     *
     * Leverages breadth first search (BFS) method.
     *
     * @param {D} data
     * @returns {Node<D>}
     * @memberof AbstractTree
     */
    find(data: D): Node<D> {
        const queue: Node<D>[] = [this.root];

        while (queue.length) {
            const node = queue.shift();
            if (node.data === data) {
                return node;
            }
            for (const child of node.children) {
                queue.push(child);
            }
        }
        return undefined;
    }

    private _preOrder(node: Node<D>, fn?: (node: Node<D>) => void) {
        if (node) {
            if (fn) {
                fn(node);
            }
            for (const child of node.children) {
                this._preOrder(child, fn);
            }
        }
    }

    private _postOrder(node: Node<D>, fn?: (node: Node<D>) => void) {
        if (node) {
            for (const child of node.children) {
                this._postOrder(child, fn);
            }
            if (fn) {
                fn(node);
            }
        }
    }

    traverseDFS(fn: (node: Node<D>) => void, method?: "preOrder" | "postOrder") {
        const current = this.root;
        if (method === "postOrder") {
            this._postOrder(current, fn);
        } else {
            this._preOrder(current, fn);
        }
    }

    traverseBFS(fn?: (node: Node<D>) => void) {
        const queue = [this.root];
        while (queue.length) {
            const node = queue.shift();
            if (fn) {
                fn(node);
            }
            for (const child of node.children) {
                queue.push(child);
            }
        }
    }

    /**
     * Recursive method to print the tree to the console
     *
     * @see https://github.com/alex-e-leon/print-tree/blob/master/index.js
     *
     * @private
     * @param {Node<D>} node
     * @param {string} current
     * @param {(data: D, branch?: string) => string} convertToString
     * @memberof AbstractTree
     */
    private _printNode(
        node: Node<D>,
        current: string,
        convertToString: (data: D, branch?: string) => string,
        printLine?: (line: string) => void
    ) {
        const isGraphHead = current.length === 0;
        const children = node.children || [];

        let branchHead = "";

        if (!isGraphHead) {
            branchHead = children && children.length !== 0 ? "┬ " : "─ ";
        }

        const toPrint = convertToString(node.data, `${current}${branchHead}`);

        if (typeof toPrint === "string") {
            const line = `${current}${branchHead}${toPrint}`;
            if (printLine) {
                printLine(line);
            } else {
                console.log(line);  
            }
        }

        let baseBranch = current;

        if (!isGraphHead) {
            const REMOVE = -2;
            const isChildOfLastBranch = current.slice(REMOVE) === "└─";
            baseBranch = current.slice(0, REMOVE) + (isChildOfLastBranch ? "  " : "| ");
        }

        const nextBranch = baseBranch + "├─";
        const lastBranch = baseBranch + "└─";

        children.forEach((child, index) => {
            this._printNode(child, children.length - 1 === index ? lastBranch : nextBranch, convertToString, printLine);
        });
    }

    /**
     * Print the tree to the console using the provided function
     * to transform each data to a string.
     *
     * @param {(data: D, branch?: string) => string} convertToString
     * @param {(line: string) => void} [printLine]
     * @memberof AbstractTree
     */
    print(convertToString: (data: D, branch?: string) => string, printLine?: (line: string) => void) {
        this._printNode(this.root, "", convertToString, printLine);
    }
}
