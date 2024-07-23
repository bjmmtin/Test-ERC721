
const { ethers, upgrades } = require("hardhat");

async function main() {
  const ERC721Token = await ethers.getContractFactory("ERC721Token");
  const token = await upgrades.deployProxy(ERC721Token, [], { initializer: 'initialize' });
  await token.deployed();
  console.log("ERC721Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });