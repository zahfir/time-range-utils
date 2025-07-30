# Time Range Utils

A comprehensive TypeScript library for working with time ranges and date intervals.

## Features

- ✅ **Merge overlapping ranges** - Combine overlapping time periods
- ✅ **Subtract ranges** - Remove time periods from ranges
- ✅ **Split ranges** - Divide ranges into equal chunks
- ✅ **Check overlaps** - Detect if ranges overlap
- ✅ **Point-in-range testing** - Check if dates fall within ranges
- ✅ **Format ranges** - Human-readable string representations
- ✅ **TypeScript support** - Full type safety and IntelliSense
- ✅ **Comprehensive validation** - Detailed error messages for invalid inputs
- ✅ **Zero dependencies** - Lightweight and fast

## Installation

```bash
npm install time-range-utils
# or
yarn add time-range-utils
# or
pnpm add time-range-utils
```

## Quick Start

```typescript
import TimeRangeUtils from "time-range-utils";

const ranges = [
  {
    start: new Date("2025-01-01T10:00:00Z"),
    end: new Date("2025-01-01T12:00:00Z"),
  },
  {
    start: new Date("2025-01-01T11:00:00Z"),
    end: new Date("2025-01-01T13:00:00Z"),
  },
];

// Merge overlapping ranges
const merged = TimeRangeUtils.mergeOverlap(ranges);
// Result: [{ start: 2025-01-01T10:00:00Z, end: 2025-01-01T13:00:00Z }]

// Split a range into chunks
const range = {
  start: new Date("2025-01-01T10:00:00Z"),
  end: new Date("2025-01-01T12:00:00Z"),
};
const chunks = TimeRangeUtils.splitRange(range, 4);
// Result: 4 equal 30-minute periods

// Check if date is within range
const isInside = TimeRangeUtils.isInside(
  new Date("2025-01-01T11:00:00Z"),
  range
);
// Result: true
```

## API Reference

### `mergeOverlap(ranges: DateRange[]): DateRange[]`

Merges overlapping or adjacent time ranges.

### `subtractRanges(rangeA: DateRange, rangeB: DateRange): DateRange[]`

Subtracts rangeB from rangeA, returning remaining time periods.

### `splitRange(range: DateRange, chunks: number): DateRange[]`

Splits a time range into equal chunks.

### `isOverlap(rangeA: DateRange, rangeB: DateRange): boolean`

Checks if two ranges overlap (inclusive boundaries).

### `isInside(date: Date, range: DateRange): boolean`

Tests if a date falls within a range (inclusive boundaries).

### `formatRange(range: DateRange): string`

Converts a range to a human-readable string.

## Error Handling

The library provides detailed error types for better debugging:

```typescript
import { InvalidDateRangeError, InvalidParameterError } from "time-range-utils";

try {
  TimeRangeUtils.splitRange(range, -1);
} catch (error) {
  if (error instanceof InvalidParameterError) {
    console.log(`Invalid parameter: ${error.parameterName}`);
    console.log(`Value: ${error.parameterValue}`);
  }
}
```

## TypeScript Support

Full TypeScript definitions included:

```typescript
type DateRange = {
  start: Date;
  end: Date;
};
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run tests: `pnpm test`
5. Run linting: `pnpm run lint`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests with coverage
pnpm run test:coverage

# Run linting
pnpm run lint

# Build the package
pnpm run build

# Type checking
pnpm run type-check
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

## Support

- 📖 [Documentation](https://github.com/zahfir/time-range-utils)
- 🐛 [Issue Tracker](https://github.com/zahfir/time-range-utils/issues)
- 💬 [Discussions](https://github.com/zahfir/time-range-utils/discussions)
