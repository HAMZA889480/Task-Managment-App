import { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";
import { SCEREAT_KEY } from "../Global";

export function useTaskApi() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [statusCode, setStatusCode] = useState("");
  const email = useSelector((store) => store.user.email);

  //function to retrive the token from the expo secure storage

  async function getToken() {
    try {
      const token = await SecureStore.getItemAsync(SCEREAT_KEY);
      return token;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const createTask = async (title, description, date, type, url) => {
    let jwt = await getToken();

    try {
      setLoading(true);
      const res = await axios.post(
        url,
        {
          title,
          description,
          date,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setLoading(false);
      setResponse(res.data.message);
      setStatusCode(res.status);

      setError(null);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const getTodaysTasks = async (email, url) => {
    try {
      // console.log("From use Task API to get todays tasks", email, url);
      setLoading(true);

      // Append email as a query parameter
      const res = await axios.get(`${url}?email=${email}`, { timeout: 10000 });

      // console.log("From get todays task handler", res.data);

      setLoading(false);
      setResponse(res.data);
      setStatusCode(res.status);
      setError(null);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const fetchAllTasks = async (email, url) => {
    try {
      console.log("From use Task API to get all tasks", email, url);
      setLoading(true);

      // Append email as a query parameter
      const res = await axios.get(`${url}?email=${email}`, { timeout: 10000 });

      // console.log("From get all task handler", res.data);

      setLoading(false);
      setResponse(res.data);
      setStatusCode(res.status);
      setError(null);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const updateStatus = async (id, status, url) => {
    let jwt = await getToken();
    try {
      setLoading(true);
      const res = await axios.patch(
        `${url}/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setLoading(false);
      setResponse(res.data.message);
      setStatusCode(res.status);

      setError(null);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const updateTask = async (id, title, description, date, type, url) => {
    let jwt = await getToken();
    try {
      setLoading(true);
      const res = await axios.put(
        `${url}/${id}`,
        {
          title,
          description,
          date,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      //console.log("From useTask API", res.status);
      setLoading(false);
      setResponse(res.data.message);
      setStatusCode(res.status);

      setError(null);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const deleteTask = async (id, url) => {
    let jwt = await getToken();
    try {
      setLoading(true);
      const res = await axios.delete(
        `${url}/${id}`,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      //console.log("From useTask API", res.status);
      setLoading(false);
      setResponse("Task deleted successfully");
      setStatusCode(res.status);

      setError(null);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  //error handler
  function ErrorHandler(error) {
    if (error.response) {
      // The request was made and the server responded with a status code

      if (error.response.data.status === 400) {
        setError("Task already exists");
        setStatusCode(400);
      } else if (error.response.data.status === 419) {
        setError("Token is expired!!");
        setStatusCode(419);
      } else {
        setError(error.response.data.message);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);

      setError("No response from server");
    } else {
      // Something happened in setting up the request that triggered an Error

      setError(error.message);
    }
  }

  return {
    createTask,
    getTodaysTasks,
    fetchAllTasks,
    updateStatus,
    updateTask,
    deleteTask,
    error,
    statusCode,
    response,
    loading,
    setError,
    setLoading,
    setResponse,
  };
}
