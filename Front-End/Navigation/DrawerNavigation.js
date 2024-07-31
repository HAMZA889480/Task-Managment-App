import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import CustomeDrawerContent from '../components/CustomeDrawerContent'; // Make sure the import path is correct
import { IconButton } from 'react-native-paper';
import { View, Text } from 'react-native';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'
      drawerContent={(props) => <CustomeDrawerContent {...props} />}
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
                onPress={() => navigation.toggleDrawer()}
              />
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#19bd2c',
                  fontWeight: 'bold',
                }}
              >
                Welcome
              </Text>
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

