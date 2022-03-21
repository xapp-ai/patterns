/*! Copyright (c) 2019, XAPPmedia */
import { Node } from "./Node";

/**
 * Interface for a tree.
 *
 * @export
 * @interface Tree
 * @template D
 */
export interface Tree<D extends object> {
    root: Node<D>;
}
