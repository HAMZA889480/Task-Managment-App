import { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import { IconButton, ActivityIndicator } from "react-native-paper";
import { styles } from "../const/Styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { TaskHandler } from "../Handlers/TaskHandlers";
import TaskList from "../components/TasksList";

export default function Home() {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const {
    getTodaysTasksLists,
    error,
    loading,
    response,
    statusCode,
    setError,
    setLoading,
    setResponse,
  } = TaskHandler();

  //useSelector for getting the user state
  const user = useSelector((store) => store.user);
  const theme = useSelector((state) => state.settings.theme);

  useEffect(() => {
    console.log("From Home to get the tasks");
    getTodaysTasksLists(user.email);
  }, [user.email]); // Added user.email as a dependency

  useEffect(() => {
    if (loading) {
      console.log("Loading.......");
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      alert("Something went wrong");
      console.log("Error", error);

      // Clear the state after showing the alert
      setError(false);
      setLoading(false);
      setResponse(false);
    }

    if (!loading && !error && response) {
      if (response.message === "Success" || statusCode === 200) {
        // console.log("Response from useEffect", response.allTaskLists);
      }
    }
  }, [response, error]);

  // Function to handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTodaysTasksLists(user.email).finally(() => {
      setRefreshing(false);
    });
  }, [user.email, getTodaysTasksLists]);


  let continarColor, fontColor;

  if(theme==="light"){
    continarColor = styles.Settings.darkBackGround.Container;
    fontColor="#fff"
  }else{
    continarColor = styles.Settings.lightBackGround.Container;
    fontColor="#000"

  }

  return (
    <View style={ styles.LoginPage.Container}>
     
      <ScrollView
        contentContainerStyle={[{ flexGrow: 1 }, continarColor]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#19bd2c"]}
          />
        }
      >
        {/* Home Page */}
        <View
          style={{
            width: "100%",
            paddingHorizontal: "3%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "10%",
           
          }}
        >
          {/* Tasks Lists */}
          {loading ? <ActivityIndicator /> : null}
          {response &&
          response.allTaskLists &&
          response.allTaskLists.length > 0 ? (
            response.allTaskLists.map((task) => {
              return <TaskList key={task._id} task={task} />;
            })
          ) : (
            <Text style={{color:fontColor, fontWeight:"bold", letterSpacing:1.2, fontSize:25}}>No Tasks</Text>
          )}
        </View>
        
      </ScrollView>
    </View>
  );
}
