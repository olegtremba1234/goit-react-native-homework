import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  // const { location } = route.params;
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.451374,
          longitude: 30.5230123,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        showsUserLocation={true}
      >
        <Marker
          // title={title}
          coordinate={{ latitude: 50.451374, longitude: 30.5230123 }}
          // description={locationRegion}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
});
