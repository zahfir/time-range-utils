import { DateRange } from "./ITimeRangeUtils.js";
import {
  validateDate,
  validateDateRange,
  validateDateRangeArray,
  validatePositiveInteger,
} from "./utils/Validation.js";

class TimeRangeUtils {
  private constructor() {}

  static mergeOverlap(ranges: DateRange[]): DateRange[] {
    validateDateRangeArray(ranges, "ranges");

    if (ranges.length <= 1) return [...ranges];

    // Sort intervals by start date
    const sorted = [...ranges].sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    );

    const merged: DateRange[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const current = sorted[i];
      const lastMerged = merged[merged.length - 1];

      // Check if current overlaps with last merged interval
      if (current.start < lastMerged.end) {
        // Merge by extending the end time to the maximum
        lastMerged.end = new Date(
          Math.max(lastMerged.end.getTime(), current.end.getTime())
        );
      } else {
        // No overlap, add current interval
        merged.push(current);
      }
    }

    return merged;
  }

  static subtractRanges(rangeA: DateRange, rangeB: DateRange): DateRange[] {
    validateDateRange(rangeA, "rangeA");
    validateDateRange(rangeB, "rangeB");

    // No overlap - return original range
    if (!this.isOverlap(rangeA, rangeB)) {
      return [rangeA];
    }

    // Calculate the effective overlap boundaries
    const overlapStart = new Date(
      Math.max(rangeA.start.getTime(), rangeB.start.getTime())
    );
    const overlapEnd = new Date(
      Math.min(rangeA.end.getTime(), rangeB.end.getTime())
    );

    const result: DateRange[] = [];

    // Left remainder (before overlap)
    if (rangeA.start < overlapStart) {
      result.push({ start: rangeA.start, end: overlapStart });
    }

    // Right remainder (after overlap)
    if (rangeA.end > overlapEnd) {
      result.push({ start: overlapEnd, end: rangeA.end });
    }

    return result;
  }

  static formatRange(range: DateRange): string {
    validateDateRange(range, "range");

    // Handle zero-duration ranges
    if (range.start.getTime() === range.end.getTime()) {
      return `${range.start.toLocaleString("en-US", {
        timeZone: "UTC",
      })} (instant)`;
    }

    // Helper function to format time with proper midnight handling
    const formatTime = (date: Date): string => {
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    // Check if same day (in UTC)
    const startUTC = new Date(range.start.getTime());
    const endUTC = new Date(range.end.getTime());

    const sameDay =
      startUTC.toISOString().split("T")[0] ===
      endUTC.toISOString().split("T")[0];

    if (sameDay) {
      const date = range.start.toLocaleDateString("en-US", { timeZone: "UTC" });
      const startTime = formatTime(range.start);
      const endTime = formatTime(range.end);
      return `${date}, ${startTime} - ${endTime}`;
    }

    // Different days - use custom formatting for consistency
    const formatFullDateTime = (date: Date): string => {
      const year = date.getUTCFullYear();
      const month = date.toLocaleDateString("en-US", {
        timeZone: "UTC",
        month: "short",
      });
      const day = date.getUTCDate();
      const time = formatTime(date);
      return `${month} ${day}, ${year}, ${time}`;
    };

    const start = formatFullDateTime(range.start);
    const end = formatFullDateTime(range.end);

    return `${start} to ${end}`;
  }

  static splitRange(range: DateRange, chunks: number): DateRange[] {
    validateDateRange(range, "range");
    validatePositiveInteger(chunks, "chunks");

    // Handle edge case: if chunks is 1, return the original range
    if (chunks === 1) {
      return [{ start: new Date(range.start), end: new Date(range.end) }];
    }

    const ranges: DateRange[] = [];
    const totalDuration = range.end.getTime() - range.start.getTime();

    for (let i = 0; i < chunks; i++) {
      // Calculate start time: use integer division to avoid floating point errors
      const chunkStart = new Date(
        range.start.getTime() + Math.round((i * totalDuration) / chunks)
      );

      // Calculate end time: use integer division to avoid floating point errors
      const chunkEnd = new Date(
        range.start.getTime() + Math.round(((i + 1) * totalDuration) / chunks)
      );

      ranges.push({
        start: chunkStart,
        end: chunkEnd,
      });
    }

    // Ensure the last chunk ends exactly at the original end time
    ranges[ranges.length - 1].end = new Date(range.end.getTime());

    return ranges;
  }

  static isInside(date: Date, range: DateRange): boolean {
    validateDate(date, "date");
    validateDateRange(range, "range");

    const dateTime = date.getTime();
    return dateTime >= range.start.getTime() && dateTime <= range.end.getTime();
  }

  static isOverlap(rangeA: DateRange, rangeB: DateRange): boolean {
    validateDateRange(rangeA, "rangeA");
    validateDateRange(rangeB, "rangeB");

    return rangeA.start <= rangeB.end && rangeB.start <= rangeA.end;
  }
}

export default TimeRangeUtils;
