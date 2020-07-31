import { EmailValid } from "./email";

export const FormLoginValidator = (email: string, password: string) =>
  email.length === 0 || password.length === 0 || !EmailValid(email);
