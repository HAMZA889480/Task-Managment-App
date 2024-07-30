import { TouchableRipple } from "react-native-paper";

import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TaskList({ task }) {
  const navigation = useNavigation();
  return (
    <TouchableRipple
      onPress={() => {
        navigation.navigate("TaskScreen", { task: task });
      }}
      rippleColor="#93ed9d"
      centered={true}
      style={{
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: 5,
        height: 120,
        justifyContent: "space-around",
        paddingHorizontal: "5%",
        marginBottom: "5%",
      }}
    >
      <>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 22 }}>{task.title}</Text>
          </View>

          <View
            style={{
              width: "30%",
              height: "20",
              backgroundColor: "#98e3a1",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>{task.status}</Text>
          </View>
        </View>
        <Text style={{ paddingVertical: "2%" }}>{task.description}</Text>
      </>
    </TouchableRipple>
  );
}
