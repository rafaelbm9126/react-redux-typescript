import styled from "styled-components";

export const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 250px;
  height: auto;
  margin: 20px 0 0 0;
`;

export const ButtonComponent = styled.button`
  padding: 10px 20px;
  border: 1px solid lightgray;
  background-color: white;
  outline: none;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;
  }
  &:active {
    border-color: gray;
  }
`;
