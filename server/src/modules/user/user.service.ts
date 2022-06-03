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
