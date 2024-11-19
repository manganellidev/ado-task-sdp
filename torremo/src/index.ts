import * as taskLib from "azure-pipelines-task-lib/task";
import path from "path";
import fs from "fs";

export async function callTorremoLibrary(
  stepName: string,
  flags: string = "",
  torremoVersion: string = "",
  gitHubConnection: string = ""
): Promise<void> {
  try {
    console.log("Calling torremo library binary");

    const torremoBinaryPath = path.join(
      process.cwd(),
      "sdp-go-lib-cache",
      "concur-sdp-go-library-0.0.2"
    );
    fs.chmodSync(torremoBinaryPath, 0o755);

    let files = fs.readdirSync(process.cwd());
    console.log(`Files in directory "${process.cwd()}":`);
    files.forEach((file) => {
      const fullPath = path.join(process.cwd(), file);
      const isDirectory = fs.statSync(fullPath).isDirectory();
      console.log(`${file} ${isDirectory ? "(Directory)" : "(File)"}`);
    });

    const dirCache = path.join(process.cwd(), "sdp-go-lib-cache");
    files = fs.readdirSync(dirCache);
    console.log(`Files in directory "${dirCache}":`);
    files.forEach((file) => {
      const fullPath = path.join(dirCache, file);
      const isDirectory = fs.statSync(fullPath).isDirectory();
      console.log(`${file} ${isDirectory ? "(Directory)" : "(File)"}`);
    });

    const torremoArgs = ["run", stepName, "--flags", flags];

    console.log(`torremoBinaryPath: ${torremoBinaryPath}`);
    console.log(`torremoArgs: ${torremoArgs}`);

    const torremoResult = taskLib.execSync(torremoBinaryPath, torremoArgs);
    if (torremoResult.code !== 0) {
      throw new Error(
        `Torremo library binary failed with exit code ${torremoResult.code}`
      );
    }
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

    await callTorremoLibrary(stepName, flags, torremoVersion, gitHubConnection);

    taskLib.setResult(taskLib.TaskResult.Succeeded, "Torremo task succeeded");
  } catch (error) {
    taskLib.setResult(taskLib.TaskResult.Failed, (error as any).message);
  }
}

run();
