import { execFile } from "child_process";
import { promisify } from "util";
import * as taskLib from "azure-pipelines-task-lib/task";
import path from "path";

const execFileAsync = promisify(execFile);

export async function callTorremoLibrary(stepName: string) {
  try {
    const { stdout } = await execFileAsync("./torremo-library", [stepName]);
    return stdout.trim();
  } catch (error) {
    throw new Error(
      `Error calling torremo library binary: ${(error as any).message}`
    );
  }
}

async function run(): Promise<void> {
  taskLib.setResourcePath(path.join(__dirname, "..", "task.json"));
  try {
    const stepName = taskLib.getInput("stepName", true);

    if (!stepName) {
      throw new Error("Input required: stepName");
    }

    const flags = taskLib.getInput("flags", false);
    const torremoVersion = taskLib.getInput("torremoVersion", false);
    const gitHubConnection = taskLib.getInput("gitHubConnection", false);

    taskLib.debug(`stepName: ${stepName}`);
    taskLib.debug(`flags: ${flags}`);
    taskLib.debug(`torremoVersion: ${torremoVersion}`);
    taskLib.debug(`gitHubConnection: ${gitHubConnection}`);

    const result = await callTorremoLibrary(stepName);
    taskLib.debug(`Result: ${result}`);

    taskLib.setResult(taskLib.TaskResult.Succeeded, result);
  } catch (error) {
    taskLib.setResult(taskLib.TaskResult.Failed, (error as any).message);
  }
}

run();
