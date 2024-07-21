import styled from "styled-components";
import Header from "../components/Header";

const StyledHome = styled.div`
  height: 100vh;
  width: 100vw;
  /* background-image: url("https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); */
  object-fit: cover;
  background-position: center;
  -webkit-backdrop-filter: blur(5px);

  backdrop-filter: blur(30px);
  overflow: hidden;
`;

const StyledMain = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 60%;
  width: 40%;

  background-color: var(--color-grey-800);
`;

const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  filter: brightness(70%);
`;

function Home() {
  return (
    <StyledHome>
      <StyledImg src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <Header />

      <StyledMain></StyledMain>
    </StyledHome>
  );
}

export default Home;
