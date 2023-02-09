/**
 * Import ethereum-cryptography/secp256k1
 * Import ethereum-cryptography/keccak
 * Import ethereum-cryptography/utils hexToBytes toHex
 */

/**
 * Create a simulated MetaMask wallet that
 * generates new accounts having private and public keys
 * includes functions to cryptographically sign transactions
 * exports list of accounts and functions
 */

// Map of accounts and keys

/**
 * Create a new account
 * generate a random private key
 * derive a public key from the private key
 * derive an account as an address starting with '0x'
 * set an account and its keys within the map of accounts
 */

// List of accounts as addresses starting with '0x'

// Get the account private key from map of accounts

// Get the account public key in hex format from map of accounts

// Get the address in hex format without '0x' from the account public key

// Generate a random private key

// Derive a public key from a private key

// Derive an address without '0x' from a public key

/**
 * Hash a message using KECCAK-256 
 * @param message message to hash
 * @returns the hash of the message
*/

/**
 * Sign a message
 * @param account name of the account
 * @param message message to sign
 * @returns signature in hex format with recovery bit as first byte
 */

// 
/**
 * Export 
 * list of accounts 
 * function to create new wallet
 * function to sign a message
 * function to get account address
 * function to get account public key in hex format
 */