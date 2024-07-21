import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #84ff84;
  color: #333;
  font-weight: 700;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.6rem;
`;

function Button({ onClick, children }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
