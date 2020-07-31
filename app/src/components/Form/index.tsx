import React from "react";
import { FormGeneric } from "./styled";

interface Props {
  submit: Function;
  prevent: boolean;
}

export const Form: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <FormGeneric
        onSubmit={(e: React.FormEvent<{}>) => {
          props.submit(e);
          props.prevent && e.preventDefault();
        }}
      >
        {props.children}
      </FormGeneric>
    </>
  );
};
