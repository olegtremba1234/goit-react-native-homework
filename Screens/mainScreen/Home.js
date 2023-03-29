import { React, useEffect } from "react";

export default function Home({ navigation }) {
  useEffect(() => {
    navigation.navigate("MainTab", { screen: "Posts" });
  }, []);

  return null;
}
