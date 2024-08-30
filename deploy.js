"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// const ethers = require("ethers");
// const fs = require("fs");
// require("dotenv").config();
var ethers_1 = require("ethers");
var fs_1 = require("fs");
require("dotenv/config");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var provider, netWork, chainId, encryptJson, wallet, abi, binary, contractFactory, contract, contractReceipt, contractAddress, curFavoriteNumber, transactionResponse, updatedFavoriteNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 连接rpc
                    console.log("Connecting to provider...", process.env.RPC_URL);
                    provider = new ethers_1.default.JsonRpcProvider(process.env.RPC_URL);
                    return [4 /*yield*/, provider.getNetwork()];
                case 1:
                    netWork = _a.sent();
                    chainId = netWork.chainId;
                    console.log("Creating wallet...", "chainId:", chainId);
                    encryptJson = fs_1.default.readFileSync("./.encryptJsonKey.json", "utf8");
                    wallet = ethers_1.default.Wallet.fromEncryptedJsonSync(encryptJson, process.env.PRIVATE_KEY_PASSWORD);
                    return [4 /*yield*/, wallet.connect(provider)];
                case 2:
                    wallet = _a.sent();
                    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
                    console.log("Reading ABI...");
                    abi = fs_1.default.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
                    console.log("Reading Bytecode...");
                    binary = fs_1.default.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
                    console.log("Creating Contract Factory...");
                    contractFactory = new ethers_1.default.ContractFactory(abi, binary, wallet);
                    console.log("Deploying Contract...");
                    return [4 /*yield*/, contractFactory.deploy({ gasLimit: 6000000 })];
                case 3:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.waitForDeployment()];
                case 4:
                    contractReceipt = _a.sent();
                    return [4 /*yield*/, contract.getAddress()];
                case 5:
                    contractAddress = _a.sent();
                    console.log("Contract address: ".concat(contractAddress));
                    return [4 /*yield*/, contract.retrieve()];
                case 6:
                    curFavoriteNumber = _a.sent();
                    console.log("Current Number: ".concat(curFavoriteNumber.toString()));
                    return [4 /*yield*/, contract.store(7)];
                case 7:
                    transactionResponse = _a.sent();
                    return [4 /*yield*/, transactionResponse.wait()];
                case 8:
                    _a.sent(); // 等待交易完成
                    return [4 /*yield*/, contract.retrieve()];
                case 9:
                    updatedFavoriteNumber = _a.sent();
                    console.log("Updated Number: ".concat(updatedFavoriteNumber.toString()));
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return process.exit(0); })
    .catch(function (e) {
    console.error("Deployment failed with error:", e);
    process.exit(1);
});
