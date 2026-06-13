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

       <div className="recording-info">

  <h3 className="recording-title">
    {recording.title}
  </h3>

  <p className="recording-meta">
    <strong>Client:</strong>
    {" "}
    {recording.clientName}
  </p>

  <p className="recording-meta">
    <strong>Status:</strong>
    {" "}
    {recording.status}
  </p>

  <p className="recording-meta">
    <strong>Created:</strong>
    {" "}
    {new Date(
      recording.createdAt
    ).toLocaleDateString()}
  </p>

</div>
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