/**
 * Import ethereum-cryptography/secp256k1
 * Import ethereum-cryptography/keccak
 * Import ethereum-cryptography/utils hexToBytes toHex
 */
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";

/**
 * Create a simulated MetaMask wallet that
 * generates new accounts having private and public keys
 * includes functions to cryptographically sign transactions
 * exports list of accounts and functions
 */

// Map of accounts and keys
const ACCOUNT_KEYS = new Map();

// List of accounts as addresses starting with '0x'
const ACCOUNTS = new Array();

/**
 * Create a new account
 * generate a random private key
 * derive a public key from the private key
 * derive an account as an address starting with '0x'
 * set an account and its keys within the map of accounts
 */
const newAccount = () => {

    const privateKey = secp.utils.randomPrivateKey();
    //console.log(privateKey);
    const publicKey = secp.getPublicKey(privateKey);
    console.log(publicKey);
    const address = toHex(keccak256(publicKey.slice(1).slice(-20)));
    //console.log(address);
    const account = "0x" + address.toString();

    ACCOUNT_KEYS.set(account, {private: toHex(privateKey), public: toHex(publicKey)});
    ACCOUNTS.push(account);
}

// Get the account private key from map of accounts
const getPrivateKey = (account) => {
    if(!account) return null
    return hexToBytes(ACCOUNT_KEYS.get(account).private);
}

// Get the account public key in hex format from map of accounts
const getPublicKey = (account) => {
    if(!account) return null
    return hexToBytes(ACCOUNT_KEYS.get(account).public);
    
}

/**
 * Get the public key of an acount in hexa format.
 * @param account the account.
 * @returns the public key.
 */
const getHexPubKey = (account) => {
    if (!account) return null;
    return toHex(getPublicKey(account));
  };

/**
 * Hash a message using KECCAK-256 
 * @param message message to hash
 * @returns the hash of the message
*/
const hashMessage = (message) => keccak256(Uint8Array.from(message));

/**
 * Sign a message
 * @param account name of the account
 * @param message message to sign
 * @returns signature in hex format with recovery bit as first byte
 */

const sign = async (account, message) => {
    const privateKey = getPrivateKey(account);
    const hash = hashMessage(message);
  
    const [signature, recoveryBit] = await secp.sign(hash, privateKey, {
      recovered: true,
    });
    const fullSignature = new Uint8Array([recoveryBit, ...signature]);
    return toHex(fullSignature);
  }

// 
/**
 * Export 
 * list of accounts 
 * function to create new wallet
 * function to sign a message
 * function to get account address
 * function to get account public key in hex format
 */
const wallet = {
    ACCOUNTS,
    newAccount,
    sign,
    getHexPubKey,
  };
  export default wallet;