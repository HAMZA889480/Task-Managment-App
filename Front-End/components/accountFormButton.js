import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../const/Styles";
const loginHandler = () => {
  console.log("Login");
};

const signUpHandler = () => {
  console.log("Sign Up");
};

export default function AccountFormButton({ submitHandler }) {
  return (
    <Button
      rippleColor="#49cc59"
      buttonColor="#19bd2c"
      textColor="#fff"
      mode="contained"
      style={[
        styles.AccountForm.Button,
        submitHandler === "Login" ? { height: "12%" } : { height: "9%" },
      ]}
      onPress={() => {
        if (submitHandler === "Login") {
          loginHandler();
        } else {
          signUpHandler();
        }
      }}
    >
      <Text style={[styles.AccountForm.ButtonText]}>
        {submitHandler === "Login" ? "Log In" : "Sign Up"}
      </Text>
    </Button>
  );
}
