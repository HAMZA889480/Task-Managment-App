import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import CustomeDrawerContent from '../components/CustomeDrawerContent'; // Make sure the import path is correct
import { IconButton } from 'react-native-paper';
import { View, Text } from 'react-native';
import Profile from '../screens/Profile';
import { useSelector } from 'react-redux';

import { styles } from '../const/Styles'; // Make sure the import path is correct
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

  const theme = useSelector((state) => state.settings.theme);
  let hedearColor,fontColor,iconColor,welcomeText, addIconColor, addIconContainedColor;

  if(theme==="light"){
    console.log("light");
    hedearColor = styles.Settings.NavBar.darkBackGround.header.backgroundColor;
    fontColor = styles.Settings.NavBar.darkBackGround.fontColor;
    iconColor = "#fff";
    welcomeText = styles.Drawer.WelcomeText.darkBackGround
    addIconContainedColor="#19bd2c"
    addIconColor="#fff"

    console.log("iconColor",iconColor)
  }
  else{
    console.log("dark");
    hedearColor = styles.Drawer.NavBar.lightBackGround.header.backgroundColor;
    fontColor= styles.Drawer.NavBar.lightBackGround.fontColor;
    iconColor = "#000";
    welcomeText = styles.Drawer.WelcomeText.lightBackGround
    addIconContainedColor="#fff"
    addIconColor="#19bd2c"

    console.log("iconColor",iconColor);
  }



  return (
    <Drawer.Navigator initialRouteName='Home'
      drawerContent={(props) => <CustomeDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: hedearColor,
          
        },
        headerTintColor: fontColor.color,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen 
        name="HomeGroup" 
        component={Home}
        options={({ navigation }) => ({
          headerTitle: () => null,
          headerLeft: () => (
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <IconButton
                icon="menu"
                iconColor={iconColor}
                
                onPress={() => navigation.toggleDrawer()}
              />
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: fontColor.color,
                  fontWeight: 'bold',
                }}
              >
                Welcome
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={{right:"7%"}}>
            <IconButton
          icon="plus"
          iconColor={addIconColor}
          containerColor={addIconContainedColor}
          size={25}
          onPress={() => {
            navigation.navigate("AddTask");
          }}
        />
        </View>
          ),
          
        })}
      />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

