import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Verifier", function () {
  async function deployFixture() {
    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy();

    return { verifier };
  }

  it("Should verify owner's api response", async function () {
    const { verifier } = await loadFixture(deployFixture);

    const ownerProof = require("../../server/owner.wav.api.response.json");
    const { instances, proof } = ownerProof;

    expect(await verifier.callStatic.verify(instances, proof)).to.be.true;
  });

  it("Should verify owner's api response", async function () {
    const { verifier } = await loadFixture(deployFixture);

    const ownerProof = require("../../server/owner.wav.api.response.json");
    const { instances, proof } = ownerProof;

    expect(
      await verifier.callStatic.verify(
        [
          BigInt(instances[0]) + 1n, // can manipulate...?
          instances[0],
        ],
        proof
      )
    ).to.be.true;
  });

  it("Should not verify other's api response", async function () {
    const { verifier } = await loadFixture(deployFixture);

    const ownerProof = require("../../server/other.wav.api.response.json");
    const { instances, proof } = ownerProof;

    expect(await verifier.callStatic.verify(instances, proof)).to.be.false;
  });
});
