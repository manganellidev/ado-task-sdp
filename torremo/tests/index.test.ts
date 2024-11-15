import { greet, greetGo } from "../src/index-test";

test("greet function", () => {
  expect(greet("World")).toBe("Hello, World!");
});

test("greetGo function", async () => {
  const result = await greetGo("World");
  expect(result).toBe("Hello, World!");
});
