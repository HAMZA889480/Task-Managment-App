import { ScrollView, View } from "react-native";

import { styles } from "../const/Styles";
import NavBar from "../components/NavBar";
import AccountForm from "../components/accountForm";
import { useSelector } from "react-redux";

export default function Login() {

  const theme = useSelector((state) => state.settings.theme);

  let containerColor;
  if(theme ==="light"){
    containerColor="#0f1a10"
  }
  else{
    containerColor="#eee"
  }


  return (
    <View style={[ {backgroundColor:containerColor},styles.LoginPage.Container]}>
      <NavBar type="Login" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AccountForm type="Login" submitHandler="Login" />
      </ScrollView>
    </View>
  );
}
