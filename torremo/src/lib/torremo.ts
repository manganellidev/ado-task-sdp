// lib/torremo.ts
import * as taskLib from "azure-pipelines-task-lib/task";
import path from "path";
import fs from "fs";
import { consoleLog } from "../util/log";

export async function callTorremoLibrary(
  stepName: string,
  flags: string = ""
): Promise<void> {
  try {
    consoleLog("callTorremoLibrary", "STARTED");

    const torremoBinaryPath = path.join(
      process.cwd(),
      "torremo-lib-cache",
      "torremo"
    );
    fs.chmodSync(torremoBinaryPath, 0o755);

    consoleLog(
      "callTorremoLibrary",
      `\nTorremo Binary Path: ${torremoBinaryPath}\nStep Name: ${stepName}\nFlags: ${flags}`
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
      `Error calling Torremo library binary: ${(error as any).message}`
    );
  } finally {
    consoleLog("callTorremoLibrary", "FINISHED");
  }
}
