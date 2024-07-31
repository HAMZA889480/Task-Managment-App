import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default CustomDrawerContent = (props) => {
  const navigation = useNavigation();


  const user = useSelector((state) => state.user);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{user.name}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.drawerContent}>
        {props.state.routes.map((route, index) => (
          <TouchableRipple
           rippleColor="#ccc"
           centered={true}
           
            key={index}
            onPress={() => {
              navigation.navigate(route.name);
              props.navigation.closeDrawer();
            }}
            style={styles.drawerItem}
          >
            <Text style={styles.drawerItemText}>{route.name === 'HomeGroup' ? 'Home' : route.name}</Text>
          </TouchableRipple>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          // Handle logout logic here
          console.log('Logout pressed');
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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


