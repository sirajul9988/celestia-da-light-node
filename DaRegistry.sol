// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/**
 * @title DaRegistry
 * @dev On-chain contract to anchor reference coordinates pointing to the data posted on Celestia.
 */
contract DaRegistry {
    address public operator;
    
    struct BlockCommitment {
        uint256 celestiaBlockHeight;
        bytes32 dataRoot;
        bytes namespaceId;
    }

    mapping(uint256 => BlockCommitment) public commitments;
    uint256 public totalBlocksCommitted;

    event DataRootAnchored(uint256 indexed localBlock, uint256 celestiaHeight, bytes32 dataRoot);

    constructor() {
        operator = msg.sender;
    }

    /**
     * @notice Securely logs data availability proofs to establish absolute historical transparency.
     */
    function anchorDataCommitment(
        uint256 localBlockNumber,
        uint256 celestiaHeight,
        bytes32 dataRoot,
        bytes calldata namespaceId
    ) external {
        require(msg.sender == operator, "Unauthorized anchor operator execution path");
        
        commitments[localBlockNumber] = BlockCommitment({
            celestiaBlockHeight: celestiaHeight,
            dataRoot: dataRoot,
            namespaceId: namespaceId
        });
        
        totalBlocksCommitted++;
        emit DataRootAnchored(localBlockNumber, celestiaHeight, dataRoot);
    }
}
