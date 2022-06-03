import { AES, enc, PBKDF2, SHA256 } from "crypto-js";

export function hashPassword(password: string) {
  return SHA256(password).toString();
}

export function generateVaultKey({
  email,
  hashedPassword,
  salt,
}: {
  email: string;
  hashedPassword: string;
  salt: string;
}) {
  return PBKDF2(`${email}:${hashedPassword}`, salt, {
    keySize: 32,
  }).toString();
}

export function encryptVault({
  vault,
  vaultKey,
}: {
  vault: string;
  vaultKey: string;
}) {
  return AES.encrypt(vault, vaultKey).toString();
}

export function decryptVault({
  vault,
  vaultKey,
}: {
  vault: string;
  vaultKey: string;
}) {
  const bytes = AES.decrypt(vault, vaultKey);
  const decryptedVault = bytes.toString(enc.Utf8);

  try {
    return JSON.parse(decryptedVault).vault;
  } catch (error) {
    console.error("Error!", error);
    return null;
  }
}
