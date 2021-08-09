// import { describe, expect, test, beforeEach } from "@jest/globals";

import { TestScheduler } from "rxjs/testing";

import { rateLimiter } from "./rate-limiter";

describe("ratelimit tests", () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test("2 items in a 3 tick window", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const eve = cold("abc--");
      const expected = "ab-c-";

      expectObservable(eve.pipe(rateLimiter(2, 3))).toBe(expected);
    });
  });

  test("2 items in a 3 tick window", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const eve = cold("abcdef");
      const expected = "ab-cd-ef";

      expectObservable(eve.pipe(rateLimiter(2, 3))).toBe(expected);
    });
  });

  test("1 item in a 5 tick window", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const eve = cold("(abc)def");
      const expected = "a----b----c----d----e----f----";

      expectObservable(eve.pipe(rateLimiter(1, 5))).toBe(expected);
    });
  });

  test("3 items in a 5 tick window", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const eve = cold("(abc)(def)");
      const expected = "(abc)(def)";

      expectObservable(eve.pipe(rateLimiter(3, 5))).toBe(expected);
    });
  });

  test("3 items in a 6 tick window (bursty!)", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const eve = cold("(abc)(def)");
      const expected = "(abc)-(def)";

      expectObservable(eve.pipe(rateLimiter(3, 6))).toBe(expected);
    });
  });

  test("3 items in a 9 tick window and a timeout at 3", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const eve = cold("(abc)-def-g----");
      const expected = "(abc)----(def)-";

      expectObservable(eve.pipe(rateLimiter(3, 9, 3))).toBe(expected);
    });
  });

  test("3 items in a 9 tick window and a timeout at 3 recovers after", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;

      const eve = cold("(abc)(def)-g----");
      const expected = "(abc)------g-";

      expectObservable(eve.pipe(rateLimiter(3, 9, 3))).toBe(expected);
    });
  });
});
