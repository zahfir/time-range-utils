import { DateRange } from "../../src/ITimeRangeUtils.js";

type SubtractTestCase = {
  description: string;
  rangeA: DateRange;
  rangeB: DateRange;
  expected: DateRange[];
};

const subtractRangesTestCases: SubtractTestCase[] = [
  // No overlap cases
  {
    description: "returns original range when no overlap (B before A)",
    rangeA: {
      start: new Date("2025-01-01T12:00:00Z"),
      end: new Date("2025-01-01T15:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T09:00:00Z"),
      end: new Date("2025-01-01T10:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T15:00:00Z"),
      },
    ],
  },
  {
    description: "returns original range when no overlap (B after A)",
    rangeA: {
      start: new Date("2025-01-01T09:00:00Z"),
      end: new Date("2025-01-01T12:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T15:00:00Z"),
      end: new Date("2025-01-01T18:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
    ],
  },
  {
    description: "returns original range when ranges just touch (B before A)",
    rangeA: {
      start: new Date("2025-01-01T12:00:00Z"),
      end: new Date("2025-01-01T15:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T09:00:00Z"),
      end: new Date("2025-01-01T12:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T15:00:00Z"),
      },
    ],
  },

  // Complete coverage cases
  {
    description:
      "returns empty array when B completely covers A (identical ranges)",
    rangeA: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T14:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T14:00:00Z"),
    },
    expected: [],
  },
  {
    description: "returns empty array when B completely covers A (B larger)",
    rangeA: {
      start: new Date("2025-01-01T11:00:00Z"),
      end: new Date("2025-01-01T13:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T09:00:00Z"),
      end: new Date("2025-01-01T15:00:00Z"),
    },
    expected: [],
  },

  // Partial overlap cases - B overlaps start of A
  {
    description: "returns right portion when B overlaps start of A",
    rangeA: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T15:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T08:00:00Z"),
      end: new Date("2025-01-01T12:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T15:00:00Z"),
      },
    ],
  },
  {
    description: "returns right portion when B exactly starts with A",
    rangeA: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T15:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T12:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T15:00:00Z"),
      },
    ],
  },

  // Partial overlap cases - B overlaps end of A
  {
    description: "returns left portion when B overlaps end of A",
    rangeA: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T15:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T13:00:00Z"),
      end: new Date("2025-01-01T18:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T13:00:00Z"),
      },
    ],
  },
  {
    description: "returns left portion when B exactly ends with A",
    rangeA: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T15:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T13:00:00Z"),
      end: new Date("2025-01-01T15:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T13:00:00Z"),
      },
    ],
  },

  // B completely inside A - creates two ranges
  {
    description: "creates two ranges when B is completely inside A",
    rangeA: {
      start: new Date("2025-01-01T09:00:00Z"),
      end: new Date("2025-01-01T17:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00Z"),
      end: new Date("2025-01-01T14:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T09:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T14:00:00Z"),
        end: new Date("2025-01-01T17:00:00Z"),
      },
    ],
  },
  {
    description: "creates two ranges when B is small slice inside A",
    rangeA: {
      start: new Date("2025-01-01T08:00:00Z"),
      end: new Date("2025-01-01T18:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00Z"),
      end: new Date("2025-01-01T13:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T08:00:00Z"),
        end: new Date("2025-01-01T12:00:00Z"),
      },
      {
        start: new Date("2025-01-01T13:00:00Z"),
        end: new Date("2025-01-01T18:00:00Z"),
      },
    ],
  },

  // Zero-length range cases
  {
    description:
      "creates two ranges when subtracting zero-length range in middle",
    rangeA: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T14:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00Z"),
      end: new Date("2025-01-01T12:00:00Z"),
    },
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
    description: "returns original when subtracting zero-length range at start",
    rangeA: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T14:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T10:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
  },
  {
    description: "returns original when subtracting zero-length range at end",
    rangeA: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T14:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T14:00:00Z"),
      end: new Date("2025-01-01T14:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T10:00:00Z"),
        end: new Date("2025-01-01T14:00:00Z"),
      },
    ],
  },
  {
    description:
      "returns empty when subtracting from zero-length range (identical)",
    rangeA: {
      start: new Date("2025-01-01T12:00:00Z"),
      end: new Date("2025-01-01T12:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00Z"),
      end: new Date("2025-01-01T12:00:00Z"),
    },
    expected: [],
  },

  // Millisecond precision cases
  {
    description: "handles millisecond overlap at start",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T14:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T09:00:00.000Z"),
      end: new Date("2025-01-01T10:00:00.001Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T10:00:00.001Z"),
        end: new Date("2025-01-01T14:00:00.000Z"),
      },
    ],
  },
  {
    description: "handles millisecond overlap at end",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T14:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T13:59:59.999Z"),
      end: new Date("2025-01-01T15:00:00.000Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T13:59:59.999Z"),
      },
    ],
  },

  // Cross-day scenarios
  {
    description: "handles cross-day range subtraction",
    rangeA: {
      start: new Date("2025-01-01T20:00:00Z"),
      end: new Date("2025-01-02T08:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T22:00:00Z"),
      end: new Date("2025-01-02T02:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T20:00:00Z"),
        end: new Date("2025-01-01T22:00:00Z"),
      },
      {
        start: new Date("2025-01-02T02:00:00Z"),
        end: new Date("2025-01-02T08:00:00Z"),
      },
    ],
  },

  // Multiple day scenarios
  {
    description: "handles multi-day range with day-long subtraction",
    rangeA: {
      start: new Date("2025-01-01T00:00:00Z"),
      end: new Date("2025-01-05T00:00:00Z"),
    },
    rangeB: {
      start: new Date("2025-01-02T00:00:00Z"),
      end: new Date("2025-01-04T00:00:00Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T00:00:00Z"),
        end: new Date("2025-01-02T00:00:00Z"),
      },
      {
        start: new Date("2025-01-04T00:00:00Z"),
        end: new Date("2025-01-05T00:00:00Z"),
      },
    ],
  },

  // Edge case: very small ranges
  {
    description: "handles very small ranges (1 second duration)",
    rangeA: {
      start: new Date("2025-01-01T12:00:00Z"),
      end: new Date("2025-01-01T12:00:03Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:01Z"),
      end: new Date("2025-01-01T12:00:02Z"),
    },
    expected: [
      {
        start: new Date("2025-01-01T12:00:00Z"),
        end: new Date("2025-01-01T12:00:01Z"),
      },
      {
        start: new Date("2025-01-01T12:00:02Z"),
        end: new Date("2025-01-01T12:00:03Z"),
      },
    ],
  },
];

export { subtractRangesTestCases };
