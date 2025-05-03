pragma solidity ^0.8.0;

contract SecretStore {

    struct packet {
        string ipfsHash;
        string tag;  //beta function to store a hint on what this password is for
        uint256 timestamp;
    }

    struct noteStore {
        string ipfsHash;
        string DecodedHint; 
        uint256 timestamp;
    }

    mapping(address => packet[]) private userPasswords; //Maps entries to an address

    mapping(address => noteStore[]) private userNotes; //Maps entries to an address

    function upload(string calldata ipfsHash, string calldata tag) external {

        string memory finalTag;

        if (keccak256(bytes(tag)) == keccak256(bytes(""))) {
            finalTag = "unsorted";
        } else {
            finalTag = tag;
        }
        userPasswords[msg.sender].push(packet(ipfsHash, finalTag, block.timestamp));
    }

    function StoreSecretNote(string calldata ipfsHash, string calldata DecodedHint) external {
        userNotes[msg.sender].push(noteStore(ipfsHash,DecodedHint,block.timestamp));
    }


    function searchPasswordByTag(string calldata term) external view returns (packet[] memory) {
    packet[] memory allEntries = userPasswords[msg.sender];
        uint count = 0;

        // First pass: count matches to allocate array
        for (uint i = 0; i < allEntries.length; i++) {
            if (keccak256(bytes(allEntries[i].tag)) == keccak256(bytes(term))) {
                count++;
            }
        }
        packet[] memory results = new packet[](count);
        uint j = 0;

        // Second pass: store the matching results
        for (uint i = 0; i < allEntries.length; i++) {
            if (keccak256(bytes(allEntries[i].tag)) == keccak256(bytes(term))) {
                results[j] = allEntries[i];
                j++;
            }
        }

        return results;
    }


    function viewPasswords() external view returns (packet[] memory) {
        return userPasswords[msg.sender];
    }

    function viewNotes() external view returns (noteStore[] memory) {
        return userNotes[msg.sender];
    }

    function deleteAll() external {
    delete userPasswords[msg.sender];
    delete userNotes[msg.sender];
    }

}

