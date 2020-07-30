import React from "react";
import {
  Input,
  InputPassword,
} from "components/index";

export const Home: React.FunctionComponent<{}> = () => {
  return (
    <>
      <Input
        placeholder="Email"
        change={(value) => console.log(value)}
      />
      <InputPassword
        placeholder="Password"
        change={(value) => console.log(value)}
      />
    </>
  );
};
