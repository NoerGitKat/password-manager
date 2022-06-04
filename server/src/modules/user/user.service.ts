import argon2 from "argon2";
import { UserModel } from "./user.model";

export async function createUserService({
  hashedPassword,
  email,
}: {
  hashedPassword: string;
  email: string;
}) {
  return UserModel.create({ password: hashedPassword, email });
}

async function generateHashService(password: string) {
  return argon2.hash(password);
}

export async function findUserByEmailAndPasswordService({
  email,
  hashedPassword,
}: {
  email: string;
  hashedPassword: string;
}) {
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) return null;

  const hash = await generateHashService(hashedPassword);
  if (!argon2.verify(foundUser.password, hash)) return null;

  return foundUser;
}
