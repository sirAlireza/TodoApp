import styled from "styled-components";

export const AppButton = styled.button<{ $fontSize?: string }>`
  height: 100%;
  background: var(--bg-color);
  border: 2px solid var(--main-color);
  border-radius: 5px;
  padding: .5rem .5rem;
  transition: all 0.3s;
  font-weight: bold;
  font-size: ${props => props?.$fontSize || "12px"};
  &:hover {
    border: 2px solid black;
    color: white;
    background-color: black;
  }

  &:disabled {
    color: #666;
    background-color: white;
    border: 2px solid #666;
  }
`
export const Divider = styled.hr`
  width: 100%;
  border-bottom: 1px solid;
`