import { useState, useEffect } from "react";

import {
  uploadRecording,
  getRecordings
} from "../services/recordingService";

import RecordingCard from "../components/RecordingCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";

export default function DashboardPage() {

  const [recordings, setRecordings] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [clientName, setClientName] =
    useState("");

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
    const [error, setError] =
  useState("");

  const [dateFilter, setDateFilter] =
    useState("");

  const [totalPages, setTotalPages] =
    useState(1);

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

        setTotalPages(
          data.totalPages
        );

      } catch (error) {

       setError(
  "Failed to load recordings"
);
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

      if (!audio) {

        if (!title.trim()) {

  setMessage(
    "Title is required"
  );

  return;
}

if (!clientName.trim()) {

  setMessage(
    "Client name is required"
  );

  return;
}
        setMessage(
          "Please select an audio file"
        );

        return;
      }

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

        setTitle("");
        setClientName("");
        setAudio(null);

        await fetchRecordings();

      } catch (error) {

        console.log(error);

        setError(
  "Upload Failed"
);

      } finally {

        setLoading(false);
      }
    };

  return (
    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>Dashboard</h1>
      {error && (
  <p
    style={{
      color: "red"
    }}
  >
    {error}
  </p>
)}

<div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  }}
>

  <div
    style={{
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "8px"
    }}
  >
    <h4>
      Total Recordings
    </h4>

    <p>
      {recordings.length}
    </p>
  </div>

  <div
    style={{
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "8px"
    }}
  >
    <h4>
      This Week
    </h4>

    <p>
      {
        recordings.filter(
          r => {
            const d =
              new Date(
                r.createdAt
              );

            const weekAgo =
              new Date();

            weekAgo.setDate(
              weekAgo.getDate() - 7
            );

            return d >= weekAgo;
          }
        ).length
      }
    </p>
  </div>

</div>
      <SearchBar
        value={search}
        onChange={(e) =>{
          setSearch(
            e.target.value
          );
          setPage(1);
          
        }}
      />

      <FilterPanel
        status={status}
        setStatus={setStatus}
        dateFilter={dateFilter}
        setDateFilter={
          setDateFilter
        }
      />

      <hr />

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) =>
            setClientName(
              e.target.value
            )
          }
        />

        <input
          type="file"
          accept="audio/*"
          onChange={(e) =>
            setAudio(
              e.target.files[0]
            )
          }
        />

        <button
          type="submit"
        >
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

      {recordings.length === 0 ? (
  <div
    style={{
      textAlign: "center",
      padding: "40px"
    }}
  >
    <h3>
      No recordings found
    </h3>

    <p>
      Upload your first
      consultation recording
      or adjust your filters.
    </p>
  </div>
) : (
        recordings.map(
          (recording) => (
            <RecordingCard
              key={
                recording._id
              }
              recording={
                recording
              }
            />
          )
        )
      )}

      <div
        style={{
          marginTop: "20px"
        }}
      >

        <button
          disabled={page === 1}
          onClick={() =>
            setPage(
              page - 1
            )
          }
        >
          Previous
        </button>

        <span
          style={{
            margin:
              "0 10px"
          }}
        >
          Page {page} of{" "}
          {totalPages}
        </span>

        <button
          disabled={
            page >= totalPages
          }
          onClick={() =>
            setPage(
              page + 1
            )
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}