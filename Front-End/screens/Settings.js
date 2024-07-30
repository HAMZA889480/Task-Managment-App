import { Text, View, ScrollView } from "react-native";
import { Switch, TouchableRipple, PaperProvider } from "react-native-paper";
import FontDialong from "../components/FontDialong";
import { useState } from "react";
export default function Settings() {
  const [isDark, setIsDark] = useState(false);
  const [fontDialong,setFontDialong] = useState(false);

  const onToggleSwitch = () => setIsDark(!isDark);
  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#fff",
          paddingVertical: "2%",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            backgroundColor: "#eee",
            paddingHorizontal: "7%",
            borderBottomColor: "#000",
            borderBottomWidthWidth: 1,
            paddingVertical: "7%",
            justifyContent: "space-between",

            flexDirection: "row",
            marginBottom: "1%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingRight: "10%",
              width: "90%",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>BackGround</Text>
            <Text style={{ fontSize: 14, marginTop: "5%" }}>
              Toggle the to enable the dark mode
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Switch
              value={isDark}
              onValueChange={onToggleSwitch}
              color="#0fba1a"
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#eee",
            paddingHorizontal: "7%",
            borderBottomColor: "#000",
            borderBottomWidthWidth: 1.5,
            paddingVertical: "7%",
            justifyContent: "space-between",

            flexDirection: "row",
          }}
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Change Font
            </Text>
            <Text style={{ fontSize: 14, marginTop: "5%" }}>
              Change the font of the application to make it more readable.
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
        </View>
      </ScrollView>
    {fontDialong && <FontDialong isVisible={fontDialong} setIsVisible={setFontDialong}/>}
    </PaperProvider>
  );
}
