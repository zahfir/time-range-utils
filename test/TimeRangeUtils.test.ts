import { describe, it, expect } from "vitest";
import TimeRangeUtils from "../src/TimeRangeUtils.js";
import { validMergeOverlapTestCases } from "./data/mergeOverlapTestData.js";
import { subtractRangesTestCases } from "./data/subtractRangesTestData.js";
import { formatRangeTestCases } from "./data/formatRangeTestData.js";
import { splitRangeTestCases } from "./data/splitRangeTestData.js";
import { isInsideTestCases } from "./data/isInsideTestData.js";
import { isOverlapTestCases } from "./data/isOverlapTestData.js";
import {
  InvalidDateRangeError,
  InvalidParameterError,
} from "../src/utils/ErrorClasses.js";

describe("Time Range Utils", () => {
  describe("mergeOverlap", () => {
    describe("Valid Input", () => {
      validMergeOverlapTestCases.forEach(({ description, input, expected }) => {
        it(description, () => {
          const result = TimeRangeUtils.mergeOverlap(input);

          expect(result).toHaveLength(expected.length);
          result.forEach((range, index) => {
            expect(range.start.getTime()).toBe(expected[index].start.getTime());
            expect(range.end.getTime()).toBe(expected[index].end.getTime());
          });
        });
      });
    });

    describe("Invalid Input", () => {
      it("should throw InvalidParameterError for null input", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => TimeRangeUtils.mergeOverlap(null as any)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidParameterError for undefined input", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => TimeRangeUtils.mergeOverlap(undefined as any)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidParameterError for non-array input", () => {
        expect(() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TimeRangeUtils.mergeOverlap("not an array" as any)
        ).toThrow(InvalidParameterError);
      });

      it("should throw InvalidDateRangeError for range with invalid start date", () => {
        const invalidRange = {
          start: new Date("invalid"),
          end: new Date("2025-01-01T12:00:00Z"),
        };
        expect(() => TimeRangeUtils.mergeOverlap([invalidRange])).toThrow(
          InvalidDateRangeError
        );
      });

      it("should throw InvalidDateRangeError for range with invalid end date", () => {
        const invalidRange = {
          start: new Date("2025-01-01T10:00:00Z"),
          end: new Date("invalid"),
        };
        expect(() => TimeRangeUtils.mergeOverlap([invalidRange])).toThrow(
          InvalidDateRangeError
        );
      });

      it("should throw InvalidDateRangeError when start > end", () => {
        const invalidRange = {
          start: new Date("2025-01-02T10:00:00Z"),
          end: new Date("2025-01-01T10:00:00Z"),
        };
        expect(() => TimeRangeUtils.mergeOverlap([invalidRange])).toThrow(
          InvalidDateRangeError
        );
      });

      it("should throw InvalidDateRangeError for range missing start property", () => {
        const invalidRange = { end: new Date("2025-01-01T12:00:00Z") };
        expect(() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TimeRangeUtils.mergeOverlap([invalidRange as any])
        ).toThrow(InvalidDateRangeError);
      });

      it("should throw InvalidDateRangeError for range missing end property", () => {
        const invalidRange = { start: new Date("2025-01-01T10:00:00Z") };
        expect(() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TimeRangeUtils.mergeOverlap([invalidRange as any])
        ).toThrow(InvalidDateRangeError);
      });
    });
  });
  describe("subtractRanges", () => {
    describe("Valid Input", () => {
      subtractRangesTestCases.forEach(
        ({ description, rangeA, rangeB, expected }) => {
          it(description, () => {
            const result = TimeRangeUtils.subtractRanges(rangeA, rangeB);

            expect(result).toHaveLength(expected.length);
            result.forEach((range, index) => {
              expect(range.start.getTime()).toBe(
                expected[index].start.getTime()
              );
              expect(range.end.getTime()).toBe(expected[index].end.getTime());
            });
          });
        }
      );
    });

    describe("Invalid Input", () => {
      const validRange = {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      };

      it("should throw InvalidParameterError for null rangeA", () => {
        expect(() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TimeRangeUtils.subtractRanges(null as any, validRange)
        ).toThrow(InvalidParameterError);
      });

      it("should throw InvalidParameterError for null rangeB", () => {
        expect(() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TimeRangeUtils.subtractRanges(validRange, null as any)
        ).toThrow(InvalidParameterError);
      });

      it("should throw InvalidDateRangeError for invalid start date in rangeA", () => {
        const invalidRange = {
          start: new Date("invalid"),
          end: new Date("2025-01-01T12:00:00Z"),
        };
        expect(() =>
          TimeRangeUtils.subtractRanges(invalidRange, validRange)
        ).toThrow(InvalidDateRangeError);
      });

      it("should throw InvalidDateRangeError for invalid end date in rangeB", () => {
        const invalidRange = {
          start: new Date("2025-01-01T10:00:00Z"),
          end: new Date("invalid"),
        };
        expect(() =>
          TimeRangeUtils.subtractRanges(validRange, invalidRange)
        ).toThrow(InvalidDateRangeError);
      });

      it("should throw InvalidDateRangeError when rangeA start > end", () => {
        const invalidRange = {
          start: new Date("2025-01-02T10:00:00Z"),
          end: new Date("2025-01-01T10:00:00Z"),
        };
        expect(() =>
          TimeRangeUtils.subtractRanges(invalidRange, validRange)
        ).toThrow(InvalidDateRangeError);
      });
    });
  });
  describe("formatRange", () => {
    describe("Valid Input", () => {
      formatRangeTestCases.forEach(({ description, input, expected }) => {
        it(description, () => {
          const result = TimeRangeUtils.formatRange(input);

          expect(result).toBe(expected);
        });
      });
    });

    describe("Invalid Input", () => {
      it("should throw InvalidParameterError for null range", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => TimeRangeUtils.formatRange(null as any)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidParameterError for undefined range", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => TimeRangeUtils.formatRange(undefined as any)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidDateRangeError for range with invalid start date", () => {
        const invalidRange = {
          start: new Date("invalid"),
          end: new Date("2025-01-01T12:00:00Z"),
        };
        expect(() => TimeRangeUtils.formatRange(invalidRange)).toThrow(
          InvalidDateRangeError
        );
      });

      it("should throw InvalidDateRangeError for range with invalid end date", () => {
        const invalidRange = {
          start: new Date("2025-01-01T10:00:00Z"),
          end: new Date("invalid"),
        };
        expect(() => TimeRangeUtils.formatRange(invalidRange)).toThrow(
          InvalidDateRangeError
        );
      });

      it("should throw InvalidDateRangeError when start > end", () => {
        const invalidRange = {
          start: new Date("2025-01-02T10:00:00Z"),
          end: new Date("2025-01-01T10:00:00Z"),
        };
        expect(() => TimeRangeUtils.formatRange(invalidRange)).toThrow(
          InvalidDateRangeError
        );
      });
    });
  });

  describe("splitRange", () => {
    describe("Valid Input", () => {
      splitRangeTestCases.forEach(
        ({ description, range, chunks, expected }) => {
          it(description, () => {
            const result = TimeRangeUtils.splitRange(range, chunks);

            expect(result).toHaveLength(expected.length);
            result.forEach((resultRange, index) => {
              expect(resultRange.start.getTime()).toBe(
                expected[index].start.getTime()
              );
              expect(resultRange.end.getTime()).toBe(
                expected[index].end.getTime()
              );
            });
          });
        }
      );
    });

    describe("Invalid Input", () => {
      const validRange = {
        start: new Date("2025-01-01T00:00:00Z"),
        end: new Date("2025-01-01T01:00:00Z"),
      };

      it("should throw InvalidParameterError for null chunks", () => {
        expect(() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TimeRangeUtils.splitRange(validRange, null as any)
        ).toThrow(InvalidParameterError);
      });

      it("should throw InvalidParameterError for undefined chunks", () => {
        expect(() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TimeRangeUtils.splitRange(validRange, undefined as any)
        ).toThrow(InvalidParameterError);
      });

      it("should throw InvalidParameterError for negative chunks", () => {
        expect(() => TimeRangeUtils.splitRange(validRange, -1)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidParameterError for zero chunks", () => {
        expect(() => TimeRangeUtils.splitRange(validRange, 0)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidParameterError for non-integer chunks", () => {
        expect(() => TimeRangeUtils.splitRange(validRange, 2.5)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidParameterError for string chunks", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => TimeRangeUtils.splitRange(validRange, "2" as any)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidParameterError for null range", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => TimeRangeUtils.splitRange(null as any, 2)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidDateRangeError for invalid start date", () => {
        const invalidRange = {
          start: new Date("invalid"),
          end: new Date("2025-01-01T01:00:00Z"),
        };
        expect(() => TimeRangeUtils.splitRange(invalidRange, 2)).toThrow(
          InvalidDateRangeError
        );
      });

      it("should throw InvalidDateRangeError when start > end", () => {
        const invalidRange = {
          start: new Date("2025-01-01T02:00:00Z"),
          end: new Date("2025-01-01T01:00:00Z"),
        };
        expect(() => TimeRangeUtils.splitRange(invalidRange, 2)).toThrow(
          InvalidDateRangeError
        );
      });
    });
  });

  describe("isInside", () => {
    describe("Valid Input", () => {
      isInsideTestCases.forEach(({ description, date, range, expected }) => {
        it(description, () => {
          const result = TimeRangeUtils.isInside(date, range);

          expect(result).toBe(expected);
        });
      });
    });

    describe("Invalid Input", () => {
      const validRange = {
        start: new Date("2025-01-01T00:00:00Z"),
        end: new Date("2025-01-01T01:00:00Z"),
      };

      it("should throw InvalidParameterError for null date", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => TimeRangeUtils.isInside(null as any, validRange)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidParameterError for undefined date", () => {
        expect(() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TimeRangeUtils.isInside(undefined as any, validRange)
        ).toThrow(InvalidParameterError);
      });

      it("should throw InvalidParameterError for invalid date", () => {
        expect(() =>
          TimeRangeUtils.isInside(new Date("invalid"), validRange)
        ).toThrow(InvalidParameterError);
      });

      it("should throw InvalidParameterError for non-date input", () => {
        expect(() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TimeRangeUtils.isInside("2025-01-01" as any, validRange)
        ).toThrow(InvalidParameterError);
      });

      it("should throw InvalidParameterError for null range", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => TimeRangeUtils.isInside(new Date(), null as any)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidDateRangeError for range with invalid start date", () => {
        const invalidRange = {
          start: new Date("invalid"),
          end: new Date("2025-01-01T01:00:00Z"),
        };
        expect(() => TimeRangeUtils.isInside(new Date(), invalidRange)).toThrow(
          InvalidDateRangeError
        );
      });

      it("should throw InvalidDateRangeError when range start > end", () => {
        const invalidRange = {
          start: new Date("2025-01-01T02:00:00Z"),
          end: new Date("2025-01-01T01:00:00Z"),
        };
        expect(() => TimeRangeUtils.isInside(new Date(), invalidRange)).toThrow(
          InvalidDateRangeError
        );
      });
    });
    // TODO: Write a suite for invalid inputs after implementing custom errors
  });

  describe("isOverlap", () => {
    describe("Valid Input", () => {
      isOverlapTestCases.forEach(
        ({ description, rangeA, rangeB, expected }) => {
          it(description, () => {
            const result = TimeRangeUtils.isOverlap(rangeA, rangeB);

            expect(result).toBe(expected);
          });
        }
      );
    });

    describe("Invalid Input", () => {
      const validRange = {
        start: new Date("2025-01-01T00:00:00Z"),
        end: new Date("2025-01-01T01:00:00Z"),
      };

      it("should throw InvalidParameterError for null rangeA", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => TimeRangeUtils.isOverlap(null as any, validRange)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidParameterError for null rangeB", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => TimeRangeUtils.isOverlap(validRange, null as any)).toThrow(
          InvalidParameterError
        );
      });

      it("should throw InvalidParameterError for undefined rangeA", () => {
        expect(() =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TimeRangeUtils.isOverlap(undefined as any, validRange)
        ).toThrow(InvalidParameterError);
      });

      it("should throw InvalidDateRangeError for invalid start date in rangeA", () => {
        const invalidRange = {
          start: new Date("invalid"),
          end: new Date("2025-01-01T01:00:00Z"),
        };
        expect(() =>
          TimeRangeUtils.isOverlap(invalidRange, validRange)
        ).toThrow(InvalidDateRangeError);
      });

      it("should throw InvalidDateRangeError for invalid end date in rangeB", () => {
        const invalidRange = {
          start: new Date("2025-01-01T00:00:00Z"),
          end: new Date("invalid"),
        };
        expect(() =>
          TimeRangeUtils.isOverlap(validRange, invalidRange)
        ).toThrow(InvalidDateRangeError);
      });

      it("should throw InvalidDateRangeError when rangeA start > end", () => {
        const invalidRange = {
          start: new Date("2025-01-01T02:00:00Z"),
          end: new Date("2025-01-01T01:00:00Z"),
        };
        expect(() =>
          TimeRangeUtils.isOverlap(invalidRange, validRange)
        ).toThrow(InvalidDateRangeError);
      });

      it("should throw InvalidDateRangeError when rangeB start > end", () => {
        const invalidRange = {
          start: new Date("2025-01-01T02:00:00Z"),
          end: new Date("2025-01-01T01:00:00Z"),
        };
        expect(() =>
          TimeRangeUtils.isOverlap(validRange, invalidRange)
        ).toThrow(InvalidDateRangeError);
      });
    });
    // TODO: Write a suite for invalid inputs after implementing custom errors
  });
});
