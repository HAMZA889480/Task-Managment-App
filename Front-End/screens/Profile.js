import { Text, View, ScrollView } from "react-native";
import { TouchableRipple, PaperProvider } from "react-native-paper";

import { useSelector } from "react-redux";

import { styles } from "../const/Styles";

export default function Profile({ navigation }) {
  const theme = useSelector((state) => state.settings.theme);

  let containerColor, fontColor, listColor, fontColorDes;
  if (theme === "light") {
    containerColor = styles.Settings.darkBackGround.Container;
    listColor = styles.Settings.darkBackGround.listColor;
    fontColor = styles.Settings.darkBackGround.listTextColor;
    fontColorDes = styles.Settings.darkBackGround.listTextColorDes;
    console.log("light");
  } else {
    containerColor = styles.Settings.lightBackGround.Container;
    listColor = styles.Settings.lightBackGround.listColor;
    fontColor = styles.Settings.lightBackGround.listTextColor;
    fontColorDes = styles.Settings.lightBackGround.listTextColorDes;
    console.log("dark");
  }

  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={[styles.Settings.Container, containerColor]}
      >
        {/* <View
          style={[{
            backgroundColor: "#eee",
            paddingHorizontal: "7%",
            borderBottomColor: "#000",
            borderBottomWidthWidth: 1.5,
            paddingVertical: "7%",
            justifyContent: "space-between",

            flexDirection: "row",
          }, listColor]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingRight: "10%",
              width: "80%",
            }}
          >
            <Text style={[{ fontSize: 20, fontWeight: "bold" },fontColor]}>
              Change User Name
            </Text>
            <Text style={[{ fontSize: 14, marginTop: "5%" },fontColorDes]}>
              Click here to change your curret user name.
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              width: "23%",
              alignItems: "flex-start",
            }}
          >
            <TouchableRipple
              rippleColor={"#5de366"}
              onPress={()=>{setFontDialong(true)}}
              centered={true}
              style={{
                width: "100%",
                backgroundColor: "#0fba1a",
                height: 35,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <View>
                <Text style={{ color: "#fff" }}>Medium</Text>
              </View>
            </TouchableRipple>
          </View>
        </View> */}

        <TouchableRipple
          rippleColor={"#5de366"}
          centered={true}
          onPress={() => {
            navigation.navigate("UpdateUserName");
          }}
          style={[
            {
              backgroundColor: "#eee",
              paddingHorizontal: "7%",
              borderBottomColor: "#000",
              borderBottomWidthWidth: 1.5,
              paddingVertical: "7%",
              justifyContent: "space-between",

              flexDirection: "row",
            },
            listColor,
          ]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingRight: "10%",
              width: "100%",
            }}
          >
            <Text style={[{ fontSize: 20, fontWeight: "bold" }, fontColor]}>
              Change User Name
            </Text>
            <Text style={[{ fontSize: 14, marginTop: "5%" }, fontColorDes]}>
              Click here to change your curret user name.
            </Text>
          </View>
        </TouchableRipple>
      </ScrollView>
      {/* {fontDialong && (
        <FontDialong isVisible={fontDialong} setIsVisible={setFontDialong} />
      )} */}
    </PaperProvider>
  );
}
