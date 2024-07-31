import { useState, useEffect } from "react";

import { View, Text, ScrollView } from "react-native";
import { styles } from "../const/Styles";
import { Button, PaperProvider } from "react-native-paper";
import PasswordConfirm from "../components/PasswordConfirm";

import { useSelector } from "react-redux";

import { TaskHandler } from "../Handlers/TaskHandlers";
import MenuList from "../components/MenuList";

export default function TaskScreen({ route }) {
  const { task } = route.params;

  const session = useSelector((state) => state.session.session);
  const menuVisisble = useSelector((state) => state.menu.isVisible);
  const theme = useSelector((state) => state.settings.theme);

  const [clicked, setClicked] = useState(false);

  const {
    updateTaskStatus,
    loading,
    error,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
  } = TaskHandler();

  //useEffect Hook for handling the loading, error and response

  useEffect(() => {
    if (loading) {
      console.log("Updating the Task Status");
    }
  }, [loading, clicked]);

  useEffect(() => {
    if (error) {
      if (error != "Token is expired!!" && statusCode != "419") {
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
      if (response.message === "Task Status Updated!!" || statusCode === 200) {
        //calling the function that  saving the user in Redux
        alert("Task Status Updated!!");
        // navigation.navigate("Home");
      }
    }
  }, [response, error]);
  let continarColor, fontColor;

  if(theme==="light"){
    continarColor = styles.Settings.darkBackGround.Container;
    fontColor = styles.Settings.darkBackGround.listTextColor;
  }else{
    continarColor = "#eee";
    fontColor = styles.Settings.lightBackGround.listTextColor;
  }


  

  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={[
          continarColor,
          styles.AddTask.Container,
        ]}
      >
        {menuVisisble && <MenuList task={task} displayEdit={true} />}
        <View>
          {/* Task Title  */}
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              letterSpacing: 1.2,
              fontWeight: "semibold",
              color: "#19bd2c",
            }}
          >
            {task.title}
          </Text>
        </View>

        {/* Task Date and Time */}
        <View
          style={{
            marginTop: "13%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text style={[{ fontSize: 18, letterSpacing: 1 },fontColor]}>
            Completion Date
          </Text>
          <Text style={{ fontSize: 17, color: "#0fba1a" }}>{task.date}</Text>
        </View>
        <View
          style={{
            marginVertical: "10%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text style={[{ fontSize: 18, letterSpacing: 0.8 },fontColor]}>Task Type</Text>
          <Text style={{ fontSize: 17, color: "#0fba1a" }}>{task.type}</Text>
        </View>
        <View
          style={{
            marginVertical: "7%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text style={[{ fontSize: 18, letterSpacing: 0.8 },fontColor]}>
            Current Status
          </Text>
          <Text style={{ fontSize: 17, color: "#0fba1a" }}>{task.status}</Text>
        </View>
        {/* Task Details */}
        <ScrollView>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "semibold",
                textAlign: "center",
                color: "#19bd2c",
                paddingVertical: "13%",
              }}
            >
              Task Details
            </Text>
            <Text
              style={[{
                paddingVertical: "7%",
                fontSize: 17,
                letterSpacing: 1.2,
              },fontColor]}
            >
              {task.description}
            </Text>
          </View>
        </ScrollView>

        {/*  Button to change the status*/}
        <View style={{ alignItems: "center", marginTop: "5%" }}>
          {task.status === "In-complete" ? (
            <Button
              rippleColor="#49cc59"
              buttonColor="#19bd2c"
              elevation={10}
              contentStyle={{
                flexDirection: "row-reverse",

                justifyContent: "space-evenly",
              }}
              textColor="#fff"
              icon="checkbox-marked-circle-outline"
              mode="contained"
              style={[
                styles.AccountForm.Button,
                { height: 45, marginTop: "10%" },
              ]}
              onPress={() => {
                setClicked(true);
                updateTaskStatus("Complete", task._id);
                setClicked(false);
              }}
            >
              <Text style={[styles.AccountForm.ButtonText]}>Completed</Text>
            </Button>
          ) : (
            <Button
              rippleColor="#49cc59"
              buttonColor="#19bd2c"
              elevation={10}
              contentStyle={{
                flexDirection: "row-reverse",

                justifyContent: "space-evenly",
              }}
              textColor="#fff"
              // icon="checkbox-marked-circle-outline"
              mode="contained"
              style={[
                styles.AccountForm.Button,
                { height: 45, marginTop: "10%" },
              ]}
              onPress={() => {
                setClicked(true);
                updateTaskStatus("In-complete", task._id);
                setClicked(false);
              }}
            >
              <Text style={[styles.AccountForm.ButtonText]}>In-Complete</Text>
            </Button>
          )}
        </View>
      </ScrollView>
      {!session && <PasswordConfirm />}
    </PaperProvider>
  );
}
