import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <View style={styles.imageWrapper}>
            <View
              style={{
                // position: "absolute",
                // top: 90,
                // left: Dimensions.get("window").width * 0.455 - 32,
                borderRadius: 50,
                height: 60,
                width: 60,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => Alert.alert("Smile")}>
                <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              color: "#BDBDBD",
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              marginBottom: 48,
              marginTop: 8,
            }}
          >
            Download photo
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "#E8E8E8",
            borderBottomWidth: 1,
            marginBottom: 32,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Title..."
            placeholderTextColor="#BDBDBD"
          />
        </View>
        <View
          style={{
            borderBottomColor: "#E8E8E8",
            borderBottomWidth: 1,
            flexDirection: "row",
          }}
        >
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Location..."
            placeholderTextColor="#BDBDBD"
          />
        </View>
        <TouchableOpacity
          style={{
            ...styles.btn,
          }}
          activeOpacity={0.7}
          onPress={() => Alert.alert("Publish post!")}
          // onPress={onLogin}
        >
          <Text style={styles.btnText}>Publish</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={styles.deleteBtnWrapper}
            activeOpacity={0.7}
            onPress={() => Alert.alert("Delete post!")}
          >
            <Feather name="trash-2" size={24} color="#DADADA" />
          </TouchableOpacity>
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
  input: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    paddingBottom: 15,
  },
  btn: {
    backgroundColor: "#F6F6F6",
    marginHorizontal: 16,
    borderRadius: 100,
    height: 51,
    marginTop: 32,
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    textAlign: "center",
  },
  deleteBtnWrapper: {
    position: "absolute",
    top: 100,
    left: Dimensions.get("window").width * 0.37,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
