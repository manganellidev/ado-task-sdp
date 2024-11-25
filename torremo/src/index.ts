import * as taskLib from "azure-pipelines-task-lib/task";
import path from "path";
import fs from "fs";
import { consoleLog } from "./util/log";

export async function callTorremoLibrary(
  stepName: string,
  flags: string = ""
): Promise<void> {
  try {
    consoleLog("[callTorremoLibrary]", "STARTED");

    const torremoBinaryPath = path.join(
      process.cwd(),
      "torremo-lib-cache",
      "torremo"
    );
    fs.chmodSync(torremoBinaryPath, 0o755);

    consoleLog(
      "[callTorremoLibrary]",
      `\ntorremoBinaryPath: ${torremoBinaryPath}
      stepName: ${stepName}
      flags: ${flags}
      `
    );

    const torremoResult = taskLib
      .tool(torremoBinaryPath)
      .arg(stepName)
      .line(flags)
      .execSync();

    if (torremoResult.code !== 0) {
      throw new Error(
        `Torremo library binary failed with exit code ${torremoResult.code}`
      );
    }
  } catch (error) {
    throw new Error(
      `Error calling torremo library binary: ${(error as any).message}`
    );
  } finally {
    consoleLog("[callTorremoLibrary]", "FINISHED");
  }
}

async function run(): Promise<void> {
  try {
    consoleLog("[run]", "STARTED");
    taskLib.setResourcePath(path.join(__dirname, "..", "task.json"));

    const stepName = taskLib.getInput("stepName", true);
    if (!stepName) {
      throw new Error("Input required: stepName");
    }

    const flags = taskLib.getInput("flags", false);

    await callTorremoLibrary(stepName, flags);

    taskLib.setResult(taskLib.TaskResult.Succeeded, "Torremo task succeeded");
  } catch (error) {
    taskLib.setResult(taskLib.TaskResult.Failed, (error as any).message);
  } finally {
    consoleLog("[run]", "FINISHED");
  }
}

run();
