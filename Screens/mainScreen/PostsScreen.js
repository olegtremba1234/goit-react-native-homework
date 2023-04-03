import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [item, setItem] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
    if (route.params) {
      setItem(route.params);
    }
  }, [route.params]);
  console.log("posts", posts);
  console.log("route.params", route.params);
  if (item !== []) {
    console.log("item", item);
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            style={styles.userAvatar}
            source={require("../../assets/images/profile_avatar.png")}
          />
        </View>
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 34 }}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.photo }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 11,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={{ transform: [{ scaleX: -1 }] }}
                  />
                  {/* <Ionicons
                    name="chatbubble-sharp"
                    size={24}
                    color="#FF6C00"
                    style={{ transform: [{ scaleX: -1 }] }}
                  /> */}
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    lineHeight: 19,
                    marginLeft: 9,
                    // marginRight: 27,
                    color: "#BDBDBD",
                  }}
                >
                  0
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
                  {item.title}
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, indx) => indx.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarWrapper: {
    backgroundColor: "#F6F6F6",
    height: 60,
    width: 60,
    borderRadius: 16,
    overflow: "hidden",
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  userAvatar: {
    flex: 1,
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  imageWrapper: {
    // width: Dimensions.get("window").width * 0.91,
    height: 240,
    // marginHorizontal: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
  },
  location: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
    textDecorationLine: "underline",
  },
});
