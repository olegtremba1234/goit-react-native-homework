import { Alert, Button, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useUserData } from "./userData";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/mainScreen/Home";
import CommentsScreen from "./Screens/mainScreen/CommentsScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import MapScreen from "./Screens/mainScreen/MapScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const TabRouter = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const { logoutUser } = useUserData();
  const onLogout = () => {
    if (loggingOut) {
      logoutUser();
      setLoggingOut(false);
    } else {
      setLoggingOut(true);
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out of the app?",
        [
          { text: "Yes", onPress: logoutUser },
          { text: "NO", onPress: () => setLoggingOut(false) },
        ]
      );
    }
  };

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          alignItems: "center",
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <MainTab.Screen
        options={{
          title: "Posts",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
          },
          headerRight: () => (
            <TouchableOpacity onPress={onLogout}>
              <View style={{ marginRight: 10 }}>
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
          tabBarItemStyle: {
            borderRadius: 20,
            height: 40,
            maxWidth: 70,
            marginTop: 9,
            marginRight: 10,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons name="grid-view" size={size} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={({ navigation }) => ({
          title: "Create post",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View style={{ marginLeft: 20 }}>
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="rgba(33, 33, 33, 0.8)"
                />
              </View>
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
          tabBarItemStyle: {
            borderRadius: 20,
            height: 40,
            maxWidth: 70,
            marginTop: 9,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        })}
        name="CreatePost"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
          tabBarItemStyle: {
            borderRadius: 20,
            height: 40,
            maxWidth: 70,
            marginTop: 9,
            marginLeft: 10,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const useRoute = () => {
  const { isAuth } = useUserData();

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={({ navigation, route }) => ({
          headerShown: false,
        })}
        name="Home"
        component={Home}
      />
      <MainStack.Screen
        options={{ headerShown: false }}
        name="MainTab"
        component={TabRouter}
      />
      <MainStack.Screen name="Comments" component={CommentsScreen} />
      <MainStack.Screen name="Map" component={MapScreen} />
    </MainStack.Navigator>
  );
};
export default function Router() {
  const routing = useRoute();
  return <NavigationContainer>{routing}</NavigationContainer>;
}
