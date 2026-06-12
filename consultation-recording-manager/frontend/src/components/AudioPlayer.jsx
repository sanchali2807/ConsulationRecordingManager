export default function AudioPlayer({
  url
}) {

  return (
    <audio
      controls
      style={{
        width: "100%"
      }}
    >
      <source
        src={url}
      />

      Your browser does not
      support audio.
    </audio>
  );
}