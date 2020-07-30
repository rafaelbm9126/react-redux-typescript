import React from "react";
import {
  EmailValid,
  IsEmpty,
} from "helpers/index";
import {
  Field,
  MessageError,
  WrapperInput,
  InputComponent,
  ImageOpenPass,
} from "./styled";
import IconEyeOpen from "assets/images/open_eye.svg";
import IconEyeClose from "assets/images/close_eye.svg";

interface Props {
  placeholder: string;
  default?: string;
  change: (value: string) => void;
}

export const Input: React.FunctionComponent<Props> = (props) => {
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    props.change(value);
  }, [value]);
  return (
    <>
      <Field>
        <MessageError error={error}>Error email invalido</MessageError>
        <WrapperInput>
          <InputComponent
            type="text"
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              setError(!EmailValid(e.currentTarget.value));
              setValue(e.currentTarget.value);
            }}
            placeholder={props.placeholder}
            defaultValue={props.default} />
        </WrapperInput>
      </Field>
    </>
  );
}

export const InputPassword: React.FunctionComponent<Props> = (props) => {
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    props.change(value);
  }, [value]);
  return (
    <>
      <Field>
        <MessageError error={error}>Error campo requerido</MessageError>
        <WrapperInput>
          <InputComponent
            type={ open ? "text" : "password"}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              setError(IsEmpty(e.currentTarget.value));
              setValue(e.currentTarget.value);
            }}
            placeholder={props.placeholder}
            defaultValue={props.default} />
          <ImageOpenPass
            src={open ? IconEyeOpen : IconEyeClose}
            onClick={() => setOpen(!open)}
            alt="icon"
          />
        </WrapperInput>
      </Field>
    </>
  );
}
