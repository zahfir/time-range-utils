import { DateRange } from "../ITimeRangeUtils.js";
import {
  InvalidDateRangeError,
  InvalidParameterError,
} from "./ErrorClasses.js";

/**
 * Validates that a value is not null or undefined.
 *
 * @param value - The value to validate
 * @param parameterName - The name of the parameter for error reporting
 * @throws {InvalidParameterError} When value is null or undefined
 */
function validateNotNull(value: unknown, parameterName: string): void {
  if (value === null || value === undefined) {
    throw new InvalidParameterError(
      parameterName,
      value,
      `Parameter '${parameterName}' cannot be null or undefined`
    );
  }
}

/**
 * Validates that a number is a positive integer.
 *
 * @param value - The number to validate
 * @param parameterName - The name of the parameter for error reporting
 * @throws {InvalidParameterError} When number is invalid or not a positive integer
 */
function validatePositiveInteger(
  value: unknown,
  parameterName: string
): asserts value is number {
  validatePositiveNumber(value, parameterName);

  if (!Number.isInteger(value)) {
    throw new InvalidParameterError(
      parameterName,
      value,
      `Parameter '${parameterName}' must be an integer`
    );
  }
}

/**
 * Validates that an array is not null, undefined, or empty.
 *
 * @param array - The array to validate
 * @param parameterName - The name of the parameter for error reporting
 * @param allowEmpty - Whether to allow empty arrays (default: true)
 * @throws {InvalidParameterError} When array is invalid
 */
function validateArray<T>(
  array: T[] | null | undefined,
  parameterName: string,
  allowEmpty = true
): asserts array is T[] {
  validateNotNull(array, parameterName);

  if (!Array.isArray(array)) {
    throw new InvalidParameterError(
      parameterName,
      array,
      `Parameter '${parameterName}' must be an array`
    );
  }

  if (!allowEmpty && array.length === 0) {
    throw new InvalidParameterError(
      parameterName,
      array,
      `Parameter '${parameterName}' cannot be an empty array`
    );
  }
}

/**
 * Validates that a Date object is valid.
 *
 * @param date - The date to validate
 * @param parameterName - The name of the parameter for error reporting
 * @throws {InvalidParameterError} When date is invalid
 */
function validateDate(
  date: unknown,
  parameterName: string
): asserts date is Date {
  validateNotNull(date, parameterName);

  if (!(date instanceof Date)) {
    throw new InvalidParameterError(
      parameterName,
      date,
      `Parameter '${parameterName}' must be a Date object`
    );
  }

  if (isNaN(date.getTime())) {
    throw new InvalidParameterError(
      parameterName,
      date,
      `Parameter '${parameterName}' must be a valid Date (not NaN)`
    );
  }
}

/**
 * Validates that a DateRange object has valid start and end dates.
 *
 * @param range - The date range to validate
 * @param parameterName - The name of the parameter for error reporting
 * @throws {InvalidDateRangeError} When range is invalid
 */
function validateDateRange(
  range: unknown,
  parameterName = "range"
): asserts range is DateRange {
  validateNotNull(range, parameterName);

  if (typeof range !== "object" || range === null) {
    throw new InvalidDateRangeError(
      `Parameter '${parameterName}' must be an object with start and end properties`,
      range
    );
  }

  const rangeObj = range as Record<string, unknown>;

  // Validate start date
  if (!("start" in rangeObj)) {
    throw new InvalidDateRangeError(
      `Missing 'start' property in ${parameterName}`,
      range,
      "start"
    );
  }

  try {
    validateDate(rangeObj.start, `${parameterName}.start`);
  } catch (error) {
    if (error instanceof InvalidParameterError) {
      throw new InvalidDateRangeError(
        `Invalid start date in ${parameterName}: ${error.message}`,
        range,
        "start"
      );
    }
    throw error;
  }

  // Validate end date
  if (!("end" in rangeObj)) {
    throw new InvalidDateRangeError(
      `Missing 'end' property in ${parameterName}`,
      range,
      "end"
    );
  }

  try {
    validateDate(rangeObj.end, `${parameterName}.end`);
  } catch (error) {
    if (error instanceof InvalidParameterError) {
      throw new InvalidDateRangeError(
        `Invalid end date in ${parameterName}: ${error.message}`,
        range,
        "end"
      );
    }
    throw error;
  }

  // Validate that start <= end
  const typedRange = range as DateRange;
  if (typedRange.start.getTime() > typedRange.end.getTime()) {
    throw new InvalidDateRangeError(
      `Start date must be before or equal to end date in ${parameterName}`,
      range,
      "both"
    );
  }
}

/**
 * Validates an array of DateRange objects.
 *
 * @param ranges - The array of date ranges to validate
 * @param parameterName - The name of the parameter for error reporting
 * @param allowEmpty - Whether to allow empty arrays (default: true)
 * @throws {InvalidParameterError} When array is invalid
 * @throws {InvalidDateRangeError} When any range is invalid
 */
function validateDateRangeArray(
  ranges: unknown,
  parameterName = "ranges",
  allowEmpty = true
): asserts ranges is DateRange[] {
  validateArray(ranges as unknown[], parameterName, allowEmpty);

  const rangeArray = ranges as unknown[];
  rangeArray.forEach((range, index) => {
    validateDateRange(range, `${parameterName}[${index}]`);
  });
}

/**
 * Validates that a number is positive.
 *
 * @param value - The number to validate
 * @param parameterName - The name of the parameter for error reporting
 * @throws {InvalidParameterError} When number is invalid or not positive
 */
function validatePositiveNumber(
  value: unknown,
  parameterName: string
): asserts value is number {
  validateNotNull(value, parameterName);

  if (typeof value !== "number") {
    throw new InvalidParameterError(
      parameterName,
      value,
      `Parameter '${parameterName}' must be a number`
    );
  }

  if (isNaN(value)) {
    throw new InvalidParameterError(
      parameterName,
      value,
      `Parameter '${parameterName}' cannot be NaN`
    );
  }

  if (value <= 0) {
    throw new InvalidParameterError(
      parameterName,
      value,
      `Parameter '${parameterName}' must be a positive number`
    );
  }
}

export {
  validateNotNull,
  validateArray,
  validateDate,
  validateDateRange,
  validateDateRangeArray,
  validatePositiveNumber,
  validatePositiveInteger,
};
