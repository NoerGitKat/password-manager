import { FastifyReply, FastifyRequest } from "fastify";
import { COOKIE_DOMAIN } from "../../constants";
import { generateSalt } from "../../utils";
import { createVaultService, findVaultByUserId } from "../vault/vault.service";
import {
  createUserService,
  findUserByEmailAndPasswordService,
} from "./user.service";

export async function registerUser(
  request: FastifyRequest<{
    Body: Parameters<typeof createUserService>[number];
  }>,
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

export async function loginUser(
  request: FastifyRequest<{
    Body: Parameters<typeof findUserByEmailAndPasswordService>[number];
  }>,
  reply: FastifyReply,
) {
  try {
    const user = await findUserByEmailAndPasswordService(request.body);
    if (!user)
      return reply.status(401).send({ message: "Invalid email or password" });

    const vault = await findVaultByUserId(user._id);

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

    return reply
      .code(200)
      .send({ accessToken, vault: vault?.data, salt: vault?.salt });
  } catch (error) {
    console.error("Error!", error);
    return reply.code(500).send({ error: error });
  }
}
