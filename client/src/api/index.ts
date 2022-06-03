import axios from "axios";

const USERS_BASEURL = `${process.env.NEXT_PUBLIC_API_BASEURL}/api/users`;
const VAULT_BASEURL = `${process.env.NEXT_PUBLIC_API_BASEURL}/api/vault`;

export function registerUser(payload: {
  hashedPassword: string;
  email: string;
}) {
  return axios
    .post<{ salt: string; vault: string }>(USERS_BASEURL, payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

export function saveVault({ encryptedVault }: { encryptedVault: string }) {
  return axios
    .put(VAULT_BASEURL, { encryptedVault }, { withCredentials: true })
    .then((res) => res.data);
}
