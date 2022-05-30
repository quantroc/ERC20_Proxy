const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test transfer proxy erc20",function () {

  let ERC20TransferProxy;
  let testProxy;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    ERC20TransferProxy = await ethers.getContractFactory("ERC20TransferProxy");

    testProxy = await ERC20TransferProxy.deploy();
    await testProxy.deployed;

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  });

  describe("Owner", function() {
    it("test add operator", async function () {
      await testProxy.__ERC20TransferProxy_init();
      await testProxy.addOperator(addr1.address);
      expect(await testProxy.operators[addr1.address]).to.equal(true);
      
      
    });
    it("test remove operator", async function () {
      await testProxy.__ERC20TransferProxy_init();
      await testProxy.removeOperator(addr1.address);
      expect(await testProxy.operators[addr1.address]).to.equal("false");
    });
    it("test ERC20TfProxy init", async function () {
      await testProxy.__ERC20TransferProxy_init(owner);
      expect(await testProxy.owner).to.equal(msg.sender.address);
    });
  });
})