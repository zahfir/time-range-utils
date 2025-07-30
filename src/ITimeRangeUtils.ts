type DateRange = {
  start: Date;
  end: Date;
};

interface ITimeRangeUtils {
  /**
   * Check if two time ranges overlap
   * @param rangeA First time range
   * @param rangeB Second time range
   * @returns True if ranges overlap, false otherwise
   */
  isOverlap(rangeA: DateRange, rangeB: DateRange): boolean;

  /**
   * Merge any overlapping or adjacent ranges
   * @param ranges Array of time ranges to merge
   * @returns Array of merged ranges with no overlaps
   */
  mergeOverlap(ranges: DateRange[]): DateRange[];

  /**
   * Subtract range B from range A
   * @param rangeA Range to subtract from
   * @param rangeB Range to subtract
   * @returns Array of remaining ranges after subtraction
   */
  subtractRanges(rangeA: DateRange, rangeB: DateRange): DateRange[];

  /**
   * Turn range into readable string
   * @param range Time range to format
   * @returns Human-readable string representation
   */
  formatRange(range: DateRange): string;

  /**
   * Split a range into N equal chunks
   * @param range Time range to split
   * @param chunks Number of chunks
   * @returns Array of split ranges
   */
  splitRange(range: DateRange, chunks: number): DateRange[];

  /**
   * Test if a point is inside a range
   * @param date Date point to test
   * @param range Time range to check against
   * @returns True if point is within range, false otherwise
   */
  isInside(date: Date, range: DateRange): boolean;
}

export { DateRange, ITimeRangeUtils };
