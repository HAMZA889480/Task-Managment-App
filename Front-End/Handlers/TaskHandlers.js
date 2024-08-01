import { useState, useEffect } from "react";
import { useTaskApi } from "../CustomeHooks/useTaskApi";
import { useDispatch } from "react-redux";
import { editSession } from "../Redux/sessionSlice";
export function TaskHandler() {
  const {
    createTask,
    getTodaysTasks,
    fetchAllTasks,
    updateStatus,
    updateTask,
    deleteTask,
    error,
    loading,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
  } = useTaskApi();

  const [clicked, setClicked] = useState(false);

  const dispatch = useDispatch();

  //useEffects to handle for loading, error and response

  useEffect(() => {
    if (loading) {
    }
  }, [loading, clicked]);

  useEffect(() => {
    if (error) {
      if (error === "Task already exists" || statusCode === 400) {
        alert("Task already exists");

        //calls the function to change the state
      } else if (error === "Token is expired!!" || statusCode === 419) {
        //alert("Token expired");

        toggleSession();
      }else if("No Task for Today"||statusCode===404){
         alert("User Does Not Exists");
      }
       else {
        alert("Something went wrong");
        console.log("Error", error);
      }

      //clear the state after showing the alert
      setError(false);
      setLoading(false);
      setResponse(false);
    }

    if (!loading && !error && response) {
      //alert(response.message);
      if (response === "Task Added!!" && statusCode === 201) {
        //calling the function that  saving the user in Redux
        alert("Task added successfully");
        //calling the that update the task list on home screen
      } else if (response === "Success" && statusCode === 200) {
        //calling the function that update the task list on home screen
      } else if (response === "Task Status Updated!!" && statusCode === 200) {
        //alert to show the status of the task
        alert("Task Status Updated Successfully");
      } else if (response === "Task Updated!!" && statusCode === 200) {
        //alert to show the status of the task
        alert("Task Updated Successfully");
      } else if (
        response === "Task deleted successfully" &&
        statusCode === 204
      ) {
        //alert to show the status of the task
        alert("Task deleted successfully");
      }
    }
  }, [response, error]);

  //function to toggle the session
  const toggleSession = () => {
    // console.log("toggle");
    //dispatch the action to change the session
    dispatch(editSession(false));
  };

  //fucntion to trim date
  function trimDate(date) {
    const dateString = date.toISOString();

    return dateString.split("T")[0];
  }

  const addTask = async (title, description, date, type) => {
    //call trimDate function to get the date in the required format
    let trimmedDate = trimDate(date);
    // console.log(title, description, trimmedDate, type);
    setClicked(true);
    await createTask(
      title,
      description,
      trimmedDate,
      type,

      "http://192.168.12.175:3000/portfolio/v1/tasks"
    );

    setClicked(false);
  };

  //function to get the tasks of the day
  const getTodaysTasksLists = async (email) => {
    setClicked(true);
    await getTodaysTasks(
      email,
      "http://192.168.12.175:3000/portfolio/v1/tasks/today"
    );
    setClicked(false);
  };

  const getAllTasks = async (email) => {
    setClicked(true);
    await fetchAllTasks(email, "http://192.168.12.175:3000/portfolio/v1/tasks");
    setClicked(false);
  };

  const updateTaskStatus = async (status, taskId) => {
    // console.log("From Update Task Handler", status, taskId);
    setClicked(true);
    await updateStatus(
      taskId,
      status,

      "http://192.168.12.175:3000/portfolio/v1/tasks"
    );
    setClicked(false);
  };

  const modifyTask = async (title, description, date, type, taskId) => {
    let trimmedDate = trimDate(date);
    setClicked(true);
    await updateTask(
      taskId,
      title,
      description,
      trimmedDate,
      type,

      "http://192.168.12.175:3000/portfolio/v1/tasks"
    );
    setClicked(false);
  };

  const removeTask = async (taskId) => {
    setClicked(true);
    await deleteTask(
      taskId,

      "http://192.168.12.175:3000/portfolio/v1/tasks"
    );
    setClicked(false);
  };

  return {
    addTask,
    getTodaysTasksLists,
    getAllTasks,
    updateTaskStatus,
    modifyTask,
    removeTask,
    error,
    loading,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
  };
}
