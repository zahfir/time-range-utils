import { DateRange } from "../../src/ITimeRangeUtils.js";

type IsOverlapTestCase = {
  description: string;
  rangeA: DateRange;
  rangeB: DateRange;
  expected: boolean;
};

const isOverlapTestCases: IsOverlapTestCase[] = [
  // No overlap cases
  {
    description: "returns false for completely separate ranges",
    rangeA: {
      start: new Date("2025-01-01T09:00:00.000Z"),
      end: new Date("2025-01-01T10:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T11:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },
  {
    description: "returns false for ranges with gap in between",
    rangeA: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-01T09:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T11:00:00.000Z"),
    },
    expected: false,
  },
  {
    description: "returns false for ranges in reverse order with no overlap",
    rangeA: {
      start: new Date("2025-01-01T14:00:00.000Z"),
      end: new Date("2025-01-01T15:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },

  // Adjacent (touching) ranges
  {
    description:
      "returns true for ranges that touch at boundary (A ends when B starts)",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T14:00:00.000Z"),
    },
    expected: true,
  },
  {
    description:
      "returns true for ranges that touch at boundary (B ends when A starts)",
    rangeA: {
      start: new Date("2025-01-01T13:00:00.000Z"),
      end: new Date("2025-01-01T15:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T11:00:00.000Z"),
      end: new Date("2025-01-01T13:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns false for ranges that almost touch (1ms gap)",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T11:59:59.999Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T14:00:00.000Z"),
    },
    expected: false,
  },

  // Overlapping ranges
  {
    description: "returns true for partial overlap (A starts first)",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T13:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T15:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true for partial overlap (B starts first)",
    rangeA: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T15:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T13:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true for 1ms overlap",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.001Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T14:00:00.000Z"),
    },
    expected: true,
  },

  // Complete containment
  {
    description: "returns true when A completely contains B",
    rangeA: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-01T18:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T14:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true when B completely contains A",
    rangeA: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T14:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-01T18:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true when A contains B with same start time",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T16:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true when A contains B with same end time",
    rangeA: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-01T16:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T14:00:00.000Z"),
      end: new Date("2025-01-01T16:00:00.000Z"),
    },
    expected: true,
  },

  // Identical ranges
  {
    description: "returns true for identical ranges",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },

  // Zero-duration ranges (instants)
  {
    description: "returns true for overlapping zero-duration ranges",
    rangeA: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns false for non-overlapping zero-duration ranges",
    rangeA: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00.001Z"),
      end: new Date("2025-01-01T12:00:00.001Z"),
    },
    expected: false,
  },
  {
    description:
      "returns true when zero-duration range is at start of normal range",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T10:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },
  {
    description:
      "returns true when zero-duration range is at end of normal range",
    rangeA: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true when zero-duration range is inside normal range",
    rangeA: {
      start: new Date("2025-01-01T11:00:00.000Z"),
      end: new Date("2025-01-01T11:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },
  {
    description:
      "returns false when zero-duration range is outside normal range",
    rangeA: {
      start: new Date("2025-01-01T09:00:00.000Z"),
      end: new Date("2025-01-01T09:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },

  // Cross-day ranges
  {
    description: "returns true for overlapping cross-day ranges",
    rangeA: {
      start: new Date("2025-01-01T22:00:00.000Z"),
      end: new Date("2025-01-02T06:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-02T04:00:00.000Z"),
      end: new Date("2025-01-02T10:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns false for non-overlapping cross-day ranges",
    rangeA: {
      start: new Date("2025-01-01T22:00:00.000Z"),
      end: new Date("2025-01-02T02:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-02T06:00:00.000Z"),
      end: new Date("2025-01-02T10:00:00.000Z"),
    },
    expected: false,
  },
  {
    description:
      "returns true when cross-day range overlaps with same-day range",
    rangeA: {
      start: new Date("2025-01-01T23:00:00.000Z"),
      end: new Date("2025-01-02T03:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-02T01:00:00.000Z"),
      end: new Date("2025-01-02T05:00:00.000Z"),
    },
    expected: true,
  },

  // Multi-day ranges
  {
    description: "returns true for overlapping multi-day ranges",
    rangeA: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-03T18:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-02T10:00:00.000Z"),
      end: new Date("2025-01-04T14:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns false for non-overlapping multi-day ranges",
    rangeA: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-02T18:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-03T10:00:00.000Z"),
      end: new Date("2025-01-04T14:00:00.000Z"),
    },
    expected: false,
  },
  {
    description: "returns true when multi-day ranges touch at boundary",
    rangeA: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-03T12:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-03T12:00:00.000Z"),
      end: new Date("2025-01-05T16:00:00.000Z"),
    },
    expected: true,
  },

  // Different years
  {
    description: "returns true for cross-year overlap",
    rangeA: {
      start: new Date("2024-12-30T20:00:00.000Z"),
      end: new Date("2025-01-02T04:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-03T08:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns false for ranges in different years with no overlap",
    rangeA: {
      start: new Date("2024-12-01T10:00:00.000Z"),
      end: new Date("2024-12-15T14:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-15T14:00:00.000Z"),
    },
    expected: false,
  },

  // Millisecond precision
  {
    description: "returns true for ranges overlapping by milliseconds",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T10:00:00.500Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.250Z"),
      end: new Date("2025-01-01T10:00:00.750Z"),
    },
    expected: true,
  },
  {
    description: "returns false for ranges separated by 1 millisecond",
    rangeA: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T10:00:00.499Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T10:00:00.500Z"),
      end: new Date("2025-01-01T10:00:01.000Z"),
    },
    expected: false,
  },

  // Large time ranges
  {
    description: "returns true for overlapping year-long ranges",
    rangeA: {
      start: new Date("2024-06-01T00:00:00.000Z"),
      end: new Date("2025-06-01T00:00:00.000Z"),
    },
    rangeB: {
      start: new Date("2025-01-01T00:00:00.000Z"),
      end: new Date("2026-01-01T00:00:00.000Z"),
    },
    expected: true,
  },
];

export { IsOverlapTestCase, isOverlapTestCases };
