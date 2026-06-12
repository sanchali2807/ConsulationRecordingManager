import api from "./api";

export const uploadRecording =
  async (formData) => {

    const response =
      await api.post(
        "/recordings",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };

export const getRecordings =
  async () => {

    const response =
      await api.get(
        "/recordings"
      );

    return response.data;
  };