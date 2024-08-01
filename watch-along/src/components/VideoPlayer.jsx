import React, { useEffect, useRef } from "react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import debounce from "lodash/debounce";
import db from "../firebase";

//ISSUES
// - A new user joining restarts the video.
// - A new user joining does not sync to the current users unless a change is made. This is because on the db end the time is only updated when manually changed by the user and not when it progresses through normally

function VideoPlayer({ roomId }) {
  const playerRef = useRef(null);
  const roomRef = doc(db, "rooms", roomId);
  console.log(roomRef);
  const lastStateRef = useRef({ state: "PAUSED", time: 0 });
  let time;

  const fetchInitialState = async () => {
    try {
      const docSnapshot = await getDoc(roomRef);
      if (docSnapshot.exists()) {
        syncPlayer(docSnapshot.data());
        time = docSnapshot.data().time;
        console.log(time);

        return docSnapshot.data();
      }
    } catch (e) {
      console.error("Error fetching initial document: ", e);
    }
  };

  fetchInitialState();

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = () => {
    console.log(time);

    playerRef.current = new window.YT.Player("player", {
      videoId: "Kp7eSUU9oy8", // Default video ID, will be dynamic
      playerVars: { start: time, autoplay: 1, controls: 1 },
      events: {
        onStateChange: onPlayerStateChange,
        onReady: onPlayerReady,
      },
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      const data = doc.data();
      if (data) {
        syncPlayer(data);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [roomId, roomRef]);

  const syncPlayer = (data) => {
    if (!playerRef.current) return;

    const currentTime = playerRef?.current.getCurrentTime();

    const stateChanged = data.state !== lastStateRef.current.state;
    const timeChanged = Math.abs(data.time - currentTime) > 1; //Causes a little delay between users so might need tweaking

    if (stateChanged || timeChanged || data !== lastStateRef) {
      if (
        data.state === "PLAYING" &&
        playerRef.current.getPlayerState() !== window.YT.PlayerState.PLAYING
      ) {
        playerRef.current.playVideo();
      } else if (
        data.state === "PAUSED" &&
        playerRef.current.getPlayerState() !== window.YT.PlayerState.PAUSED
      ) {
        playerRef.current.pauseVideo();
      }

      if (timeChanged) {
        playerRef.current.seekTo(data.time, true);
      }
      if (data !== lastStateRef) {
        playerRef.current.seekTo(data.time, true);
      }

      lastStateRef.current = data;
    }
  };

  const updateRoomState = debounce(async (state, time) => {
    // Only update Firestore if the state or time has changed significantly
    if (
      state !== lastStateRef.current.state ||
      Math.abs(time - lastStateRef.current.time) > 1
    ) {
      await setDoc(roomRef, { state, time }, { merge: true });
      lastStateRef.current = { state, time };
    }
  }, 500);

  const onPlayerStateChange = (event) => {
    const currentTime = playerRef.current.getCurrentTime();
    const currentState =
      event.data === window.YT.PlayerState.PLAYING ? "PLAYING" : "PAUSED";

    // Avoid redundant updates and update Firestore state if necessary
    updateRoomState(currentState, currentTime);
  };

  const onPlayerReady = (event) => {
    // Synchronize the volume
    event.target.setVolume(0); // Example volume level, can be dynamic
  };

  return (
    <>
      <div id="player"></div>
    </>
  );
}

export default VideoPlayer;
