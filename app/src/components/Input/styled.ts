import styled from "styled-components";

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 250px;
  height: fit-content;
`;

interface MessageErrorProps {
  error: boolean;
}

export const MessageError = styled.span<MessageErrorProps>`
  display: ${(props: MessageErrorProps) => props.error ? 'block' : 'none'};
  font-size: 10px;
  color: red;
  &::before {
      content: '* ';
  }
`;

export const WrapperInput = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

export const InputComponent = styled.input`
  width: 100%;
  border: 0;
  outline: none;
`;

export const ImageOpenPass = styled.img`
  width: 22px;
  margin: 0 0 -5px 5px;
  cursor: pointer;
`;
