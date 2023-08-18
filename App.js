import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Feed } from "./src/pages/Feed";

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#f5f5f5" />

      <Feed />
    </>
  );
}
