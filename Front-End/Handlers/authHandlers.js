import { useState, useEffect } from "react";

import { useAuthApi } from "../CustomeHooks/useAuthApi";
import { useDispatch } from "react-redux";
import { saveUser } from "../Redux/userSlice";
import { editSession } from "../Redux/sessionSlice";
import { useNavigation } from "@react-navigation/native";

export const authHandlers = () => {
  const [clicked, setIsClicked] = useState(false);

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    loginUser,
    createUser,
    error,
    loading,
    response,
    setError,
    setLoading,
    setResponse,
  } = useAuthApi();

  //useEffect to handle loading.
  //This useEffect will run when the loading state changes
  //and when the clicked state changes
  useEffect(() => {
    if (loading) {
    }
  }, [loading, clicked]);

  useEffect(() => {
    if (error) {
      if (error === "Email already exists") {
        alert("User already exists");
      } else if (error === "Email or password not match") {
        alert("Email or password not match");
      } else if (error === "No Response from server") {
        alert("No Response from server");
      } else {
        alert("Something went wrong");
        console.log("Error", error);
      }

      //clear the state after showing the alert
      setError(false);
      setLoading(false);
      setResponse(false);
    }

    if (!loading && !error && response) {
      //clear the states
      setError(false);
      setLoading(false);
      setResponse(false);

      //alert(response.message);
      if (response.message === "Successfully Logined In") {
        //calling the function that  saving the user in Redux
        savingLoginedUser({ email: email, userName: response.userName });
        //  getUserTasks();
        // console.log("Login Success");
        navigation.navigate("Home");
      }
    }
  }, [response, error]);

  //function that save the user in Redux when logined Successfully

  const savingLoginedUser = (data) => {
    // console.log(data);
    dispatch(saveUser(data.email, data.userName));
    dispatch(editSession(true));
  };

  const loginFunc = async (password, email) => {
    setIsClicked(true);
    setEmail(email);

    try {
      await loginUser(
        email,
        password,
        "http://192.168.12.175:3000/portfolio/v1/users/login"
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  const signUpFunc = async (username, email, password) => {
    setIsClicked(true);
    setEmail(email);
    try {
      await createUser(
        username,
        email,
        password,
        "http://192.168.12.175:3000/portfolio/v1/users/signup"
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  return { loginFunc, signUpFunc };
};
