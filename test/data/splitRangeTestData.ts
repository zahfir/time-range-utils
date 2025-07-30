import { DateRange } from "../../src/ITimeRangeUtils.js";

type SplitRangeTestCase = {
  description: string;
  range: DateRange;
  chunks: number;
  expected: DateRange[];
};

const splitRangeTestCases: SplitRangeTestCase[] = [
  // Edge cases
  {
    description: "returns single range when chunks is 1",
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T14:00:00.000Z"),
    },
    chunks: 1,
    expected: [
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T14:00:00.000Z"),
      },
    ],
  },
  {
    description: "handles zero-duration range",
    range: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    chunks: 3,
    expected: [
      {
        start: new Date("2025-01-01T12:00:00.000Z"),
        end: new Date("2025-01-01T12:00:00.000Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00.000Z"),
        end: new Date("2025-01-01T12:00:00.000Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00.000Z"),
        end: new Date("2025-01-01T12:00:00.000Z"),
      },
    ],
  },

  // Simple splits
  {
    description: "splits 4-hour range into 2 equal chunks",
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T14:00:00.000Z"),
    },
    chunks: 2,
    expected: [
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T12:00:00.000Z"),
      },
      {
        start: new Date("2025-01-01T12:00:00.000Z"),
        end: new Date("2025-01-01T14:00:00.000Z"),
      },
    ],
  },
  {
    description: "splits 6-hour range into 3 equal chunks",
    range: {
      start: new Date("2025-01-01T09:00:00.000Z"),
      end: new Date("2025-01-01T15:00:00.000Z"),
    },
    chunks: 3,
    expected: [
      {
        start: new Date("2025-01-01T09:00:00.000Z"),
        end: new Date("2025-01-01T11:00:00.000Z"),
      },
      {
        start: new Date("2025-01-01T11:00:00.000Z"),
        end: new Date("2025-01-01T13:00:00.000Z"),
      },
      {
        start: new Date("2025-01-01T13:00:00.000Z"),
        end: new Date("2025-01-01T15:00:00.000Z"),
      },
    ],
  },
  {
    description: "splits 4-hour range into 4 equal chunks",
    range: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    chunks: 4,
    expected: [
      {
        start: new Date("2025-01-01T08:00:00.000Z"),
        end: new Date("2025-01-01T09:00:00.000Z"),
      },
      {
        start: new Date("2025-01-01T09:00:00.000Z"),
        end: new Date("2025-01-01T10:00:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T11:00:00.000Z"),
      },
      {
        start: new Date("2025-01-01T11:00:00.000Z"),
        end: new Date("2025-01-01T12:00:00.000Z"),
      },
    ],
  },

  // Splits that don't divide evenly
  {
    description: "splits 1-hour range into 3 chunks (20 minutes each)",
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T11:00:00.000Z"),
    },
    chunks: 3,
    expected: [
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T10:20:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:20:00.000Z"),
        end: new Date("2025-01-01T10:40:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:40:00.000Z"),
        end: new Date("2025-01-01T11:00:00.000Z"),
      },
    ],
  },
  {
    description: "splits 5-hour range into 4 chunks (1.25 hours each)",
    range: {
      start: new Date("2025-01-01T08:00:00.000Z"),
      end: new Date("2025-01-01T13:00:00.000Z"),
    },
    chunks: 4,
    expected: [
      {
        start: new Date("2025-01-01T08:00:00.000Z"),
        end: new Date("2025-01-01T09:15:00.000Z"),
      },
      {
        start: new Date("2025-01-01T09:15:00.000Z"),
        end: new Date("2025-01-01T10:30:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:30:00.000Z"),
        end: new Date("2025-01-01T11:45:00.000Z"),
      },
      {
        start: new Date("2025-01-01T11:45:00.000Z"),
        end: new Date("2025-01-01T13:00:00.000Z"),
      },
    ],
  },

  // Cross-day ranges
  {
    description: "splits cross-day range into 2 chunks",
    range: {
      start: new Date("2025-01-01T22:00:00.000Z"),
      end: new Date("2025-01-02T02:00:00.000Z"),
    },
    chunks: 2,
    expected: [
      {
        start: new Date("2025-01-01T22:00:00.000Z"),
        end: new Date("2025-01-02T00:00:00.000Z"),
      },
      {
        start: new Date("2025-01-02T00:00:00.000Z"),
        end: new Date("2025-01-02T02:00:00.000Z"),
      },
    ],
  },
  {
    description: "splits multi-day range into 3 chunks",
    range: {
      start: new Date("2025-01-01T12:00:00.000Z"),
      end: new Date("2025-01-03T12:00:00.000Z"),
    },
    chunks: 3,
    expected: [
      {
        start: new Date("2025-01-01T12:00:00.000Z"),
        end: new Date("2025-01-02T04:00:00.000Z"),
      },
      {
        start: new Date("2025-01-02T04:00:00.000Z"),
        end: new Date("2025-01-02T20:00:00.000Z"),
      },
      {
        start: new Date("2025-01-02T20:00:00.000Z"),
        end: new Date("2025-01-03T12:00:00.000Z"),
      },
    ],
  },

  // Minute-level precision
  {
    description: "splits 30-minute range into 6 chunks (5 minutes each)",
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T10:30:00.000Z"),
    },
    chunks: 6,
    expected: [
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T10:05:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:05:00.000Z"),
        end: new Date("2025-01-01T10:10:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:10:00.000Z"),
        end: new Date("2025-01-01T10:15:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:15:00.000Z"),
        end: new Date("2025-01-01T10:20:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:20:00.000Z"),
        end: new Date("2025-01-01T10:25:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:25:00.000Z"),
        end: new Date("2025-01-01T10:30:00.000Z"),
      },
    ],
  },

  // Millisecond-level precision
  {
    description: "splits 1-second range into 4 chunks (250ms each)",
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T10:00:01.000Z"),
    },
    chunks: 4,
    expected: [
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T10:00:00.250Z"),
      },
      {
        start: new Date("2025-01-01T10:00:00.250Z"),
        end: new Date("2025-01-01T10:00:00.500Z"),
      },
      {
        start: new Date("2025-01-01T10:00:00.500Z"),
        end: new Date("2025-01-01T10:00:00.750Z"),
      },
      {
        start: new Date("2025-01-01T10:00:00.750Z"),
        end: new Date("2025-01-01T10:00:01.000Z"),
      },
    ],
  },

  // Large number of chunks
  {
    description: "splits 2-hour range into 12 chunks (10 minutes each)",
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T12:00:00.000Z"),
    },
    chunks: 12,
    expected: [
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T10:10:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:10:00.000Z"),
        end: new Date("2025-01-01T10:20:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:20:00.000Z"),
        end: new Date("2025-01-01T10:30:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:30:00.000Z"),
        end: new Date("2025-01-01T10:40:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:40:00.000Z"),
        end: new Date("2025-01-01T10:50:00.000Z"),
      },
      {
        start: new Date("2025-01-01T10:50:00.000Z"),
        end: new Date("2025-01-01T11:00:00.000Z"),
      },
      {
        start: new Date("2025-01-01T11:00:00.000Z"),
        end: new Date("2025-01-01T11:10:00.000Z"),
      },
      {
        start: new Date("2025-01-01T11:10:00.000Z"),
        end: new Date("2025-01-01T11:20:00.000Z"),
      },
      {
        start: new Date("2025-01-01T11:20:00.000Z"),
        end: new Date("2025-01-01T11:30:00.000Z"),
      },
      {
        start: new Date("2025-01-01T11:30:00.000Z"),
        end: new Date("2025-01-01T11:40:00.000Z"),
      },
      {
        start: new Date("2025-01-01T11:40:00.000Z"),
        end: new Date("2025-01-01T11:50:00.000Z"),
      },
      {
        start: new Date("2025-01-01T11:50:00.000Z"),
        end: new Date("2025-01-01T12:00:00.000Z"),
      },
    ],
  },

  // Precision edge cases
  {
    description:
      "splits 1000ms range into 3 chunks (handles floating point precision)",
    range: {
      start: new Date("2025-01-01T10:00:00.000Z"),
      end: new Date("2025-01-01T10:00:01.000Z"),
    },
    chunks: 3,
    expected: [
      {
        start: new Date("2025-01-01T10:00:00.000Z"),
        end: new Date("2025-01-01T10:00:00.333Z"),
      },
      {
        start: new Date("2025-01-01T10:00:00.333Z"),
        end: new Date("2025-01-01T10:00:00.667Z"),
      },
      {
        start: new Date("2025-01-01T10:00:00.667Z"),
        end: new Date("2025-01-01T10:00:01.000Z"),
      },
    ],
  },
];

export { SplitRangeTestCase, splitRangeTestCases };
