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

      if (!audio) {

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

        setMessage(
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

      <SearchBar
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
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
        <p>
          No recordings found
        </p>
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