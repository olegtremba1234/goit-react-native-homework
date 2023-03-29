import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
});
