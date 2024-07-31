import { useEffect, useState } from "react";
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

import { useDispatch } from "react-redux";
import { editMenu } from "../Redux/MenuListSlice";

import MenuList from "../components/MenuList";

export default function EditTask({ route }) {
  const [value, setValue] = useState("non-traveling");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const { modifyTask, loading, setLoading } = TaskHandler();

  const dispatch = useDispatch();

  const { task } = route.params;

  //dispatch the editMenu action to hide the menu and set the initial values when component mounts
  useEffect(() => {
    dispatch(editMenu(false));
    setTitle(task.title);
    setDetails(task.description);
    setDate(new Date(task.date));
    setValue(task.type);
  }, []);

  //useEffect to handle the loading state

  useEffect(() => {
    if (loading) {
      console.log("Loading........");
    } else {
      console.log("Loading Fininshed");
    }
  }, [loading]);

  const menuVisisble = useSelector((state) => state.menu.isVisible);

  //get the session from the redux
  const session = useSelector((state) => state.session.session);


  const theme=useSelector((state)=>state.settings.theme);

  //task handlers

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
      // alert("Please fill all the fields");
      return false;
    } else {
      // console.log("Task Edited", title, details, date, value);
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
        {menuVisisble && <MenuList task={task} displayEdit={false} />}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[{ fontSize: 20, fontWeight: "semibold" }, fontColor]}>
            Task Type
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}

          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={radioText}>Non-Travel</Text>
                <RadioButton value="non-traveling" color="#0fba1a" />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={radioText}>Travel</Text>
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
              contentStyle={{
                fontSize: 18,
                fontWeight: "semibold",
                color: "#0fba1a",
              }}
              activeOutlineColor="#0fba1a"
              style={[{ width: "100%" },continarColor]}
            />
            <IconButton
              icon="calendar-month-outline"
              iconColor="#0fba1a"
              style={{ marginLeft: -30 }}
              onPress={showDatepicker}
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
            style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#19bd2c", letterSpacing: 1.2 }}
          >
            Task Details
          </Text>
          <TextInput
            label="Task Title "
            mode="outlined"
            contentStyle={{ fontSize: 20, fontWeight: "bold"}}
            activeOutlineColor="#07f517"
            multiline={true}
            
            onChangeText={setTitle}
            style={{ marginTop: "9%" }}
            value={title}
          />

          <TextInput
            label="Task Details"
           
            value={details}
            mode="outlined"
            activeOutlineColor="#07f517"
            multiline={true}
            numberOfLines={5}
            onChangeText={setDetails}
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
            contentStyle={{
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
            }}
            icon={"note-edit-outline"}
            mode="contained"
            onPress={() => {
              if (checkInputHandler()) {
                setLoading(true);
                modifyTask(title, details, date, value, task._id);
                setLoading(false);
              } else {
                alert("Please fill all the fields");
              }
            }}
            style={[
              styles.AccountForm.Button,
              { height: 45, marginTop: "10%" },
            ]}
          >
            <Text style={[styles.AccountForm.ButtonText]}>Edit Task</Text>
          </Button>
        </View>
      </ScrollView>

      {!session && <PasswordConfirm />}
    </PaperProvider>
  );
}
