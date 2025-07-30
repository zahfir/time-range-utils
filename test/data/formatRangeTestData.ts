import { DateRange } from "../../src/ITimeRangeUtils.js";

type FormatTestCase = {
  description: string;
  input: DateRange;
  expected: string;
};

const formatRangeTestCases: FormatTestCase[] = [
  // Zero-duration (instant) cases
  {
    description: "formats zero-duration range as instant",
    input: {
      start: new Date("2025-01-01T12:00:00Z"),
      end: new Date("2025-01-01T12:00:00Z"),
    },
    expected: "1/1/2025, 12:00:00 PM (instant)",
  },
  {
    description: "formats zero-duration range at midnight as instant",
    input: {
      start: new Date("2025-01-01T00:00:00Z"),
      end: new Date("2025-01-01T00:00:00Z"),
    },
    expected: "1/1/2025, 12:00:00 AM (instant)",
  },

  // Same day cases
  {
    description: "formats same-day morning range",
    input: {
      start: new Date("2025-01-01T09:00:00Z"),
      end: new Date("2025-01-01T11:30:00Z"),
    },
    expected: "1/1/2025, 09:00 - 11:30",
  },
  {
    description: "formats same-day afternoon range",
    input: {
      start: new Date("2025-01-01T14:15:00Z"),
      end: new Date("2025-01-01T17:45:00Z"),
    },
    expected: "1/1/2025, 14:15 - 17:45",
  },
  {
    description: "formats same-day range crossing noon",
    input: {
      start: new Date("2025-01-01T11:30:00Z"),
      end: new Date("2025-01-01T13:30:00Z"),
    },
    expected: "1/1/2025, 11:30 - 13:30",
  },
  {
    description: "formats same-day evening range",
    input: {
      start: new Date("2025-01-01T19:00:00Z"),
      end: new Date("2025-01-01T22:00:00Z"),
    },
    expected: "1/1/2025, 19:00 - 22:00",
  },
  {
    description: "formats same-day range with exact hours",
    input: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T15:00:00Z"),
    },
    expected: "1/1/2025, 10:00 - 15:00",
  },
  {
    description: "formats same-day short duration (30 minutes)",
    input: {
      start: new Date("2025-01-01T12:00:00Z"),
      end: new Date("2025-01-01T12:30:00Z"),
    },
    expected: "1/1/2025, 12:00 - 12:30",
  },

  // Cross-day cases (overnight)
  {
    description: "formats overnight range (same consecutive days)",
    input: {
      start: new Date("2025-01-01T23:00:00Z"),
      end: new Date("2025-01-02T02:00:00Z"),
    },
    expected: "Jan 1, 2025, 23:00 to Jan 2, 2025, 02:00",
  },
  {
    description: "formats late night to early morning",
    input: {
      start: new Date("2025-01-01T22:30:00Z"),
      end: new Date("2025-01-02T06:30:00Z"),
    },
    expected: "Jan 1, 2025, 22:30 to Jan 2, 2025, 06:30",
  },

  // Multi-day cases
  {
    description: "formats weekend range (2 days)",
    input: {
      start: new Date("2025-01-04T09:00:00Z"),
      end: new Date("2025-01-05T17:00:00Z"),
    },
    expected: "Jan 4, 2025, 09:00 to Jan 5, 2025, 17:00",
  },
  {
    description: "formats week-long range",
    input: {
      start: new Date("2025-01-01T09:00:00Z"),
      end: new Date("2025-01-07T17:00:00Z"),
    },
    expected: "Jan 1, 2025, 09:00 to Jan 7, 2025, 17:00",
  },
  {
    description: "formats month-spanning range",
    input: {
      start: new Date("2025-01-28T10:00:00Z"),
      end: new Date("2025-02-03T16:00:00Z"),
    },
    expected: "Jan 28, 2025, 10:00 to Feb 3, 2025, 16:00",
  },
  {
    description: "formats year-spanning range",
    input: {
      start: new Date("2024-12-30T14:00:00Z"),
      end: new Date("2025-01-02T10:00:00Z"),
    },
    expected: "Dec 30, 2024, 14:00 to Jan 2, 2025, 10:00",
  },

  // Different months same year
  {
    description: "formats range spanning multiple months",
    input: {
      start: new Date("2025-03-15T08:00:00Z"),
      end: new Date("2025-06-20T18:00:00Z"),
    },
    expected: "Mar 15, 2025, 08:00 to Jun 20, 2025, 18:00",
  },

  // Edge time cases
  {
    description: "formats range starting at midnight",
    input: {
      start: new Date("2025-01-01T00:00:00Z"),
      end: new Date("2025-01-01T08:00:00Z"),
    },
    expected: "1/1/2025, 00:00 - 08:00",
  },
  {
    description: "formats range ending at midnight",
    input: {
      start: new Date("2025-01-01T18:00:00Z"),
      end: new Date("2025-01-02T00:00:00Z"),
    },
    expected: "Jan 1, 2025, 18:00 to Jan 2, 2025, 00:00",
  },
  {
    description: "formats full day range (24 hours)",
    input: {
      start: new Date("2025-01-01T00:00:00Z"),
      end: new Date("2025-01-02T00:00:00Z"),
    },
    expected: "Jan 1, 2025, 00:00 to Jan 2, 2025, 00:00",
  },

  // Holiday/Special dates
  {
    description: "formats New Year's Day range",
    input: {
      start: new Date("2025-01-01T10:00:00Z"),
      end: new Date("2025-01-01T16:00:00Z"),
    },
    expected: "1/1/2025, 10:00 - 16:00",
  },
  {
    description: "formats Christmas Eve to Christmas Day",
    input: {
      start: new Date("2024-12-24T20:00:00Z"),
      end: new Date("2024-12-25T08:00:00Z"),
    },
    expected: "Dec 24, 2024, 20:00 to Dec 25, 2024, 08:00",
  },

  // Business scenarios
  {
    description: "formats standard work day",
    input: {
      start: new Date("2025-01-15T09:00:00Z"),
      end: new Date("2025-01-15T17:00:00Z"),
    },
    expected: "1/15/2025, 09:00 - 17:00",
  },
  {
    description: "formats lunch break",
    input: {
      start: new Date("2025-01-15T12:00:00Z"),
      end: new Date("2025-01-15T13:00:00Z"),
    },
    expected: "1/15/2025, 12:00 - 13:00",
  },
  {
    description: "formats conference call",
    input: {
      start: new Date("2025-01-15T14:30:00Z"),
      end: new Date("2025-01-15T15:30:00Z"),
    },
    expected: "1/15/2025, 14:30 - 15:30",
  },
  {
    description: "formats night shift",
    input: {
      start: new Date("2025-01-15T22:00:00Z"),
      end: new Date("2025-01-16T06:00:00Z"),
    },
    expected: "Jan 15, 2025, 22:00 to Jan 16, 2025, 06:00",
  },

  // Short duration cases
  {
    description: "formats 15-minute meeting",
    input: {
      start: new Date("2025-01-15T10:00:00Z"),
      end: new Date("2025-01-15T10:15:00Z"),
    },
    expected: "1/15/2025, 10:00 - 10:15",
  },
  {
    description: "formats 5-minute break",
    input: {
      start: new Date("2025-01-15T15:00:00Z"),
      end: new Date("2025-01-15T15:05:00Z"),
    },
    expected: "1/15/2025, 15:00 - 15:05",
  },

  // Different years
  {
    description: "formats range spanning multiple years",
    input: {
      start: new Date("2024-11-15T09:00:00Z"),
      end: new Date("2025-02-28T17:00:00Z"),
    },
    expected: "Nov 15, 2024, 09:00 to Feb 28, 2025, 17:00",
  },

  // Leap year scenarios
  {
    description: "formats leap day range",
    input: {
      start: new Date("2024-02-29T10:00:00Z"),
      end: new Date("2024-02-29T16:00:00Z"),
    },
    expected: "2/29/2024, 10:00 - 16:00",
  },

  // Weekend scenarios
  {
    description: "formats weekend morning",
    input: {
      start: new Date("2025-01-04T08:00:00Z"), // Saturday
      end: new Date("2025-01-04T12:00:00Z"),
    },
    expected: "1/4/2025, 08:00 - 12:00",
  },
  {
    description: "formats Sunday evening",
    input: {
      start: new Date("2025-01-05T18:00:00Z"), // Sunday
      end: new Date("2025-01-05T22:00:00Z"),
    },
    expected: "1/5/2025, 18:00 - 22:00",
  },

  // Edge case: very short ranges (seconds)
  {
    description: "formats 1-minute range",
    input: {
      start: new Date("2025-01-15T12:00:00Z"),
      end: new Date("2025-01-15T12:01:00Z"),
    },
    expected: "1/15/2025, 12:00 - 12:01",
  },
];

// Special test case for locale-dependent formatting
const localeAwareTestCase = {
  description: "handles different date formats based on system locale",
  input: {
    start: new Date("2025-01-15T14:30:00Z"),
    end: new Date("2025-01-15T16:45:00Z"),
  },
  // Note: Expected output will vary based on system locale
  // This test should validate that the output is a properly formatted string
  // rather than checking for exact string match
};

export { formatRangeTestCases, localeAwareTestCase };
