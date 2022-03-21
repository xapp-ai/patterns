/*! Copyright (c) 2019, XAPPmedia */
/**
 * Translate one object to another.
 *
 * @export
 * @abstract
 * @class Translator
 * @template F from
 * @template T to
 */
export abstract class Translator<F, T, P extends object = Record<string, unknown>> {
    /**
     * Translate from F to T.
     *
     * @abstract
     * @param {F} from
     * @returns {T}
     * @memberof Translator
     */
    abstract translate(from: F, props?: P): T;
}
