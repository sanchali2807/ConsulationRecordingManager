import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  updateRecording,
  deleteRecording
} from "../services/recordingService";

import {
  useNavigate
} from "react-router-dom";

import {
  getRecordingById
} from "../services/recordingService";

import AudioPlayer
from "../components/AudioPlayer";


export default function RecordingDetailPage() {
  const navigate =
  useNavigate();

  const { id } =
    useParams();

  const [
    recording,
    setRecording
  ] = useState(null);

  const [notes, setNotes] =
  useState("");

const [tags, setTags] =
  useState("");

const [saving, setSaving] =
  useState(false);

  const [isEditing,setIsEditing] = useState(false);
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchRecording =
      async () => {

        try {

          const data =
            await getRecordingById(
              id
            );

          setRecording(
            data
          );
          setNotes(
  data.notes || ""
);

setTags(
  data.tags?.join(",") || ""
);

        } catch (err) {

          setError(
            "Failed to load recording"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchRecording();

  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }
  const handleSave =
  async () => {

    try {

      setSaving(true);

      const updated =
        await updateRecording(
          id,
          {
            notes,

            tags:
              tags
                .split(",")
                .map(
                  tag =>
                    tag.trim()
                )
                .filter(Boolean)
          }
        );

      setRecording(updated);

setNotes(
  updated.notes || ""
);

setTags(
  updated.tags?.join(",") || ""
);

setIsEditing(false);

alert(
  "Saved Successfully"
);

    } catch (error) {

      alert(
        "Update Failed"
      );

    } finally {

      setSaving(false);
    }
  };
  const handleDelete =
  async () => {

    const confirmed =
      window.confirm(
        "Delete this recording?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await deleteRecording(
        id
      );

      alert(
        "Recording deleted"
      );

      navigate("/");

    } catch (error) {

      alert(
        "Delete failed"
      );
    }
  };

  return (
    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>
        {recording.title}
      </h1>

      <p>
        Client:
        {" "}
        {
          recording.clientName
        }
      </p>

      <p>
        Status:
        {" "}
        {
          recording.status
        }
      </p>

      <p>
        Created:
        {" "}
        {new Date(
          recording.createdAt
        ).toLocaleDateString()}
      </p>

      <AudioPlayer
        url={
          recording.recordingUrl
        }
      />

      <hr />

    <h3>Notes</h3>

{isEditing ? (
  <textarea
    rows="6"
    cols="60"
    value={notes}
    onChange={(e) =>
      setNotes(
        e.target.value
      )
    }
  />
) : (
  <p>
    {
      recording.notes ||
      "No notes added"
    }
  </p>
)}

   <h3>Tags</h3>

{isEditing ? (
  <input
    value={tags}
    onChange={(e) =>
      setTags(
        e.target.value
      )
    }
    placeholder="
career,finance,love"
  />
) : (
  <div>
    {
      recording.tags?.length
        ? recording.tags.map(
            (tag) => (
              <span
                key={tag}
                style={{
                  padding:
                    "6px 12px",
                  margin:
                    "4px",
                  borderRadius:
                    "20px",
                  background:
                    "#ddd",
                  display:
                    "inline-block"
                }}
              >
                {tag}
              </span>
            )
          )
        : "No tags added"
    }
  </div>
)}

<br />
<br />

<button
  onClick={
    handleDelete
  }
>
  Delete Recording
</button>
<br />
<br />

{isEditing ? (
  <>
    <button
      onClick={
        handleSave
      }
    >
      {
        saving
          ? "Saving..."
          : "Save Changes"
      }
    </button>

    <button
      onClick={() =>
        setIsEditing(false)
      }
      style={{
        marginLeft:
          "10px"
      }}
    >
      Cancel
    </button>
  </>
) : (
  <button
    onClick={() =>
      setIsEditing(true)
    }
  >
    {
      recording.notes ||
      recording.tags?.length
        ? "Edit"
        : "Add Notes & Tags"
    }
  </button>
)}

    </div>
  );
}