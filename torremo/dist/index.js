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
function callTorremoLibrary(stepName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return null;
        }
        catch (error) {
            throw new Error(`Error calling torremo library binary: ${error.message}`);
        }
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        taskLib.setResourcePath(path_1.default.join(__dirname, "..", "task.json"));
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
        }
        catch (error) {
            taskLib.setResult(taskLib.TaskResult.Failed, error.message);
        }
    });
}
run();
