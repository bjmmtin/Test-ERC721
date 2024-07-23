const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("ERC721Token", function () {
  let token;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const ERC721Token = await ethers.getContractFactory("ERC721Token");
    token = await upgrades.deployProxy(ERC721Token, [], { initializer: 'initialize' });
    await token.deployed();
  });

  it("Should mint tokens correctly", async function () {
    await await token.mint(owner.address, 5);
    for (let i = 0; i < 5; i++) {
      const tokenId = i;
      expect(await token.ownerOf(tokenId)).to.equal(owner.address);
    }
  });

  it("Should burn tokens when called by the owner", async function () {
    await token.mint(owner.address, 1);
    const tokenId = 0; // ID of the token we just minted

    await token.burn(tokenId);

    await expect(token.ownerOf(tokenId)).to.be.revertedWith("ERC721: invalid token ID");
  });

  it("Should fail to burn tokens when called by non-owner", async function () {
    await token.mint(owner.address, 1);
    const tokenId = 0; // ID of the token we just minted

    await expect(token.connect(addr1).burn(tokenId))
      .to.be.revertedWith("Ownable: caller is not the owner");
  });
});
