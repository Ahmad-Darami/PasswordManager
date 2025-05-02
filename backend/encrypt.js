import {ethers} from 'ethers';


//signer will become available from ethers

export const getEncryptionKey = async (signer) => {
    const SignedMessage = await signer.signMessage('Blockpass Key Generation')
    // after this, a signed message should appear.

    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(SignedMessage));

}

// Encrypt text using derived key

export const encryptText = async (text, signer) => {
  const key = await getEncryptionKey(signer);
  const textBytes = ethers.utils.toUtf8Bytes(text);
  const encryptedBytes = textBytes.map((b, i) =>
    b ^ parseInt(key.slice(2 + (i % 64), 4 + (i % 64)), 16)
  );
  return ethers.utils.hexlify(encryptedBytes);
};

// Decrypt text using derived key
export const decryptText = async (hex, signer) => {
  const key = await getEncryptionKey(signer);
  const encryptedBytes = ethers.utils.arrayify(hex);
  const decryptedBytes = encryptedBytes.map((b, i) =>
    b ^ parseInt(key.slice(2 + (i % 64), 4 + (i % 64)), 16)
  );
  return ethers.utils.toUtf8String(decryptedBytes);
};