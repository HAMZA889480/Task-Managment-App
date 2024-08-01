import { useState, useEffect } from "react";

import { useUserApi } from "../CustomeHooks/useUserApi";
import { useDispatch } from "react-redux";
import { saveUser } from "../Redux/userSlice";
import { editSession } from "../Redux/sessionSlice";
import { useNavigation } from "@react-navigation/native";

export const authHandlers = () => {
  const [clicked, setIsClicked] = useState(false);
  const [navigate, setNavigate] = useState(false);
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
  } = useUserApi();

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
      } else {
        alert("From Auth Handler","Something went wrong");
        console.log("Error", error);
      }

      //clear the state after showing the alert
      setError(false);
      setLoading(false);
      setResponse(false);
    }

    if (!loading && !error && response) {
      //alert(response.message);
      if (response.message === "Successfully Logined In") {
        //calling the function that  saving the user in Redux
        savingLoginedUser({ email: email, userName: response.userName });
        if (navigate) {
          navigation.navigate("Home");
        }
      }
    }
  }, [response, error]);

  //function that save the user in Redux when logined Successfully

  const savingLoginedUser = (data) => {
    // console.log(data);
    dispatch(saveUser(data.email, data.userName));
    dispatch(editSession(true));
  };

  const loginHandler = async (password, email, redirect) => {
    // console.log("From authHandler confirm", redirect);

    //set the navigate state to true. So that the user will be redirected to the home page
    if (redirect) {
      setNavigate(true);
    }

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
      alert("Something went wrong");
    }
  };

  return { loginHandler };
};
