import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Verifier", function () {
  async function deployFixture() {
    const VerifierConsumer = await ethers.getContractFactory("VerifierConsumer");
    const verifierConsumer = await VerifierConsumer.deploy();

    return { verifierConsumer };
  }

  it("Should verify owner's api response", async function () {
    const { verifierConsumer } = await loadFixture(deployFixture);

    const ownerProof = require("../../server/owner.wav.api.response.json");
    const { proof } = ownerProof;

    expect(await verifierConsumer.callStatic.isOwner(proof)).to.be.true;
    // // ^^^^^^ equivalent vvvvvvvvvv
    expect(await verifierConsumer.callStatic.verify([1, 0], proof)).to.be.true;
  });

  it("Should not verify other's api response", async function () {
    const { verifierConsumer } = await loadFixture(deployFixture);

    const ownerProof = require("../../server/other.wav.api.response.json");
    const { proof } = ownerProof;

    expect(await verifierConsumer.callStatic.isOwner(proof)).to.be.false;
    // ^^^^^^ equivalent vvvvvvvvvv
    expect(await verifierConsumer.callStatic.verify([1, 0], proof)).to.be.false;
  });
});
