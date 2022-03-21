/*! Copyright (c) 2019, XAPPmedia */
import { Builder } from "./Builder";

export abstract class AbstractBuilder<T> implements Builder<T> {
    abstract build(): T;
}
