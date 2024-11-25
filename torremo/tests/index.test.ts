import * as taskLib from "azure-pipelines-task-lib/task";
import { callTorremoLibrary } from "../src/lib/torremo";
import { run } from "../src/index";

jest.mock("azure-pipelines-task-lib/task", () => ({
  setResourcePath: jest.fn(),
  getInput: jest.fn((key: string) => {
    if (key === "stepName") return "testStep";
    if (key === "flags") return "--flag1";
    return undefined;
  }),
  setResult: jest.fn(),
  TaskResult: {
    Succeeded: "Succeeded",
    Failed: "Failed",
  },
}));

jest.mock("../src/lib/torremo");

describe("run", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the Torremo library and set the task result to succeeded", async () => {
    await run();

    expect(taskLib.setResourcePath).toHaveBeenCalled();
    expect(callTorremoLibrary).toHaveBeenCalledWith("testStep", "--flag1");
    expect(taskLib.setResult).toHaveBeenCalledWith(
      "Succeeded",
      "Torremo task succeeded"
    );
  });

  it("should set the task result to failed if an error occurs", async () => {
    (callTorremoLibrary as jest.Mock).mockRejectedValue(
      new Error("Mock Error")
    );

    await run();

    expect(taskLib.setResult).toHaveBeenCalledWith("Failed", "Mock Error");
  });
});
