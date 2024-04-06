import { expect } from "@infra-blocks/test";
import { zu } from "../../src/index.js";

export function injectJsonTests() {
  describe("json", function () {
    describe("literals", function () {
      it("should work for a number", function () {
        expect(zu.json().parse(5)).to.equal(5);
      });
      it("should work for a boolean", function () {
        expect(zu.json().parse(true)).to.be.true;
      });
      it("should work for a string", function () {
        expect(zu.json().parse("word")).to.equal("word");
      });
      it("should work for null", function () {
        expect(zu.json().parse(null)).to.be.null;
      });
      it("should work as a default value", function () {
        expect(zu.json().default(42).parse(undefined)).to.equal(42);
      });
      it("should throw for undefined", function () {
        expect(() => zu.json().parse(undefined)).to.throw();
      });
      it("should throw for a symbol", function () {
        expect(() => zu.json().parse(Symbol("nope"))).to.throw();
      });
      it("should throw for a set", function () {
        expect(() => zu.json().parse(new Set())).to.throw();
      });
    });
    describe("arrays", function () {
      it("should work with empty array", function () {
        expect(zu.json().parse([])).to.deep.equal([]);
      });
      it("should work with array of literals", function () {
        const value = [42, "hello", false, null];
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work with a nested array", function () {
        const value = [[42, "hello", false, null]];
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work with a nested object", function () {
        const value = [{ field: "hello" }];
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work as a default value", function () {
        const value = [42, "hello", false, null];
        expect(zu.json().default(value).parse(undefined)).to.deep.equal(value);
      });
      it("should throw for undefined", function () {
        expect(() => zu.json().parse([undefined])).to.throw();
      });
    });
    describe("objects", function () {
      it("should work with empty object", function () {
        expect(zu.json().parse({})).to.deep.equal({});
      });
      it("should work with literal fields", function () {
        const value = {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        };
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work with a nested object", function () {
        const value = {
          object: {
            number: 0,
            string: "stuff",
            boolean: false,
            null: null,
          },
        };
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work with a nested array", function () {
        const value = {
          array: [42, "hello", false, null],
        };
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work as a default value", function () {
        const value = {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        };
        expect(zu.json().default(value).parse(undefined)).to.deep.equal(value);
      });
      it("should throw with a field undefined", function () {
        expect(() => zu.json().parse({ oops: undefined })).to.throw();
      });
    });
  });
  // Same tests as above, but from a stringified JSON.
  describe("json.stringified", function () {
    describe("literals", function () {
      it("should work for a number", function () {
        expect(zu.json.stringified().parse("5")).to.equal(5);
      });
      it("should work for a boolean", function () {
        expect(zu.json.stringified().parse("true")).to.be.true;
      });
      it("should work for a string", function () {
        expect(zu.json.stringified().parse('"word"')).to.equal("word");
      });
      it("should work for null", function () {
        expect(zu.json.stringified().parse("null")).to.be.null;
      });
      it("should work as a default value", function () {
        expect(zu.json.stringified().default("42").parse(undefined)).to.equal(
          42
        );
      });
      it("should throw for undefined", function () {
        expect(() => zu.json.stringified().parse(undefined)).to.throw();
      });
    });
    describe("arrays", function () {
      it("should work with empty array", function () {
        expect(zu.json.stringified().parse(JSON.stringify([]))).to.deep.equal(
          []
        );
      });
      it("should work with array of literals", function () {
        const value = [42, "hello", false, null];
        expect(
          zu.json.stringified().parse(JSON.stringify(value))
        ).to.deep.equal(value);
      });
      it("should work with a nested array", function () {
        const value = [[42, "hello", false, null]];
        expect(
          zu.json.stringified().parse(JSON.stringify(value))
        ).to.deep.equal(value);
      });
      it("should work with a nested object", function () {
        const value = [{ field: "hello" }];
        expect(
          zu.json.stringified().parse(JSON.stringify(value))
        ).to.deep.equal(value);
      });
      it("should work as a default value", function () {
        const value = [42, "hello", false, null];
        expect(
          zu.json.stringified().default(JSON.stringify(value)).parse(undefined)
        ).to.deep.equal(value);
      });
      it("should throw for undefined", function () {
        expect(() => zu.json.stringified().parse("[undefined]")).to.throw();
      });
    });
    describe("objects", function () {
      it("should work with empty object", function () {
        expect(zu.json.stringified().parse(JSON.stringify({}))).to.deep.equal(
          {}
        );
      });
      it("should work with literal fields", function () {
        const value = {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        };
        expect(
          zu.json.stringified().parse(JSON.stringify(value))
        ).to.deep.equal(value);
      });
      it("should work with a nested object", function () {
        const value = {
          object: {
            number: 0,
            string: "stuff",
            boolean: false,
            null: null,
          },
        };
        expect(
          zu.json.stringified().parse(JSON.stringify(value))
        ).to.deep.equal(value);
      });
      it("should work with a nested array", function () {
        const value = {
          array: [42, "hello", false, null],
        };
        expect(
          zu.json.stringified().parse(JSON.stringify(value))
        ).to.deep.equal(value);
      });
      it("should work as a default value", function () {
        const value = {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        };
        expect(
          zu.json.stringified().default(JSON.stringify(value)).parse(undefined)
        ).to.deep.equal(value);
      });
      it("should throw with a field undefined", function () {
        expect(() =>
          zu.json.stringified().parse("{ oops: undefined }")
        ).to.throw();
      });
    });
  });
}
