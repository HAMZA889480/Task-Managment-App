import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  Portal,
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";

export default PasswordConfirm = () => {
  return (
    <Portal>
      <TouchableWithoutFeedback>
        <View style={styles.backgroundBlur}>
          <TouchableWithoutFeedback>
            <ActivityIndicator animating={true} color="#0fba1a" />
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundBlur: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginTop: 10,
    marginBottom: 20,
  },
});
