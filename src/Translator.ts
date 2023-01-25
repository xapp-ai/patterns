/*! Copyright (c) 2019, XAPP AI */

/**
 * Translate one object to another.
 *
 * @export
 * @abstract
 * @class Translator
 * @template F from
 * @template T to
 */
export abstract class Translator<F, T, P = unknown> {
    /**
     * Translate from F to T.
     *
     * @abstract
     * @param {F} from
     * @param {P} props
     * @returns {T} to 
     */
    public abstract translate(from: F, props?: P): T;
}
