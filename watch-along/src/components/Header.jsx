import styled from "styled-components";
import Button from "./Button";

const StyledHeader = styled.header`
  width: 100%;
  height: 10vh;
  padding: 2rem 10%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  /* background-color: rgb(31, 41, 55, 0.4); */

  z-index: 999;
`;

function Header() {
  return (
    <StyledHeader>
      <div
        style={{
          fontSize: "2rem",
          color: "#fff",
        }}
      >
        Logo
      </div>
      <Button>Create room</Button>
    </StyledHeader>
  );
}

export default Header;
