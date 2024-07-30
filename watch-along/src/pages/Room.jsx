import { useParams } from "react-router-dom";
import PlayList from "../components/PlayList";
import VideoPlayer from "../components/VideoPlayer";

function Room() {
  const { id } = useParams();

  return (
    <main>
      <VideoPlayer roomId={id} />
      <PlayList />
    </main>
  );
}

export default Room;
