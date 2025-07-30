import { DateRange } from "../../src/ITimeRangeUtils.js";

type IsInsideTestCase = {
  description: string;
  date: Date;
  range: DateRange;
  expected: boolean;
};

const isInsideTestCases: IsInsideTestCase[] = [
  // Boundary cases - start boundary
  {
    description: "returns true for date exactly at start boundary",
    date: new Date("2025-01-01T10:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },

  // Boundary cases - end boundary
  {
    description: "returns true for date exactly at end boundary",
    date: new Date("2025-01-01T12:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },

  // Inside range
  {
    description: "returns true for date in middle of range",
    date: new Date("2025-01-01T11:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true for date 1ms after start",
    date: new Date("2025-01-01T10:00:00.001Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true for date 1ms before end",
    date: new Date("2025-01-01T11:59:59.999Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },

  // Outside range - before
  {
    description: "returns false for date before range start",
    date: new Date("2025-01-01T09:59:59.999Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },
  {
    description: "returns false for date 1ms before start",
    date: new Date("2025-01-01T09:59:59.999Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },
  {
    description: "returns false for date far before range",
    date: new Date("2025-01-01T08:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },

  // Outside range - after
  {
    description: "returns false for date after range end",
    date: new Date("2025-01-01T12:00:00.001Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },
  {
    description: "returns false for date 1ms after end",
    date: new Date("2025-01-01T12:00:00.001Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },
  {
    description: "returns false for date far after range",
    date: new Date("2025-01-01T14:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },

  // Zero-duration ranges (instant)
  {
    description: "returns true for date exactly matching zero-duration range",
    date: new Date("2025-01-01T12:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns false for date 1ms after zero-duration range",
    date: new Date("2025-01-01T12:00:00.001Z"),
    range: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },
  {
    description: "returns false for date 1ms before zero-duration range",
    date: new Date("2025-01-01T11:59:59.999Z"),
    range: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    expected: false,
  },

  // Cross-day ranges
  {
    description: "returns true for date in cross-day range",
    date: new Date("2025-01-02T01:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T22:00:00.000Z"),
      end: new Date("2025-01-02T06:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true for date at start of cross-day range",
    date: new Date("2025-01-01T22:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T22:00:00.000Z"),
      end: new Date("2025-01-02T06:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true for date at end of cross-day range",
    date: new Date("2025-01-02T06:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T22:00:00.000Z"),
      end: new Date("2025-01-02T06:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns false for date before cross-day range",
    date: new Date("2025-01-01T21:59:59.999Z"),
    range: {
      start: new Date("2025-01-01T22:00:00.000Z"),
      end: new Date("2025-01-02T06:00:00.000Z"),
    },
    expected: false,
  },
  {
    description: "returns false for date after cross-day range",
    date: new Date("2025-01-02T06:00:00.001Z"),
    range: {
      start: new Date("2025-01-01T22:00:00.000Z"),
      end: new Date("2025-01-02T06:00:00.000Z"),
    },
    expected: false,
  },

  // Multi-day ranges
  {
    description: "returns true for date in middle of multi-day range",
    date: new Date("2025-01-02T12:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-03T18:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true for date at start of multi-day range",
    date: new Date("2025-01-01T08:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-03T18:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true for date at end of multi-day range",
    date: new Date("2025-01-03T18:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-03T18:00:00.000Z"),
    },
    expected: true,
  },

  // Millisecond precision
  {
    description: "returns true for date within millisecond range",
    date: new Date("2025-01-01T10:00:00.500Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T10:00:01.000Z"),
    },
    expected: true,
  },
  {
    description: "returns true for date at start of millisecond range",
    date: new Date("2025-01-01T10:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T10:00:00.100Z"),
    },
    expected: true,
  },
  {
    description: "returns true for date at end of millisecond range",
    date: new Date("2025-01-01T10:00:00.100Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T10:00:00.100Z"),
    },
    expected: true,
  },
  {
    description: "returns false for date 1ms outside millisecond range",
    date: new Date("2025-01-01T10:00:00.101Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T10:00:00.100Z"),
    },
    expected: false,
  },

  // Edge cases with same times
  {
    description:
      "returns true when date equals both start and end (zero duration)",
    date: new Date("2025-01-01T15:30:45.123Z"),
    range: {
      start: new Date("2025-01-01T15:30:45.123Z"),
      end: new Date("2025-01-01T15:30:45.123Z"),
    },
    expected: true,
  },

  // Different years
  {
    description: "returns true for date in cross-year range",
    date: new Date("2025-01-01T12:00:00.000Z"),
    range: {
      start: new Date("2024-12-31T20:00:00.000Z"),
      end: new Date("2025-01-02T04:00:00.000Z"),
    },
    expected: true,
  },
  {
    description: "returns false for date in wrong year",
    date: new Date("2024-01-01T12:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T14:00:00.000Z"),
    },
    expected: false,
  },

  // Large time ranges
  {
    description: "returns true for date in very long range (months)",
    date: new Date("2025-06-15T12:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T00:00:00.000Z"),
      end: new Date("2025-12-31T23:59:59.999Z"),
    },
    expected: true,
  },
  {
    description: "returns false for date outside very long range",
    date: new Date("2026-01-01T00:00:00.000Z"),
    range: {
      start: new Date("2025-01-01T00:00:00.000Z"),
      end: new Date("2025-12-31T23:59:59.999Z"),
    },
    expected: false,
  },
];

export { IsInsideTestCase, isInsideTestCases };
