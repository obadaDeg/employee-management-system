import { redirect } from "react-router-dom";
import { getAuthToken } from "./firebase-services";

export const loginLoader = async () => {
  const token = await getAuthToken();
  console.log(token);

  if (token) {
    return redirect("/");
  }
  return null;
};
