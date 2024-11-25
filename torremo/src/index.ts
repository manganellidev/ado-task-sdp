import * as taskLib from "azure-pipelines-task-lib/task";
import path from "path";
import { consoleLog } from "./util/log";
import { callTorremoLibrary } from "./lib/torremo";

export async function run(): Promise<void> {
  try {
    consoleLog("run", "STARTED");
    taskLib.setResourcePath(path.join(__dirname, "..", "task.json"));

    const stepName = taskLib.getInput("stepName", true);
    if (!stepName) {
      throw new Error("Input required: stepName");
    }

    const flags = taskLib.getInput("flags", false) || "";

    await callTorremoLibrary(stepName, flags);

    taskLib.setResult(taskLib.TaskResult.Succeeded, "Torremo task succeeded");
  } catch (error) {
    taskLib.setResult(taskLib.TaskResult.Failed, (error as any).message);
  } finally {
    consoleLog("run", "FINISHED");
  }
}

run();
