import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: "#333";
  border: none;
  padding: 1rem 2rem;
  font-size: 1.6rem;
`;

function Button({ children }) {
  return <StyledButton>{children}</StyledButton>;
}

export default Button;
