import * as taskLib from "azure-pipelines-task-lib/task";
import fs from "fs";
import path from "path";
import { callTorremoLibrary } from "../../src/lib/torremo";

jest.mock("azure-pipelines-task-lib/task");
jest.mock("fs");
jest.mock("path");

describe("callTorremoLibrary", () => {
  let toolMock: jest.Mock;

  beforeEach(() => {
    toolMock = jest.fn(() => ({
      arg: jest.fn().mockReturnThis(),
      line: jest.fn().mockReturnThis(),
      execSync: jest.fn().mockReturnValue({ code: 0 }),
    }));
    jest.spyOn(taskLib, "tool").mockImplementation(toolMock);
    jest.spyOn(fs, "chmodSync").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call the Torremo binary with the correct arguments", async () => {
    const stepName = "testStep";
    const flags = "--flag1 --flag2";
    const binaryPath = "/mock/path/to/torremo";

    jest.spyOn(path, "join").mockReturnValue(binaryPath);

    await callTorremoLibrary(stepName, flags);

    expect(fs.chmodSync).toHaveBeenCalledWith(binaryPath, 0o755);
    expect(taskLib.tool).toHaveBeenCalledWith(binaryPath);
    const toolInstance = toolMock.mock.results[0].value;
    expect(toolInstance.arg).toHaveBeenCalledWith(stepName);
    expect(toolInstance.line).toHaveBeenCalledWith(flags);
    expect(toolInstance.execSync).toHaveBeenCalled();
  });

  it("should throw an error if the binary execution fails", async () => {
    toolMock = jest.fn(() => ({
      arg: jest.fn().mockReturnThis(),
      line: jest.fn().mockReturnThis(),
      execSync: jest.fn().mockReturnValue({ code: 1 }),
    }));
    jest.spyOn(taskLib, "tool").mockImplementation(toolMock);

    await expect(callTorremoLibrary("testStep")).rejects.toThrow(
      "Torremo library binary failed with exit code 1"
    );
  });
});
