import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
} from "react-native";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";

export default function CommentsScreen({ route }) {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const { name } = useSelector(selectUser);
  const createComment = async () => {};
  // console.log("photo", photo);
  // console.log("route.params", route.params);
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {/* <Image
          source={{ uri: photo }}
          style={{ width: "100%", height: "100%" }}
        /> */}
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Comment..."
          placeholderTextColor="#BDBDBD"
          style={styles.commentInput}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          activeOpacity={0.7}
          onPress={() => Alert.alert("Send comment")}
        >
          <AntDesign name="arrowup" size={20} color="#fff" />
        </TouchableOpacity>
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
    paddingBottom: 16,
    justifyContent: "flex-end",
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.91,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    height: 50,
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentInput: {
    marginLeft: 16,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
  },
  sendBtn: {
    backgroundColor: "orange",
    borderRadius: 50,
    width: 34,
    height: 34,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
