function VideoPlayer() {
  const url = "Kp7eSUU9oy8";
  return (
    <iframe
      width="80%"
      height="400"
      src={`https://www.youtube.com/embed/${url}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title=""
    />
  );
}

export default VideoPlayer;
