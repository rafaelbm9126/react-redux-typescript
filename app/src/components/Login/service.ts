import axios from "axios";
import { AttributeResponse, FormLogin, SessionDataLogin } from "./type";
import { successLoginHidrate } from "./hidrate";

export const LoginService = async (
  form: FormLogin
): Promise<SessionDataLogin> => {
  const response = await axios.post<AttributeResponse>("/api/login_user", {
    email: form.email,
    password: form.password,
  });
  return successLoginHidrate(response);
};

export const LogOutSession = async (token: string): Promise<void> => {
  await axios.post<{}>(
    "/api/logout_user",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
