import CryptoJS from "crypto-js";

export const encryptedPassword = (
  cipherHelperName: keyof typeof CryptoJS,
  password: string,
  secretKey: string,
): string => {
  const cipherHelper = CryptoJS[cipherHelperName];

  if (
    !("encrypt" in cipherHelper) ||
    typeof cipherHelper?.encrypt !== "function"
  ) {
    throw new Error(`Unsupported cipher method: ${cipherHelperName}`);
  }

  const encrypted = cipherHelper.encrypt(password, secretKey);
  return encrypted.toString();
};
