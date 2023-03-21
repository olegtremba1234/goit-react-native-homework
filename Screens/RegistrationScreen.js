import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

const initialState = {
  name: "",
  email: "",
  password: "",
  isShowKeyboard: false,
  showPassword: false,
  focusedInput: null,
};

export default function App() {
  const [name, setName] = useState(initialState.name);
  const [email, setEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);
  const [isShowKeybord, setIsShowKeybord] = useState(
    initialState.isShowKeyboard
  );
  const [showPassword, setShowPassword] = useState(initialState.showPassword);
  const [focusedInput, setFocusedInput] = useState(initialState.focusedInput);

  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const keyboardHide = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
  };

  const showPasswordHandler = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  const resetForm = () => {
    setEmail(initialState.email);
    setPassword(initialState.password);
    setShowPassword(initialState.showPassword);
  };

  const onRegister = () => {
    Alert.alert("Credentials", `${name} + ${email} + ${password}`);
    keyboardHide();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.bgImageContainer}>
        <ImageBackground
          source={require("../assets/images/bg-photo.png")}
          style={styles.BgImage}
        >
          <View
            style={{
              ...styles.form,
              width: Dimensions.get("window").width,
              paddingBottom: isShowKeybord ? 32 : 78,
            }}
          >
            <View style={styles.avatar}>
              <View style={styles.addAvatarIconContainer}>
                <Text>
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color="orange"
                    onPress={() => {
                      Alert.alert(
                        `Hello ${name}!`,
                        "This icon can add your photo in the neare future!"
                      );
                    }}
                  />
                  {/* <AntDesign name="closecircleo" size={24} color="black" /> Іконка для видалення аватарки*/}
                </Text>
              </View>
            </View>
            <Text style={styles.title}>Registration</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  value={name}
                  onChangeText={nameHandler}
                  placeholder="Login"
                  placeholderTextColor="#BDBDBD"
                  maxLength={50}
                  style={{
                    ...styles.input,
                    borderColor:
                      focusedInput === "name" ? "#ff6c00" : "#e8e8e8",
                  }}
                  onFocus={() => {
                    setIsShowKeybord(true);
                    setFocusedInput("name");
                  }}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              <View>
                <TextInput
                  value={email}
                  onChangeText={emailHandler}
                  placeholder="Email"
                  placeholderTextColor="#BDBDBD"
                  maxLength={50}
                  style={{
                    ...styles.input,
                    marginTop: 16,
                    borderColor:
                      focusedInput === "email" ? "#ff6c00" : "#e8e8e8",
                  }}
                  onFocus={() => {
                    setFocusedInput("email");
                    setIsShowKeybord(true);
                  }}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              <View>
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  maxLength={30}
                  secureTextEntry={!showPassword}
                  style={{
                    ...styles.input,
                    marginTop: 16,
                    borderColor:
                      focusedInput === "password" ? "#ff6c00" : "#e8e8e8",
                  }}
                  onFocus={() => {
                    setFocusedInput("password");
                    setIsShowKeybord(true);
                  }}
                  onBlur={() => setFocusedInput(null)}
                />
                <Text
                  style={styles.showPasswordBtn}
                  onPress={showPasswordHandler}
                >
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </View>
            </KeyboardAvoidingView>
            {isShowKeybord ? null : (
              <>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.8}
                  onPress={onRegister}
                >
                  <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.loginText}>
                  Allredy have an account? Login
                </Text>
              </>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bgImageContainer: {
    flex: 1,
  },
  BgImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },

  form: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
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
  title: {
    marginTop: 92,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    height: 50,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  showPasswordBtn: {
    position: "absolute",
    right: 32,
    top: 30,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btn: {
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    borderRadius: 100,
    height: 51,
    marginTop: 43,
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
    textAlign: "center",
  },
  loginText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
  },
});
