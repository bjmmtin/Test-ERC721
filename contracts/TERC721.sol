// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


/// @title Test ERC721 
/// @dev This contract is to mint and burn the ERC721token 
/// @author Michael Liu

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "hardhat/console.sol";
contract ERC721Token is Initializable, ERC721Upgradeable, OwnableUpgradeable {

    //in oerder to prevent increment and decrement overflow, use this
    //this is _tokenId
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIdCounter;

    function initialize() public initializer {
        __ERC721_init("Test ERC721", "TERC721");
        __Ownable_init();
    }

    function mint(address to, uint256 numberOfTokens) external  {
        for (uint256 i = 0; i < numberOfTokens; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            // console.log(tokenId);
            _mint(to, tokenId);
            _tokenIdCounter.increment();
        }
    }

    function burn(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }
}
