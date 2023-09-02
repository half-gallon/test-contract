import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",

  // mocha: {
  //   bail: process.argv.includes("--bail") || process.argv.includes("-b"),
  // },
};

export default config;
