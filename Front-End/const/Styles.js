import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  LoginPage: {
    Container: {
      flex: 1,

      flexDirection: "column",
    },
  },
  NavBar: {
    Container: {
      height: "10%",
      backgroundColor: "#fff",
      shadowColor: "#2a588c",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      paddingTop: "1%",
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: "7%",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    },
    AppTitle: {
      fontSize: 25,
      color: "#19bd2c",
      fontWeight: "bold",
    },
    Button: {
      width: "35%",
      justifyContent: "center",
    },
    ButtonText: {
      fontSize: 15,
      letterSpacing: 0.8,
    },
  },

  AccountForm: {
    Container: {
      marginBottom: "20%",
      width: "90%",
      backgroundColor: "#fff",
      top: "12%",
      left: "5%",
      borderColor: "#ddd",
      borderWidth: 1,
      paddingHorizontal: "5%",
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      shadowColor: "#2a588c",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 10,
    },
    Title: {
      fontSize: 25,
      color: "#19bd2c",
      fontWeight: "bold",
      fontStyle: "italic",
      textAlign: "center",
      marginTop: "3%",
    },
    Button: {
      width: "70%",

      marginVertical: 40,
      justifyContent: "center",
    },
    ButtonText: {
      fontSize: 18,
      letterSpacing: 1.2,
    },
  },

  AddTask: {
    Container: {
      flexGrow: 1,
      flexDirection: "column",
      backgroundColor: "#fff",
      paddingHorizontal: "7%",
      paddingVertical: "10%",
    },
  },
});
