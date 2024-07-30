import { ScrollView, View } from "react-native";

import { styles } from "../const/Styles";
import NavBar from "../components/NavBar";
import AccountForm from "../components/accountForm";

export default function Login() {
  return (
    <View style={[styles.DarkBackGround, styles.LoginPage.Container]}>
      <NavBar type="Login" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AccountForm type="Login" submitHandler="Login" />
      </ScrollView>
    </View>
  );
}
