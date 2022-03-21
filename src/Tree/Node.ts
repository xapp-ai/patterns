/*! Copyright (c) 2019, XAPPmedia */
/**
 * Node for a tree.
 *
 * @export
 * @interface Node
 * @template D
 */
export interface Node<D extends object> {
    data: D;
    children: Node<D>[];
}
