// import { describe, expect, test, beforeEach } from "@jest/globals";

import { TestScheduler } from "rxjs/testing";

import { postDelay } from "./post-delay";

describe("postDelay", () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test("creates an observable that emits an event and waits to close for 3 ticks", () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;

      const eve = postDelay("a", 3);
      const expected = "a--|";

      expectObservable(eve).toBe(expected);
    });
  });

  test("creates an observable that emits an event and waits to close for 1 tick", () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;

      const eve = postDelay("a", 1);
      const expected = "a|";

      expectObservable(eve).toBe(expected);
    });
  });

  test("emits and closes immediately when told to delay 0", () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;

      const eve = postDelay("a", 0);
      const expected = "(a|)";

      expectObservable(eve).toBe(expected);
    });
  });
});
