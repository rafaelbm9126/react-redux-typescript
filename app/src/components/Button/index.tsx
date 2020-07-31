import React from "react";
import { WrapperButton, ButtonComponent } from "./styled";

interface Props {
  text: string;
  type: "button" | "submit";
  click?: Function;
}

export const Button: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <WrapperButton>
        <ButtonComponent
          type={props.type}
          onClick={() => (props.click ? props.click() : null)}
        >
          {props.text}
        </ButtonComponent>
      </WrapperButton>
    </>
  );
};
