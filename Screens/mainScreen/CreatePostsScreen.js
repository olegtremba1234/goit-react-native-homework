import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { uploadPhotoToServer } from "../../redux/media/mediaOperations";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  photo: null,
  title: "",
  locationTile: "",
  hasCameraPermission: null,
  hasLocationPermission: null,
  camera: null,
  focusedInput: null,
  isPhotoDownloaded: false,
  isShowKeyboard: false,
  geoLocation: null,
};

export default function CreatePostsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialState.title);
  const [locationTitle, setLocationTitle] = useState(initialState.locationTile);
  const [geoLocation, setGeoLocation] = useState(initialState.geoLocation);
  const [isShowKeybord, setIsShowKeybord] = useState(
    initialState.isShowKeyboard
  );
  const [camera, setCamera] = useState(initialState.camera);
  const [photo, setPhoto] = useState(initialState.photo);
  const [isPhotoDownloaded, setIsPhotoDownloaded] = useState(
    initialState.isPhotoDownloaded
  );
  const [focusedInput, setFocusedInput] = useState(initialState.focusedInput);
  const [hasCameraPermission, setHasCameraPermission] = useState(
    initialState.hasCameraPermission
  );
  const [hasLocationPermission, setHasLocationPermission] = useState(
    initialState.hasLocationPermission
  );

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    setIsPhotoDownloaded(true);
  };

  const titleHandler = (text) => setTitle(text);
  const locationTitleHandler = (text) => setLocationTitle(text);

  const keyboardHide = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
  };

  const imageName = nanoid();
  const path = `postImage/${imageName}`;

  const publishPost = () => {
    if (photo === null || title === "" || locationTitle === "") {
      return Alert.alert(
        "Error",
        "Please add photo and fill in all fields! And try again!"
      );
    }
    dispatch(uploadPhotoToServer({ photo, path }));
    resetForm();
    (async () => {
      let location = hasLocationPermission
        ? await Location.getCurrentPositionAsync({})
        : null;
      const coords = hasLocationPermission
        ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
        : null;

      navigation.navigate("Posts", { photo, title, location: coords });
    })();
  };

  const resetForm = () => {
    setPhoto(initialState.photo);
    setTitle(initialState.title);
    setLocationTitle(initialState.locationTile);
    setIsPhotoDownloaded(initialState.isPhotoDownloaded);
  };

  const isPublisAllowed =
    title && locationTitle && isPhotoDownloaded && hasCameraPermission;

  useEffect(() => {
    (async () => {
      let { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        Alert.alert("Warning!", "Permission to access location was denied!");
      }
      setHasLocationPermission(locationStatus === "granted");

      let { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      if (cameraStatus !== "granted") {
        Alert.alert(
          "Faile!",
          "Access denied. Yo need add your access to take a photo"
        );
      }
      setHasCameraPermission(cameraStatus === "granted");
    })();
  }, []);

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
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <SafeAreaView
          style={{
            ...styles.container,
            // paddingBottom: isShowKeybord ? 32 : 34,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
              <Camera style={styles.camera} ref={setCamera}>
                {photo ? (
                  <View style={styles.photoContainer}>
                    <Image source={{ uri: photo }} style={styles.takedPhoto} />
                  </View>
                ) : null}
                <TouchableOpacity
                  style={styles.shotButtonContainer}
                  onPress={takePhoto}
                  activeOpacity={0.8}
                  setIsPhotoDownloaded={true}
                >
                  <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                {/* <TouchableOpacity
              style={{ position: "absolute", top: 50 }}
              onPress={toggleCameraType}
              activeOpacity={0.7}
            >
              <MaterialIcons name="flip-camera-ios" size={24} color="#fff" />
            </TouchableOpacity> */}
              </Camera>
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
              {isPhotoDownloaded ? "Edit photo" : "Download photo"}
            </Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  marginBottom: 32,
                  borderBottomWidth: 1,
                  borderBottomColor:
                    focusedInput === "title" ? "#ff6c00" : "#e8e8e8",
                }}
              >
                <TextInput
                  value={title}
                  onChangeText={titleHandler}
                  style={styles.input}
                  placeholder="Title..."
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
                    setIsShowKeybord(true);
                    setFocusedInput("title");
                  }}
                  onBlur={() => setFocusedInput(null)}
                  onSubmitEditing={() => keyboardHide()}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor:
                    focusedInput === "locationTitle" ? "#ff6c00" : "#e8e8e8",
                }}
              >
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  value={locationTitle}
                  onChangeText={locationTitleHandler}
                  style={styles.input}
                  placeholder="Location..."
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
                    setIsShowKeybord(true);
                    setFocusedInput("locationTitle");
                  }}
                  onBlur={() => setFocusedInput(null)}
                  onSubmitEditing={() => keyboardHide()}
                />
              </View>
              {isShowKeybord ? null : (
                <>
                  <TouchableOpacity
                    style={{
                      ...styles.btn,
                      backgroundColor: isPublisAllowed ? "#FF6C00" : "#F6F6F6",
                    }}
                    activeOpacity={0.7}
                    onPress={publishPost}
                  >
                    <Text
                      style={{
                        ...styles.btnText,
                        color: isPublisAllowed ? "#fff" : "#BDBDBD",
                      }}
                    >
                      Publish
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={styles.deleteBtnWrapper}
                      activeOpacity={0.7}
                      onPress={resetForm}
                    >
                      <Feather name="trash-2" size={24} color="#DADADA" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   borderTopWidth: 1,
  //   borderTopColor: "#E5E5E5",
  //   paddingHorizontal: 16,
  //   paddingTop: 32,
  //   // paddingBottom: 64,
  // },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: Dimensions.get("window").width * 0.045,
    paddingVertical: 32,
    backgroundColor: "#fff",
  },
  cameraContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.91,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  takedPhoto: {
    width: "100%",
    height: "100%",
  },
  shotButtonContainer: {
    borderRadius: 50,
    height: 60,
    width: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    // backgroundColor: "#F6F6F6",
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
    // color: "#BDBDBD",
    textAlign: "center",
  },
  deleteBtnWrapper: {
    // position: "absolute",
    // bottom: 10,
    marginTop: 100,
    left: Dimensions.get("window").width * 0.37,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
