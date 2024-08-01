import React, { useEffect } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

const UpdateUserName = () => {
  const [currentUserName, setCurrentUserName] = React.useState('');
  const [newUserName, setNewUserName] = React.useState('');
  const [isError, setIsError]=React.useState(false)
  const [isNewName, setIsNewName]=React.useState(false);

  const handleUpdate = () => {
   if(newUserName.length<5){
    setIsError(true);
    return
   }
   else if(newUserName=== currentUserName){
    setIsNewName(true)
   }
   else{
    setIsError(false);
    setIsNewName(false);
    console.log("Updating the name")
   }
  };


  const theme = useSelector((state) => state.settings.theme);
  const user = useSelector((state) => state.user.name);


  useEffect(()=>{
    setCurrentUserName(user)
  },[user])

  let containerColor, fontColor;
  if(theme==="light"){
    containerColor="#404241"
    fontColor="#fff"

  }else{
    containerColor="#eee"
    fontColor="#000"

  }

  return (
    <View style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor:containerColor}}>
    <View style={{width:"100%", alignItems:"center"}}>
    <Text style={{alignSelf:"flex-start", marginLeft:"10%", marginBottom:"3%", fontSize:17, fontWeight:"bold", color:fontColor}}>
        Current User Name
    </Text>
      <TextInput
        label="Current User Name"
        value={currentUserName}
        editable={false}
        onChangeText={setCurrentUserName}
        mode="outlined"
        style={styles.input}
        activeOutlineColor='#19bd2c'
      />
      </View>
      <View style={{width:"100%", alignItems:"center", marginTop:"10%"}}>
    <Text style={{alignSelf:"flex-start", marginLeft:"10%", marginBottom:"3%", fontSize:17, fontWeight:"bold",color:fontColor}}>
        New User Name
    </Text>
      <TextInput
        label="New User Name"
        value={newUserName}
        onChangeText={setNewUserName}
        mode="outlined"
        style={styles.input}
        activeOutlineColor='#19bd2c'
      />
     {isError&&( <Text style={{color:"#ed071a"}}>*Provide atleast 5 Letter Name </Text>)}
     {isNewName &&( <Text style={{color:"#ed071a"}}>*New Name is sam as Old one </Text>)}
      </View>
      
      <Button mode="contained"  onPress={handleUpdate} style={{width:"40%", backgroundColor:"#19bd2c", marginTop:30}}>
        Update
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '80%',
    marginBottom: 16,
  },
  button: {
    width: '80%',
  },
});

export default UpdateUserName;
