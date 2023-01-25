/*! Copyright (c) 2019, XAPP AI */
import { expect } from "chai";
import { Translator } from "../Translator";

class TestTranslator extends Translator<string, number> {
    public translate(from: string, props?: Record<string, unknown> | undefined): number {
        console.log(props);
        return Number(from);
    }
}

class TestWithPropsTranslator extends Translator<number, string> {
    public translate(from: number, props?: string): string {
        if (props) {
            return `${from} ${props}`;
        }
        return `${from}`
    }
}

class TestWithFullGenericsTranslator extends Translator<boolean, string, string[]> {
    public translate(from: boolean, props?: string[] | undefined): string {
        if (props) {
            return 'hasProps';
        }

        return `${from}`;
    }
}

describe(`${Translator.name}`, () => {
    describe("#constructor()", () => {
        it("returns an instance of itself", () => {
            expect(new TestTranslator()).to.be.instanceOf(TestTranslator);
            expect(new TestWithPropsTranslator()).to.be.instanceOf(TestWithPropsTranslator);
            expect(new TestWithFullGenericsTranslator()).to.be.instanceOf(TestWithFullGenericsTranslator);
        });
    });
    describe(`#translate()`, () => {
        it("accepts optional props", () => {
            const t = new TestWithPropsTranslator();
            expect(t.translate(1, "foo")).to.exist;
            expect(t.translate(2)).to.exist;
        });
    });
});