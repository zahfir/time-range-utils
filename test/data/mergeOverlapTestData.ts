import { DateRange } from "../../src/ITimeRangeUtils.js";

type TestCase = {
  description: string;
  input: DateRange[];
  expected: DateRange[];
};

const validMergeOverlapTestCases: TestCase[] = [
  // Edge cases
  {
    description: "returns empty array for empty input",
    input: [],
    expected: [],
  },
  {
    description: "returns same range for single input",
    input: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
    ],
  },

  // Non-overlapping cases
  {
    description: "preserves non-overlapping ranges in order",
    input: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T10:00:00Z"),
      },
      {
        start: new Date("2025-01-01T11:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T13:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T10:00:00Z"),
      },
      {
        start: new Date("2025-01-01T11:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T13:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
  },
  {
    description: "sorts and preserves non-overlapping ranges",
    input: [
      {
        start: new Date("2025-01-01T13:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T10:00:00Z"),
      },
      {
        start: new Date("2025-01-01T11:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T10:00:00Z"),
      },
      {
        start: new Date("2025-01-01T11:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T13:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
  },

  // Adjacent ranges
  {
    description: "does not merge adjacent ranges that just touch",
    input: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
  },

  // Overlapping cases
  {
    description: "merges two overlapping ranges",
    input: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T13:00:00Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T15:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T15:00:00Z"),
      },
    ],
  },
  {
    description: "merges multiple overlapping ranges",
    input: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T11:00:00Z"),
      },
      {
        start: new Date("2025-01-01T10:30:00Z"),
        end: new Date("2025-01-01T12:30:00Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
  },
  {
    description: "merges ranges with one completely inside another",
    input: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T17:00:00Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T17:00:00Z"),
      },
    ],
  },
  {
    description: "merges identical ranges",
    input: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
    ],
  },

  // Complex scenarios
  {
    description: "handles mixed overlapping and non-overlapping ranges",
    input: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T11:00:00Z"),
      },
      {
        start: new Date("2025-01-01T10:30:00Z"),
        end: new Date("2025-01-01T12:30:00Z"),
      },
      {
        start: new Date("2025-01-01T15:00:00Z"),
        end: new Date("2025-01-01T17:00:00Z"),
      },
      {
        start: new Date("2025-01-01T16:30:00Z"),
        end: new Date("2025-01-01T18:30:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T12:30:00Z"),
      },
      {
        start: new Date("2025-01-01T15:00:00Z"),
        end: new Date("2025-01-01T18:30:00Z"),
      },
    ],
  },
  {
    description: "merges chain of overlapping ranges",
    input: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T11:00:00Z"),
      },
      {
        start: new Date("2025-01-01T10:45:00Z"),
        end: new Date("2025-01-01T12:45:00Z"),
      },
      {
        start: new Date("2025-01-01T12:15:00Z"),
        end: new Date("2025-01-01T14:15:00Z"),
      },
      {
        start: new Date("2025-01-01T13:45:00Z"),
        end: new Date("2025-01-01T15:45:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T15:45:00Z"),
      },
    ],
  },
  {
    description: "handles unsorted input with complex overlaps",
    input: [
      {
        start: new Date("2025-01-02T10:00:00Z"),
        end: new Date("2025-01-02T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T13:00:00Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T15:00:00Z"),
      },
      {
        start: new Date("2025-01-03T08:00:00Z"),
        end: new Date("2025-01-03T10:00:00Z"),
      },
      {
        start: new Date("2025-01-03T09:30:00Z"),
        end: new Date("2025-01-03T11:30:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T15:00:00Z"),
      },
      {
        start: new Date("2025-01-02T10:00:00Z"),
        end: new Date("2025-01-02T12:00:00Z"),
      },
      {
        start: new Date("2025-01-03T08:00:00Z"),
        end: new Date("2025-01-03T11:30:00Z"),
      },
    ],
  },
  {
    description: "does not merge ranges that barely touch",
    input: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
  },
  {
    description: "merges ranges that overlap by 1 millisecond",
    input: [
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T12:00:00.001Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00.000Z"),
        end: new Date("2025-01-01T14:00:00.000Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T14:00:00.000Z"),
      },
    ],
  },
  {
    description: "handles cross-day ranges",
    input: [
      {
        start: new Date("2025-01-01T22:00:00Z"),
        end: new Date("2025-01-02T02:00:00Z"),
      },
      {
        start: new Date("2025-01-02T01:00:00Z"),
        end: new Date("2025-01-02T05:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T22:00:00Z"),
        end: new Date("2025-01-02T05:00:00Z"),
      },
    ],
  },
  {
    description: "handles multiple days with gaps",
    input: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T17:00:00Z"),
      },
      {
        start: new Date("2025-01-03T09:00:00Z"),
        end: new Date("2025-01-03T17:00:00Z"),
      },
      {
        start: new Date("2025-01-05T09:00:00Z"),
        end: new Date("2025-01-05T17:00:00Z"),
      },
    ],
    expected: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T17:00:00Z"),
      },
      {
        start: new Date("2025-01-03T09:00:00Z"),
        end: new Date("2025-01-03T17:00:00Z"),
      },
      {
        start: new Date("2025-01-05T09:00:00Z"),
        end: new Date("2025-01-05T17:00:00Z"),
      },
    ],
  },
];

export { TestCase, validMergeOverlapTestCases };
