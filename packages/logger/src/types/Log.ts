import type { EnvironmentVariablesService } from '../config/EnvironmentVariablesService.js';
import type { LogItem } from '../formatter/LogItem.js';
import type { UnformattedAttributes } from './Logger.js';
import { LogLevel } from '../constants.js';

type LogLevel =
  | (typeof LogLevel)[keyof typeof LogLevel]
  | Lowercase<(typeof LogLevel)[keyof typeof LogLevel]>;

type LogLevelThresholds = {
  [key in Uppercase<LogLevel>]: number;
};

type LogAttributeValue = unknown;
type LogAttributes = { [key: string]: LogAttributeValue };

type LogAttributesWithMessage = LogAttributes & {
  message: string;
};

type Environment = 'dev' | 'local' | 'staging' | 'prod' | string;

type PowertoolsLog = LogAttributes & {
  /**
   * Timestamp of actual log statement.
   *
   * @example "2020-05-24 18:17:33,774"
   */
  timestamp?: string;

  /**
   * Log level
   *
   * @example "INFO"
   */
  level?: LogLevel;

  /**
   * Service name defined.
   *
   * @example "payment"
   */
  service: string;

  /**
   * The value of the logging sampling rate in percentage.
   *
   * @example 0.1
   */
  sampling_rate?: number;

  /**
   * Log statement value. Unserializable JSON values will be cast to string.
   *
   * @example "Collecting payment"
   */
  message?: string;

  /**
   * X-Ray Trace ID set by the Lambda runtime.
   *
   * @example "1-5759e988-bd862e3fe1be46a994272793"
   */
  xray_trace_id?: string;

  /**
   * Indicates whether the current execution experienced a cold start.
   *
   * @example false
   */
  cold_start?: boolean;

  /**
   * The name of the Lambda function.
   *
   * @example "example-powertools-HelloWorldFunction-1P1Z6B39FLU73"
   */
  lambda_function_name?: string;

  /**
   * The memory size of the Lambda function.
   *
   * Description:
   * Example: 128
   */
  lambda_function_memory_size?: number;

  /**
   * lambda_function_arn
   *
   * Description: The ARN of the Lambda function.
   * Example: "arn:aws:lambda:eu-west-1:012345678910:function:example-powertools-HelloWorldFunction-1P1Z6B39FLU73"
   */
  lambda_function_arn?: string;

  /**
   * lambda_request_id
   *
   * Description: The request ID of the current invocation.
   * Example: "899856cb-83d1-40d7-8611-9e78f15f32f4"
   */
  lambda_request_id?: string;
};

interface LogItemInterface {
  addAttributes(attributes: LogAttributes): void;
  getAttributes(): LogAttributes;
  prepareForPrint(): void;
  removeEmptyKeys(attributes: LogAttributes): LogAttributes;
  setAttributes(attributes: LogAttributes): void;
}

type LogFormatterOptions = {
  /**
   * EnvironmentVariablesService instance.
   * If set, it gives the LogFormatter access to environment variables.
   */
  envVarsService?: EnvironmentVariablesService;
};

/**
 * @interface
 */
interface LogFormatterInterface {
  /**
   * It formats key-value pairs of log attributes.
   *
   * @param {UnformattedAttributes} attributes
   * @param {LogAttributes} additionalLogAttributes
   * @returns {LogItem}
   */
  formatAttributes(
    attributes: UnformattedAttributes,
    additionalLogAttributes: LogAttributes
  ): LogItem;

  /**
   * It formats a given Error parameter.
   *
   * @param {Error} error
   * @returns {LogAttributes}
   */
  formatError(error: Error): LogAttributes;

  /**
   * It formats a date into a string in simplified extended ISO format (ISO 8601).
   *
   * @param {Date} now
   * @returns {string}
   */
  formatTimestamp(now: Date): string;

  /**
   * It returns a string containing the location of an error, given a particular stack trace.
   *
   * @param stack
   * @returns {string}
   */
  getCodeLocation(stack?: string): string;
}

export type {
  LogAttributesWithMessage,
  LogAttributeValue,
  Environment,
  LogLevelThresholds,
  LogAttributes,
  LogLevel,
  PowertoolsLog,
  LogItemInterface,
  LogFormatterOptions,
  LogFormatterInterface,
};
