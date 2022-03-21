/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { AbstractBuilder } from "../AbstractBuilder";

class TestBuilder extends AbstractBuilder<object> {
    build(): object {
        return {};
    }
}

describe("AbstractBuilder", () => {
    describe("#constructor()", () => {
        it("returns an instance of itself", () => {
            expect(new TestBuilder()).to.be.instanceOf(TestBuilder);
        });
    });
});
