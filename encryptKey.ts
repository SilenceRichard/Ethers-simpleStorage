import ethers from "ethers";
import fs from "fs";
import "dotenv/config";

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const encryptJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD!
    // process.env.PRIVATE_KEY
  );
  console.log(encryptJsonKey);
  fs.writeFileSync("./.encryptJsonKey.json", encryptJsonKey);
}
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
