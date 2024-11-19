import * as taskLib from "azure-pipelines-task-lib/task";
import path from "path";

export async function callTorremoLibrary(stepName: string) {
  try {
    return null;
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

    console.log(`stepName: ${stepName}`);
    console.log(`flags: ${flags}`);
    console.log(`torremoVersion: ${torremoVersion}`);
    console.log(`gitHubConnection: ${gitHubConnection}`);

    // const result = await callTorremoLibrary(stepName);
    // console.log(`Result: ${result}`);

    taskLib.setResult(taskLib.TaskResult.Succeeded, "Torremo task succeeded");
  } catch (error) {
    taskLib.setResult(taskLib.TaskResult.Failed, (error as any).message);
  }
}

run();
