import axios from "axios";

const USERS_BASEURL = `${process.env.NEXT_PUBLIC_API_BASEURL}/api/users`;

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
