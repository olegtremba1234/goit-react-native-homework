import React, { useEffect, useState } from "react";
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

import { useUserData } from "../../userData";

const initialState = {
  email: "",
  password: "",
  isShowKeyboard: false,
  showPassword: false,
  focusedInput: null,
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);
  const [isShowKeybord, setIsShowKeybord] = useState(
    initialState.isShowKeyboard
  );
  const [showPassword, setShowPassword] = useState(initialState.showPassword);
  const [focusedInput, setFocusedInput] = useState(initialState.focusedInput);

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

  const { loginUser } = useUserData();

  const onLogin = () => {
    if (email === "" || password === "") {
      return Alert.alert("Error", "Please fill in all fields! And try again!");
    }
    keyboardHide();
    resetForm();
    loginUser();
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeybord(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeybord(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.bgImageContainer}>
        <ImageBackground
          source={require("../../assets/images/bg-photo.png")}
          style={styles.BgImage}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeybord ? 32 : 142,
            }}
            onPress={() => setIsShowKeybord(false)}
          >
            <Text style={styles.title}>Login</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  value={email}
                  onChangeText={emailHandler}
                  placeholder="Email"
                  placeholderTextColor="#BDBDBD"
                  maxLength={50}
                  style={{
                    ...styles.input,
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
                  onPress={onLogin}
                >
                  <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.registerText}>
                    Don't have an account? <Text>Register</Text>
                  </Text>
                </TouchableOpacity>
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
    justifyContent: "flex-end",
  },
  BgImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 32,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    height: 50,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    borderColor: "#E8E8E8",
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
  registerText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
  },
});
