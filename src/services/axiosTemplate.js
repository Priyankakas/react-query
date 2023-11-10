import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const callApi = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = "Bearer token";
  const onSuccess = (response) => response;
  const onError = (error) => {
    //

    return error;
  };

  try {
        const response = await client(options);
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
};
