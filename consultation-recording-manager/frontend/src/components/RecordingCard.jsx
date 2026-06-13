import {
  Link
} from "react-router-dom";

export default function RecordingCard({
  recording
}) {

  return (
    <div
      className="recording-card"
    >

      <div>

        <h3>
          {recording.title}
        </h3>

        <p>
          Client:
          {" "}
          {recording.clientName}
        </p>

        <p>
          Status:
          {" "}
          {recording.status}
        </p>

        <p>
          Created:
          {" "}
          {
            new Date(
              recording.createdAt
            ).toLocaleDateString()
          }
        </p>

      </div>

      <Link
        className="view-btn"
        to={`/recordings/${recording._id}`}
      >
        View Details →
      </Link>

    </div>
  );
}