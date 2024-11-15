import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export async function greetGo(name: string) {
  try {
    const { stdout } = await execFileAsync("./torremo-library", [name]);
    return stdout.trim();
  } catch (error) {
    throw new Error(`Error calling greet binary: ${(error as any).message}`);
  }
}
