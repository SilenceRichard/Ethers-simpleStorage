const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();
async function main() {
  // 连接rpc
  console.log("Connecting to provider...", process.env.RPC_URL);
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const netWork = await provider.getNetwork();
  const chainId = netWork.chainId;
  console.log("Creating wallet...", "chainId:", chainId);
  const encryptJson = fs.readFileSync("./.encryptJsonKey.json", "utf8");
  let wallet = ethers.Wallet.fromEncryptedJsonSync(
    encryptJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = await wallet.connect(provider);
  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Reading ABI...");
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  console.log("Reading Bytecode...");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  console.log("Creating Contract Factory...");
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying Contract...");
  const contract = await contractFactory.deploy({ gasLimit: 6000000 });
  await contract.waitForDeployment();
  // GetNumber
  const curFavoriteNumber = await contract.retrieve();
  console.log(`Current Number: ${curFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store(7);
  await transactionResponse.wait(); // 等待交易完成
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated Number: ${updatedFavoriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Deployment failed with error:", e);
    process.exit(1);
  });
