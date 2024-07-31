import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { styles } from '../const/Styles';

export default CustomDrawerContent = (props) => {
  const navigation = useNavigation();


  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.settings.theme);


  let drawerColor,drawerFontColor;
  if(theme==="light"){
    console.log("Drawer","light");
    drawerColor=styles.Drawer.SideContainer.darkBackGround;
    drawerFontColor=styles.Drawer.SideContainer.darkBackGround;

    
  }
  else{
    console.log("Drawer","dark");
    drawerColor=styles.Drawer.SideContainer.lightBackGround;
    drawerFontColor=styles.Drawer.SideContainer.lightBackGround;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={InlineStyles.headerContainer}>
        <Text style={InlineStyles.headerText}>{user.name}</Text>
      </View>
      
      <ScrollView contentContainerStyle={[{ flex: 1,
    justifyContent: 'center',
    
    
    alignItems:"center",
    paddingVertical: 50},drawerColor]}>
        {props.state.routes.map((route, index) => (
          <TouchableRipple
           rippleColor="#ccc"
           centered={true}
           
            key={index}
            onPress={() => {
              navigation.navigate(route.name);
              props.navigation.closeDrawer();
            }}
            style={InlineStyles.drawerItem}
          >
            <Text style={[{ fontSize: 18},drawerFontColor]}>{route.name === 'HomeGroup' ? 'Home' : route.name}</Text>
          </TouchableRipple>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[{
          padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
          
        },drawerColor]}
        onPress={() => {
          // Handle logout logic here
          console.log('Logout pressed');
        }}
      >
        <Text style={InlineStyles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const InlineStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#19bd2c',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    
    
    alignItems:"center",
    paddingVertical: 50,
  },
  drawerItem: {
    width:"100%",
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  drawerItemText: {
    fontSize: 18,
  },
  logoutButton: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    color: '#d9534f',
  },
});


