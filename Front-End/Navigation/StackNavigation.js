import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import AddTask from "../screens/AddTask";
import TaskScreen from "../screens/TaskScreen";
import EditTask from "../screens/EditTask";
import DrawerGroup from "./DrawerNavigation";

import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { styles } from "../const/Styles";

import { editMenu } from "../Redux/MenuListSlice";

import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MenuList from "../components/MenuList";
export default function StackNavigation() {
  const Stack = createNativeStackNavigator();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);



  const theme = useSelector((state) => state.settings.theme);

  const toggleMenu = () => {
    dispatch(editMenu(!isVisible));
    setIsVisible(!isVisible);
  };

  const hideMenu = () => {
    dispatch(editMenu(false));
  };




  let hedearColor,fontColor,iconColor,welcomeText;

  if(theme==="light"){
    console.log("light");
    hedearColor = styles.Settings.NavBar.darkBackGround.header.backgroundColor;
    fontColor = styles.Settings.NavBar.darkBackGround.fontColor;
    iconColor = "#fff";
    welcomeText = styles.Drawer.WelcomeText.darkBackGround

    console.log("iconColor",iconColor)
  }
  else{
    console.log("dark");
    hedearColor = styles.Drawer.NavBar.lightBackGround.header.backgroundColor;
    fontColor= styles.Drawer.NavBar.lightBackGround.fontColor;
    iconColor = "#0fba1a";
    welcomeText = styles.Drawer.WelcomeText.lightBackGround

    console.log("iconColor",iconColor);
  }







  return (
    <Stack.Navigator>
     

       <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={DrawerGroup}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={{
          headerStyle:{
            backgroundColor:hedearColor,
            
          },
         
          headerTitle: () => null,
          headerLeft: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                    hideMenu();
                  }}
                  style={{ marginRight: 10 }}
                >
                  <Icon source="arrow-left" color={iconColor} size={25} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 22,
                    color:iconColor,
                    fontWeight: "semi-bold",
                    marginLeft: 15,
                  }}
                >
                  View Task
                </Text>
              </View>
            );
          },
          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // <MenuList />;

                    toggleMenu();
                  }}
                  style={{ marginRight: 10 }}
                >
                  <Icon source="dots-vertical" color={iconColor} size={25} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={{
          headerStyle:{
            backgroundColor:hedearColor,
            
          },
          headerTitle: () => null,
          headerLeft: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginRight: 10 }}
                >
                  <Icon source="arrow-left" color={iconColor} size={20} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 22,
                    color: iconColor,
                    fontWeight: "bold",
                  }}
                >
                  Add New Task
                </Text>
              </View>
            );
          },
        }}
      />

      <Stack.Screen
        name="EditScreen"
        component={EditTask}
       
        options={{
          headerStyle:{
            backgroundColor:hedearColor,
            
          },
          headerTitle: () => null,
          headerLeft: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                    hideMenu();
                  }}
                  style={{ marginRight: 10 }}
                >
                  <Icon source="arrow-left" color={iconColor} size={25} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 22,
                    color: iconColor,
                    fontWeight: "semi-bold",
                    marginLeft: 15,
                  }}
                >
                  Edit Task
                </Text>
              </View>
            );
          },
          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // <MenuList />;

                    toggleMenu();
                  }}
                  style={{ marginRight: 10 }}
                >
                  <Icon source="dots-vertical" color={iconColor} size={25} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      /> 
    </Stack.Navigator>
  );
}
