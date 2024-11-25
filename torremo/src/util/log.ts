type LogLevel = "info" | "warn" | "error";

export function consoleLog(
  prefix: string,
  message: string,
  options: { level?: LogLevel; includeTimestamp?: boolean } = {}
): void {
  const { level = "info", includeTimestamp = false } = options;
  const timestamp = includeTimestamp ? `[${new Date().toISOString()}] ` : "";
  const logMessage = `${timestamp}[${prefix}] ${message}`;

  switch (level) {
    case "info":
      console.info(logMessage);
      break;
    case "warn":
      console.warn(logMessage);
      break;
    case "error":
      console.error(logMessage);
      break;
    default:
      throw new Error(`Unsupported log level: ${level}`);
  }
}
