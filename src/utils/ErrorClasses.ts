/**
 * Base error class for all TimeRangeUtils errors.
 *
 * This abstract class provides a foundation for all custom errors thrown by the TimeRangeUtils library.
 * It ensures consistent error handling and maintains proper stack traces across all error types.
 *
 * @abstract
 * @extends Error
 * @example
 * ```typescript
 * try {
 *   // TimeRangeUtils operation
 * } catch (error) {
 *   if (error instanceof TimeRangeUtilsError) {
 *     console.log('TimeRangeUtils error:', error.message);
 *   }
 * }
 * ```
 */
abstract class TimeRangeUtilsError extends Error {
  public readonly name: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Thrown when a date range has invalid start/end dates.
 *
 * This error is thrown when:
 * - Start or end dates are null, undefined, or invalid Date objects
 * - Start date is greater than end date
 * - Date objects contain NaN values
 *
 * @extends TimeRangeUtilsError
 * @example
 * ```typescript
 * try {
 *   TimeRangeUtils.mergeOverlap([{ start: new Date('invalid'), end: new Date() }]);
 * } catch (error) {
 *   if (error instanceof InvalidDateRangeError) {
 *     console.log('Invalid range:', error.invalidRange);
 *     console.log('Problem field:', error.field); // 'start', 'end', or 'both'
 *   }
 * }
 * ```
 */
class InvalidDateRangeError extends TimeRangeUtilsError {
  public readonly invalidRange: unknown;
  /** The specific field that caused the validation error: 'start', 'end', or 'both' */
  public readonly field?: "start" | "end" | "both";

  /**
   * Creates a new InvalidDateRangeError.
   *
   * @param message - Human-readable error description
   * @param invalidRange - The date range object that failed validation
   * @param field - Which field(s) caused the error: 'start', 'end', or 'both'
   */
  constructor(
    message: string,
    invalidRange: unknown,
    field?: "start" | "end" | "both"
  ) {
    super(message);
    this.invalidRange = invalidRange;
    this.field = field;
  }
}

/**
 * Thrown when method parameters are invalid.
 *
 * This error is thrown when:
 * - Required parameters are null or undefined
 * - Parameters have incorrect types
 * - Parameters have invalid values (e.g., negative numbers where positive expected)
 * - Array parameters are empty when non-empty arrays are required
 *
 * @extends TimeRangeUtilsError
 * @example
 * ```typescript
 * try {
 *   TimeRangeUtils.mergeOverlap(null); // null instead of array
 * } catch (error) {
 *   if (error instanceof InvalidParameterError) {
 *     console.log('Parameter name:', error.parameterName); // 'ranges'
 *     console.log('Invalid value:', error.parameterValue); // null
 *   }
 * }
 * ```
 */
class InvalidParameterError extends TimeRangeUtilsError {
  /** The name of the parameter that caused the error */
  public readonly parameterName: string;
  /** The actual value that was passed for the invalid parameter */
  public readonly parameterValue: unknown;

  /**
   * Creates a new InvalidParameterError.
   *
   * @param parameterName - The name of the invalid parameter
   * @param parameterValue - The actual value that was passed
   * @param message - Optional custom error message. If not provided, a default message is generated
   */
  constructor(
    parameterName: string,
    parameterValue: unknown,
    message?: string
  ) {
    super(message || `Invalid parameter '${parameterName}': ${parameterValue}`);
    this.parameterName = parameterName;
    this.parameterValue = parameterValue;
  }
}

export { TimeRangeUtilsError, InvalidDateRangeError, InvalidParameterError };
