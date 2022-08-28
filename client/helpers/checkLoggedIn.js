import { origin } from "../config/config";

export default async function CheckLoggedIn() {
  const res = await fetch(`${origin}/api/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}
