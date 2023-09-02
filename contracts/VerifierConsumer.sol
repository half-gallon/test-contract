// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Verifier.sol";

contract VerifierConsumer is Verifier {
    function isOwner(bytes calldata proof) public view returns (bool) {
        return
            this.verify(
                [
                    uint(1), // [0] is true if it's owner's voice
                    uint(0) // [1] is true if it's other's voice
                ],
                proof
            );
    }

    function isOther(bytes calldata proof) public view returns (bool) {
        return
            this.verify(
                [
                    uint(0), // [0] is true if it's owner's voice
                    uint(1) // [1] is true if it's other's voice
                ],
                proof
            );
    }
}
