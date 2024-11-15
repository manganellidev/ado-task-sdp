import { execFile } from "child_process";
import { promisify } from "util";
const execFileAsync = promisify(execFile);
export function greet(name) {
    return `Hello, ${name}!`;
}
export async function greetGo(name) {
    try {
        const { stdout } = await execFileAsync("./torremo-library", [name]);
        return stdout.trim();
    }
    catch (error) {
        throw new Error(`Error calling greet binary: ${error.message}`);
    }
}
//# sourceMappingURL=index-test.js.map