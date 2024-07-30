import { createDrawerNavigator } from "@react-navigation/drawer";
import { IconButton } from "react-native-paper";
import {Text, View} from "react-native";

import Settings from "../screens/Settings";
import Home from "../screens/Home";
const Drawer = createDrawerNavigator();

export default function DrawerGroup(){
    return (
        <Drawer.Navigator initialRouteName="Settings">
        <Drawer.Screen 
        name="HomeDrawer" 
        component={Home}
        options={({ navigation }) => ({

            headerTitle: ()=> null,
            

            
          headerLeft: () => (
            <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <IconButton
              icon="menu"
              onPress={() => navigation.toggleDrawer()}
            />
            <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: "#19bd2c",
            fontWeight: "bold",
          }}
        >
          Welcome
        </Text>
            </View>
            
          ),

        //   headerRight: () => (
        //     <IconButton
        //       icon="plus"
        //       iconColor="#fff"
        //       containerColor="#19bd2c"
        //       size={22}
        //       onPress={() => {
        //         navigation.navigate("AddTask");
        //       }}
        //     />
        //   ),
         
        })}
      />
        {/* <Drawer.Screen name="Home" component={BottomNavigation} /> */}
        <Drawer.Screen 
        name="Settings" 
        component={Settings}
        
      />
        </Drawer.Navigator>
    );
}