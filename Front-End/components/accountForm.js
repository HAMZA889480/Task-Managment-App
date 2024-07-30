import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import AccountFormButton from "./accountFormButton";
import { styles } from "../const/Styles";
import validator from "validator";
import { useUserApi } from "../CustomeHooks/useUserApi";

import { useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import { saveUser } from "../Redux/userSlice";
import { editSession } from "../Redux/sessionSlice";

import { TaskHandler } from "../Handlers/TaskHandlers";

import { authHandlers } from "../Handlers/authHandlers";

export default function AccountForm({ type }) {
  const [email, setEmail] = useState("");
  const [valideEmail, setIsValideEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [validePassword, setIsValidePassword] = useState(true);
  const [username, setUsername] = useState("");
  const [valideUsername, setIsValideUsername] = useState(true);
  const [clicked, setIsClicked] = useState(false);

  //button click handlers
  const {
    createUser,
    loginUser,
    error,
    loading,
    response,
    setError,
    setLoading,
    setResponse,
  } = useUserApi();

  const { getTodaysTasksLists } = TaskHandler();

  // const { loginHandler } = authHandlers();

  //for navigation
  const navigation = useNavigation();

  //useDispatch
  const dispatch = useDispatch();

  //function to validate the email, password and username

  function validateEmail(email) {
    if (validator.isEmail(email)) {
      setIsValideEmail(true);
      setEmail(email);
    } else {
      setIsValideEmail(false);
    }
  }
  function validatePassword(password) {
    if (password.length < 8) {
      setIsValidePassword(false);
    } else {
      setPassword(password);
      setIsValidePassword(true);
    }
  }
  function validateUsername(username) {
    if (validator.isAlpha(username) && username.length > 4) {
      setIsValideUsername(true);
      setUsername(username);
    } else {
      setIsValideUsername(false);
    }
  }

  //button click handlers use Effects

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
      if (response.message === "Successfully Logined In") {
        //calling the function that  saving the user in Redux
        savingLoginedUser({ email: email, userName: response.userName });
        //  getUserTasks();
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

  // const getUserTasks = async () => {
  //   await getTodaysTasksLists(email);
  // };
  //click handlers

  const signUpHandler = async () => {
    setIsClicked(true);
    if (valideEmail && validePassword && valideUsername) {
      await createUser(
        username,
        email,
        password,
        "http://192.168.12.175:3000/portfolio/v1/users/signup"
      );

      setIsClicked(false);
    } else {
      console.log("Please enter valid details");
    }
  };

  // const valideLoginInfo = () => {
  //   if (valideEmail && validePassword) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const loginHandler = async () => {
    setIsClicked(true);
    if (valideEmail && validePassword) {
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
    } else {
      console.log("Please enter valid details");
    }
  };

  return (
    <View style={[styles.AccountForm.Container, { paddingVertical: 10 }]}>
      {loading ? (
        <View
          style={{
            height: 250,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator animating={true} color="#19bd2c" />
        </View>
      ) : (
        <>
          <Text style={[styles.AccountForm.Title]}>
            {type === "Login" ? "Log In" : "Sign Up"}
          </Text>
          <View style={{ width: "100%", paddingTop: 40 }}>
            {type === "SignUp" && (
              <TextInput
                onChangeText={(text) => validateUsername(text)}
                style={{ marginBottom: 28 }}
                mode="outlined"
                activeOutlineColor="#19bd2c"
                outlineColor="#49cc59"
                label="Username"
              />
            )}
            {!valideUsername && (
              <Text style={{ color: "#f50a12", marginTop: -30 }}>
                *Username is invalid
              </Text>
            )}
            <TextInput
              mode="outlined"
              activeOutlineColor="#19bd2c"
              outlineColor="#49cc59"
              label="Email"
              onChangeText={(text) => validateEmail(text)}
            />
            {!valideEmail && (
              <Text style={{ color: "#f50a12" }}>
                *Please enter a valid email
              </Text>
            )}
            <TextInput
              style={{ marginTop: 28 }}
              mode="outlined"
              activeOutlineColor="#19bd2c"
              outlineColor="#49cc59"
              label="Password"
              secureTextEntry={true}
              onChangeText={(text) => validatePassword(text)}
            />
            {!validePassword && (
              <Text style={{ color: "#f50a12" }}>*Password is too short</Text>
            )}
          </View>
          <Button
            rippleColor="#49cc59"
            buttonColor="#19bd2c"
            textColor="#fff"
            mode="contained"
            style={[styles.AccountForm.Button, { height: 45 }]}
            onPress={() => {
              if (type === "Login") {
                // if (valideLoginInfo()) {
                loginHandler();
                // }
              } else {
                signUpHandler();
              }
            }}
          >
            <Text style={[styles.AccountForm.ButtonText]}>
              {type === "Login" ? "Log In" : "Sign Up"}
            </Text>
          </Button>
        </>
      )}
    </View>
  );
}
