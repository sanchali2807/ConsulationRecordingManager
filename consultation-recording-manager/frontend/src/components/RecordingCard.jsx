import {
  Link
} from "react-router-dom";

export default function RecordingCard({
  recording
}) {

  return (
    <div
      style={{
        border:
          "1px solid gray",
        padding: "10px",
        margin: "10px"
      }}
    >
      <h3>
        {recording.title}
      </h3>

      <p>
        {
          recording.clientName
        }
      </p>

      <Link
        to={`/recordings/${recording._id}`}
      >
        View
      </Link>

    </div>
  );
}