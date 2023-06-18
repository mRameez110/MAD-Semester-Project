import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import MovieScreen from "./src/screens/MovieScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";


const Stack = createStackNavigator();

export default () => {

  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/Roboto-Regular.ttf"),
    Bold: require("./assets/fonts/Roboto-Bold.ttf"),
    Black: require("./assets/fonts/Roboto-Black.ttf"),
    ExtraBold: require("./assets/fonts/Roboto-Thin.ttf"),
    ExtraLight: require("./assets/fonts/Roboto-LightItalic.ttf"),
    Light: require("./assets/fonts/Roboto-Light.ttf"),
    SemiBold: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  return fontLoaded ? (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="movie"
            component={MovieScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    
    </>

  ) : (
    <AppLoading />
  )
};