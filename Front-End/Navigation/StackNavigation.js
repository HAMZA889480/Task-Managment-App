import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import AddTask from "../screens/AddTask";
import TaskScreen from "../screens/TaskScreen";
import EditTask from "../screens/EditTask";
import DrawerGroup from "./DrawerNavigation";

import { useState } from "react";
import { useDispatch } from "react-redux";

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

  const toggleMenu = () => {
    dispatch(editMenu(!isVisible));
    setIsVisible(!isVisible);
  };

  const hideMenu = () => {
    dispatch(editMenu(false));
  };

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
                  <Icon source="arrow-left" color="#0fba1a" size={25} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 22,
                    color: "#19bd2c",
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
                  <Icon source="dots-vertical" color="#0fba1a" size={25} />
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
                  <Icon source="arrow-left" color="#0fba1a" size={20} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 22,
                    color: "#19bd2c",
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
                  <Icon source="arrow-left" color="#0fba1a" size={25} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 22,
                    color: "#19bd2c",
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
                  <Icon source="dots-vertical" color="#0fba1a" size={25} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      /> 
    </Stack.Navigator>
  );
}
