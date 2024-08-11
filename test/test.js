"use strict";

// Import Node.js Dependencies
const { test } = require("node:test");
const assert = require("node:assert");

// Require Third-party Dependencies
const is = require("@slimio/is");

// Require Internal Dependencies
const jsdocExtractor = require("../index.js");

test("test export", () => {
  assert.ok(is.generatorFunction(jsdocExtractor));
});

test("extract two blocks", () => {
  const jsdocAnnotations = `
    /**
     * @class test
     * @classdesc xd
     */

    /**
     * @class xd
     */
    `;

  const it = jsdocExtractor(Buffer.from(jsdocAnnotations));
  assert.ok(is.iterable(it));
  for (const block of it) {
    assert.ok(Array.isArray(block));
    assert.ok(Buffer.isBuffer(block[0]));
    assert.ok(typeof block[1] === "number");
    assert.ok(typeof block[2] === "number");
  }
});
