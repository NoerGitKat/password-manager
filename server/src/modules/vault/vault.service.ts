import { VaultModel } from "./vault.model";

export function createVaultService(input: { user: string; salt: string }) {
  return VaultModel.create(input);
}

export function updateVaultService({
  userId,
  data,
}: {
  userId: string;
  data: string;
}) {
  return VaultModel.updateOne({ user: userId }, { data });
}
