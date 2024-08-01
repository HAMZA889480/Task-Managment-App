import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../const/Styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function NavBar({ type }) {
  const navigation = useNavigation();

  const theme = useSelector((state) => state.settings.theme);


  let continarColor, fontColor;
  if(theme==="light"){
    continarColor=styles.NavBar.darkBackGround.backgroundColor;
    fontColor=styles.NavBar.darkBackGround.color;
    // console.log("background color",continarColor);
  }
  else{
    continarColor=styles.NavBar.lightBackGround.backgroundColor;
    fontColor=styles.NavBar.lightBackGround.color;

    
  }

  return (
    <View style={[{backgroundColor:continarColor},styles.NavBar.Container]}>
      <Text style={[{ fontSize: 25, fontWeight: "bold", color:fontColor }]}>
        To Do App
      </Text>
      <Button
        rippleColor="#49cc59"
        buttonColor="#19bd2c"
        textColor="#fff"
        mode="contained"
        style={[styles.NavBar.Button]}
        onPress={() => {
          //If the type is "Login" then the button will say "Sign Up" else it will say "Log In"
          //Opposite type button will display
          if (type === "Login") {
            //Navigate to Sign Up Page
            navigation.navigate("SignUp");
          } else {
            //Navigate to Login Page
            navigation.navigate("Login");
          }
        }}
      >
        {/* If the type is "Login" then the button will say "Sign Up" else it will say "Log In" */}
        {/*Opposite type button will display */}
        <Text style={[styles.NavBar.ButtonText]}>
          {type === "Login" ? "Sign Up" : "Log In"}
        </Text>
      </Button>
    </View>
  );
}
