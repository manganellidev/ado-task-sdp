"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callTorremoLibrary = callTorremoLibrary;
const child_process_1 = require("child_process");
const util_1 = require("util");
const taskLib = __importStar(require("azure-pipelines-task-lib/task"));
const path_1 = __importDefault(require("path"));
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
async function callTorremoLibrary(stepName) {
    try {
        const { stdout } = await execFileAsync("./torremo-library", [stepName]);
        return stdout.trim();
    }
    catch (error) {
        throw new Error(`Error calling torremo library binary: ${error.message}`);
    }
}
async function run() {
    taskLib.setResourcePath(path_1.default.join(__dirname, "..", "task.json"));
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
    }
    catch (error) {
        taskLib.setResult(taskLib.TaskResult.Failed, error.message);
    }
}
run();
//# sourceMappingURL=index.js.map