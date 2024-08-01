import React, { useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import debounce from "lodash/debounce";

//I have had a go at making it work with web sockets, which i have never used before

function VideoPlayer() {
  const { roomId } = useParams();
  const playerRef = useRef(null);
  const ws = useRef(null);
  const lastStateRef = useRef({ state: "PAUSED", time: 0 });

  // Syncs the player with the state received from the server
  const syncPlayer = useCallback((data) => {
    if (!playerRef.current) return;

    const currentTime = playerRef.current.getCurrentTime();
    const stateChanged = data.state !== lastStateRef.current.state;
    const timeChanged = Math.abs(data.time - currentTime) > 0.5;

    if (stateChanged || timeChanged) {
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

      lastStateRef.current = data;
    }
  }, []);

  // Debounced function to update the room state
  const debouncedUpdateRoomState = useCallback(
    debounce((state, time) => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            roomId,
            type: "STATE_CHANGE",
            state,
            time,
          })
        );
      }
      lastStateRef.current = { state, time };
    }, 500),
    [roomId]
  );

  // Handles changes in player state (play/pause)
  const onPlayerStateChange = useCallback(
    (event) => {
      if (!playerRef.current) return;

      const currentTime = playerRef.current.getCurrentTime();
      const currentState =
        event.data === window.YT.PlayerState.PLAYING ? "PLAYING" : "PAUSED";
      debouncedUpdateRoomState(currentState, currentTime);
    },
    [debouncedUpdateRoomState]
  );

  // Called when the player is ready
  const onPlayerReady = useCallback((event) => {
    event.target.setVolume(50); // Example volume level, can be dynamic
  }, []);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ roomId, type: "JOIN" }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "SYNC") {
        syncPlayer(data);
      }
    };

    // Load the YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize the YouTube player
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        videoId: "Kp7eSUU9oy8", // Default video ID, can be dynamic
        events: {
          onStateChange: onPlayerStateChange,
          onReady: onPlayerReady,
        },
      });
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [roomId, syncPlayer, onPlayerStateChange, onPlayerReady]);

  return <div id="player"></div>;
}

export default VideoPlayer;
