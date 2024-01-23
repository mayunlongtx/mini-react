import { it, expect, describe } from "vitest";
import React from "../core/React";

describe("createElement", () => {
  it("should return vdom and props is null for element", () => {
    const el = React.createElement("div", null, "mini-react");
    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "mini-react",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
        },
        "type": "div",
      }
    `)
  });
  it("should return vdom for element", () => {
    const el = React.createElement("div", {
	id: 'id'
    }, "mini-react");
    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "mini-react",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
          "id": "id",
        },
        "type": "div",
      }
    `)
  });
  it("children is not string type", () => {
    const el = React.createElement("div", {
	id: 'id'
    }, React.createElement('span', {id: 'span'}, 'hello'));
    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [
                  {
                    "props": {
                      "children": [],
                      "nodeValue": "hello",
                    },
                    "type": "TEXT_ELEMENT",
                  },
                ],
                "id": "span",
              },
              "type": "span",
            },
          ],
          "id": "id",
        },
        "type": "div",
      }
    `)
  });
});
