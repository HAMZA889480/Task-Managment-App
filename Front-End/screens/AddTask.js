import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../const/Styles";
import {
  RadioButton,
  TextInput,
  Button,
  IconButton,
  PaperProvider,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import PasswordConfirm from "../components/PasswordConfirm";
import { TaskHandler } from "../Handlers/TaskHandlers";

import { useSelector } from "react-redux";

export default function AddTask() {
  const [value, setValue] = useState("non-traveling");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  //get the session from the redux
  const session = useSelector((state) => state.session.session);
  const theme = useSelector((state) => state.settings.theme);

  //task handlers
  const { addTask } = TaskHandler();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  //Add Task Handler
  const checkInputHandler = () => {
    if (title === "" || details === "" || date === "") {
      alert("Please fill all the fields");
      return false;
    } else {
      return true;
    }
  };



  let continarColor, fontColor, radioText, headingColor;
  if(theme==="light"){
    continarColor = styles.Settings.darkBackGround.Container;
    fontColor = styles.Settings.darkBackGround.listTextColor;
    radioText=styles.Settings.darkBackGround.radioText;
    
  

   
  }else{
    continarColor = "#eee";
    fontColor = styles.Settings.lightBackGround.listTextColor;
    radioText=styles.Settings.lightBackGround.radioText;

  }

  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={[
          continarColor,
          styles.AddTask.Container,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[{ fontSize: 20, fontWeight: "semibold" },fontColor]}>
            Task Type
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}

          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={fontColor}>Non-Travel</Text>
                
                <RadioButton value="non-traveling" color="#0fba1a" />
                
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={fontColor}>Travel</Text>
                <RadioButton value="Traveling" color="#0fba1a" />
              </View>
            </View>
          </RadioButton.Group>
          {/* Task Date and Time */}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[{ fontSize: 20, fontWeight: "semibold" },fontColor]}>
            Task Time
          </Text>
          <View style={{ flexDirection: "row", width: "55%" }}>
            <TextInput
              mode="flat"
              value={date.toDateString()}
              contentStyle={[{
                fontSize: 18,
                fontWeight: "semibold",
                color: "#0fba1a",
              },continarColor]}
              activeOutlineColor="#0fba1a"
              style={{ width: "100%", backgroundColor: "#fff" }}
            />
            <IconButton
              icon="calendar-month-outline"
              style={{ marginLeft: -25 }}
              onPress={showDatepicker}
              iconColor="#0fba1a"
            />
            {/* <IconButton
            icon="calendar-month-outline"
            style={{ marginLeft: 0 }}
            onPress={showDatepicker}
          /> */}
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
        {/* Task Title and Details */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "23%",
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color:"#0fba1a" }}
          >
            Task Details
          </Text>
          <TextInput
            label="Task Title "
            mode="outlined"
            contentStyle={{ fontSize: 20, fontWeight: "bold" }}
            activeOutlineColor="#0fba1a"
            multiline={true}
            activeUnderlineColor="#19bd2c"
            onChangeText={(text) => setTitle(text)}
            style={{ marginTop: "9%" }}
          />

          <TextInput
            label="Task Details"
            mode="outlined"
            activeOutlineColor="#19bd2c"
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) => setDetails(text)}
            style={{ marginTop: "7%" }}
            contentStyle={{ letterSpacing: 0.8, fontFamily: "sans-serif" }}
          />
        </View>

        {/* Add Task Button */}
        <View style={{ alignItems: "center", marginTop: "5%" }}>
          <Button
            rippleColor="#49cc59"
            buttonColor="#19bd2c"
            textColor="#fff"
            mode="contained"
            onPress={() => {
              if (checkInputHandler()) {
                addTask(title, details, date, value);
              }
            }}
            style={[
              styles.AccountForm.Button,
              { height: 45, marginTop: "10%" },
            ]}
          >
            <Text style={[styles.AccountForm.ButtonText]}>Add Task</Text>
          </Button>
        </View>
      </ScrollView>

      {!session && <PasswordConfirm />}
    </PaperProvider>
  );
}
