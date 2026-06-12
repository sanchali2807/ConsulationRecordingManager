import { useState }
from "react";
import SearchBar
from "../components/SearchBar";

import FilterPanel
from "../components/FilterPanel";
import {
  uploadRecording
} from "../services/recordingService";
import {
  useEffect
} from "react";

import RecordingCard
from "../components/RecordingCard";

import {
  getRecordings
}
from "../services/recordingService";
export default function DashboardPage() {
const [
  recordings,
  setRecordings
] = useState([]);
  const [title, setTitle] =
    useState("");

  const [
    clientName,
    setClientName
  ] = useState("");

  const [audio, setAudio] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");
    const [search, setSearch] =
  useState("");

const [page, setPage] =
  useState(1);

const [status, setStatus] =
  useState("");

const [
  dateFilter,
  setDateFilter
] = useState("");

const fetchRecordings =
  async () => {

    try {

      const data =
  await getRecordings(
    search,
    page,
    status,
    dateFilter
  );

setRecordings(
  data.recordings
);

    } catch (error) {

      console.log(error);
    }
  };

 useEffect(() => {

  fetchRecordings();

}, [
  search,
  page,
  status,
  dateFilter
]);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "clientName",
          clientName
        );

        formData.append(
          "audio",
          audio
        );

        await uploadRecording(
          formData
        );

        setMessage(
          "Upload Successful"
        );

await fetchRecordings();
        setTitle("");
        setClientName("");
        setAudio(null);

      } catch (error) {

        setMessage(
          "Upload Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
  <div>
    <h1>Dashboard</h1>

    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        placeholder="Client Name"
        value={clientName}
        onChange={(e) =>
          setClientName(e.target.value)
        }
      />

      <input
        type="file"
        accept="audio/*"
        onChange={(e) =>
          setAudio(e.target.files[0])
        }
      />

      <button type="submit">
        {loading
          ? "Uploading..."
          : "Upload"}
      </button>
    </form>

    {message && (
      <p>{message}</p>
    )}

    <hr />

    <h2>
      My Recordings
    </h2>

    {recordings.map(
      (recording) => (
        <RecordingCard
          key={recording._id}
          recording={recording}
        />
      )
    )}
  </div>
);
}
