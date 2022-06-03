import { FastifyReply, FastifyRequest } from "fastify";
import { COOKIE_DOMAIN } from "../../constants";
import { generateSalt } from "../../utils";
import { createVaultService } from "../vault/vault.service";
import { createUserService } from "./user.service";

export async function registerUser(
  request: FastifyRequest<{ Body: Parameters<typeof createUser>[number] }>,
  reply: FastifyReply,
) {
  const { body } = request;

  try {
    const user = await createUserService(body);
    const salt = generateSalt();
    const vault = await createVaultService({ user: user._id, salt });
    const accessToken = await reply.jwtSign({
      _id: user._id,
      email: user.email,
    });
    reply.setCookie("jwt_token", accessToken, {
      domain: COOKIE_DOMAIN,
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: false,
    });

    return reply.code(201).send({ accessToken, vault: vault.data, salt });
  } catch (error) {
    console.error("Error!", error);
    return reply.code(500).send({ error: error });
  }
}
