import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useUserData } from "../../userData";

import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
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
    <View style={styles.bgImageContainer}>
      <ImageBackground
        source={require("../../assets/images/bg-photo.png")}
        style={styles.BgImage}
      >
        <View style={styles.container}>
          <View style={styles.avatar}>
            <Image source={require("../../assets/images/profile_avatar.png")} />
            <View style={styles.addAvatarIconContainer}>
              <TouchableOpacity
                style={{ borderRadius: 50, backgroundColor: "#fff" }}
                onPress={() => Alert.alert("Delete photo!")}
              >
                {/* <AntDesign
                    name="pluscircleo"
                    size={24}
                    color="orange"
                    
                  /> */}
                <AntDesign name="closecircleo" size={24} color="#E8E8E8" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={onLogout}>
              <View style={{ marginRight: 10 }}>
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Natali Romanova</Text>
          <View style={styles.postWrapper}>
            <View style={styles.imageWrapper}>
              {/* <Image
                style={styles.postImage}
                source={require("../../assets/images/picture1.png")}
              /> */}
            </View>
            <Text style={styles.imageTitle}>Forest</Text>
            <View style={styles.postSocial}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <Ionicons
                    name="chatbubble-sharp"
                    size={24}
                    color="#FF6C00"
                    style={{ transform: [{ scaleX: -1 }] }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    lineHeight: 19,
                    marginLeft: 9,
                    marginRight: 27,
                  }}
                >
                  8
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => Alert.alert("Like")}
                >
                  <Feather name="thumbs-up" size={24} color="black" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    lineHeight: 19,
                    marginLeft: 10,
                  }}
                >
                  153
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Map")}
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    lineHeight: 19,
                    marginLeft: 8,
                    textDecorationLine: "underline",
                  }}
                >
                  Ukraine
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImageContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  BgImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    position: "absolute",
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  addAvatarIconContainer: {
    position: "absolute",
    top: 81,
    left: 107,
  },
  logoutContainer: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  title: {
    paddingTop: 92,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },
  imageWrapper: {
    width: Dimensions.get("window").width * 0.91,
    height: 240,
    marginHorizontal: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  imageTitle: {
    marginHorizontal: 16,
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
  },
  postSocial: {
    marginTop: 11,
    marginBottom: 35,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
