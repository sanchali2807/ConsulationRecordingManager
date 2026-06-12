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
  async (
    search = "",
    page = 1,
    status = "",
    dateFilter = ""
  ) => {

    const response =
      await api.get(
        "/recordings",
        {
          params: {
            search,
            page,
            limit: 5,
            status,
            dateFilter
          }
        }
      );

    return response.data;
  };