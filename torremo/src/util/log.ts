type LogLevel = "info" | "warn" | "error";

export function consoleLog(
  prefix: string,
  message: string,
  level: LogLevel = "info",
  includeTimestamp: boolean = false
): void {
  const timestamp = includeTimestamp ? new Date().toISOString() + " " : "";
  const logMessage = `${timestamp}${prefix} ${message}`;

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
      console.log(logMessage);
  }
}
