import { FastifyReply, FastifyRequest } from "fastify";
import { get } from "lodash";
import { updateVaultService } from "./vault.service";

export async function updateVault(
  request: FastifyRequest<{ Body: { encryptedVault: string } }>,
  reply: FastifyReply,
) {
  const userId = get(request, "user._id");
  try {
    await updateVaultService({ data: request.body.encryptedVault, userId });
    return reply.code(200).send("Vault successfully updated!");
  } catch (error: any) {
    return reply.code(500).send(`Error! ${error}`);
  }
}
