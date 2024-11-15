"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = greet;
exports.greetGo = greetGo;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
function greet(name) {
    return `Hello, ${name}!`;
}
async function greetGo(name) {
    try {
        const { stdout } = await execFileAsync("./torremo-library", [name]);
        return stdout.trim();
    }
    catch (error) {
        throw new Error(`Error calling greet binary: ${error.message}`);
    }
}
//# sourceMappingURL=index-test.js.map