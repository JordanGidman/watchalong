import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import db from "../firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";

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
  height: 100%;
  width: 100%;
  padding: 6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const StyledBox = styled.div`
  background-color: rgb(31, 41, 55, 0.7);
  color: #fff;
  z-index: 999;
  height: 20vh;
  width: 30vw;

  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 2rem;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  filter: brightness(70%);
  z-index: -999;
`;

const H1 = styled.h1`
  font-size: 1.6rem;
`;

function Home() {
  const navigate = useNavigate();

  // async function createRoom() {
  //   try {
  //     const id = nanoid();
  //     console.log(id);

  //     await setDoc(doc(db, "rooms", id), {
  //       state: "PLAYING",
  //       time: 0,
  //       volume: 50,
  //       users: [nanoid(5)],
  //       playlsit: [],
  //     });

  //     navigate(`/room/${id}`);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  function createRoom() {
    const id = nanoid();

    set(ref(db, "rooms/" + id), {
      time: 0,
      state: "PAUSED",
      playlist: [],
    });

    navigate(`/room/${id}`);
  }

  return (
    <StyledHome>
      <Header />
      <StyledImg src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

      <StyledMain>
        <StyledBox>
          <H1>Watch your favourite videos together.</H1>
          <Button onClick={createRoom}>Create Room</Button>
        </StyledBox>
        <StyledBox>
          <H1>A little about watch along.</H1>
          <span>
            Watch Along allows you to watch your favourite videos / streamers
            together with friends. I watch videos with my friends through
            discord streams but some quality is lost. This way the users will
            watch the same video in sync with each other. In the full quality of
            the actual content.
          </span>
        </StyledBox>
      </StyledMain>
    </StyledHome>
  );
}

export default Home;
