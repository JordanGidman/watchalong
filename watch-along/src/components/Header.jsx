import styled from "styled-components";
import Button from "./Button";

const StyledHeader = styled.header`
  width: 100%;
  height: 10vh;
  padding: 2rem 10%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  /* background-color: var(--color-grey-800); */

  z-index: 999;
`;

function Header() {
  return (
    <StyledHeader>
      <div>Logo</div>
      <Button>create room</Button>
    </StyledHeader>
  );
}

export default Header;
