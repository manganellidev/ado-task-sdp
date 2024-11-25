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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callTorremoLibrary = callTorremoLibrary;
const taskLib = __importStar(require("azure-pipelines-task-lib/task"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const log_1 = require("./util/log");
function callTorremoLibrary(stepName_1) {
    return __awaiter(this, arguments, void 0, function* (stepName, flags = "") {
        try {
            (0, log_1.consoleLog)("[callTorremoLibrary]", "STARTED");
            const torremoBinaryPath = path_1.default.join(process.cwd(), "torremo-lib-cache", "torremo");
            fs_1.default.chmodSync(torremoBinaryPath, 0o755);
            (0, log_1.consoleLog)("[callTorremoLibrary]", `\ntorremoBinaryPath: ${torremoBinaryPath}
      stepName: ${stepName}
      flags: ${flags}
      `);
            const torremoResult = taskLib
                .tool(torremoBinaryPath)
                .arg(stepName)
                .line(flags)
                .execSync();
            if (torremoResult.code !== 0) {
                throw new Error(`Torremo library binary failed with exit code ${torremoResult.code}`);
            }
        }
        catch (error) {
            throw new Error(`Error calling torremo library binary: ${error.message}`);
        }
        finally {
            (0, log_1.consoleLog)("[callTorremoLibrary]", "FINISHED");
        }
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, log_1.consoleLog)("[run]", "STARTED");
            taskLib.setResourcePath(path_1.default.join(__dirname, "..", "task.json"));
            const stepName = taskLib.getInput("stepName", true);
            if (!stepName) {
                throw new Error("Input required: stepName");
            }
            const flags = taskLib.getInput("flags", false);
            yield callTorremoLibrary(stepName, flags);
            taskLib.setResult(taskLib.TaskResult.Succeeded, "Torremo task succeeded");
        }
        catch (error) {
            taskLib.setResult(taskLib.TaskResult.Failed, error.message);
        }
        finally {
            (0, log_1.consoleLog)("[run]", "FINISHED");
        }
    });
}
run();
