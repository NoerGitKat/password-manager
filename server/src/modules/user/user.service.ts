import { UserModel } from "./user.model";

export async function createUser(input: {
  hashedPassword: string;
  email: string;
}) {
  return UserModel.create(input);
}
