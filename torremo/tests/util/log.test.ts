import { consoleLog } from "../../src/util/log";

describe("consoleLog", () => {
  let consoleInfoSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleInfoSpy = jest.spyOn(console, "info").mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should log an info message with the default options", () => {
    consoleLog("TestPrefix", "Test message");
    expect(consoleInfoSpy).toHaveBeenCalledWith("[TestPrefix] Test message");
  });

  it("should log a warning message", () => {
    consoleLog("TestPrefix", "Test warning", { level: "warn" });
    expect(consoleWarnSpy).toHaveBeenCalledWith("[TestPrefix] Test warning");
  });

  it("should log an error message", () => {
    consoleLog("TestPrefix", "Test error", { level: "error" });
    expect(consoleErrorSpy).toHaveBeenCalledWith("[TestPrefix] Test error");
  });

  it("should include a timestamp when includeTimestamp is true", () => {
    const now = new Date().toISOString();
    jest.useFakeTimers().setSystemTime(new Date(now));

    consoleLog("TestPrefix", "Message with timestamp", {
      includeTimestamp: true,
    });

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      `[${now}] [TestPrefix] Message with timestamp`
    );

    jest.useRealTimers();
  });

  it("should throw an error for unsupported log levels", () => {
    expect(() =>
      consoleLog("TestPrefix", "Unsupported log level", {
        level: "debug" as any,
      })
    ).toThrow("Unsupported log level: debug");
  });
});
