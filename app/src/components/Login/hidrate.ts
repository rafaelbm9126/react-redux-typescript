import { AxiosResponse } from "axios";
import { AttributeResponse, SessionDataLogin } from "./type";

export const successLoginHidrate = (
  response: AxiosResponse<AttributeResponse>
): SessionDataLogin => {
  const {
    data: { data },
  } = response;
  return {
    id: data.id,
    name: data.fullname,
    nickname: data.nickname,
    email: data.email,
    privileges: data.privileges,
    section: data.section,
    token: data.token,
  };
};
