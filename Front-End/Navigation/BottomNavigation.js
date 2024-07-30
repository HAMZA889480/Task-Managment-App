import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  CommonActions,
  getFocusedRouteNameFromRoute,
  useIsFocused,
  useNavigationState,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import StackGroup from "./StackNavigation";
import History from "../screens/History";

const Tab = createBottomTabNavigator();

export default function TabGroup({ route }) {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const isFocused = useIsFocused();

  const state = useNavigationState((state) => state);
  let routeName;
  if (!state) {
    routeName = "logIn";
  } else {
    // console.log("State", state);
    routeName =
      getFocusedRouteNameFromRoute(state?.routes[state?.index]) ?? "Home";
  }

  useEffect(() => {
     console.log("RouteName", routeName);
    const shouldShowTabBar = ["Home"].includes(routeName);
    // console.log("ShouldShowTabBar", shouldShowTabBar);
    setIsTabBarVisible(shouldShowTabBar);

    return () => {
      setIsTabBarVisible(shouldShowTabBar);
    };
  }, [routeName, isFocused]);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) =>
          isTabBarVisible && (
            <BottomNavigation.Bar
              navigationState={state}
              safeAreaInsets={insets}
              onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                  preventDefault();
                } else {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name, route.params),
                    target: state.key,
                  });
                }
              }}
              renderIcon={({ route, focused, color }) => {
                const { options } = descriptors[route.key];
                if (options.tabBarIcon) {
                  return options.tabBarIcon({ focused, color, size: 30 });
                }

                return null;
              }}
              getLabelText={({ route }) => {
                const { options } = descriptors[route.key];
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.title;

                return label;
              }}
              activeColor="#0c6911"
              activeIndicatorStyle={{
                backgroundColor: "#58f56d",
                marginBottom: -5,
              }}
            />
          )
        }
      >
        <Tab.Screen
          name="Main"
          component={StackGroup}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarLabel: "History",
            tabBarIcon: ({ color, size }) => (
              <Icon name="history" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
});
